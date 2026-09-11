type JsonLdProps = { data: Record<string, unknown> };

/**
 * Script de dados estruturados. O replace de "<" evita que conteúdo
 * futuro consiga fechar a tag <script> dentro do JSON.
 */
export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
