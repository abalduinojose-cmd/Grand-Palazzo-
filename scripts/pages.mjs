/**
 * Gera a prévia pública em docs/ (GitHub Pages).
 *
 * O Pages só serve da raiz do repositório ou de /docs, nunca de out/.
 * Este script:
 *   1. roda o build com PAGES=1 (o env vai daqui, sem cross-env);
 *   2. acha o export (com distDir custom o Next escreve dentro dele);
 *   3. troca docs/ pelo conteúdo novo;
 *   4. cria .nojekyll (sem ele o Jekyll ignora _next/ e o site sobe cru).
 *
 *   npm run build:pages
 */
import { spawnSync } from "node:child_process";
import { cp, rm, readdir, writeFile, access } from "node:fs/promises";
import path from "node:path";

const RAIZ = path.resolve(import.meta.dirname, "..");
const DOCS = path.join(RAIZ, "docs");

const build = spawnSync("npx", ["next", "build"], {
  cwd: RAIZ,
  stdio: "inherit",
  shell: true,
  env: { ...process.env, PAGES: "1" },
});
if (build.status !== 0) process.exit(build.status ?? 1);

const existe = async (p) => {
  try {
    await access(p);
    return true;
  } catch {
    return false;
  }
};

/* Next 16 com distDir custom pode escrever em .next-pages/ ou em out/. */
const candidatos = [
  path.join(RAIZ, "out"),
  path.join(RAIZ, ".next-pages", "out"),
  path.join(RAIZ, ".next-pages"),
];
let origem = null;
for (const candidato of candidatos) {
  if (await existe(path.join(candidato, "index.html"))) {
    origem = candidato;
    break;
  }
}
if (!origem) {
  console.error(
    "export não encontrado (index.html). Rode PAGES=1 next build antes.",
  );
  process.exit(1);
}

await rm(DOCS, { recursive: true, force: true });
await cp(origem, DOCS, { recursive: true });
await writeFile(path.join(DOCS, ".nojekyll"), "");

const itens = await readdir(DOCS);
console.log(`docs/ gerado de ${path.relative(RAIZ, origem)} (${itens.length} itens)`);
