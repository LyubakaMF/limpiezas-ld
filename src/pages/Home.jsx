import React, { Suspense, lazy, useRef, useState, useEffect } from 'react';
import HeroSection from '../components/home/HeroSection';
import { useSEO } from '@/lib/useSEO';

// Lazy load all below-the-fold sections
const PromotionsSection = lazy(() => import('../components/home/PromotionsSection'));
const ServicesPreview   = lazy(() => import('../components/home/ServicesPreview'));
const StatsSection      = lazy(() => import('../components/home/StatsSection'));
const TestimonialsSection = lazy(() => import('../components/home/TestimonialsSection'));
const FaqSection        = lazy(() => import('../components/home/FaqSection'));
const CTASection        = lazy(() => import('../components/home/CTASection'));

// Sentinel: mounts below-fold content once the user scrolls past the hero
function BelowFold({ children }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { rootMargin: '300px', threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref}>
      {visible && <Suspense fallback={<div />}>{children}</Suspense>}
    </div>
  );
}

export default function Home() {
  useSEO({
    title: 'Limpiezas LD - Limpieza Profesional en Águilas',
    description: 'Limpieza profesional en Águilas, San Juan de los Terreros, Pulpí y Lorca. Hogares, apartamentos vacacionales y oficinas. Productos ecológicos. ☎ +34 643 53 34 53',
    canonical: 'https://www.limpiezas-ld.com/',
    ogImage: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=1200&q=80',
  });

  return (
    <div>
      <HeroSection />
      <BelowFold>
        <PromotionsSection />
        <ServicesPreview />
        <StatsSection />
        <TestimonialsSection />
        <FaqSection />
        <CTASection />
      </BelowFold>
    </div>
  );
}