/**
 * Vídeo de fundo da dobra, nas duas orientações.
 *
 * A fonte é `midia/videos/hero-original.mp4`, que o cliente mandou em
 * 12/09: 718x942, 47s, HEVC a 8,5 Mbps. É bem melhor que o reel que
 * usávamos antes (720x1280 a 3 Mbps, já recomprimido pelo Instagram),
 * e já vem com parte da tarja de legenda cortada.
 *
 * Mas ainda tem legenda queimada, em três lugares, todos localizados
 * quadro a quadro nos 47 segundos:
 *
 *   1. faixa de baixo, de 88,6% a 91,9% da altura, quase o vídeo todo.
 *      Sai no recorte, sem perder cena.
 *   2. "@CHALESDAREPRESA · localizado em Petrópolis", de ~32,7s a
 *      ~36,2s, a 44% da altura. Esse é o pior de todos: cita OUTRA
 *      empresa, com outra cidade, no meio do site do Grand Palazzo.
 *   3. "FAÇA SUA RESERVA PELO LINK DA BIOGRAFIA", de ~36,8s a ~40,8s,
 *      a 27% da altura. Chamada de Instagram, não faz sentido no site.
 *
 * Os dois blocos do meio são contíguos (sobra menos de meio segundo
 * limpo entre eles), então saem num corte só, de 32,5s a 41,05s, com
 * dissolve na emenda. Os dois lados são tomadas diferentes, então a
 * passagem lê como corte de montagem. Sobram ~38s dos 47.
 *
 * Duas saídas, porque uma só não serve:
 *   - hero-desktop.mp4  faixa horizontal, ampliada com lanczos
 *   - hero-mobile.mp4   vertical no tamanho nativo, sem ampliar
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
const ORIGEM = path.join(RAIZ, "midia", "videos", "hero-original.mp4");
const VIDEOS = path.join(RAIZ, "public", "videos");
const FOTOS = path.join(RAIZ, "src", "assets", "fotos");

/** Os dois blocos de texto no meio do quadro, num corte só. */
const CORTE = { de: 32.5, ate: 41.05 };
/** Duração do original. */
const FIM = 47.1;
/** Dissolve da emenda, em segundos. */
const EMENDA = 0.5;

/* Altura do recorte vertical: a faixa de legenda começa em 88,6% de
   942, ou seja y=835. Em 820 ela fica fora com folga. */
const ALTURA_VERTICAL = 820;

/* Faixa horizontal: y=150, altura 460. Comparei três enquadramentos ao
   longo do vídeo inteiro. Mais alto e as tomadas de dentro ficam com
   teto vazio; mais baixo e a aérea de abertura perde o vale. Em
   150/460 entram o telhado, a piscina e o vale na mesma linha, e a
   faixa é alta o bastante para as cenas de chão não ficarem espremidas. */
const FAIXA_Y = 150;
const FAIXA_H = 460;

/* A original é 30 quadros; 24 corta um quinto dos bytes sem que
   ninguém perceba. Compressão firme: comparando recorte a 100% de um
   quadro com folhagem, crf 33/35 é indistinguível de crf 30, e o véu
   por cima esconde o pouco que sobra. */
const FPS = 24;

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
    /* Recorta a faixa e amplia 1,34x com lanczos: o navegador tem menos
       ampliação para fazer, e o unsharp devolve o microcontraste que a
       ampliação come. Não vale subir mais: num vídeo de 38s isso quase
       dobra o arquivo e o ganho desaparece atrás do véu. */
    filtro: filtro(
      `crop=718:${FAIXA_H}:0:${FAIXA_Y},fps=${FPS},scale=960:616:flags=lanczos,unsharp=5:5:0.5:5:5:0,setsar=1,format=yuv420p`,
    ),
    crf: 33,
  },
  {
    nome: "hero-mobile.mp4",
    /* Vertical no tamanho nativo: em tela de celular o vídeo é
       reduzido, não ampliado, então é o recorte mais nítido do site. */
    filtro: filtro(
      `crop=718:${ALTURA_VERTICAL}:0:0,fps=${FPS},setsar=1,format=yuv420p`,
    ),
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
    "-vf", `crop=718:${ALTURA_VERTICAL}:0:0`,
    "-frames:v", "1",
    bruto, "-y",
  ],
  { stdio: "inherit" },
);
if (p.status !== 0) process.exit(p.status ?? 1);

const poster = path.join(FOTOS, "hero-aereo.jpg");
const { size } = await sharp(bruto)
  .resize(1077, 1230, { kernel: "lanczos3" })
  .sharpen({ sigma: 0.7, m1: 0.4, m2: 0.6 })
  .jpeg({ quality: 72, mozjpeg: true })
  .toFile(poster);
await rm(bruto, { force: true });
console.log(`hero-aereo.jpg  ${(size / 1024).toFixed(0)}KB (pôster da dobra)`);
