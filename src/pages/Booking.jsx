import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Loader2, Phone, Clock, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const serviceTypes = [
  { value: 'residential', label: 'Residential Cleaning' },
  { value: 'commercial', label: 'Commercial Cleaning' },
  { value: 'deep_clean', label: 'Deep Cleaning' },
  { value: 'move_in_out', label: 'Move In/Out Cleaning' },
  { value: 'post_construction', label: 'Post-Construction' },
  { value: 'recurring', label: 'Recurring Service' },
];

const timeSlots = [
  { value: 'morning', label: '8:00 AM – 12:00 PM' },
  { value: 'afternoon', label: '12:00 PM – 4:00 PM' },
  { value: 'evening', label: '4:00 PM – 7:00 PM' },
];

export default function Booking() {
  const [form, setForm] = useState({
    full_name: '', email: '', phone: '', service_type: '',
    preferred_date: '', preferred_time: '', address: '', notes: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await base44.entities.BookingRequest.create(form);
    setIsSubmitting(false);
    setIsSuccess(true);
  };

  return (
    <div className="pt-20">
      <section className="py-20 lg:py-28 bg-gradient-to-b from-accent to-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto"
          >
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">Book a Cleaning</p>
            <h1 className="text-4xl lg:text-6xl font-bold tracking-tight">
              Get your free quote
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Fill out the form below and we'll get back to you within 2 hours.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Form */}
            <div className="lg:col-span-2">
              <AnimatePresence mode="wait">
                {isSuccess ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-20"
                  >
                    <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                      <CheckCircle2 className="w-10 h-10 text-primary" />
                    </div>
                    <h2 className="text-2xl font-bold mb-2">Booking Request Sent!</h2>
                    <p className="text-muted-foreground max-w-md mx-auto">
                      Thank you, {form.full_name}! We've received your request and will contact you at {form.email} within 2 hours to confirm your booking.
                    </p>
                    <Button
                      className="mt-8 rounded-full"
                      onClick={() => {
                        setIsSuccess(false);
                        setForm({ full_name: '', email: '', phone: '', service_type: '', preferred_date: '', preferred_time: '', address: '', notes: '' });
                      }}
                    >
                      Book Another Cleaning
                    </Button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onSubmit={handleSubmit}
                    className="space-y-6"
                  >
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="full_name">Full Name *</Label>
                        <Input
                          id="full_name"
                          placeholder="John Doe"
                          value={form.full_name}
                          onChange={(e) => handleChange('full_name', e.target.value)}
                          required
                          className="h-12 rounded-xl"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="john@example.com"
                          value={form.email}
                          onChange={(e) => handleChange('email', e.target.value)}
                          required
                          className="h-12 rounded-xl"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone *</Label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="(555) 123-4567"
                          value={form.phone}
                          onChange={(e) => handleChange('phone', e.target.value)}
                          required
                          className="h-12 rounded-xl"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Service Type *</Label>
                        <Select value={form.service_type} onValueChange={(v) => handleChange('service_type', v)} required>
                          <SelectTrigger className="h-12 rounded-xl">
                            <SelectValue placeholder="Select a service" />
                          </SelectTrigger>
                          <SelectContent>
                            {serviceTypes.map(s => (
                              <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="date">Preferred Date *</Label>
                        <Input
                          id="date"
                          type="date"
                          value={form.preferred_date}
                          onChange={(e) => handleChange('preferred_date', e.target.value)}
                          required
                          className="h-12 rounded-xl"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Preferred Time</Label>
                        <Select value={form.preferred_time} onValueChange={(v) => handleChange('preferred_time', v)}>
                          <SelectTrigger className="h-12 rounded-xl">
                            <SelectValue placeholder="Select a time" />
                          </SelectTrigger>
                          <SelectContent>
                            {timeSlots.map(t => (
                              <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address">Address *</Label>
                      <Input
                        id="address"
                        placeholder="123 Main St, City, State, ZIP"
                        value={form.address}
                        onChange={(e) => handleChange('address', e.target.value)}
                        required
                        className="h-12 rounded-xl"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="notes">Special Requests</Label>
                      <Textarea
                        id="notes"
                        placeholder="Any specific areas to focus on, pet information, access instructions..."
                        value={form.notes}
                        onChange={(e) => handleChange('notes', e.target.value)}
                        className="min-h-[120px] rounded-xl"
                      />
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      disabled={isSubmitting}
                      className="w-full rounded-xl h-14 text-base"
                    >
                      {isSubmitting ? (
                        <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Submitting...</>
                      ) : (
                        'Submit Booking Request'
                      )}
                    </Button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card className="border-0 bg-accent">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-4">Why choose PureClean?</h3>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                        <Clock className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">Fast Response</p>
                        <p className="text-xs text-muted-foreground">We'll confirm your booking within 2 hours</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                        <Shield className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">Satisfaction Guaranteed</p>
                        <p className="text-xs text-muted-foreground">100% satisfaction or we'll re-clean for free</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                        <Phone className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">Need help?</p>
                        <p className="text-xs text-muted-foreground">Call us at (555) 123-4567</p>
                      </div>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-0 bg-muted">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-2">Free estimates</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Not sure which service you need? Submit a request and our team will provide a personalized quote based on your space and requirements.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}