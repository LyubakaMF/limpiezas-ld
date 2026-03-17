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
import { useLanguage } from '@/lib/LanguageContext';

export default function Booking() {
  const { t } = useLanguage();
  const bp = t.bookingPage;

  const [form, setForm] = useState({
    full_name: '', email: '', phone: '', service_type: '',
    preferred_date: '', preferred_time: '', address: '', notes: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (field, value) => setForm(prev => ({ ...prev, [field]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await base44.entities.BookingRequest.create(form);

    // Email notification
    await base44.integrations.Core.SendEmail({
      to: 'limpiezasld@gmail.com',
      subject: `Nueva solicitud de limpieza – ${form.full_name}`,
      body: `
        <h2>Nueva solicitud de reserva</h2>
        <p><strong>Nombre:</strong> ${form.full_name}</p>
        <p><strong>Email:</strong> ${form.email}</p>
        <p><strong>Teléfono:</strong> ${form.phone}</p>
        <p><strong>Servicio:</strong> ${form.service_type}</p>
        <p><strong>Fecha:</strong> ${form.preferred_date} – ${form.preferred_time}</p>
        <p><strong>Dirección:</strong> ${form.address}</p>
        <p><strong>Notas:</strong> ${form.notes || '–'}</p>
        <hr/>
        <p>📱 También puedes responder por WhatsApp: <a href="https://wa.me/34643533453">wa.me/34643533453</a></p>
      `
    });

    setIsSubmitting(false);
    setIsSuccess(true);
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
                        <a href="https://wa.me/34643533453" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 mt-1 text-xs font-medium text-green-600 hover:text-green-700">
                          💬 WhatsApp
                        </a>
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