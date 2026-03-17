import React from 'react';
import { motion } from 'framer-motion';

const stats = [
  { value: '2,000+', label: 'Happy Customers' },
  { value: '15K+', label: 'Cleanings Completed' },
  { value: '4.9', label: 'Average Rating' },
  { value: '50+', label: 'Team Members' },
];

export default function StatsSection() {
  return (
    <section className="py-20 bg-primary">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="text-center"
            >
              <p className="text-4xl lg:text-5xl font-extrabold text-primary-foreground">{stat.value}</p>
              <p className="mt-2 text-primary-foreground/70 text-sm font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}