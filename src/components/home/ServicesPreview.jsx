import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Home, Building2, SprayCan, Truck, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/LanguageContext';

const icons = [Home, Building2, SprayCan, Truck];

export default function ServicesPreview() {
  const { t } = useLanguage();
  const s = t.servicesPreview;

  return (
    <section className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">{s.tag}</p>
          <h2 className="text-3xl lg:text-5xl font-bold tracking-tight">{s.title}</h2>
          <p className="mt-4 text-muted-foreground text-lg">{s.subtitle}</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {s.items.map((service, i) => {
            const Icon = icons[i];
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="group p-6 rounded-2xl border bg-card hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center mb-5 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{service.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{service.description}</p>
                <p className="text-sm font-semibold text-primary">{service.price}</p>
              </motion.div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Link to="/Services">
            <Button variant="outline" className="rounded-full px-8 gap-2">
              {s.viewAll} <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}