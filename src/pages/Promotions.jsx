import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Tag, Calendar, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/lib/LanguageContext';
import { useSEO } from '@/lib/useSEO';

export default function Promotions() {
  const { t } = useLanguage();
  const p = t.promotions;

  useSEO({
    title: 'Promociones - Ofertas Especiales de Limpieza | Limpiezas LD',
    description: 'Aprovecha nuestras ofertas especiales en servicios de limpieza. Gestión de apartamentos vacacionales y limpieza semanal a precios exclusivos. ☎ +34 643 53 34 53',
    canonical: 'https://www.limpiezas-ld.com/Promotions',
    ogImage: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=1200&q=80',
  });

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="py-20 lg:py-28 bg-gradient-to-b from-accent to-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm font-semibold text-primary mb-4">
              <Sparkles className="w-4 h-4" />
              {p.tag}
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold tracking-tight">{p.title}</h1>
            <p className="mt-4 text-lg text-muted-foreground">{p.subtitle}</p>
          </motion.div>
        </div>
      </section>

      {/* Promo Cards */}
      <section className="py-16 lg:py-24">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">

            {/* Promo 1 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
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
                <h2 className="text-xl font-bold mb-3">{p.promo1Title}</h2>
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

            {/* Promo 2 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
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
                <h2 className="text-xl font-bold mb-3">{p.promo2Title}</h2>
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
    </div>
  );
}