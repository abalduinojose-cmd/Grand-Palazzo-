/**
 * Pipeline de fotos: midia/fotos (originais do cliente) -> src/assets/fotos.
 *
 * Curadoria semântica: cada foto escolhida ganha nome de cena, e o alt
 * mora no catálogo (src/assets/fotos/index.ts). Imports estáticos dão
 * width/height e blur automáticos ao next/image, então o CLS fica zero.
 *
 * Idempotente: só reprocessa se o original for mais novo que o destino.
 *
 *   node scripts/fotos.mjs
 */
import { mkdir, stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const RAIZ = path.resolve(import.meta.dirname, "..");
const ORIGEM = path.join(RAIZ, "midia", "fotos");
const DESTINO = path.join(RAIZ, "src", "assets", "fotos");

/** Lado maior em 2200px: sobra resolução para hero sem passar de ~500KB. */
const LADO_MAX = 2200;
const QUALIDADE = 80;

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

const mtime = async (arquivo) => {
  try {
    return (await stat(arquivo)).mtimeMs;
  } catch {
    return null;
  }
};

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
  if (mDestino !== null && mOrigem <= mDestino) {
    puladas++;
    continue;
  }
  // rotate() sem argumento assa a orientação EXIF no pixel (fotos de celular).
  const { size } = await sharp(origem)
    .rotate()
    .resize({
      width: LADO_MAX,
      height: LADO_MAX,
      fit: "inside",
      withoutEnlargement: true,
    })
    .jpeg({ quality: QUALIDADE, mozjpeg: true })
    .toFile(destino);
  console.log(`${para}  ${(size / 1024).toFixed(0)}KB`);
  feitas++;
}
console.log(`\n${feitas} processadas, ${puladas} em dia, ${semOrigem} sem original.`);
