/**
 * Vídeo de fundo da dobra, nas duas orientações.
 *
 * O material do cliente é reel de Instagram: 720x1280, com a legenda
 * queimada na imagem a partir de 76% da altura. Tudo aqui parte disso.
 *
 * Escolha editorial: o fundo da dobra usa SÓ a órbita aérea dos
 * primeiros 2,7 segundos (telhados, ipê roxo e a represa ao fundo).
 * Depois desse ponto o reel corta para o chão e vira tour, que é ótimo
 * na seção do Instagram e ruim como fundo, porque o corte seco aparece
 * atrás do texto.
 *
 * Como o trecho é curto, o loop é espelhado (vai e volta): a órbita
 * entra, sai e emenda nela mesma sem nenhum corte visível. Numa
 * panorâmica lenta de drone a inversão é imperceptível.
 *
 * Duas saídas, porque uma só não serve:
 *   - hero-desktop.mp4  faixa horizontal, ampliada com lanczos
 *   - hero-mobile.mp4   vertical no tamanho nativo, sem ampliar
 *
 * A faixa horizontal sai de y=300: acima disso o quadro é só vale e
 * céu, abaixo é só grama. Em 300 entram os telhados, a piscina e a
 * represa na mesma linha. Medido quadro a quadro, não estimado.
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

/* Folhagem em movimento é o pior caso do h264: em crf 21 a faixa
   horizontal dava 6,3 Mbps, absurdo para fundo de dobra. Em 24 quadros
   (órbita lenta de drone não precisa de 30) e crf 26 fica perto de
   1,2 Mbps, na mesma faixa do que já usamos em projeto irmão. E o véu
   por cima do vídeo esconde o pouco de ruído que a compressão deixa. */

/** Fim da órbita aérea: em 2,72s o reel corta para a câmera no chão. */
const FIM = 2.72;
/** Topo da faixa horizontal, em pixels do quadro de 1280 de altura. */
const FAIXA_Y = 300;

/* Espelha o trecho: [a] segue, [b] volta, e os dois emendam. O quadro
   de virada aparece duas vezes, o que ninguém percebe e evita o tranco
   de um corte. */
const ESPELHO = "split[a][b];[b]reverse[r];[a][r]concat=n=2:v=1:a=0";

const SAIDAS = [
  {
    nome: "hero-desktop.mp4",
    /* Recorta a faixa e amplia 1,78x com lanczos. O navegador ainda
       amplia o resto até a largura da tela, mas partindo de 1280 o
       resultado é bem melhor do que deixar ele ampliar desde 720. O
       unsharp devolve o microcontraste que a ampliação come. */
    filtro: `crop=720:405:0:${FAIXA_Y},fps=24,scale=1280:720:flags=lanczos,unsharp=5:5:0.55:5:5:0,setsar=1,${ESPELHO}`,
    crf: 28,
  },
  {
    nome: "hero-mobile.mp4",
    /* Vertical fica no tamanho nativo: em tela de celular o vídeo é
       reduzido, não ampliado, então é o recorte mais nítido do site.
       928 de altura é 72,5% do quadro, o que deixa a legenda fora. */
    filtro: `crop=720:928:0:0,fps=24,setsar=1,${ESPELHO}`,
    crf: 28,
  },
];

const existe = async (p) => {
  try {
    return (await stat(p)).mtimeMs;
  } catch {
    return null;
  }
};

await mkdir(VIDEOS, { recursive: true });
const mOrigem = await existe(ORIGEM);
if (mOrigem === null) {
  console.error(`sem original: ${path.relative(RAIZ, ORIGEM)}`);
  process.exit(1);
}

for (const { nome, filtro, crf } of SAIDAS) {
  const destino = path.join(VIDEOS, nome);
  const mDestino = await existe(destino);
  if (mDestino !== null && mOrigem <= mDestino) {
    console.log(`${nome}  em dia`);
    continue;
  }

  const r = spawnSync(
    ffmpeg,
    [
      "-hide_banner",
      "-loglevel", "error",
      "-ss", "0",
      "-t", String(FIM),
      "-i", ORIGEM,
      "-filter_complex", filtro,
      "-an", // fundo de dobra é mudo, sempre
      "-c:v", "libx264",
      "-profile:v", "high",
      "-pix_fmt", "yuv420p",
      "-crf", String(crf),
      "-preset", "slow",
      "-movflags", "+faststart",
      destino,
      "-y",
    ],
    { stdio: "inherit" },
  );
  if (r.status !== 0) process.exit(r.status ?? 1);

  const { size } = await stat(destino);
  console.log(`${nome}  ${(size / 1024).toFixed(0)}KB`);
}

/* Pôster: o primeiro quadro do vertical, ampliado 1,5x. Ele é a
   primeira pintura da dobra, então entra como import estático (o
   next/image tira dele o blur e as dimensões, e o CLS fica zero).
   Uma imagem só para as duas orientações: no desktop o object-cover
   recorta justamente a faixa do vídeo horizontal. */
const posterBruto = path.join(tmpdir(), "grand-palazzo-hero-quadro.png");
const r = spawnSync(
  ffmpeg,
  [
    "-hide_banner", "-loglevel", "error",
    "-ss", "0", "-i", ORIGEM,
    "-vf", "crop=720:928:0:0",
    "-frames:v", "1",
    posterBruto, "-y",
  ],
  { stdio: "inherit" },
);
if (r.status !== 0) process.exit(r.status ?? 1);

const poster = path.join(FOTOS, "hero-aereo.jpg");
const { size } = await sharp(posterBruto)
  .resize(1080, 1392, { kernel: "lanczos3" })
  .sharpen({ sigma: 0.7, m1: 0.4, m2: 0.6 })
  .jpeg({ quality: 72, mozjpeg: true })
  .toFile(poster);
await rm(posterBruto, { force: true });
console.log(`hero-aereo.jpg  ${(size / 1024).toFixed(0)}KB (pôster da dobra)`);
