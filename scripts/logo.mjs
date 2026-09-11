/**
 * Prepara o logo oficial do Grand Palazzo em três versões:
 *
 *   src/assets/logo/palazzo.png        colorido, fundo transparente
 *   src/assets/logo/palazzo-simbolo.png  só o frontão (ícone)
 *   public/logo/palazzo-mask.png       máscara alpha p/ pintar em 1 cor
 *
 * O original já vem com transparência, mas carrega lixo de cor nos
 * pixels invisíveis (alpha 1 a 8). Redimensionar assim puxaria esse
 * lixo para as bordas e criaria franja amarela, então o RGB é limpo
 * antes de qualquer resize: onde é invisível, recebe a cor da tinta.
 *
 *   node scripts/logo.mjs
 */
import { mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const RAIZ = path.resolve(import.meta.dirname, "..");
const ORIGEM = path.join(RAIZ, "arte", "logo-original.png");
const COLORIDO = path.join(RAIZ, "src", "assets", "logo");
const MASCARA = path.join(RAIZ, "public", "logo");

const LARGURA_MAX = 900;
/** Abaixo disso o pixel é invisível e o RGB dele é só sujeira. */
const LIMITE_ALFA = 12;
/** Marrom principal da marca: cor de reposição das bordas limpas. */
const TINTA = [80, 69, 47];

const { data, info } = await sharp(ORIGEM)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

const limpo = Buffer.from(data);
let invisiveis = 0;
for (let i = 0; i < limpo.length; i += 4) {
  if (limpo[i + 3] >= LIMITE_ALFA) continue;
  invisiveis++;
  limpo[i] = TINTA[0];
  limpo[i + 1] = TINTA[1];
  limpo[i + 2] = TINTA[2];
  limpo[i + 3] = 0;
}
console.log(`${invisiveis} pixels invisíveis tiveram o RGB limpo`);

const bruto = { raw: { width: info.width, height: info.height, channels: 4 } };

/** Recorte opcional antes do trim, para extrair o símbolo. */
async function salvar(pasta, nome, recorte) {
  await mkdir(pasta, { recursive: true });
  // extract e trim precisam de passos separados: na mesma pipeline o
  // sharp soma os dois recortes e estoura a area ("bad extract area").
  let base = await sharp(limpo, bruto).png().toBuffer();
  if (recorte) base = await sharp(base).extract(recorte).png().toBuffer();
  const aparado = await sharp(base).trim({ threshold: 1 }).png().toBuffer();
  const arquivo = path.join(pasta, nome);
  await sharp(aparado)
    .resize({ width: LARGURA_MAX, withoutEnlargement: true })
    .png({ compressionLevel: 9 })
    .toFile(arquivo);
  const m = await sharp(arquivo).metadata();
  console.log(`${nome}  ${m.width}x${m.height}`);
}

await salvar(COLORIDO, "palazzo.png", null);

// o frontão ocupa o terço superior da arte
await salvar(COLORIDO, "palazzo-simbolo.png", {
  left: 0,
  top: 0,
  width: info.width,
  height: Math.round(info.height * 0.36),
});

/** Máscara: branco sólido recebendo só o alpha da arte. */
const alfa = Buffer.alloc(info.width * info.height * 4);
for (let i = 0; i < alfa.length; i += 4) {
  alfa[i] = 255;
  alfa[i + 1] = 255;
  alfa[i + 2] = 255;
  alfa[i + 3] = data[i + 3] < LIMITE_ALFA ? 0 : data[i + 3];
}
await mkdir(MASCARA, { recursive: true });
const mascaraAparada = await sharp(alfa, bruto).trim({ threshold: 1 }).png().toBuffer();
await sharp(mascaraAparada)
  .resize({ width: LARGURA_MAX, withoutEnlargement: true })
  .png({ compressionLevel: 9, palette: true })
  .toFile(path.join(MASCARA, "palazzo-mask.png"));
const mm = await sharp(path.join(MASCARA, "palazzo-mask.png")).metadata();
console.log(`palazzo-mask.png  ${mm.width}x${mm.height}`);
console.log("concluído");
