import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Leaf, Shield, Users, Heart, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/LanguageContext';

const valueIcons = [Leaf, Shield, Users, Heart];

export default function About() {
  const { t } = useLanguage();
  const a = t.aboutPage;

  return (
    <div className="pt-20">
      <section className="py-20 lg:py-28 bg-gradient-to-b from-accent to-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-3xl">
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">{a.tag}</p>
            <h1 className="text-4xl lg:text-6xl font-bold tracking-tight">{a.title}</h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">{a.subtitle}</p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <div className="rounded-3xl overflow-hidden aspect-[4/3]">
              <img src="https://images.unsplash.com/photo-1607748851687-ba9a10438621?w=800&q=80" alt="Our team" className="w-full h-full object-cover" />
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">{a.storyTitle}</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              {a.story.map((p, i) => <p key={i}>{p}</p>)}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-muted/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold">{a.valuesTitle}</h2>
            <p className="mt-3 text-muted-foreground text-lg">{a.valuesSubtitle}</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {a.values.map((value, i) => {
              const Icon = valueIcons[i];
              return (
                <motion.div key={value.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.5 }} className="text-center p-6">
                  <div className="w-14 h-14 mx-auto rounded-2xl bg-accent flex items-center justify-center mb-4">
                    <Icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-accent">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">{a.ctaTitle}</h2>
          <p className="text-muted-foreground text-lg mb-8">{a.ctaSubtitle}</p>
          <Link to="/Booking">
            <Button size="lg" className="rounded-full px-8 h-14 text-base gap-2">
              {a.ctaBtn} <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}