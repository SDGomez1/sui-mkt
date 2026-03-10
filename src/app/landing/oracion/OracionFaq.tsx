"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import { trackFaqItemOpened } from "./OracionClientEvents";

interface FaqItem {
  question: string;
  answer: string;
}

interface OracionFaqProps {
  items: readonly FaqItem[];
  sectionWidth: string;
}

export function OracionFaq({ items, sectionWidth }: OracionFaqProps) {
  return (
    <section className="bg-white py-12 sm:py-16">
      <div className={`${sectionWidth} max-w-4xl`}>
        <h2 className="text-center text-3xl font-bold tracking-[-0.03em] sm:text-[2.15rem]">
          Preguntas frecuentes:
        </h2>
        <Separator className="mx-auto mt-5 max-w-md bg-[#585ca6]/20" />

        <Accordion
          type="single"
          collapsible
          className="mt-10 w-full"
          onValueChange={(value) => {
            if (value) {
              const item = items[parseInt(value.replace("item-", "")) - 1];
              if (item) {
                trackFaqItemOpened(item.question);
              }
            }
          }}
        >
          {items.map((item, index) => (
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
  );
}
