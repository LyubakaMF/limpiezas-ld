import React, { useState, useRef, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Loader2, Phone, Clock, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/lib/LanguageContext';
import { useSEO } from '@/lib/useSEO';

export default function Booking() {
  const { t, lang: language } = useLanguage();
  const bp = t.bookingPage;

  useSEO({
    title: 'Reservar Limpieza en Águilas - Presupuesto Gratis | Limpiezas LD',
    description: 'Reserva tu servicio de limpieza en Águilas, San Juan de los Terreros, Pulpí o Lorca. Respuesta en menos de 2 horas. Presupuesto gratuito y sin compromiso. ☎ +34 643 53 34 53',
    canonical: 'https://limpiezasld.com/Booking',
    ogImage: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=1200&q=80',
  });

  const [form, setForm] = useState({
    full_name: '', email: '', phone: '', service_type: '',
    preferred_date: '', preferred_time: '', address: '', notes: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  // Honeypot field - ботовете го попълват, хората не го виждат
  const [honeypot, setHoneypot] = useState('');
  const formLoadTime = useRef(Date.now());

  const handleChange = (field, value) => setForm(prev => ({ ...prev, [field]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Honeypot: ако е попълнено — бот
    if (honeypot) return;
    // Time check: ако формата е подадена под 3 секунди — бот
    if (Date.now() - formLoadTime.current < 3000) return;
    setIsSubmitting(true);
    try {
      // reCAPTCHA v3 - get token silently
      const token = await new Promise((resolve, reject) => {
        if (!window.grecaptcha) return reject(new Error('reCAPTCHA not loaded'));
        window.grecaptcha.ready(() => {
          window.grecaptcha.execute('6LeGy5AsAAAAABajiihuLczes2LLY2dHLJ583icZ', { action: 'booking' })
            .then(resolve).catch(reject);
        });
      });
      const verifyRes = await base44.functions.invoke('verifyRecaptcha', { token });
      if (!verifyRes.data?.success) {
        alert('reCAPTCHA verification failed. Please try again.');
        setIsSubmitting(false);
        return;
      }
      await base44.entities.BookingRequest.create({ ...form, lang: language });
      await base44.functions.invoke('sendGmailBookingConfirmation', { ...form, lang: language });
      setIsSubmitting(false);
      setIsSuccess(true);
    } catch (error) {
      console.error('Submission error:', error);
      setIsSubmitting(false);
      if (window.grecaptcha) window.grecaptcha.reset();
      setRecaptchaToken('');
      alert('Error: ' + (error.response?.data?.error || error.message || 'Please try again'));
    }
  };

  return (
    <div className="pt-20">
      <section className="py-20 lg:py-28 bg-gradient-to-b from-accent to-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center max-w-2xl mx-auto">
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">{bp.tag}</p>
            <h1 className="text-4xl lg:text-6xl font-bold tracking-tight">{bp.title}</h1>
            <p className="mt-4 text-lg text-muted-foreground">{bp.subtitle}</p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <AnimatePresence mode="wait">
                {isSuccess ? (
                  <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-20">
                    <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                      <CheckCircle2 className="w-10 h-10 text-primary" />
                    </div>
                    <h2 className="text-2xl font-bold mb-2">{bp.successTitle}</h2>
                    <p className="text-muted-foreground max-w-md mx-auto">{bp.successMsg(form.full_name, form.email)}</p>
                    <Button className="mt-8 rounded-full" onClick={() => { setIsSuccess(false); setForm({ full_name: '', email: '', phone: '', service_type: '', preferred_date: '', preferred_time: '', address: '', notes: '' }); }}>
                      {bp.bookAnother}
                    </Button>
                  </motion.div>
                ) : (
                  <motion.form key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="full_name">{bp.fullName} *</Label>
                        <Input id="full_name" placeholder="John Doe" value={form.full_name} onChange={(e) => handleChange('full_name', e.target.value)} required className="h-12 rounded-xl" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">{bp.email} *</Label>
                        <Input id="email" type="email" placeholder="john@example.com" value={form.email} onChange={(e) => handleChange('email', e.target.value)} required className="h-12 rounded-xl" />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="phone">{bp.phone} *</Label>
                        <Input id="phone" type="tel" placeholder="(555) 123-4567" value={form.phone} onChange={(e) => handleChange('phone', e.target.value)} required className="h-12 rounded-xl" />
                      </div>
                      <div className="space-y-2">
                        <Label>{bp.serviceType} *</Label>
                        <Select value={form.service_type} onValueChange={(v) => handleChange('service_type', v)} required>
                          <SelectTrigger className="h-12 rounded-xl"><SelectValue placeholder={bp.selectService} /></SelectTrigger>
                          <SelectContent>
                            {bp.services.map(s => <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>)}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="date">{bp.preferredDate} *</Label>
                        <Input id="date" type="date" value={form.preferred_date} onChange={(e) => handleChange('preferred_date', e.target.value)} required className="h-12 rounded-xl" />
                      </div>
                      <div className="space-y-2">
                        <Label>{bp.preferredTime}</Label>
                        <Select value={form.preferred_time} onValueChange={(v) => handleChange('preferred_time', v)}>
                          <SelectTrigger className="h-12 rounded-xl"><SelectValue placeholder={bp.selectTime} /></SelectTrigger>
                          <SelectContent>
                            {bp.times.map(t => <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>)}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address">{bp.address} *</Label>
                      <Input id="address" placeholder={bp.addressPlaceholder} value={form.address} onChange={(e) => handleChange('address', e.target.value)} required className="h-12 rounded-xl" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="notes">{bp.notes}</Label>
                      <Textarea id="notes" placeholder={bp.notesPlaceholder} value={form.notes} onChange={(e) => handleChange('notes', e.target.value)} className="min-h-[120px] rounded-xl" />
                    </div>

                    {/* reCAPTCHA widget */}
                    <div className="flex justify-center">
                      <div
                        ref={recaptchaRef}
                        className="g-recaptcha"
                        data-sitekey="6LeGy5AsAAAAABajiihuLczes2LLY2dHLJ583icZ"
                        data-callback="onRecaptchaSuccess"
                        data-expired-callback="onRecaptchaExpired"
                      ></div>
                    </div>

                    {/* Honeypot - скрито от потребителите, ботовете го попълват */}
                    <div style={{ position: 'absolute', left: '-9999px', opacity: 0, height: 0, overflow: 'hidden' }} aria-hidden="true">
                      <input
                        type="text"
                        name="website"
                        value={honeypot}
                        onChange={(e) => setHoneypot(e.target.value)}
                        tabIndex={-1}
                        autoComplete="off"
                      />
                    </div>

                    <Button type="submit" size="lg" disabled={isSubmitting} className="w-full rounded-xl h-14 text-base">
                      {isSubmitting ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> {bp.submitting}</> : bp.submit}
                    </Button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>

            <div className="space-y-6">
              <Card className="border-0 bg-accent">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-4">{bp.whyTitle}</h3>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5"><Clock className="w-4 h-4 text-primary" /></div>
                      <div><p className="font-medium text-sm">{bp.fastResponse}</p><p className="text-xs text-muted-foreground">{bp.fastResponseDesc}</p></div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5"><Shield className="w-4 h-4 text-primary" /></div>
                      <div><p className="font-medium text-sm">{bp.satisfaction}</p><p className="text-xs text-muted-foreground">{bp.satisfactionDesc}</p></div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5"><Phone className="w-4 h-4 text-primary" /></div>
                      <div>
                        <p className="font-medium text-sm">{bp.needHelp}</p>
                        <p className="text-xs text-muted-foreground">{bp.needHelpDesc}</p>
                        <div className="flex gap-2 mt-1">
                          <a href="https://wa.me/34643533453" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs font-medium text-green-600 hover:text-green-700">
                            💬 WhatsApp (+34 643 53 34 53)
                          </a>
                          <a href="https://wa.me/34602665537" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs font-medium text-green-600 hover:text-green-700">
                            💬 WhatsApp (+34 602 66 55 37)
                          </a>
                        </div>
                      </div>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              <Card className="border-0 bg-muted">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-2">{bp.freeTitle}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{bp.freeDesc}</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}