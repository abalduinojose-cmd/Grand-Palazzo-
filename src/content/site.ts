import { z } from "zod";

/*
  Dados globais e toda a copy visível do site, validados no import: se
  algum texto fugir do schema, o build quebra antes de ir ao ar.

  O que ainda não foi confirmado pelo cliente fica null e a UI esconde
  o bloco (ver CONTEUDO-PENDENTE.md). Nada aqui é suposição: preço,
  capacidade, nota e avaliação só entram com fonte real.
*/

/**
 * URL canônica, usada em metadataBase, sitemap, robots e JSON-LD.
 * TODO confirmar o domínio definitivo com o cliente.
 */
/* Domínio definitivo (ainda a confirmar, ver CONTEUDO-PENDENTE.md). A
   prévia do GitHub Pages injeta a própria URL por env, então canonical,
   sitemap e cartão de compartilhamento ficam certos nos dois lugares. */
const DOMINIO = "https://grandpalazzo.com.br";
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? DOMINIO;

export const siteSchema = z.object({
  nome: z.string().min(1),
  tagline: z.string().min(1),
  localizacao: z.string().min(1),
  /** Tempo de carro confirmado pelo próprio cliente em vídeo. */
  distancias: z.object({ doCentroDeAreal: z.string().min(1) }),
  instagram: z.object({
    url: z.url(),
    handle: z.string().startsWith("@"),
  }),
  whatsapp: z.string().min(1),
  googleMapsUrl: z.url(),
  /** Link de reserva (Airbnb, Booking ou próprio); null = só WhatsApp. */
  reserva: z.url().nullable(),
  /** Nota agregada; null enquanto não houver perfil com avaliações. */
  avaliacao: z
    .object({ nota: z.number().min(0).max(5), total: z.number().int().positive() })
    .nullable(),
  manifesto: z.string().min(1),
  descricaoCurta: z.string().min(1).max(170),
});

export type Site = z.infer<typeof siteSchema>;

export const site: Site = siteSchema.parse({
  nome: "Grand Palazzo",
  tagline: "Bangalô privativo com piscina e hidro na represa de Areal",
  localizacao: "Represa de Areal, Rio de Janeiro",
  distancias: { doCentroDeAreal: "20 min do centro de Areal" },
  instagram: {
    url: "https://www.instagram.com/grandpalazzo_/",
    handle: "@grandpalazzo_",
  },
  whatsapp: "+55 24 99222-5855",
  // Busca pelo nome: sem coordenadas confirmadas, não fabricamos um pino.
  googleMapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Grand+Palazzo+Areal+RJ",
  reserva: null,
  avaliacao: null,
  manifesto:
    "O Grand Palazzo não é só uma hospedagem. É um bangalô inteiro para duas pessoas, com piscina do lado de fora e hidromassagem do lado de dentro, no alto de um terreno que desce até a água. Feito para quem quer se desconectar do mundo lá fora e se reconectar com o que realmente importa.",
  descricaoCurta:
    "Bangalô privativo com piscina, hidromassagem e lareira às margens da represa de Areal, no Rio de Janeiro.",
});

/* ------------------------------------------------------------------ */
/* Copy da home                                                        */
/* ------------------------------------------------------------------ */

/** Título com trecho de ênfase renderizado em Prata itálico sintético. */
const tituloComEnfaseSchema = z.object({
  antes: z.string(),
  enfase: z.string().min(1),
  depois: z.string(),
});

export const homeSchema = z.object({
  nav: z.object({
    ariaLabel: z.string().min(1),
    ancoras: z
      .array(
        z.object({ href: z.string().startsWith("#"), rotulo: z.string().min(1) }),
      )
      .min(3),
    menu: z.object({ abrir: z.string().min(1), fechar: z.string().min(1) }),
  }),
  hero: z.object({
    titulo: tituloComEnfaseSchema,
    /* Os três argumentos da dobra, em itens curtos. Era uma frase
       corrida que repetia "na represa de Areal", que a etiqueta logo
       acima já diz. */
    argumentos: z.array(z.string().min(1).max(24)).min(2).max(6),
    cta: z.string().min(1),
    ctaSecundario: z.string().min(1),
  }),
  faixa: z
    .array(
      z.object({
        destaque: z.string().min(1),
        resto: z.string().min(1),
        /* Pictograma do item. São desenhos autorais (Pictograma.tsx),
           feitos para estes quatro fatos e para mais nada. Emoji foi
           testado aqui e saiu: além de entregar o site como template,
           o desenho muda de máquina para máquina, e o 🛖 da bio do
           cliente nem existe na fonte do Windows 10. */
        pictograma: z.enum(["estrada", "piscina", "hidro", "bangalo"]),
      }),
    )
    .length(4),
  manifesto: z.object({
    eyebrow: z.string().min(1),
    destaques: z.array(z.string().min(1)).min(1),
    assinatura: z.string().min(1),
  }),
  bangalo: z.object({
    eyebrow: z.string().min(1),
    titulo: tituloComEnfaseSchema,
    texto: z.string().min(1),
    reservar: z.string().min(1),
  }),
  porDentro: z.object({
    eyebrow: z.string().min(1),
    titulo: tituloComEnfaseSchema,
  }),
  momentos: z.object({
    eyebrow: z.string().min(1),
    titulo: tituloComEnfaseSchema,
    texto: z.string().min(1),
    anterior: z.string().min(1),
    proxima: z.string().min(1),
  }),
  reels: z.object({
    eyebrow: z.string().min(1),
    titulo: tituloComEnfaseSchema,
    texto: z.string().min(1),
    reproduzir: z.string().min(1),
    pausar: z.string().min(1),
    somAtivar: z.string().min(1),
    somDesativar: z.string().min(1),
    /** Prefixo do marcador do trilho: vira "Ir para o video 2". */
    irPara: z.string().min(1),
    videos: z
      .array(
        z.object({
          src: z.string().startsWith("/videos/"),
          poster: z.string().startsWith("/videos/"),
          /* Legenda curta sob o cartão, 2 ou 3 palavras. */
          titulo: z.string().min(1).max(24),
          /* Descrição para leitor de tela, mais longa que o título. */
          rotulo: z.string().min(1),
        }),
      )
      .length(3),
  }),
  localizacao: z.object({
    eyebrow: z.string().min(1),
    titulo: tituloComEnfaseSchema,
    texto: z.string().min(1),
    mapaLink: z.string().min(1),
    porPerto: z.object({
      titulo: z.string().min(1),
      itens: z.array(z.string().min(1)).min(3).max(5),
    }),
  }),
  faqSecao: z.object({ eyebrow: z.string().min(1), titulo: z.string().min(1) }),
  ctaFinal: z.object({
    eyebrow: z.string().min(1),
    titulo: tituloComEnfaseSchema,
    texto: z.string().min(1),
    linhaNoite: z.string().min(1),
    whatsappRotulo: z.string().min(1),
    instagramRotulo: z.string().min(1),
  }),
  rodape: z.object({
    redesAria: z.object({
      instagram: z.string().min(1),
      whatsapp: z.string().min(1),
    }),
    direitos: z.string().min(1),
  }),
  whatsapp: z.object({
    mensagem: z.string().min(1),
    ariaLabel: z.string().min(1),
  }),
});

export type Home = z.infer<typeof homeSchema>;

export const home: Home = homeSchema.parse({
  nav: {
    ariaLabel: "Navegação principal",
    ancoras: [
      { href: "#bangalo", rotulo: "O bangalô" },
      { href: "#por-dentro", rotulo: "Por dentro" },
      { href: "#momentos", rotulo: "Momentos" },
      { href: "#como-chegar", rotulo: "Como chegar" },
      { href: "#perguntas", rotulo: "Perguntas" },
    ],
    menu: { abrir: "Abrir menu", fechar: "Fechar menu" },
  },
  hero: {
    titulo: {
      antes: "Um bangalô inteiro",
      enfase: "para vocês dois",
      depois: "",
    },
    argumentos: [
      "Bangalô inteiro",
      "Piscina privativa",
      "Hidromassagem",
      "Lareira acesa",
      "20 min de Areal",
    ],
    cta: "Reservar pelo WhatsApp",
    ctaSecundario: "Ver o bangalô",
  },
  faixa: [
    { destaque: "Só de vocês", resto: "o bangalô inteiro, sem dividir", pictograma: "bangalo" },
    { destaque: "Piscina", resto: "privativa, de frente para a mata", pictograma: "piscina" },
    { destaque: "Hidro", resto: "para o fim da tarde", pictograma: "hidro" },
    { destaque: "20 min", resto: "do centro de Areal", pictograma: "estrada" },
  ],
  manifesto: {
    eyebrow: "O refúgio",
    destaques: [
      "um bangalô inteiro para duas pessoas",
      "se reconectar com o que realmente importa",
    ],
    assinatura: "Represa de Areal · Rio de Janeiro",
  },
  bangalo: {
    eyebrow: "O bangalô",
    titulo: { antes: "Tudo aqui é", enfase: "privativo", depois: "" },
    texto:
      "A piscina, o deck, o jardim e a hidromassagem não são divididos com ninguém. Vocês chegam, fecham o portão e o lugar é de vocês até a hora de ir.",
    reservar: "Falar no WhatsApp",
  },
  porDentro: {
    eyebrow: "Por dentro",
    titulo: { antes: "Os cantos", enfase: "da casa", depois: "" },
  },
  momentos: {
    eyebrow: "Momentos",
    titulo: { antes: "Quem vem,", enfase: "desacelera", depois: "" },
    texto:
      "Cenas registradas aqui no bangalô, do café no jardim ao deck aceso no fim da noite.",
    anterior: "Foto anterior",
    proxima: "Próxima foto",
  },
  reels: {
    eyebrow: "No Instagram",
    titulo: { antes: "O lugar", enfase: "em movimento", depois: "" },
    texto:
      "Gravados aqui no bangalô, do alto e de dentro. Toque para assistir com som.",
    reproduzir: "Reproduzir o vídeo",
    pausar: "Pausar o vídeo",
    somAtivar: "Ativar o som do vídeo",
    somDesativar: "Silenciar o vídeo",
    irPara: "Ir para o vídeo",
    videos: [
      {
        src: "/videos/reel-tour.mp4",
        poster: "/videos/reel-tour.jpg",
        titulo: "O tour completo",
        rotulo: "Tour completo pelo bangalô, do jardim à suíte",
      },
      {
        src: "/videos/reel-noite.mp4",
        poster: "/videos/reel-noite.jpg",
        titulo: "Deck ao anoitecer",
        rotulo: "O deck e a fogueira acesos ao anoitecer",
      },
      {
        src: "/videos/reel-como-chegar.mp4",
        poster: "/videos/reel-como-chegar.jpg",
        titulo: "A chegada, do alto",
        rotulo: "Vista aérea do bangalô e do caminho até ele",
      },
    ],
  },
  localizacao: {
    eyebrow: "Como chegar",
    titulo: { antes: "Perto o bastante,", enfase: "longe do barulho", depois: "" },
    texto:
      "O bangalô fica em terreno próprio às margens da represa, a 20 minutos do centro de Areal. O endereço completo vai por mensagem depois da reserva.",
    mapaLink: "Abrir no Google Maps",
    porPerto: {
      titulo: "Por perto",
      itens: [
        "A represa de Areal, logo abaixo do terreno",
        "Restaurantes e mercado no centro de Areal",
        "Acesso pela BR-040, entre Petrópolis e Três Rios",
      ],
    },
  },
  faqSecao: { eyebrow: "Perguntas", titulo: "Antes de reservar" },
  ctaFinal: {
    eyebrow: "Reserve",
    titulo: { antes: "Garanta", enfase: "sua experiência", depois: "" },
    texto:
      "As datas saem rápido nos fins de semana e feriados. Mande uma mensagem com o período que vocês querem e a gente confirma a disponibilidade.",
    linhaNoite: "Quando escurece, as luzes do deck acendem e o silêncio assume.",
    whatsappRotulo: "Falar no WhatsApp",
    instagramRotulo: "Ver no Instagram",
  },
  rodape: {
    redesAria: {
      instagram: "Instagram do Grand Palazzo",
      whatsapp: "Conversar no WhatsApp",
    },
    direitos: "Todos os direitos reservados",
  },
  whatsapp: {
    mensagem:
      "Olá! Vi o site do Grand Palazzo e quero saber sobre disponibilidade.",
    ariaLabel: "Conversar no WhatsApp",
  },
});
