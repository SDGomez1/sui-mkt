import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import TextLogo from "@/assets/icons/TextLogo";
import heroImage from "@/assets/landings/oracionForm/hero.png";
import oracionesImage from "@/assets/img/oraciones.jpeg";
import { cn } from "@/lib/utils";
import { OracionFormClient } from "./OracionFormClient";

export const metadata: Metadata = {
  title: "Oración Formulario | Sui",
  description:
    "Formulario de oración para recibir la guía práctica y fortalecer tu relación con Dios.",
};

const sectionWidth = "mx-auto w-full max-w-5xl px-5 sm:px-6";
const brandInk = "text-[#1b1d33]";
const mutedInk = "text-[#35385f]";

export default function OracionFormLandingPage() {
  return (
    <main className={cn("min-h-screen bg-white", brandInk)}>
      <div className="border-b border-[#585ca6]/10 bg-white/95 backdrop-blur-sm">
        <div
          className={cn(
            sectionWidth,
            "flex min-h-16 items-center justify-center",
          )}
        >
          <TextLogo className="h-8 w-auto sm:h-9" />
        </div>
      </div>

      <section className="bg-white pt-10 pb-4 sm:pt-12 sm:pb-6">
        <div className={cn(sectionWidth, "text-center")}>
          <header className="mx-auto max-w-3xl">
            <h1 className="text-4xl font-bold tracking-[-0.03em] sm:text-5xl">
              Construye una relación constante con Dios
            </h1>
            <p
              className={cn(
                "mx-auto mt-5 max-w-3xl text-lg leading-8 sm:text-[1.65rem] sm:leading-[2.2rem]",
                mutedInk,
              )}
            >
              Obtén GRATIS la guía práctica que te ayudará a crear un hábito de
              oración y volver a sentirte cerca de Dios.
            </p>
          </header>
          <div className="mt-6 flex justify-center">
            <div className="w-full max-w-2xl overflow-hidden rounded-2xl bg-[#f3f2ff]">
              <Image
                src={heroImage}
                alt="Guía de oración"
                className="h-auto w-full object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white ">
        <div className={cn(sectionWidth, "flex justify-center")}>
          <OracionFormClient />
        </div>
      </section>

      <section className="bg-[#f4f3f2] py-10 sm:py-12">
        <div className={cn(sectionWidth, "flex justify-center")}>
          <div className="flex w-full max-w-3xl flex-col items-center gap-6 text-center">
            <div className="w-full max-w-xl overflow-hidden rounded-2xl bg-white shadow-[0_20px_40px_-30px_rgba(30,30,45,0.35)]">
              <Image
                src={oracionesImage}
                alt="Guía de oración semanal"
                className="h-auto w-full object-contain"
              />
            </div>
            <p className="max-w-2xl text-lg leading-7 text-[#8a8a8a] sm:text-xl sm:leading-8">
              He compartido esta guía con más de 20 personas que estaban
              estancadas en su oración y dijeron “ha sido una herramienta de
              rescate”, “ha sido un bálsamo para mi corazón”, “he logrado
              conectar bastante”.
            </p>
          </div>
        </div>
      </section>

      <div className="bg-[#f4f3f2] py-8">
        <div className="mb-4 flex flex-wrap items-center justify-center gap-4 px-4 text-xs font-semibold text-[#585ca6]">
          <Link
            href="/politica_privacidad.pdf"
            className="transition hover:text-[#4f5398]"
          >
            Política de Privacidad
          </Link>
          <Link href="/TyC.pdf" className="transition hover:text-[#4f5398]">
            Términos y Condiciones
          </Link>
        </div>
        <div className="flex justify-center">
          <TextLogo className="h-8 w-auto opacity-80" />
        </div>
      </div>
    </main>
  );
}
