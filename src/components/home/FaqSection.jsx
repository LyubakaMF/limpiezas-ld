import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useLanguage } from '@/lib/LanguageContext';

export default function FaqSection() {
  const { t } = useLanguage();
  const faqItems = t.faqPage;

  return (
    <section className="py-24 lg:py-32 bg-accent">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold tracking-tight mb-4">{faqItems.title}</h2>
          <p className="text-lg text-muted-foreground">{faqItems.subtitle}</p>
        </div>

        <div>
          <Accordion type="single" collapsible className="w-full">
            {faqItems.items.map((item, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border-b last:border-0">
                <AccordionTrigger className="text-left py-4 hover:text-primary transition-colors">
                  <span className="text-lg font-semibold">{item.question}</span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-4">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}