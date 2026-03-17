import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowRight, Star, Shield, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent via-background to-background" />
      <div className="absolute top-20 right-0 w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-primary/3 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-32 lg:py-40">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent border border-primary/10 text-sm font-medium text-accent-foreground mb-8">
              <Star className="w-4 h-4 fill-primary text-primary" />
              Rated 4.9/5 by 2,000+ customers
            </div>

            <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight leading-[1.05]">
              A cleaner space,
              <span className="text-primary block">a better life.</span>
            </h1>

            <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-lg">
              Servicios profesionales de limpieza adaptados a tus necesidades. Llevamos brillo a cada rincón de tu hogar u oficina con productos ecológicos y atención al detalle.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-10">
              <Link to="/Booking">
                <Button size="lg" className="rounded-full px-8 h-14 text-base gap-2 shadow-lg shadow-primary/20">
                  Get a Free Quote <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link to="/Services">
                <Button size="lg" variant="outline" className="rounded-full px-8 h-14 text-base">
                  Our Services
                </Button>
              </Link>
            </div>

            <div className="flex items-center gap-8 mt-12">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Shield className="w-5 h-5 text-primary" />
                <span>Insured & Bonded</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="w-5 h-5 text-primary" />
                <span>Same-day Service</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden lg:block"
          >
            <div className="relative">
              <div className="rounded-3xl overflow-hidden shadow-2xl shadow-primary/10 aspect-[4/5]">
                <img
                  src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&q=80"
                  alt="Professional cleaning"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-card rounded-2xl shadow-xl p-5 border">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Star className="w-6 h-6 text-primary fill-primary" />
                  </div>
                  <div>
                    <p className="font-bold text-lg">2,000+</p>
                    <p className="text-sm text-muted-foreground">Happy customers</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}