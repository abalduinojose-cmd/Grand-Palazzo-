/**
 * Gera o mapa estático da Localização: mosaico de tiles do OpenStreetMap
 * centrado nas coordenadas reais dos chalés, recortado para 1200x800.
 * O pino NÃO é assado aqui: a UI posiciona o marcador no centro exato.
 *
 * Requer atribuição visível "© OpenStreetMap" onde o mapa aparecer.
 *
 *   node scripts/mapa.mjs
 */
import { mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const RAIZ = path.resolve(import.meta.dirname, "..");
const SAIDA = path.join(RAIZ, "src", "assets", "mapa");

/* Centro geográfico dos três chalés (mesmos números de chales.ts). */
const LAT = -22.3958;
const LNG = -43.1662;
const ZOOM = 14;
const LARGURA = 1200;
const ALTURA = 800;
const TILE = 256;

const n = 2 ** ZOOM;
const xf = ((LNG + 180) / 360) * n;
const latRad = (LAT * Math.PI) / 180;
const yf = ((1 - Math.log(Math.tan(latRad) + 1 / Math.cos(latRad)) / Math.PI) / 2) * n;

/* Grade de tiles suficiente para o recorte centrado. */
const x0 = Math.floor(xf - LARGURA / 2 / TILE) - 1;
const y0 = Math.floor(yf - ALTURA / 2 / TILE) - 1;
const x1 = Math.floor(xf + LARGURA / 2 / TILE) + 1;
const y1 = Math.floor(yf + ALTURA / 2 / TILE) + 1;

const composicao = [];
for (let x = x0; x <= x1; x++) {
  for (let y = y0; y <= y1; y++) {
    const url = `https://tile.openstreetmap.org/${ZOOM}/${x}/${y}.png`;
    const resposta = await fetch(url, {
      headers: { "User-Agent": "ChalesDasPalmeirasSite/1.0 (geração única de mapa estático)" },
    });
    if (!resposta.ok) throw new Error(`tile ${x},${y}: ${resposta.status}`);
    composicao.push({
      input: Buffer.from(await resposta.arrayBuffer()),
      left: (x - x0) * TILE,
      top: (y - y0) * TILE,
    });
    await new Promise((r) => setTimeout(r, 120)); // gentileza com o servidor
  }
}

const larguraMosaico = (x1 - x0 + 1) * TILE;
const alturaMosaico = (y1 - y0 + 1) * TILE;
const px = Math.round((xf - x0) * TILE);
const py = Math.round((yf - y0) * TILE);

await mkdir(SAIDA, { recursive: true });
await sharp({
  create: { width: larguraMosaico, height: alturaMosaico, channels: 3, background: "#eaf5e5" },
})
  .composite(composicao)
  .extract({
    left: px - LARGURA / 2,
    top: py - ALTURA / 2,
    width: LARGURA,
    height: ALTURA,
  })
  .jpeg({ quality: 82, mozjpeg: true })
  .toFile(path.join(SAIDA, "itaipava.jpg"));

console.log(`mapa ${LARGURA}x${ALTURA} salvo (centro ${LAT}, ${LNG}, z${ZOOM})`);
