import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Home, Building2, SprayCan, Truck, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const services = [
  {
    icon: Home,
    title: 'Residential Cleaning',
    description: 'Regular home cleaning that keeps your space fresh, organized, and inviting every single day.',
  },
  {
    icon: Building2,
    title: 'Commercial Cleaning',
    description: 'Professional office and workspace cleaning to maintain a productive and healthy environment.',
  },
  {
    icon: SprayCan,
    title: 'Deep Cleaning',
    description: 'Thorough top-to-bottom cleaning that reaches every hidden corner and stubborn stain.',
  },
  {
    icon: Truck,
    title: 'Move In/Out',
    description: 'Complete cleaning for new beginnings. Leave your old place spotless or prep your new home.',
  },
];

export default function ServicesPreview() {
  return (
    <section className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">What We Offer</p>
          <h2 className="text-3xl lg:text-5xl font-bold tracking-tight">
            Cleaning services for every need
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">
            From regular upkeep to intensive deep cleans, we have you covered.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="group p-6 rounded-2xl border bg-card hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center mb-5 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                <service.icon className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-lg mb-2">{service.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{service.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/Services">
            <Button variant="outline" className="rounded-full px-8 gap-2">
              View All Services <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}