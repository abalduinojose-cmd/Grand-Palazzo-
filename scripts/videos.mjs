/**
 * Vídeo de fundo da dobra, nas duas orientações.
 *
 * O material do cliente é reel de Instagram: 720x1280, 47s, com legenda
 * queimada na imagem. O cliente pediu o vídeo COMPLETO em loop, então a
 * regra aqui é tirar o mínimo possível.
 *
 * Onde a legenda vive, medido quadro a quadro nos 47 segundos (detector
 * de pixel quase branco com vizinho escuro, que é a borda da letra):
 *
 *   - faixa de baixo, 78,4% a 81% da altura, presente em quase todo o
 *     vídeo. Sai no recorte, sem perder nada da cena.
 *   - bloco "FAÇA SUA RESERVA PELO LINK DA BIOGRAFIA", de 37,0s a
 *     41,1s, a 34% da altura. Esse fica no MEIO do quadro: nenhum
 *     recorte resolve, e é chamada de Instagram, que não faz sentido no
 *     site. Só sai cortando esses 4 segundos.
 *
 * Por isso o vídeo é montado em dois trechos (antes e depois do bloco)
 * emendados com dissolve de meio segundo: os dois lados são a mesma
 * tomada aérea, e um corte seco ali mostraria o drone pulando de
 * posição. Com o dissolve não se percebe. Sobram ~42,6s dos 47.
 *
 * Duas saídas, porque uma só não serve:
 *   - hero-desktop.mp4  faixa horizontal, ampliada com lanczos
 *   - hero-mobile.mp4   vertical no tamanho nativo, sem ampliar
 *
 * A faixa horizontal sai de y=300: acima disso o quadro é só vale e
 * céu, abaixo é só grama. Em 300 entram os telhados, a piscina e a
 * represa na mesma linha.
 *
 *   node scripts/videos.mjs
 */
import { spawnSync } from "node:child_process";
import { mkdir, rm, stat } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import ffmpeg from "ffmpeg-static";
import sharp from "sharp";

const RAIZ = path.resolve(import.meta.dirname, "..");
const ORIGEM = path.join(RAIZ, "midia", "videos", "tour-original.mp4");
const VIDEOS = path.join(RAIZ, "public", "videos");
const FOTOS = path.join(RAIZ, "src", "assets", "fotos");

/** Bloco do "link da biografia": entra em 37,0s e sai em 41,1s. */
const CORTE = { de: 36.9, ate: 41.2 };
/** Duração do original. */
const FIM = 47.18;
/** Dissolve da emenda, em segundos. */
const EMENDA = 0.5;
/** Topo da faixa horizontal, em pixels do quadro de 1280 de altura. */
const FAIXA_Y = 300;

/* Taxa de quadros: a original é 30, e 24 corta um quinto dos bytes sem
   que ninguém perceba em movimento de drone. Abaixo disso trepida. */
const FPS = 24;

/* Compressão firme de propósito. Num vídeo de 42s a diferença entre
   crf 30 e crf 35 é de megabytes, e comparando recorte a 100% de um
   quadro com folhagem os dois são indistinguíveis: a fonte já é reel
   de Instagram em 720p, ou seja, não há detalhe fino a perder. Somado
   ao véu por cima, sobra margem. */

/**
 * Monta o filtro: dois trechos do mesmo arquivo, cada um recortado e
 * tratado, emendados por xfade.
 *
 * O xfade exige os dois lados com a mesma resolução, mesmo fps e
 * timestamps começando em zero (daí o setpts), senão ele trava sem
 * mensagem clara.
 */
function filtro(tratamento) {
  const a = `[0:v]trim=0:${CORTE.de},setpts=PTS-STARTPTS,${tratamento}[a]`;
  const b = `[0:v]trim=${CORTE.ate}:${FIM},setpts=PTS-STARTPTS,${tratamento}[b]`;
  const emenda = `[a][b]xfade=transition=fade:duration=${EMENDA}:offset=${(CORTE.de - EMENDA).toFixed(2)}[v]`;
  return `${a};${b};${emenda}`;
}

const SAIDAS = [
  {
    nome: "hero-desktop.mp4",
    /* Recorta a faixa e amplia 1,33x com lanczos. Partir de 960 em vez
       de 720 dá ao navegador menos ampliação para fazer, e o unsharp
       devolve o microcontraste que a ampliação come. Não vale subir
       para 1280: num vídeo de 42s isso quase dobra o arquivo e o ganho
       desaparece atrás do véu. */
    filtro: filtro(
      `crop=720:405:0:${FAIXA_Y},fps=${FPS},scale=960:540:flags=lanczos,unsharp=5:5:0.5:5:5:0,setsar=1,format=yuv420p`,
    ),
    crf: 33,
  },
  {
    nome: "hero-mobile.mp4",
    /* Vertical fica no tamanho nativo: em tela de celular o vídeo é
       reduzido, não ampliado, então é o recorte mais nítido do site.
       928 de altura é 72,5% do quadro, o que deixa a faixa de legenda
       de baixo (78,4%) fora. */
    filtro: filtro(`crop=720:928:0:0,fps=${FPS},setsar=1,format=yuv420p`),
    crf: 35,
  },
];

const quando = async (p) => {
  try {
    return (await stat(p)).mtimeMs;
  } catch {
    return null;
  }
};

await mkdir(VIDEOS, { recursive: true });
const mOrigem = await quando(ORIGEM);
if (mOrigem === null) {
  console.error(`sem original: ${path.relative(RAIZ, ORIGEM)}`);
  process.exit(1);
}
/* O script entra na conta: mudou o corte, tudo remonta sozinho. */
const mScript = await quando(path.join(RAIZ, "scripts", "videos.mjs"));
const referencia = Math.max(mOrigem, mScript ?? 0);

for (const { nome, filtro: fc, crf } of SAIDAS) {
  const destino = path.join(VIDEOS, nome);
  const mDestino = await quando(destino);
  if (mDestino !== null && referencia <= mDestino) {
    console.log(`${nome}  em dia`);
    continue;
  }

  const r = spawnSync(
    ffmpeg,
    [
      "-hide_banner",
      "-loglevel", "error",
      "-i", ORIGEM,
      "-filter_complex", fc,
      "-map", "[v]",
      "-an", // fundo de dobra é mudo, sempre
      "-c:v", "libx264",
      "-profile:v", "high",
      "-pix_fmt", "yuv420p",
      "-crf", String(crf),
      "-preset", "medium",
      "-movflags", "+faststart",
      destino,
      "-y",
    ],
    { stdio: "inherit" },
  );
  if (r.status !== 0) process.exit(r.status ?? 1);

  const { size } = await stat(destino);
  console.log(`${nome}  ${(size / 1024 / 1024).toFixed(2)}MB`);
}

/* Pôster: o primeiro quadro do vertical, ampliado 1,5x. Ele é a
   primeira pintura da dobra, então entra como import estático (o
   next/image tira dele o blur e as dimensões, e o CLS fica zero).
   Uma imagem só para as duas orientações: no desktop o object-cover
   recorta justamente a faixa do vídeo horizontal. */
const bruto = path.join(tmpdir(), "grand-palazzo-hero-quadro.png");
const p = spawnSync(
  ffmpeg,
  [
    "-hide_banner", "-loglevel", "error",
    "-ss", "0", "-i", ORIGEM,
    "-vf", "crop=720:928:0:0",
    "-frames:v", "1",
    bruto, "-y",
  ],
  { stdio: "inherit" },
);
if (p.status !== 0) process.exit(p.status ?? 1);

const poster = path.join(FOTOS, "hero-aereo.jpg");
const { size } = await sharp(bruto)
  .resize(1080, 1392, { kernel: "lanczos3" })
  .sharpen({ sigma: 0.7, m1: 0.4, m2: 0.6 })
  .jpeg({ quality: 72, mozjpeg: true })
  .toFile(poster);
await rm(bruto, { force: true });
console.log(`hero-aereo.jpg  ${(size / 1024).toFixed(0)}KB (pôster da dobra)`);
