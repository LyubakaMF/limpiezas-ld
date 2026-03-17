import React from 'react';
import { Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/LanguageContext';

const authors = [
  { name: 'Sarah Johnson', role: 'Homeowner', avatar: 'SJ' },
  { name: 'Michael Chen', role: 'Office Manager', avatar: 'MC' },
  { name: 'Emily Rodriguez', role: 'Real Estate Agent', avatar: 'ER' },
];

export default function TestimonialsSection() {
  const { t } = useLanguage();
  const tm = t.testimonials;

  return (
    <section className="py-24 lg:py-32 bg-muted/50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">{tm.tag}</p>
          <h2 className="text-3xl lg:text-5xl font-bold tracking-tight">{tm.title}</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {tm.items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="bg-card rounded-2xl p-8 border shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-foreground/80 leading-relaxed mb-6">"{item.content}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-sm font-semibold text-primary">
                  {authors[i].avatar}
                </div>
                <div>
                  <p className="font-semibold text-sm">{authors[i].name}</p>
                  <p className="text-xs text-muted-foreground">{authors[i].role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}