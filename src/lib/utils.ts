/** Junta classes ignorando valores falsy. */
export function cx(
  ...classes: Array<string | false | null | undefined>
): string {
  return classes.filter(Boolean).join(" ");
}

/**
 * Link wa.me a partir de um número em qualquer formato, com a mensagem
 * já preenchida. É o canal de reserva do Grand Palazzo enquanto não
 * houver link de plataforma (ver CONTEUDO-PENDENTE.md).
 */
export function whatsappUrl(numero: string, mensagem: string): string {
  const digitos = numero.replace(/\D/g, "");
  return `https://wa.me/${digitos}?text=${encodeURIComponent(mensagem)}`;
}
