import React from 'react';
import HeroSection from '../components/home/HeroSection';
import ServicesPreview from '../components/home/ServicesPreview';
import StatsSection from '../components/home/StatsSection';
import TestimonialsSection from '../components/home/TestimonialsSection';
import FaqSection from '../components/home/FaqSection';
import CTASection from '../components/home/CTASection';
import PromotionsSection from '../components/home/PromotionsSection';
import { useSEO } from '@/lib/useSEO';

export default function Home() {
  useSEO({
    title: 'Limpiezas LD - Servicios de Limpieza Profesional en Águilas | Precios Asequibles',
    description: 'Empresa de limpieza profesional en Águilas, San Juan de los Terreros, Pulpí y Lorca. Limpieza de hogares, apartamentos vacacionales, oficinas y más. Productos ecológicos. Presupuesto gratis. ☎ +34 643 53 34 53',
    canonical: 'https://limpiezasld.com/',
    ogImage: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=1200&q=80',
  });

  return (
    <div>
      <HeroSection />
      <PromotionsSection />
      <ServicesPreview />
      <StatsSection />
      <TestimonialsSection />
      <FaqSection />
      <CTASection />
    </div>
  );
}