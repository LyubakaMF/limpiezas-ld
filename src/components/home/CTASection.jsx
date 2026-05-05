import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/LanguageContext';

export default function CTASection() {
  const { t } = useLanguage();
  const c = t.cta;

  return (
    <section className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-primary to-primary/80 p-12 lg:p-20 text-center"
        >
          <div className="absolute inset-0 opacity-10" style={{ background: 'radial-gradient(circle at 30% 50%, white 0%, transparent 60%)' }} />
          <div className="relative">
            <h2 className="text-3xl lg:text-5xl font-bold text-primary-foreground tracking-tight max-w-2xl mx-auto">
              {c.title}
            </h2>
            <p className="mt-4 text-primary-foreground/80 text-lg max-w-lg mx-auto">{c.subtitle}</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-10">
              <Link to="/Booking">
                <Button size="lg" variant="secondary" className="rounded-full px-8 h-14 text-base gap-2 font-semibold">
                  {c.bookNow} <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <a href="tel:+34643533453">
                <Button size="lg" variant="outline" className="rounded-full px-8 h-14 text-base border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10">
                  {c.call}
                </Button>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}