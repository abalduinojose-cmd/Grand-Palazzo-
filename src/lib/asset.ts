/**
 * Prefixa o basePath em caminhos escritos à mão para /public.
 *
 * next/image e next/link resolvem o basePath sozinhos, mas src de
 * <video>, poster e url() de mask-image não: sem isso a prévia em
 * subpasta (GitHub Pages) procura /videos na raiz do domínio e falha.
 */
const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function asset(caminho: string): string {
  return `${BASE}${caminho}`;
}
