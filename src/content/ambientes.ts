import { z } from "zod";
import { fotos, type Foto } from "@/assets/fotos";

/*
  Os ambientes do bangalô. Substitui o antigo arquivo de unidades: aqui
  existe um só imóvel, então o que a home apresenta são os cantos dele.

  Cada ambiente só entra na lista com foto real correspondente. Cozinha
  gourmet e banheiro de mármore aparecem nos vídeos mas ainda não têm
  foto em resolução de site (ver CONTEUDO-PENDENTE.md).
*/

export const ambienteSlugSchema = z.enum([
  "piscina",
  "hidro",
  "lareira",
  "suite",
  "deck",
  "cafe",
]);
export type AmbienteSlug = z.infer<typeof ambienteSlugSchema>;

const textoSchema = z.object({
  slug: ambienteSlugSchema,
  nome: z.string().min(1),
  /** Uma ou duas frases sensoriais, nunca lista de características. */
  essencia: z.string().min(1),
});

/** Foto de cada ambiente, do catálogo em src/assets/fotos.
 *
 *  Três subiram para o lote novo (12/09), que é material melhor: a
 *  piscina com os cactos tem quatro vezes a resolução da anterior e
 *  mostra a represa atrás; o jardim à noite pega o deck aceso, que é
 *  exatamente o que a frase do ambiente promete; e a mesa ao anoitecer
 *  vende o café muito melhor que a mesa de pão em dia claro. */
const FOTO: Record<AmbienteSlug, Foto> = {
  piscina: fotos.piscinaComCactos,
  hidro: fotos.hidroComFrios,
  lareira: fotos.lareiraComVinho,
  suite: fotos.camaRomantica,
  deck: fotos.jardimANoite,
  cafe: fotos.mesaAoAnoitecer,
};

export type Ambiente = z.infer<typeof textoSchema> & { foto: Foto };

export const ambientes: Ambiente[] = z
  .array(textoSchema)
  .length(6)
  .parse([
    {
      slug: "piscina",
      nome: "Piscina privativa",
      essencia:
        "De frente para a mata fechada, sem vizinho de borda. O dia começa quando vocês entram na água.",
    },
    {
      slug: "hidro",
      nome: "Hidromassagem",
      essencia:
        "Redonda, de madeira, com a água iluminada por dentro. Cabe uma tábua de frios na beirada.",
    },
    {
      slug: "lareira",
      nome: "Lareira acesa",
      essencia:
        "A lenha estala e a sala inteira muda de temperatura. O sofá vira o programa da noite.",
    },
    {
      slug: "suite",
      nome: "A suíte",
      essencia:
        "Cama de casal, roupa de cama branca e a porta de vidro abrindo direto para o gramado.",
    },
    {
      slug: "deck",
      nome: "Deck sobre a mata",
      essencia:
        "Suspenso entre as árvores, com guarda-corpo e ombrelone. À noite as luzes penduradas acendem.",
    },
    {
      slug: "cafe",
      nome: "Café no jardim",
      essencia:
        "Mesa posta na grama, com a piscina ao lado e o bangalô atrás. A manhã rende sem pressa.",
    },
  ])
  .map((texto) => ({ ...texto, foto: FOTO[texto.slug] }));
