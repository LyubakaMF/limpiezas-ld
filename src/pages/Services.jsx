import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Home, Building2, SprayCan, Truck, HardHat, CalendarCheck, Umbrella, Check, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/LanguageContext';

const icons = [Home, Umbrella, Building2, SprayCan, Truck, HardHat, CalendarCheck];
const images = [
  'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&q=80',
  'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=600&q=80',
  'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=600&q=80',
  'https://images.unsplash.com/photo-1585421514284-efb74c2b69ba?w=600&q=80',
  'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&q=80',
  'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80',
  'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&q=80',
];

export default function Services() {
  const { t } = useLanguage();
  const sp = t.servicesPage;

  return (
    <div className="pt-20">
      <section className="py-20 lg:py-28 bg-gradient-to-b from-accent to-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-4xl lg:text-6xl font-bold tracking-tight">{sp.title}</h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">{sp.subtitle}</p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 space-y-12">
          {sp.items.map((service, i) => {
            const Icon = icons[i] || Home;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="grid lg:grid-cols-2 gap-8 items-center"
              >
                <div className={`${i % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <div className="rounded-2xl overflow-hidden aspect-[16/10]">
                    <img src={images[i] || images[0]} alt={service.title} className="w-full h-full object-cover" />
                  </div>
                </div>
                <div className={`${i % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-accent-foreground" />
                  </div>
                  <h3 className="text-2xl lg:text-3xl font-bold mb-3">{service.title}</h3>
                  <p className="text-muted-foreground leading-relaxed mb-6">{service.description}</p>
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm">
                        <Check className="w-4 h-4 text-primary shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-center gap-4">
                    <span className="text-lg font-bold text-primary">{service.price}</span>
                    <Link to="/Booking">
                      <Button className="rounded-full gap-2">
                        {sp.bookNow} <ArrowRight className="w-4 h-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>
    </div>
  );
}