/**
 * Catálogo único de fotos do site.
 *
 * Imports estáticos = width/height e blur automáticos pelo next/image
 * (CLS zero). O alt descreve o ambiente, nunca "foto do bangalô". Para
 * trocar uma foto, rode `node scripts/fotos.mjs` de novo mantendo o
 * mesmo nome de cena.
 *
 * Origem: posts do @grandpalazzo_ e do hóspede @kasanntoss.
 */
import type { StaticImageData } from "next/image";

import aereaDoBangalo from "./aerea-do-bangalo.jpg";
import arvoreIluminada from "./arvore-iluminada.jpg";
import bicaDeBambu from "./bica-de-bambu.jpg";
import cafeComemorativo from "./cafe-comemorativo.jpg";
import cafeNoJardim from "./cafe-no-jardim.jpg";
import camaRomantica from "./cama-romantica.jpg";
import daybedJardim from "./daybed-jardim.jpg";
import deckANoite from "./deck-a-noite.jpg";
import deckSuspenso from "./deck-suspenso.jpg";
import deckVistaCasal from "./deck-vista-casal.jpg";
import escadaANoite from "./escada-a-noite.jpg";
import escadaDePedra from "./escada-de-pedra.jpg";
import fachadaDeDia from "./fachada-de-dia.jpg";
import fachadaEspreguicadeira from "./fachada-espreguicadeira.jpg";
import fachadaFrontal from "./fachada-frontal.jpg";
import heroAereo from "./hero-aereo.jpg";
import jardimANoite from "./jardim-a-noite.jpg";
import mesaAoAnoitecer from "./mesa-ao-anoitecer.jpg";
import piscinaComCactos from "./piscina-com-cactos.jpg";
import hidroComFrios from "./hidro-com-frios.jpg";
import lareiraComVinho from "./lareira-com-vinho.jpg";
import piscinaBambuzal from "./piscina-bambuzal.jpg";
import piscinaComVista from "./piscina-com-vista.jpg";
import piscinaDeDia from "./piscina-de-dia.jpg";
import salaComLareira from "./sala-com-lareira.jpg";

export type Foto = {
  src: StaticImageData;
  alt: string;
};

export const fotos = {
  fachadaEspreguicadeira: {
    src: fachadaEspreguicadeira,
    alt: "Fachada do bangalô de telha e madeira com espreguiçadeira e ombrelone sobre o gramado, entre árvores altas",
  },
  fachadaFrontal: {
    src: fachadaFrontal,
    alt: "Frente do bangalô com portas de vidro e cortinas claras abertas para o jardim gramado",
  },
  piscinaComVista: {
    src: piscinaComVista,
    alt: "Piscina de borda azulejada no deck elevado, com ombrelone e a marrom fechada ao fundo",
  },
  piscinaDeDia: {
    src: piscinaDeDia,
    alt: "Piscina retangular em dia de sol com o bangalô de telha logo atrás",
  },
  piscinaBambuzal: {
    src: piscinaBambuzal,
    alt: "Piscina de pastilha verde cercada de pedras brancas, com bambuzal alto ao fundo",
  },
  hidroComFrios: {
    src: hidroComFrios,
    alt: "Hidromassagem redonda de madeira com água iluminada em azul, ao lado de tábua de frios e vinho sobre a bancada",
  },
  lareiraComVinho: {
    src: lareiraComVinho,
    alt: "Lareira de ferro acesa na sala, com bandeja de vinho, queijos e uvas na mesa de centro",
  },
  salaComLareira: {
    src: salaComLareira,
    alt: "Sala do bangalô com lareira acesa, televisão na parede e adega de madeira ao lado",
  },
  camaRomantica: {
    src: camaRomantica,
    alt: "Cama de casal com colcha branca, almofadas vermelhas e decoração romântica com coração iluminado",
  },
  cafeNoJardim: {
    src: cafeNoJardim,
    alt: "Mesa de café da manhã posta no gramado, com pães e frutas, tendo a piscina e o bangalô ao fundo",
  },
  cafeComemorativo: {
    src: cafeComemorativo,
    alt: "Mesa de comemoração montada junto à parede de tijolo, com bolo, doces e balões em tom rosé",
  },
  deckVistaCasal: {
    src: deckVistaCasal,
    alt: "Deck de madeira com guarda-corpo de frente para o vale verde e o braço da represa",
  },
  deckSuspenso: {
    src: deckSuspenso,
    alt: "Deck suspenso entre cafe e árvores nativas, com ombrelone branco aberto",
  },
  deckANoite: {
    src: deckANoite,
    alt: "Deck iluminado por lâmpadas penduradas à noite, com a marrom escura em volta",
  },
  daybedJardim: {
    src: daybedJardim,
    alt: "Daybed redondo de fibra com almofadas claras sob a copa das árvores, no jardim do bangalô",
  },
  escadaDePedra: {
    src: escadaDePedra,
    alt: "Escada de pedra com corrimão subindo pelo jardim até o bangalô, cercada de grama e muro verde",
  },
  aereaDoBangalo: {
    src: aereaDoBangalo,
    alt: "Vista de cima do bangalô: telhados de telha vermelha, gramado com tronco escultórico, piscina de pastilha verde, deck com espreguiçadeiras e a escada de pedra descendo pelo terreno",
  },
  fachadaDeDia: {
    src: fachadaDeDia,
    alt: "Fachada do bangalô em dia de sol, com portas de vidro e cortinas claras abrindo para o gramado e a borda da piscina",
  },
  piscinaComCactos: {
    src: piscinaComCactos,
    alt: "Piscina de pastilha verde entre cactos e mata, com a represa de Areal logo atrás",
  },
  mesaAoAnoitecer: {
    src: mesaAoAnoitecer,
    alt: "Mesa de madeira posta com taças e vinho ao entardecer, com o bangalô e a piscina ao fundo",
  },
  escadaANoite: {
    src: escadaANoite,
    alt: "Escada de pedra iluminada subindo até o bangalô à noite, com as luzes quentes do beiral acesas",
  },
  arvoreIluminada: {
    src: arvoreIluminada,
    alt: "Árvore iluminada por baixo no gramado à noite, diante do muro de tijolo e do céu azul-escuro",
  },
  jardimANoite: {
    src: jardimANoite,
    alt: "Jardim à noite com a árvore iluminada, o deck de madeira aceso por velas e o ombrelone aberto ao lado da piscina",
  },
  heroAereo: {
    src: heroAereo,
    alt: "Vista aérea do bangalô: telhado de telha vermelha entre ipês roxos, gramado, piscina e a represa de Areal ao fundo",
  },
  bicaDeBambu: {
    src: bicaDeBambu,
    alt: "Bica de bronze em formato de bambu enchendo um copo de cristal sobre tronco de madeira, em meio à vegetação",
  },
} satisfies Record<string, Foto>;

/** Pôster da dobra: primeiro quadro do vídeo de fundo, para a troca
    entre imagem e vídeo ser imperceptível (ver scripts/videos.mjs). */
export const heroFoto: Foto = fotos.heroAereo;

/**
 * Sequência da galeria, em ordem de narrativa: a água, os cantos de
 * dentro, a mesa, o jardim e por fim a noite. A ordem importa porque o
 * trilho é arrastável e as três primeiras são as que quase todo mundo
 * vê.
 *
 * Ficam de fora daqui, de propósito, as fotos que já aparecem grandes
 * em outra seção: a fachada com espreguiçadeira (carta do bangalô), a
 * lareira com vinho (ambiente "Lareira acesa") e o jardim à noite (a
 * placa do anoitecer, antes do CTA). Repetir a mesma imagem duas vezes
 * na mesma página enfraquece as duas.
 */
export const galeria: Foto[] = [
  fotos.bicaDeBambu,
  fotos.fachadaDeDia,
  fotos.piscinaComCactos,
  fotos.piscinaComVista,
  fotos.hidroComFrios,
  fotos.salaComLareira,
  fotos.camaRomantica,
  fotos.cafeNoJardim,
  fotos.deckSuspenso,
  fotos.escadaDePedra,
  fotos.daybedJardim,
  fotos.mesaAoAnoitecer,
  fotos.escadaANoite,
  fotos.arvoreIluminada,
];
