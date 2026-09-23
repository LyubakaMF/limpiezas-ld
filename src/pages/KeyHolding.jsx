import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { KeyRound, Lock, Home, Key, Check, ArrowRight, Phone, Star, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/lib/LanguageContext';
import { useSEO } from '@/lib/useSEO';

const packageIcons = [Lock, Home, Key];

export default function KeyHolding() {
  const { t } = useLanguage();
  const kh = t.keyHoldingPage;

  useSEO({
    title: 'Key Holding en Águilas, Pulpí y San Juan de los Terreros | Limpiezas LD',
    description: 'Servicio de custodia de llaves y cuidado de propiedades en Águilas, Mazarrón, Pulpí y San Juan de los Terreros. Paquetes Basic, Home Watch y Rental Support. ☎ +34 643 53 34 53',
    canonical: 'https://www.limpiezas-ld.com/KeyHolding',
    ogImage: 'https://images.unsplash.com/photo-1564767609342-620cb19b2357?w=1200&q=80',
  });

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="py-16 lg:py-24 bg-gradient-to-b from-accent to-background">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm font-semibold text-primary mb-6">
              <KeyRound className="w-4 h-4" />
              {kh.tag}
            </div>
            <h1 className="text-3xl lg:text-5xl font-bold tracking-tight leading-tight">{kh.title}</h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">{kh.intro}</p>
          </motion.div>
        </div>
      </section>

      {/* Packages */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="text-2xl lg:text-3xl font-bold text-center mb-12">{kh.packagesTitle}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {kh.packages.map((pkg, i) => {
              const Icon = packageIcons[i] || KeyRound;
              const isPopular = i === 1;
              return (
                <motion.div
                  key={pkg.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className={`relative rounded-3xl border-2 overflow-hidden ${isPopular ? 'border-primary shadow-xl md:scale-105' : 'border-border shadow-md'}`}
                >
                  {isPopular && (
                    <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-4 py-1.5 rounded-bl-2xl text-xs font-bold flex items-center gap-1">
                      <Star className="w-3 h-3 fill-current" /> ★
                    </div>
                  )}
                  <div className="p-8">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 ${isPopular ? 'bg-primary/10' : 'bg-accent'}`}>
                      <Icon className={`w-7 h-7 ${isPopular ? 'text-primary' : 'text-accent-foreground'}`} />
                    </div>
                    <h3 className="text-lg font-bold mb-2">{pkg.name}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4 min-h-[3rem]">{pkg.tagline}</p>
                    <div className="text-xl font-extrabold text-primary mb-6">{pkg.price}</div>
                    <ul className="space-y-3">
                      {pkg.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2 text-sm">
                          <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                          <span className="text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-3xl bg-card border shadow-lg p-8 lg:p-12"
          >
            <h2 className="text-2xl lg:text-3xl font-bold mb-2">{kh.additionalTitle}</h2>
            <p className="text-muted-foreground mb-8">{kh.additionalSubtitle}</p>
            <div className="space-y-4">
              {kh.additionalServices.map((service) => (
                <div key={service.name} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b last:border-0">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <Sparkles className="w-4 h-4 text-primary" />
                    </div>
                    <span className="font-medium">{service.name}</span>
                  </div>
                  <span className="text-sm font-semibold text-primary sm:text-right">{service.price}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-24">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl lg:text-3xl font-bold mb-8">{kh.ctaTitle}</h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="https://wa.me/34643533453" target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="rounded-full gap-2 w-full sm:w-auto">
                  <Phone className="w-4 h-4" /> {kh.ctaBtn}
                </Button>
              </a>
              <Link to="/Booking">
                <Button size="lg" variant="outline" className="rounded-full gap-2 w-full sm:w-auto">
                  {kh.bookBtn} <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}