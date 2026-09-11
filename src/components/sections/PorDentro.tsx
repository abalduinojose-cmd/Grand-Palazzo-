import type { CSSProperties } from "react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Foto } from "@/components/ui/Foto";
import { Section } from "@/components/ui/Section";
import { ambientes } from "@/content/ambientes";
import { home } from "@/content/site";
import { cx } from "@/lib/utils";

/* Bento assimétrico: os dois argumentos mais fortes (piscina e hidro)
   abrem em uma linha alta; os quatro cantos restantes vêm embaixo em
   células menores, sem repetir a mesma altura. */
const CELULAS = [
  "lg:col-span-7 h-[26rem] sm:h-[32rem]",
  "lg:col-span-5 h-[26rem] sm:h-[32rem]",
  "lg:col-span-4 h-[20rem]",
  "lg:col-span-4 h-[20rem]",
  "lg:col-span-4 h-[20rem]",
  "lg:col-span-12 h-[22rem] sm:h-[26rem]",
] as const;

/**
 * Os cantos da casa em bento fotográfico: cada ambiente com a foto
 * real que o prova e o texto sobre véu na base.
 */
export function PorDentro() {
  const { eyebrow, titulo } = home.porDentro;

  return (
    <Section theme="offwhite" id="por-dentro" className="py-20 sm:py-28">
      <Container>
        <header className="max-w-xl">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="mt-3 font-display text-balance text-[clamp(2rem,4.5vw,3.6rem)] leading-[1.1]">
            {titulo.antes} <em className="not-italic text-cafe">{titulo.enfase}</em>
            {titulo.depois}
          </h2>
        </header>

        <div className="mt-12 grid gap-4 sm:mt-14 md:grid-cols-2 lg:grid-cols-12">
          {ambientes.map((ambiente, i) => (
            <figure
              key={ambiente.slug}
              style={{ "--reveal-atraso": `${i * 5}%` } as CSSProperties}
              className={cx(
                "group reveal relative overflow-hidden rounded-3xl",
                CELULAS[i],
              )}
            >
              <Foto
                foto={ambiente.foto}
                preencher
                zoom
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
              <div className="veu-cartao absolute inset-0" aria-hidden="true" />
              <figcaption className="absolute inset-x-0 bottom-0 p-6 sm:p-7">
                <h3 className="font-display text-entre text-creme [text-shadow:0_1px_16px_rgb(0_0_0/0.55)]">
                  {ambiente.nome}
                </h3>
                <p className="mt-1.5 max-w-md font-sans text-corpo text-creme/85 [text-shadow:0_1px_12px_rgb(0_0_0/0.55)]">
                  {ambiente.essencia}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </Section>
  );
}
