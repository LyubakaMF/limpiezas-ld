import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowRight, Star, Shield, Clock } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';

export default function HeroSection() {
  const { t } = useLanguage();
  const h = t.hero;

  return (
    <section className="relative min-h-[100svh] flex items-center overflow-hidden">
      {/* Pure CSS background - no external image request, eliminates LCP bottleneck */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, hsl(142 60% 35% / 0.15) 0%, hsl(142 40% 94% / 0.6) 40%, hsl(210 20% 99% / 0.3) 100%), linear-gradient(to bottom right, hsl(142 60% 35% / 0.08), transparent)'
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-32 lg:py-40">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* No animation wrapper - avoids CLS and improves FCP/LCP */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent border border-primary/10 text-sm font-medium text-accent-foreground mb-8">
              <Star className="w-4 h-4 fill-primary text-primary" />
              {h.badge}
            </div>

            <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight leading-[1.05]">
              {h.title1}
              <span className="text-primary block">{h.title2}</span>
            </h1>

            <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-lg">{h.description}</p>

            <p className="mt-4 text-sm font-medium text-primary">{h.languages}</p>

            <div className="flex flex-col sm:flex-row gap-4 mt-10">
              <Link to="/Booking">
                <Button size="lg" className="rounded-full px-8 h-14 text-base gap-2 shadow-lg shadow-primary/20">
                  {h.cta} <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link to="/Services">
                <Button size="lg" variant="outline" className="rounded-full px-8 h-14 text-base">
                  {h.services}
                </Button>
              </Link>
            </div>

            <div className="flex items-center gap-8 mt-12">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Shield className="w-5 h-5 text-primary" />
                <span>{h.insured}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="w-5 h-5 text-primary" />
                <span>{h.sameDay}</span>
              </div>
            </div>
          </div>

          {/* Right side - desktop only, pure CSS decorative block (no external image) */}
          <div className="hidden lg:flex items-center justify-center">
            <div className="relative w-full max-w-sm">
              <div className="rounded-3xl overflow-hidden shadow-2xl shadow-primary/10 aspect-[4/5] bg-gradient-to-br from-primary/20 via-accent to-primary/5 flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Star className="w-10 h-10 text-primary fill-primary" />
                  </div>
                  <p className="font-bold text-4xl text-primary">4.9★</p>
                  <p className="text-muted-foreground mt-2 font-medium">2,000+ {h.happyCustomers}</p>
                  <div className="mt-6 flex items-center gap-2 justify-center text-sm text-muted-foreground">
                    <Shield className="w-4 h-4 text-primary" />
                    <span>{h.insured}</span>
                  </div>
                  <div className="mt-2 flex items-center gap-2 justify-center text-sm text-muted-foreground">
                    <Clock className="w-4 h-4 text-primary" />
                    <span>{h.sameDay}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}