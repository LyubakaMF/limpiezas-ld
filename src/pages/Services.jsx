import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Home, Building2, SprayCan, Truck, HardHat, CalendarCheck, Check, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const services = [
  {
    icon: Home,
    title: 'Residential Cleaning',
    description: 'Keep your home spotless with our regular residential cleaning service. We handle dusting, vacuuming, mopping, bathroom and kitchen sanitizing, and more.',
    features: ['Kitchen & bathroom deep clean', 'Dusting & vacuuming', 'Floor mopping & polishing', 'Trash removal'],
    price: 'From $120',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&q=80',
  },
  {
    icon: Building2,
    title: 'Commercial Cleaning',
    description: 'Professional cleaning for offices, retail spaces, and commercial buildings. We work around your schedule for zero disruption.',
    features: ['Office sanitization', 'Restroom maintenance', 'Window cleaning', 'Floor care & waxing'],
    price: 'Custom quote',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80',
  },
  {
    icon: SprayCan,
    title: 'Deep Cleaning',
    description: 'An intensive, thorough cleaning that covers every surface, corner, and hidden spot. Perfect for seasonal refreshes.',
    features: ['Inside cabinets & drawers', 'Behind appliances', 'Baseboard cleaning', 'Light fixture cleaning'],
    price: 'From $250',
    image: 'https://images.unsplash.com/photo-1585421514284-efb74c2b69ba?w=600&q=80',
  },
  {
    icon: Truck,
    title: 'Move In/Out Cleaning',
    description: 'Leave your old home perfect or prepare your new one. Comprehensive cleaning for smooth transitions.',
    features: ['Full property cleaning', 'Appliance interior cleaning', 'Closet & shelf cleaning', 'Garage sweeping'],
    price: 'From $200',
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&q=80',
  },
  {
    icon: HardHat,
    title: 'Post-Construction',
    description: 'Remove construction dust, debris, and residue. We make your newly built or renovated space move-in ready.',
    features: ['Dust & debris removal', 'Window cleaning', 'Surface polishing', 'Final touch-up clean'],
    price: 'Custom quote',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80',
  },
  {
    icon: CalendarCheck,
    title: 'Recurring Service',
    description: 'Set up weekly, bi-weekly, or monthly cleaning schedules. Enjoy consistent cleanliness with priority booking.',
    features: ['Flexible scheduling', 'Dedicated team', 'Priority booking', 'Discounted rates'],
    price: 'From $99/visit',
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&q=80',
  },
];

export default function Services() {
  return (
    <div className="pt-20">
      {/* Header */}
      <section className="py-20 lg:py-28 bg-gradient-to-b from-accent to-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">Our Services</p>
            <h1 className="text-4xl lg:text-6xl font-bold tracking-tight">
              Cleaning solutions for every space
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              From routine maintenance to specialized deep cleans, our expert team delivers exceptional results every time.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 space-y-12">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className={`grid lg:grid-cols-2 gap-8 items-center ${i % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
            >
              <div className={`${i % 2 === 1 ? 'lg:order-2' : ''}`}>
                <div className="rounded-2xl overflow-hidden aspect-[16/10]">
                  <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
                </div>
              </div>
              <div className={`${i % 2 === 1 ? 'lg:order-1' : ''}`}>
                <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center mb-4">
                  <service.icon className="w-6 h-6 text-accent-foreground" />
                </div>
                <h3 className="text-2xl lg:text-3xl font-bold mb-3">{service.title}</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">{service.description}</p>
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm">
                      <Check className="w-4 h-4 text-primary shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="flex items-center gap-4">
                  <span className="text-lg font-bold text-primary">{service.price}</span>
                  <Link to="/Booking">
                    <Button className="rounded-full gap-2">
                      Book Now <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}