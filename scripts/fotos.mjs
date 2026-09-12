/**
 * Pipeline de fotos: midia/fotos (originais do cliente) -> src/assets/fotos.
 *
 * Curadoria semântica: cada foto escolhida ganha nome de cena, e o alt
 * mora no catálogo (src/assets/fotos/index.ts). Imports estáticos dão
 * width/height e blur automáticos ao next/image, então o CLS fica zero.
 *
 * Idempotente: só reprocessa se o original (ou este script) for mais
 * novo que o destino.
 *
 *   node scripts/fotos.mjs
 */
import { mkdir, stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const RAIZ = path.resolve(import.meta.dirname, "..");
const ORIGEM = path.join(RAIZ, "midia", "fotos");
const DESTINO = path.join(RAIZ, "src", "assets", "fotos");

/** Lado maior em 2200px: sobra resolução para hero sem passar do teto. */
const LADO_MAX = 2200;

/* Teto de peso por foto. Quem passa cai de qualidade até caber: numa
   foto de folhagem cheia de detalhe fino, 84 pode dar 1MB, e 1MB de
   uma imagem só derruba o carregamento no celular. A escada desce em
   passos pequenos para a perda não aparecer. */
const QUALIDADES = [84, 79, 74, 68];
const TETO_KB = 620;

/* Todas as fotos vieram de post do Instagram, ou seja: já foram
   recomprimidas uma vez e chegaram moles. Depois de reduzir, uma
   máscara de nitidez devolve o microcontraste que o caminho comeu.
   m1 baixo e m2 alto de propósito: afia borda e deixa em paz as áreas
   lisas (céu, parede, água), que é onde halo e grão apareceriam. */
const NITIDEZ = { sigma: 0.8, m1: 0.35, m2: 0.9 };

const GP = (id, sufixo) => `grandpalazzo__${id}_${sufixo}_79031671140.jpg`;
const KS = (sufixo) => `kasanntoss_1776728283_${sufixo}_590395947.jpg`;

/** origem (relativa a midia/fotos) -> destino (relativo a src/assets/fotos) */
const CURADORIA = {
  [GP("1767641944", "3803578771585528627")]: "deck-vista-casal.jpg",
  [GP("1768737000", "3812764983038460014")]: "cafe-no-jardim.jpg",
  [GP("1770464400", "3827255734384360431")]: "bica-de-bambu.jpg",
  [GP("1775682302", "3871026239785046547")]: "daybed-jardim.jpg",
  [GP("1776974402", "3881865364460461014")]: "escada-de-pedra.jpg",
  [GP("1777755604", "3888418456841404847")]: "deck-suspenso.jpg",
  [GP("1778536202", "3894966741366395414")]: "piscina-com-vista.jpg",
  [GP("1780685494", "3912995462468628978")]: "cama-romantica.jpg",
  [GP("1780685494", "3912995473952736578")]: "lareira-com-vinho.jpg",
  [GP("1780862404", "3914479994048017101")]: "hidro-com-frios.jpg",
  [GP("1780955402", "3915260331900459497")]: "sala-com-lareira.jpg",
  [GP("1784929804", "3948529713884444831")]: "piscina-de-dia.jpg",
  [KS("3879800502301578470")]: "cafe-comemorativo.jpg",
  [KS("3879800502310007652")]: "fachada-espreguicadeira.jpg",
  [KS("3879800502351913801")]: "piscina-bambuzal.jpg",
  [KS("3879800502351936818")]: "fachada-frontal.jpg",
  [KS("3879800502410648409")]: "deck-a-noite.jpg",
};

/**
 * Tratamento foto a foto, só onde há motivo medido.
 *
 * `recorte` é em fração do original (0 a 1), e serve para tirar do
 * quadro o que atrapalha a venda: braço de hóspede, embalagem de
 * mercado com rótulo à vista, sobra de chão sem informação. Recortar é
 * honesto; o que a foto mostra continua sendo o que existe no lugar.
 *
 * `luz` passa direto para o sharp: `clareia` soma em L* (lift
 * perceptual de exposição) e `contraste` é o par [ganho, deslocamento]
 * do linear(). Os números vêm da medição de luminância média e desvio
 * do conjunto inteiro, não de olhômetro.
 */
const TRATAMENTO = {
  /* A bica de bambu ficou SEM recorte: eu tinha cortado o braço e o
     relógio do hóspede, mas o cliente reenviou a foto no quadro
     inteiro pedindo destaque para ela. A mão enchendo o copo é o
     assunto da imagem, não um estorvo. */
  "cafe-comemorativo.jpg": {
    recorte: { esquerda: 0, topo: 0, largura: 0.62, altura: 0.82 },
    porque: "embalagem de mercado com rótulo legível no canto inferior",
  },
  "fachada-frontal.jpg": {
    recorte: { esquerda: 0, topo: 0, largura: 1, altura: 0.79 },
    porque: "quase um quarto do quadro era grama sintética vazia",
  },
  "deck-a-noite.jpg": {
    luz: { clareia: 11, contraste: [1.06, 0] },
    porque: "luminância média 44, contra 85 da segunda mais escura",
  },
  "piscina-de-dia.jpg": {
    luz: { contraste: [1.12, -10] },
    porque: "desvio 46: a foto mais chapada do conjunto",
  },
  "hidro-com-frios.jpg": {
    luz: { clareia: 4 },
    porque: "luz roxa da hidro derruba a leitura da tábua de frios",
  },
};

const mtime = async (arquivo) => {
  try {
    return (await stat(arquivo)).mtimeMs;
  } catch {
    return null;
  }
};

/* O script entra na conta da idempotência: mudou o tratamento, tudo
   reprocessa, sem precisar apagar a pasta na mão. */
const mScript = await mtime(path.join(RAIZ, "scripts", "fotos.mjs"));

let feitas = 0;
let puladas = 0;
let semOrigem = 0;
for (const [de, para] of Object.entries(CURADORIA)) {
  const origem = path.join(ORIGEM, de);
  const destino = path.join(DESTINO, para);
  const [mOrigem, mDestino] = [await mtime(origem), await mtime(destino)];
  if (mOrigem === null) {
    console.warn(`sem original: ${de}`);
    semOrigem++;
    continue;
  }
  await mkdir(path.dirname(destino), { recursive: true });
  if (mDestino !== null && Math.max(mOrigem, mScript ?? 0) <= mDestino) {
    puladas++;
    continue;
  }

  const { recorte, luz, porque } = TRATAMENTO[para] ?? {};

  // rotate() sem argumento assa a orientação EXIF no pixel (fotos de celular).
  let img = sharp(origem).rotate();

  if (recorte) {
    /* extract precisa de pixel, e a rotação EXIF pode ter trocado
       largura por altura: o tamanho real só se conhece depois dela,
       então o recorte sai de um buffer já rotacionado. */
    const buf = await img.toBuffer();
    const { width, height } = await sharp(buf).metadata();
    img = sharp(buf).extract({
      left: Math.round(width * recorte.esquerda),
      top: Math.round(height * recorte.topo),
      width: Math.round(width * recorte.largura),
      height: Math.round(height * recorte.altura),
    });
  }

  img = img.resize({
    width: LADO_MAX,
    height: LADO_MAX,
    fit: "inside",
    withoutEnlargement: true,
  });

  if (luz?.clareia) img = img.modulate({ lightness: luz.clareia });
  if (luz?.contraste) img = img.linear(luz.contraste[0], luz.contraste[1]);

  const afiada = img.sharpen(NITIDEZ);
  let size = 0;
  let usada = QUALIDADES[0];
  for (const q of QUALIDADES) {
    ({ size } = await afiada
      .clone()
      .jpeg({ quality: q, mozjpeg: true })
      .toFile(destino));
    usada = q;
    if (size / 1024 <= TETO_KB) break;
  }

  console.log(
    `${para.padEnd(30)} ${(size / 1024).toFixed(0).padStart(4)}KB q${usada}` +
      (porque ? `  (${porque})` : ""),
  );
  feitas++;
}
console.log(`\n${feitas} processadas, ${puladas} em dia, ${semOrigem} sem original.`);
