import type { Metadata } from "next";

import TextLogo from "@/assets/icons/TextLogo";
import { cn } from "@/lib/utils";
import LinktreeClient from "./LinktreeClient";

export const metadata: Metadata = {
  title: "Linktree | Sui",
  description: "Accede a la guía gratuita, curso de oración y redes de Sui.",
};

const sectionWidth = "mx-auto w-full max-w-5xl px-5 sm:px-6";
const brandInk = "text-[#1b1d33]";
const mutedInk = "text-[#4d547c]";

export default function LinktreePage() {
  return (
    <main
      className={cn(
        "relative min-h-screen overflow-hidden bg-[linear-gradient(180deg,#f8f7ff_0%,#eef1ff_52%,#ffffff_100%)]",
        brandInk,
      )}
    >
      <div className="absolute inset-x-0 top-0 -z-0 h-[420px] bg-[radial-gradient(circle_at_top,#dcdffe_0%,rgba(220,223,254,0)_68%)]" />
      <div className="absolute left-[-5rem] top-20 -z-0 size-56 rounded-full bg-[#dfe2ff]/70 blur-3xl" />
      <div className="absolute bottom-10 right-[-4rem] -z-0 size-64 rounded-full bg-[#e8eafc] blur-3xl" />

      <section className="relative z-10 py-10 sm:py-14">
        <div className={cn(sectionWidth, "flex justify-center")}>
          <div className="w-full max-w-2xl text-center">
            <TextLogo className="h-9 w-auto sm:h-10 mx-auto" />

            <div className="mt-8"></div>

            <div className="mt-10">
              <LinktreeClient />
            </div>

            <p className="mx-auto mt-8 max-w-md text-sm font-medium text-[#60679d]">
              Elige el canal que mas te ayude hoy y sigue profundizando tu
              relacion con Dios.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
