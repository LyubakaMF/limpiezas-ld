import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Leaf, Shield, Users, Heart, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const values = [
  {
    icon: Leaf,
    title: 'Eco-Friendly',
    description: 'We use only environmentally safe, non-toxic cleaning products that are gentle on your home and the planet.',
  },
  {
    icon: Shield,
    title: 'Trusted & Insured',
    description: 'All our team members are background-checked, fully insured, and bonded for your complete peace of mind.',
  },
  {
    icon: Users,
    title: 'Expert Team',
    description: 'Our professionally trained cleaners bring years of experience and passion to every job they do.',
  },
  {
    icon: Heart,
    title: 'Customer First',
    description: 'Your satisfaction is our top priority. We offer a 100% satisfaction guarantee on every cleaning.',
  },
];

const team = [
  { name: 'Jessica Park', role: 'Founder & CEO', avatar: 'JP', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80' },
  { name: 'David Kim', role: 'Operations Director', avatar: 'DK', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80' },
  { name: 'Maria Santos', role: 'Lead Supervisor', avatar: 'MS', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80' },
  { name: 'James Wilson', role: 'Quality Manager', avatar: 'JW', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80' },
];

export default function About() {
  return (
    <div className="pt-20">
      {/* Header */}
      <section className="py-20 lg:py-28 bg-gradient-to-b from-accent to-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">About Us</p>
            <h1 className="text-4xl lg:text-6xl font-bold tracking-tight">
              We believe everyone deserves a clean space
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              Founded in 2018, PureClean started with a simple mission: to provide honest, reliable, and exceptional cleaning services. Today, we serve thousands of homes and businesses with the same dedication.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="rounded-3xl overflow-hidden aspect-[4/3]">
              <img
                src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&q=80"
                alt="Our team"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">Our story</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                What started as a one-person operation has grown into a team of 50+ dedicated professionals. Our founder, Jessica Park, saw a gap in the market for cleaning services that truly care — about the quality, about the environment, and about the people.
              </p>
              <p>
                Every member of our team goes through rigorous training to meet our high standards. We invest in the best equipment and eco-friendly products because we believe clean shouldn't come at the cost of health or the environment.
              </p>
              <p>
                Today, we're proud to be the most trusted cleaning service in the area, with a 4.9-star average rating and a 95% customer retention rate.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 lg:py-24 bg-muted/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold">Our values</h2>
            <p className="mt-3 text-muted-foreground text-lg">The principles that guide everything we do.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="text-center p-6"
              >
                <div className="w-14 h-14 mx-auto rounded-2xl bg-accent flex items-center justify-center mb-4">
                  <value.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{value.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold">Meet our leadership</h2>
            <p className="mt-3 text-muted-foreground text-lg">The people behind PureClean's success.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="text-center"
              >
                <div className="w-32 h-32 mx-auto rounded-full overflow-hidden mb-4 ring-4 ring-accent">
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                </div>
                <h3 className="font-semibold">{member.name}</h3>
                <p className="text-sm text-muted-foreground">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-24 bg-accent">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">Ready to experience PureClean?</h2>
          <p className="text-muted-foreground text-lg mb-8">
            Join thousands of satisfied customers. Book your first cleaning today.
          </p>
          <Link to="/Booking">
            <Button size="lg" className="rounded-full px-8 h-14 text-base gap-2">
              Book a Cleaning <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}