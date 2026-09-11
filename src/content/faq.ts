import { z } from "zod";

/*
  Perguntas frequentes.

  Regra da casa: o que não foi confirmado pelo cliente não vira
  afirmação. Onde falta dado (capacidade, pets, café da manhã), a
  resposta manda a pessoa perguntar no WhatsApp em vez de inventar
  política. Assim que os dados chegarem, estas respostas viram fato
  direto (ver CONTEUDO-PENDENTE.md).
*/

export const faqSchema = z.object({
  pergunta: z.string().min(1),
  resposta: z.string().min(1),
});

export type ItemFaq = z.infer<typeof faqSchema>;

export const faq: ItemFaq[] = z
  .array(faqSchema)
  .min(6)
  .max(8)
  .parse([
    {
      pergunta: "O bangalô é mesmo privativo?",
      resposta:
        "Sim. A piscina, a hidromassagem, o deck e o jardim são de uso exclusivo de quem está hospedado. Vocês não dividem nenhum desses espaços com outros hóspedes.",
    },
    {
      pergunta: "O que já está pronto quando chegamos?",
      resposta:
        "Piscina privativa, hidromassagem, lareira, suíte com cama de casal, deck sobre a mata e jardim com daybed. A decoração romântica e as mesas de comemoração aparecem nas fotos e podem ser combinadas antes da chegada.",
    },
    {
      pergunta: "Como faço a reserva?",
      resposta:
        "Pelo WhatsApp. Mande o período que vocês querem e a gente confirma se está livre, passa os valores e explica como garantir a data.",
    },
    {
      pergunta: "Onde fica exatamente?",
      resposta:
        "Em terreno próprio às margens da represa de Areal, no Rio de Janeiro, a cerca de 20 minutos do centro de Areal. O endereço completo e a rota são enviados por mensagem depois da reserva confirmada.",
    },
    {
      pergunta: "Quantas pessoas o bangalô acomoda?",
      resposta:
        "A hospedagem é pensada para casais. Se vocês pretendem vir em mais gente, confirme a capacidade pelo WhatsApp antes de fechar a data.",
    },
    {
      pergunta: "Posso levar meu pet?",
      resposta:
        "A política de pets é combinada caso a caso. Pergunte no WhatsApp antes de reservar, contando o porte do animal.",
    },
    {
      pergunta: "O café da manhã está incluso?",
      resposta:
        "As mesas de café que aparecem nas fotos são montadas no jardim. Confirme no WhatsApp o que está incluso na sua data e o que entra como extra.",
    },
  ]);
