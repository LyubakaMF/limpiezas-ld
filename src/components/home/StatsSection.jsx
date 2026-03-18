import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/LanguageContext';

const values = ['100+', '3K+', '4.9', '20+'];

export default function StatsSection() {
  const { t } = useLanguage();

  return (
    <section className="py-20 bg-primary">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {t.stats.map((label, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="text-center"
            >
              <p className="text-4xl lg:text-5xl font-extrabold text-primary-foreground">{values[i]}</p>
              <p className="mt-2 text-primary-foreground/70 text-sm font-medium">{label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}