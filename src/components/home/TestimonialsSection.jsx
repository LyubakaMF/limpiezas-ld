import React, { useEffect, useState } from 'react';
import { Star } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';
import { base44 } from '@/api/base44Client';

const staticAuthors = [
  { name: 'Sarah Johnson', avatar: 'SJ', content: 'Limpiezas LD transformed my home! The attention to detail is incredible. I\'ve never seen my kitchen sparkle like this. Highly recommend their deep cleaning service.' },
  { name: 'Michael Chen', avatar: 'MC', content: 'We switched to Limpiezas LD for our office cleaning and the difference is night and day. Professional, reliable, and thorough every single time.' },
  { name: 'Emily Rodriguez', avatar: 'ER', content: 'I use Limpiezas LD for all my move-in/move-out cleanings. They make properties look brand new. My clients are always impressed.' },
];

function getInitials(name) {
  return name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
}

export default function TestimonialsSection() {
  const { t } = useLanguage();
  const tm = t.testimonials;
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    // Delay API call to not block initial render / LCP
    const timer = setTimeout(() => {
      base44.entities.Review.filter({ approved: true }, '-created_date', 6)
        .then(setReviews)
        .catch(() => {});
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const items = reviews.length > 0
    ? reviews.map(r => ({ name: r.full_name, avatar: getInitials(r.full_name), content: r.comment, rating: r.rating }))
    : staticAuthors.map(a => ({ ...a, rating: 5 }));

  return (
    <section className="py-24 lg:py-32 bg-muted/50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">{tm.tag}</p>
          <h2 className="text-3xl lg:text-5xl font-bold tracking-tight">{tm.title}</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {items.map((item, i) => (
            <div
              key={i}
              className="bg-card rounded-2xl p-8 border shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star key={j} className={`w-4 h-4 ${j < item.rating ? 'fill-primary text-primary' : 'text-muted-foreground'}`} />
                ))}
              </div>
              <p className="text-foreground/80 leading-relaxed mb-6">"{item.content}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-sm font-semibold text-primary">
                  {item.avatar}
                </div>
                <p className="font-semibold text-sm">{item.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}