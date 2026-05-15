import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';
import { WashingMachine, ArrowRight, Check, ChevronDown, ChevronUp } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';

export default function VacationalPricingSection() {
  const { t } = useLanguage();
  const vp = t.servicesPage.vacationalPricing;
  const [showLaundry, setShowLaundry] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="mt-16 rounded-3xl overflow-hidden border border-primary/20 shadow-xl"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-primary/80 px-6 py-8 text-white text-center">
        <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-1.5 text-sm font-medium mb-4">
          <span>🏖️</span> {vp.badge}
        </div>
        <h2 className="text-2xl lg:text-3xl font-bold mb-2">{vp.title}</h2>
        <p className="text-white/80 max-w-2xl mx-auto text-sm lg:text-base">{vp.description}</p>
        <p className="mt-3 text-xs text-white/60">{vp.areas}</p>
      </div>

      {/* Pricing Table - Desktop */}
      <div className="hidden md:block bg-white overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-accent text-accent-foreground border-b border-border">
              <th className="text-left px-5 py-4 font-semibold">{vp.colType}</th>
              <th className="text-left px-5 py-4 font-semibold">{vp.colRooms}</th>
              <th className="text-left px-5 py-4 font-semibold">{vp.colBeds}</th>
              <th className="text-center px-5 py-4 font-semibold text-primary">{vp.colClean}</th>
              <th className="text-center px-5 py-4 font-semibold">{vp.colLaundry}</th>
              <th className="text-center px-5 py-4 font-semibold text-primary">{vp.colTotal}</th>
            </tr>
          </thead>
          <tbody>
            {vp.rows.map((row, i) => (
              <tr key={i} className={`border-b border-border/50 ${i % 2 === 0 ? 'bg-white' : 'bg-muted/30'}`}>
                <td className="px-5 py-4 font-medium">{row.type}</td>
                <td className="px-5 py-4 text-muted-foreground">{row.rooms}</td>
                <td className="px-5 py-4 text-muted-foreground">{row.beds}</td>
                <td className="px-5 py-4 text-center font-bold text-primary">{row.clean}</td>
                <td className="px-5 py-4 text-center text-muted-foreground">{row.laundry}</td>
                <td className="px-5 py-4 text-center font-bold text-foreground bg-accent/30">{row.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pricing Cards - Mobile */}
      <div className="md:hidden bg-white divide-y divide-border">
        {vp.rows.map((row, i) => (
          <div key={i} className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-foreground">{row.type}</span>
              <span className="text-lg font-bold text-primary">{row.clean}</span>
            </div>
            <p className="text-xs text-muted-foreground mb-1">{row.rooms} · {row.beds}</p>
            <div className="flex items-center justify-between mt-2 pt-2 border-t border-border/50">
              <span className="text-xs text-muted-foreground">{vp.colLaundry}: <span className="font-medium text-foreground">{row.laundry}</span></span>
              <span className="text-xs font-bold text-foreground">{vp.colTotal}: <span className="text-primary">{row.total}</span></span>
            </div>
          </div>
        ))}
      </div>

      {/* Includes & Laundry */}
      <div className="bg-muted/30 p-6 grid md:grid-cols-2 gap-6">
        {/* What's included */}
        <div>
          <h3 className="font-bold text-base mb-3 flex items-center gap-2">
            <span className="text-lg">🧽</span> {vp.includesTitle}
          </h3>
          <ul className="space-y-2">
            {vp.includes.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Laundry conditions */}
        <div>
          <button
            onClick={() => setShowLaundry(!showLaundry)}
            className="w-full flex items-center justify-between font-bold text-base mb-3"
          >
            <span className="flex items-center gap-2">
              <WashingMachine className="w-5 h-5 text-primary" /> {vp.laundryTitle}
            </span>
            {showLaundry ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
          </button>
          {showLaundry && (
            <ul className="space-y-2">
              {vp.laundry.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          )}
          {!showLaundry && (
            <p className="text-sm text-muted-foreground">{vp.laundry[0]}...</p>
          )}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-white px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-border">
        <p className="text-sm text-muted-foreground text-center sm:text-left">{vp.cta}</p>
        <Link to="/Booking">
          <Button className="rounded-full gap-2 shrink-0">
            {vp.ctaBtn} <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </div>
    </motion.div>
  );
}