import type { Metadata } from "next";
import { Check, ChevronLeft, ChevronRight, Heart } from "lucide-react";

import TextLogo from "@/assets/icons/TextLogo";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  ctaLabel,
  faqItems,
  finalCtaCopy,
  heroCopy,
  includedItems,
  problemBullets,
  testimonialCopy,
} from "@/app/landing/oracion/content";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Oración | Sui",
  description:
    "Landing de restauración de vida de oración en 5 días para volver a sentirte cerca de Dios.",
};

const ctaClassName =
  "h-auto rounded-2xl bg-[#585ca6] px-8 py-4 text-sm font-semibold text-white shadow-[0_16px_30px_-18px_rgba(88,92,166,0.8)] transition hover:bg-[#4f5398]";

const sectionWidth = "mx-auto w-full max-w-5xl px-5 sm:px-6";
const brandLavender = "bg-[#e9e8fb]";
const brandInk = "text-[#1b1d33]";
const mutedInk = "text-[#35385f]";
const brandStroke = "border-[#585ca6]/18";

function HeroArtwork() {
  return (
    <div
      aria-hidden="true"
      className="relative mx-auto aspect-[16/11] w-full max-w-[260px] overflow-hidden rounded-[2px] bg-[linear-gradient(135deg,#d7d4f6_0%,#f1efff_22%,#b3b7eb_54%,#5a78c3_100%)] shadow-[0_24px_50px_-32px_rgba(54,57,114,0.75)] sm:max-w-[420px]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_22%,rgba(255,255,255,0.78),transparent_24%),radial-gradient(circle_at_84%_16%,rgba(255,255,255,0.34),transparent_30%),radial-gradient(circle_at_56%_58%,rgba(89,92,166,0.18),transparent_42%),linear-gradient(180deg,rgba(255,255,255,0.2),rgba(255,255,255,0))]" />
      <div className="absolute -left-10 bottom-0 h-[78%] w-[36%] rounded-t-full bg-[linear-gradient(180deg,rgba(120,127,197,0.7),rgba(82,89,165,0.95))] blur-[2px]" />
      <div className="absolute -right-10 bottom-0 h-[74%] w-[34%] rounded-t-full bg-[linear-gradient(180deg,rgba(112,149,209,0.62),rgba(72,110,183,0.9))] blur-[2px]" />
      <div className="absolute left-1/2 bottom-[-7%] h-[83%] w-[30%] -translate-x-1/2 rounded-t-[45%] bg-[linear-gradient(180deg,#f5e2d1_0%,#e6cab7_40%,#d7beaf_100%)]" />
      <div className="absolute left-[49%] top-[19%] h-[21%] w-[17%] -translate-x-1/2 rounded-full bg-[linear-gradient(180deg,#f6e4d7_0%,#e5c7b6_100%)]" />
      <div className="absolute left-[54%] top-[8%] h-[27%] w-[28%] -translate-x-1/2 rounded-[48%] bg-[linear-gradient(180deg,#4a4f96_0%,#6f67ac_28%,#9076b5_68%,rgba(144,118,181,0.14)_100%)] opacity-95" />
      <div className="absolute left-[50%] bottom-[10%] h-[52%] w-[36%] -translate-x-1/2 rounded-[48%] bg-[linear-gradient(180deg,rgba(255,248,241,0.92),rgba(235,221,213,0.98))]" />
      <div className="absolute left-[47%] bottom-[18%] h-[24%] w-[10%] -translate-x-1/2 rotate-[24deg] rounded-full bg-[linear-gradient(180deg,#e2c3af,#d7b8a2)] opacity-75" />
      <div className="absolute right-[19%] bottom-[17%] h-[28%] w-[11%] rotate-[-18deg] rounded-full bg-[linear-gradient(180deg,#e6c7b2,#d8b7a0)] opacity-70" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0)_65%,rgba(88,92,166,0.14)_100%)]" />
    </div>
  );
}

function IncludedArtwork({ variant }: { variant: (typeof includedItems)[number]["variant"] }) {
  if (variant === "guide") {
    return (
      <div
        aria-hidden="true"
        className="relative aspect-[5/6] overflow-hidden rounded-sm bg-[linear-gradient(135deg,#d3cabd_0%,#f7f2e7_52%,#b29e8a_100%)]"
      >
        <div className="absolute inset-y-[8%] left-[8%] w-[46%] rounded-[1.5rem] bg-[linear-gradient(180deg,#1d2534,#2e3b56)] shadow-[10px_18px_30px_-20px_rgba(0,0,0,0.85)]" />
        <div className="absolute inset-y-[13%] left-[15%] w-[33%] rounded-[0.8rem] bg-[linear-gradient(180deg,#f8fafc,#e2e8f0)]" />
        <div className="absolute left-[19%] top-[20%] h-[3px] w-[20%] rounded-full bg-[#98a2b3]" />
        <div className="absolute left-[19%] top-[28%] h-[40%] w-[24%] rounded-md border border-[#c8d0da]" />
        <div className="absolute left-[57%] top-[24%] h-[48%] w-[24%] rounded-md bg-white/60 shadow-[0_12px_24px_-18px_rgba(0,0,0,0.35)]" />
      </div>
    );
  }

  if (variant === "journal") {
    return (
      <div
        aria-hidden="true"
        className="relative aspect-[5/6] overflow-hidden rounded-sm bg-[linear-gradient(135deg,#c69b6c_0%,#efd4a9_22%,#f3e6cf_56%,#b78052_100%)]"
      >
        <div className="absolute left-[16%] top-[16%] h-[64%] w-[58%] rotate-[-4deg] rounded-sm bg-[linear-gradient(180deg,#faf7f2,#f3ece0)] shadow-[0_18px_28px_-22px_rgba(0,0,0,0.9)]" />
        <div className="absolute left-[22%] top-[24%] h-[2px] w-[42%] bg-[#b9c3d3]" />
        <div className="absolute left-[22%] top-[33%] h-[2px] w-[40%] bg-[#b9c3d3]" />
        <div className="absolute left-[22%] top-[42%] h-[2px] w-[39%] bg-[#b9c3d3]" />
        <div className="absolute left-[21%] top-[18%] h-[62%] w-[3px] bg-[#d88f8f]" />
        <div className="absolute right-[16%] top-[24%] h-[10%] w-[42%] rotate-[25deg] rounded-full bg-[linear-gradient(180deg,#305d98,#17335a)]" />
        <div className="absolute right-[35%] top-[29%] h-[33%] w-[8%] rotate-[25deg] rounded-full bg-[linear-gradient(180deg,#dab08d,#b47d54)]" />
      </div>
    );
  }

  return (
    <div
      aria-hidden="true"
      className="relative aspect-[5/6] overflow-hidden rounded-sm bg-[linear-gradient(180deg,#c2874c_0%,#f5dcb8_22%,#b38b5d_54%,#563f30_100%)]"
    >
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.2),rgba(0,0,0,0.12))]" />
      <div className="absolute right-[9%] top-[10%] h-[34%] w-[30%] rounded-sm bg-[linear-gradient(180deg,#f8e5af,#d39d5f)] shadow-[0_16px_24px_-18px_rgba(0,0,0,0.85)]" />
      <div className="absolute left-[18%] bottom-[12%] h-[55%] w-[48%] rounded-t-[48%] bg-[linear-gradient(180deg,#82604e,#5b4031)]" />
      <div className="absolute left-[29%] bottom-[46%] h-[16%] w-[20%] rounded-full bg-[linear-gradient(180deg,#e5c3a1,#d4ab88)]" />
      <div className="absolute left-[12%] bottom-[3%] h-[18%] w-[78%] rounded-full bg-[radial-gradient(circle,rgba(0,0,0,0.22),transparent_70%)]" />
    </div>
  );
}

export default function OracionLandingPage() {
  return (
    <main className={cn("min-h-screen bg-white", brandInk)}>
      <div className="border-b border-[#585ca6]/10 bg-white/95 backdrop-blur-sm">
        <div className={cn(sectionWidth, "flex min-h-16 items-center justify-center")}>
          <TextLogo className="h-8 w-auto sm:h-9" />
        </div>
      </div>

      <section className={cn(brandLavender, "bg-[linear-gradient(180deg,#ecebff_0%,#dfdef7_100%)] py-14 sm:py-16")}>
        <div className={cn(sectionWidth, "text-center")}>
          <header className="mx-auto max-w-3xl">
            <h1 className="text-4xl font-bold tracking-[-0.03em] sm:text-5xl">
              {heroCopy.title}
            </h1>
            <p className={cn("mx-auto mt-5 max-w-3xl text-lg leading-8 sm:text-[1.65rem] sm:leading-[2.2rem]", mutedInk)}>
              {heroCopy.description}
            </p>
          </header>

          <div className="mt-8 sm:mt-10">
            <HeroArtwork />
          </div>

          <p className={cn("mx-auto mt-6 max-w-2xl text-sm leading-6 sm:text-base", mutedInk)}>
            {heroCopy.caption}
          </p>

          <Button type="button" className={cn(ctaClassName, "mt-8 min-w-[196px]")}>
            {ctaLabel}
          </Button>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className={cn(sectionWidth, "relative")}>
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold sm:text-[2.2rem]">
              {testimonialCopy.title}
            </h2>
            <p className={cn("mt-3 text-lg italic", mutedInk)}>{testimonialCopy.subtitle}</p>
          </div>

          <div
            aria-hidden="true"
            className="absolute left-0 top-[58%] hidden size-14 -translate-y-1/2 items-center justify-center rounded-full border border-[#585ca6]/30 bg-[#f7f6ff] text-[#585ca6] lg:flex"
          >
            <ChevronLeft className="size-7" />
          </div>
          <div
            aria-hidden="true"
            className="absolute right-0 top-[58%] hidden size-14 -translate-y-1/2 items-center justify-center rounded-full border border-[#585ca6]/30 bg-[#f7f6ff] text-[#585ca6] lg:flex"
          >
            <ChevronRight className="size-7" />
          </div>

          <Card className="mx-auto mt-8 max-w-4xl border border-[#585ca6]/10 bg-[linear-gradient(180deg,#fbfbff_0%,#f2f1ff_100%)] shadow-[0_18px_40px_-34px_rgba(88,92,166,0.35)]">
            <CardContent className="p-6 sm:p-8">
              <p className="text-left text-[1rem] leading-7 text-[#22254b]">
                {testimonialCopy.paragraphs[0]}
              </p>
              <p className="mt-6 text-left text-[1rem] leading-7 text-[#22254b]">
                {testimonialCopy.paragraphs[1]}
              </p>
              <p className="mt-6 text-left text-[1rem] leading-7 text-[#22254b]">
                {testimonialCopy.paragraphs[2]}
              </p>
              <p className="mt-6 text-left text-[1rem] leading-7 text-[#22254b]">
                {testimonialCopy.paragraphs[3]}{" "}
                <span aria-hidden="true">😊</span>
              </p>
              <div className="mt-4 text-left text-[#de4770]">
                <Heart aria-hidden="true" className="size-4 fill-current" />
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="bg-white py-8 sm:py-10">
        <div className={cn(sectionWidth, "max-w-4xl")}>
          <h2 className="text-center text-3xl font-bold tracking-[-0.03em] sm:text-[2.3rem]">
            Sabes que deberías orar pero no lo estas haciendo
          </h2>

          <ul className="mt-10 space-y-7">
            {problemBullets.map((bullet) => (
              <li key={bullet.lead} className="flex items-start gap-4">
                <Check
                  aria-hidden="true"
                  className="mt-1 size-5 shrink-0 text-[#585ca6]"
                  strokeWidth={2.25}
                />
                <p className="text-lg leading-8 text-[#23264a]">
                  <strong>{bullet.lead}</strong> {bullet.body}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-[linear-gradient(180deg,#ffffff_0%,#fbfaff_100%)] py-18 sm:py-20">
        <div className={sectionWidth}>
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold tracking-[-0.03em] sm:text-[2.35rem]">
              Por fin siente la presencia de Dios en tu vida diaria.
            </h2>
            <p className="mt-5 text-lg font-semibold text-[#585ca6]">El curso incluye:</p>
          </div>

          <div className="mt-10 grid gap-10 md:grid-cols-3 md:gap-7">
            {includedItems.map((item) => (
              <Card
                key={item.title}
                className={cn("border bg-white/70 shadow-[0_22px_44px_-36px_rgba(88,92,166,0.35)] backdrop-blur-sm", brandStroke)}
              >
                <CardContent className="px-2 pb-5 pt-2">
                  <IncludedArtwork variant={item.variant} />
                  <div className="mx-auto mt-6 max-w-xs text-center">
                    <h3 className="text-xl font-bold uppercase leading-7 text-[#242751]">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-lg leading-7 text-[#3b3e67]">
                      {item.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Button type="button" className={cn(ctaClassName, "min-w-[215px]")}>
              {ctaLabel}
            </Button>
          </div>
        </div>
      </section>

      <section className="bg-white py-12 sm:py-16">
        <div className={cn(sectionWidth, "max-w-4xl")}>
          <h2 className="text-center text-3xl font-bold tracking-[-0.03em] sm:text-[2.15rem]">
            Preguntas frecuentes:
          </h2>
          <Separator className="mx-auto mt-5 max-w-md bg-[#585ca6]/20" />

          <Accordion type="single" collapsible className="mt-10 w-full">
            {faqItems.map((item, index) => (
              <AccordionItem
                key={item.question}
                value={`item-${index + 1}`}
                className="border-b border-[#585ca6]/12 py-3"
              >
                <AccordionTrigger className="py-4 text-left text-lg font-bold leading-7 text-[#1f2250] hover:no-underline">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="pb-4 text-lg leading-7 text-[#41456d]">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section className="bg-[linear-gradient(180deg,#e5e4fb_0%,#d7d7f5_100%)] py-20 sm:py-24">
        <div className={cn(sectionWidth, "max-w-5xl text-center")}>
          <h2 className="mx-auto max-w-4xl text-3xl font-bold tracking-[-0.03em] sm:text-[2.35rem]">
            {finalCtaCopy.title}
          </h2>

          <div className="mx-auto mt-10 max-w-4xl space-y-6 text-lg leading-8 text-[#35385f]">
            {finalCtaCopy.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <Button type="button" className={cn(ctaClassName, "mt-10 min-w-[156px] px-6 py-3.5 leading-5")}>
            Quiero estar cerca de
            <br />
            Dios
          </Button>
        </div>
      </section>
    </main>
  );
}
