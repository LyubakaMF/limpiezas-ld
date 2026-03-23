import React, { useState } from 'react';
import { Cookie } from 'lucide-react';
import { getCookieConsent, setCookieConsent, loadGoogleAnalytics, updateGoogleAdsConsent } from '@/lib/cookieConsent';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/lib/LanguageContext';

const texts = {
  es: { title: 'Preferencias de cookies', save: 'Guardar', analytics: 'Análisis', marketing: 'Publicidad', necessary: 'Necesarias', alwaysOn: 'Siempre activas' },
  en: { title: 'Cookie preferences', save: 'Save', analytics: 'Analytics', marketing: 'Marketing', necessary: 'Necessary', alwaysOn: 'Always on' },
  de: { title: 'Cookie-Einstellungen', save: 'Speichern', analytics: 'Analyse', marketing: 'Werbung', necessary: 'Notwendig', alwaysOn: 'Immer aktiv' },
  fr: { title: 'Préférences cookies', save: 'Enregistrer', analytics: 'Analyse', marketing: 'Publicité', necessary: 'Nécessaires', alwaysOn: 'Toujours actif' },
  it: { title: 'Preferenze cookie', save: 'Salva', analytics: 'Analisi', marketing: 'Marketing', necessary: 'Necessari', alwaysOn: 'Sempre attivi' },
  nl: { title: 'Cookie-instellingen', save: 'Opslaan', analytics: 'Analyse', marketing: 'Marketing', necessary: 'Noodzakelijk', alwaysOn: 'Altijd aan' },
};

export default function CookieSettingsButton() {
  const { lang } = useLanguage();
  const [open, setOpen] = useState(false);
  const consent = getCookieConsent();
  const [analytics, setAnalytics] = useState(consent?.analytics || false);
  const [marketing, setMarketing] = useState(consent?.marketing || false);
  const tx = texts[lang] || texts.es;

  const handleSave = () => {
    setCookieConsent({ analytics, marketing });
    updateGoogleAdsConsent(analytics, marketing);
    if (analytics) loadGoogleAnalytics();
    setOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-1 text-xs text-background/40 hover:text-background/60 transition-colors"
        title={tx.title}
      >
        <Cookie className="w-3.5 h-3.5" />
        <span>Cookies</span>
      </button>

      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-[9999] flex items-end sm:items-center justify-center p-4 bg-black/50">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-sm"
            >
              <h3 className="font-bold text-foreground mb-4">{tx.title}</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-muted rounded-xl">
                  <p className="text-sm font-medium">{tx.necessary}</p>
                  <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">{tx.alwaysOn}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted rounded-xl">
                  <p className="text-sm font-medium">{tx.analytics}</p>
                  <button onClick={() => setAnalytics(!analytics)} className={`relative w-11 h-6 rounded-full transition-colors ${analytics ? 'bg-primary' : 'bg-gray-300'}`}>
                    <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${analytics ? 'translate-x-5' : ''}`} />
                  </button>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted rounded-xl">
                  <p className="text-sm font-medium">{tx.marketing}</p>
                  <button onClick={() => setMarketing(!marketing)} className={`relative w-11 h-6 rounded-full transition-colors ${marketing ? 'bg-primary' : 'bg-gray-300'}`}>
                    <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${marketing ? 'translate-x-5' : ''}`} />
                  </button>
                </div>
              </div>
              <div className="mt-4 flex gap-2">
                <Button size="sm" onClick={handleSave} className="flex-1 rounded-full">{tx.save}</Button>
                <Button size="sm" variant="outline" onClick={() => setOpen(false)} className="rounded-full">✕</Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}