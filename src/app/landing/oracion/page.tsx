import type { Metadata } from "next";
import Image from "next/image";
import { Check } from "lucide-react";

import TextLogo from "@/assets/icons/TextLogo";
import carouselOne from "@/assets/landings/oracion/carousel/1.jpeg";
import carouselTwo from "@/assets/landings/oracion/carousel/2.jpeg";
import carouselThree from "@/assets/landings/oracion/carousel/3.jpeg";
import dinamicaImage from "@/assets/landings/oracion/dinamica.png";
import guiaImage from "@/assets/landings/oracion/guia.png";
import improvisadaImage from "@/assets/landings/oracion/improvisada.png";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
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
import { OracionLandingTracker } from "./OracionClientEvents";
import { OracionCtaButton } from "./OracionCtaButton";
import { OracionHeroVideo } from "./OracionHeroVideo";
import { OracionFaq } from "./OracionFaq";

export const metadata: Metadata = {
  title: "Oración | Sui",
  description:
    "Landing de restauración de vida de oración en 5 días para volver a sentirte cerca de Dios.",
};

const ctaClassName =
  "h-auto rounded-2xl bg-[#585ca6] px-8 py-4 text-sm font-semibold text-white shadow-[0_16px_30px_-18px_rgba(88,92,166,0.8)] transition hover:bg-[#4f5398]";

const ctaHref = "https://www.skool.com/conecta-con-dios-2729/about";
const sectionWidth = "mx-auto w-full max-w-5xl px-5 sm:px-6";
const brandLavender = "bg-[#e9e8fb]";
const brandInk = "text-[#1b1d33]";
const mutedInk = "text-[#35385f]";
const brandStroke = "border-[#585ca6]/18";
const carouselSlides = [
  {
    src: carouselOne,
    alt: "Testimonio de vida restaurada 1",
    title: "Dios restauró mi oración cuando más lo necesitaba",
  },
  {
    src: carouselTwo,
    alt: "Testimonio de vida restaurada 2",
    title: "Volví a conectar con paz y constancia diaria",
  },
  {
    src: carouselThree,
    alt: "Testimonio de vida restaurada 3",
    title: "Una guía práctica para orar sin miedo",
  },
] as const;
const includedImages = [guiaImage, dinamicaImage, improvisadaImage] as const;

export default function OracionLandingPage() {
  return (
    <main className={cn("min-h-screen bg-white", brandInk)}>
      <OracionLandingTracker />

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
            <OracionHeroVideo />
          </div>

          <p className={cn("mx-auto mt-6 max-w-2xl text-sm leading-6 sm:text-base", mutedInk)}>
            {heroCopy.caption}
          </p>

          <OracionCtaButton
            href={ctaHref}
            label={ctaLabel}
            className={cn(ctaClassName, "mt-8 min-w-[196px]")}
            location="hero"
          />
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

          <div className="mx-auto mt-8 max-w-4xl">
            <div className="space-y-6 sm:hidden">
              {carouselSlides.map((slide) => (
                <div
                  key={slide.alt}
                  className="rounded-2xl border border-[#585ca6]/12 bg-white/90 p-4 shadow-[0_18px_36px_-30px_rgba(88,92,166,0.35)]"
                >
                  <p className="text-center text-sm font-semibold text-[#3d4175]">
                    {slide.title}
                  </p>
                  <div className="mt-3 overflow-hidden rounded-xl border border-[#585ca6]/10 bg-[#f7f6ff] p-3">
                    <Image
                      src={slide.src}
                      alt={slide.alt}
                      className="h-[240px] w-full object-contain"
                    />
                  </div>
                </div>
              ))}
            </div>

            <Carousel className="hidden w-full sm:block">
              <CarouselContent className="-ml-4">
                {carouselSlides.map((slide) => (
                  <CarouselItem key={slide.alt} className="pl-4">
                    <div className="flex h-full flex-col gap-4">
                      <p className="text-center text-sm font-semibold text-[#3d4175]">
                        {slide.title}
                      </p>
                      <div className="flex-1 overflow-hidden rounded-2xl border border-[#585ca6]/15 bg-[#f7f6ff] p-3 shadow-[0_20px_40px_-34px_rgba(88,92,166,0.45)]">
                        <Image
                          src={slide.src}
                          alt={slide.alt}
                          className="h-[260px] w-full object-contain sm:h-[320px]"
                        />
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious
                className="left-0 top-1/2 hidden -translate-x-1/2 border-[#585ca6]/30 bg-white text-[#585ca6] shadow-[0_10px_20px_-12px_rgba(88,92,166,0.4)] lg:flex"
              />
              <CarouselNext
                className="right-0 top-1/2 hidden translate-x-1/2 border-[#585ca6]/30 bg-white text-[#585ca6] shadow-[0_10px_20px_-12px_rgba(88,92,166,0.4)] lg:flex"
              />
            </Carousel>
          </div>


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
            {includedItems.map((item, index) => (
              <Card
                key={item.title}
                className={cn("border bg-white/70 shadow-[0_22px_44px_-36px_rgba(88,92,166,0.35)] backdrop-blur-sm", brandStroke)}
              >
                <CardContent className="px-2 pb-5 pt-2">
                  <div className="overflow-hidden rounded-lg border border-[#585ca6]/10 bg-white">
                    <Image
                      src={includedImages[index]}
                      alt={item.imageAlt}
                      className="h-[210px] w-full object-cover"
                    />
                  </div>
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
            <OracionCtaButton
              href={ctaHref}
              label={ctaLabel}
              className={cn(ctaClassName, "min-w-[215px]")}
              location="included_items"
            />
          </div>
        </div>
      </section>

      <OracionFaq items={faqItems} sectionWidth={sectionWidth} />

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

          <OracionCtaButton
            href={ctaHref}
            label={ctaLabel}
            className={cn(ctaClassName, "mt-10 min-w-[156px] px-6 py-3.5 leading-5")}
            location="final_cta"
          >
            Quiero estar cerca de
            <br />
            Dios
          </OracionCtaButton>
        </div>
      </section>
    </main>
  );
}
