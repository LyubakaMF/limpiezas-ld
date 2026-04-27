import React from 'react';
import { useLanguage } from '@/lib/LanguageContext';

export default function PrivacyPolicy() {
  const { t } = useLanguage();
  const p = t.privacyPage;

  return (
    <div className="pt-20 min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold mb-2">{p.title}</h1>
        <p className="text-muted-foreground mb-10">{p.updated}</p>

        <div className="space-y-8 text-foreground">

          <section>
            <h2 className="text-2xl font-semibold mb-3">{p.s1Title}</h2>
            <p className="text-muted-foreground leading-relaxed">{p.s1}</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">{p.s2Title}</h2>
            <p className="text-muted-foreground leading-relaxed mb-2">{p.s2Intro}</p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-1">
              {p.s2Items.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">{p.s3Title}</h2>
            <p className="text-muted-foreground leading-relaxed mb-2">{p.s3Intro}</p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-1">
              {p.s3Items.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">{p.s4Title}</h2>
            <p className="text-muted-foreground leading-relaxed">{p.s4}</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">{p.s5Title}</h2>
            <p className="text-muted-foreground leading-relaxed">{p.s5}</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">{p.s6Title}</h2>
            <p className="text-muted-foreground leading-relaxed">{p.s6}</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">{p.s7Title}</h2>
            <p className="text-muted-foreground leading-relaxed">{p.s7}</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">{p.s8Title}</h2>
            <p className="text-muted-foreground leading-relaxed mb-2">{p.s8Intro}</p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-1">
              {p.s8Items.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-3">{p.s8Contact}</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">{p.s9Title}</h2>
            <p className="text-muted-foreground leading-relaxed">{p.s9}</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">{p.s10Title}</h2>
            <p className="text-muted-foreground leading-relaxed">{p.s10}</p>
          </section>

          <section className="border-t pt-6">
            <p className="text-sm text-muted-foreground">
              © 2026 Limpiezas LD · Región de Murcia, España · <a href="mailto:limpiezasld@gmail.com" className="text-primary hover:underline">limpiezasld@gmail.com</a> · +34 643 53 34 53
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}