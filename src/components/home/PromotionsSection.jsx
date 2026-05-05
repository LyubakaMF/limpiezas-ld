import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Tag, Calendar, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/lib/LanguageContext';

export default function PromotionsSection() {
  const { t } = useLanguage();
  const p = t.promotions;

  return (
    <section className="py-20 lg:py-28 relative overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://media.base44.com/images/public/69b9d864ebb8dd58db0fa41f/341c8c53a_generated_image.png"
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover"
          loading="lazy"
          decoding="async"
          width="1200"
          height="800"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background/85 to-background/95" />
      </div>
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm font-semibold text-primary mb-4">
            <Sparkles className="w-4 h-4" />
            {p.tag}
          </div>
          <h2 className="text-3xl lg:text-5xl font-bold tracking-tight">{p.title}</h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">{p.subtitle}</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Promo 1 - Management */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative bg-card rounded-3xl border-2 border-primary/30 shadow-xl overflow-hidden"
          >
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary via-primary/70 to-primary/40" />
            <div className="p-8">
              <div className="flex items-start justify-between mb-6">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                <Tag className="w-7 h-7 text-primary" />
              </div>
              <div className="text-right">
                <div className="text-3xl font-extrabold text-primary">{p.from} 29€</div>
              </div>
              </div>

              <h3 className="text-xl font-bold mb-3">{p.promo1Title}</h3>
              <p className="text-muted-foreground leading-relaxed mb-6">{p.promo1Desc}</p>

              <div className="flex items-center gap-2 p-3 bg-amber-50 border border-amber-200 rounded-xl mb-6">
                <Calendar className="w-4 h-4 text-amber-600 shrink-0" />
                <span className="text-sm font-semibold text-amber-700">{p.validUntil}: 01.06.2026</span>
              </div>

              <Link to="/Booking">
                <Button className="w-full rounded-xl gap-2">
                  {p.bookNow} <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Promo 2 - Weekly */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative bg-card rounded-3xl border-2 border-primary/30 shadow-xl overflow-hidden"
          >
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary/40 via-primary/70 to-primary" />
            <div className="p-8">
              <div className="flex items-start justify-between mb-6">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <Sparkles className="w-7 h-7 text-primary" />
                </div>
                <div className="text-right">
                  <div className="text-3xl font-extrabold text-primary">29€</div>
                  <div className="text-sm text-muted-foreground font-medium">{p.perWeek}</div>
                </div>
              </div>

              <h3 className="text-xl font-bold mb-3">{p.promo2Title}</h3>
              <p className="text-muted-foreground leading-relaxed mb-6">{p.promo2Desc}</p>

              <div className="flex items-center gap-2 p-3 bg-amber-50 border border-amber-200 rounded-xl mb-6">
                <Calendar className="w-4 h-4 text-amber-600 shrink-0" />
                <span className="text-sm font-semibold text-amber-700">{p.validUntil}: 01.06.2026</span>
              </div>

              <Link to="/Booking">
                <Button className="w-full rounded-xl gap-2">
                  {p.bookNow} <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}