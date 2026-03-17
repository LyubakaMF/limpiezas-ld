import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Loader2, Paperclip, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/lib/LanguageContext';

const ACCEPTED = '.pdf,.doc,.docx,.odt,.txt,.rtf,.jpg,.jpeg,.png,.webp';

export default function Empleo() {
  const { t } = useLanguage();
  const ep = t.empleoPage;

  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [files, setFiles] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (field, value) => setForm(prev => ({ ...prev, [field]: value }));

  const handleFiles = (e) => {
    const selected = Array.from(e.target.files);
    setFiles(prev => [...prev, ...selected]);
  };

  const removeFile = (i) => setFiles(prev => prev.filter((_, idx) => idx !== i));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Upload files
    const uploadedUrls = [];
    for (const file of files) {
      const { file_url } = await base44.integrations.Core.UploadFile({ file });
      uploadedUrls.push(file_url);
    }

    // Send email notification
    const attachmentLinks = uploadedUrls.map((u, i) => `<a href="${u}">Adjunto ${i + 1}</a>`).join('<br/>');
    await base44.integrations.Core.SendEmail({
      to: 'limpiezasld@gmail.com',
      subject: `Nueva solicitud de empleo – ${form.name}`,
      body: `
        <h2>Nueva solicitud de empleo</h2>
        <p><strong>Nombre:</strong> ${form.name}</p>
        <p><strong>Email:</strong> ${form.email}</p>
        <p><strong>Teléfono:</strong> ${form.phone}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${form.message}</p>
        ${uploadedUrls.length > 0 ? `<p><strong>Documentos adjuntos:</strong><br/>${attachmentLinks}</p>` : ''}
      `
    });

    setIsSubmitting(false);
    setIsSuccess(true);
  };

  const reset = () => {
    setIsSuccess(false);
    setForm({ name: '', email: '', phone: '', message: '' });
    setFiles([]);
  };

  return (
    <div className="pt-20">
      <section className="py-20 lg:py-28 bg-gradient-to-b from-accent to-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-2xl">
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">{ep.tag}</p>
            <h1 className="text-4xl lg:text-6xl font-bold tracking-tight">{ep.title}</h1>
            <p className="mt-4 text-lg text-muted-foreground">{ep.subtitle}</p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <AnimatePresence mode="wait">
            {isSuccess ? (
              <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-20">
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-10 h-10 text-primary" />
                </div>
                <h2 className="text-2xl font-bold mb-2">{ep.successTitle}</h2>
                <p className="text-muted-foreground max-w-md mx-auto">{ep.successMsg}</p>
                <Button className="mt-8 rounded-full" onClick={reset}>{ep.sendAnother}</Button>
              </motion.div>
            ) : (
              <motion.form key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">{ep.name} *</Label>
                    <Input id="name" value={form.name} onChange={e => handleChange('name', e.target.value)} required className="h-12 rounded-xl" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">{ep.email} *</Label>
                    <Input id="email" type="email" value={form.email} onChange={e => handleChange('email', e.target.value)} required className="h-12 rounded-xl" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">{ep.phone}</Label>
                  <Input id="phone" type="tel" value={form.phone} onChange={e => handleChange('phone', e.target.value)} className="h-12 rounded-xl" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">{ep.message} *</Label>
                  <Textarea
                    id="message"
                    placeholder={ep.messagePlaceholder}
                    value={form.message}
                    onChange={e => handleChange('message', e.target.value)}
                    required
                    className="min-h-[160px] rounded-xl"
                  />
                </div>

                {/* File upload */}
                <div className="space-y-2">
                  <Label>{ep.attachments}</Label>
                  <label className="flex items-center gap-3 cursor-pointer border-2 border-dashed border-border rounded-xl p-4 hover:border-primary/50 transition-colors">
                    <Paperclip className="w-5 h-5 text-primary shrink-0" />
                    <span className="text-sm text-muted-foreground">{ep.attachHint}</span>
                    <input type="file" multiple accept={ACCEPTED} className="hidden" onChange={handleFiles} />
                  </label>
                  {files.length > 0 && (
                    <ul className="space-y-2 mt-2">
                      {files.map((f, i) => (
                        <li key={i} className="flex items-center justify-between bg-accent rounded-lg px-3 py-2 text-sm">
                          <span className="truncate max-w-[80%]">{f.name}</span>
                          <button type="button" onClick={() => removeFile(i)}>
                            <X className="w-4 h-4 text-muted-foreground hover:text-destructive" />
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <Button type="submit" size="lg" disabled={isSubmitting} className="w-full rounded-xl h-14 text-base">
                  {isSubmitting ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />{ep.submitting}</> : ep.submit}
                </Button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}