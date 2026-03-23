import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, X, ChevronDown, ChevronUp, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getCookieConsent, setCookieConsent, hasConsented, loadGoogleAnalytics, updateGoogleAdsConsent } from '@/lib/cookieConsent';
import { useLanguage } from '@/lib/LanguageContext';

const cookieTexts = {
  es: {
    title: '🍪 Utilizamos cookies',
    desc: 'Usamos cookies para mejorar tu experiencia, analizar el tráfico y mostrarte publicidad relevante. Puedes personalizar tus preferencias.',
    acceptAll: 'Aceptar todas',
    rejectAll: 'Solo necesarias',
    customize: 'Personalizar',
    save: 'Guardar preferencias',
    necessary: 'Necesarias',
    necessaryDesc: 'Imprescindibles para el funcionamiento del sitio. No se pueden desactivar.',
    analytics: 'Análisis',
    analyticsDesc: 'Nos ayudan a entender cómo usas el sitio para mejorarlo.',
    marketing: 'Publicidad',
    marketingDesc: 'Permiten mostrarte anuncios relevantes y medir su efectividad.',
    alwaysOn: 'Siempre activas',
    policy: 'Política de cookies',
  },
  en: {
    title: '🍪 We use cookies',
    desc: 'We use cookies to enhance your experience, analyze traffic, and show you relevant ads. You can customize your preferences.',
    acceptAll: 'Accept all',
    rejectAll: 'Necessary only',
    customize: 'Customize',
    save: 'Save preferences',
    necessary: 'Necessary',
    necessaryDesc: 'Essential for the website to function. Cannot be disabled.',
    analytics: 'Analytics',
    analyticsDesc: 'Help us understand how you use the site to improve it.',
    marketing: 'Marketing',
    marketingDesc: 'Allow us to show relevant ads and measure their effectiveness.',
    alwaysOn: 'Always on',
    policy: 'Cookie policy',
  },
  de: {
    title: '🍪 Wir verwenden Cookies',
    desc: 'Wir verwenden Cookies, um Ihr Erlebnis zu verbessern, den Datenverkehr zu analysieren und relevante Werbung anzuzeigen.',
    acceptAll: 'Alle akzeptieren',
    rejectAll: 'Nur notwendige',
    customize: 'Anpassen',
    save: 'Einstellungen speichern',
    necessary: 'Notwendig',
    necessaryDesc: 'Unverzichtbar für die Funktion der Website.',
    analytics: 'Analyse',
    analyticsDesc: 'Helfen uns zu verstehen, wie Sie die Website nutzen.',
    marketing: 'Werbung',
    marketingDesc: 'Ermöglichen relevante Anzeigen und messen deren Effektivität.',
    alwaysOn: 'Immer aktiv',
    policy: 'Cookie-Richtlinie',
  },
  fr: {
    title: '🍪 Nous utilisons des cookies',
    desc: 'Nous utilisons des cookies pour améliorer votre expérience, analyser le trafic et afficher des publicités pertinentes.',
    acceptAll: 'Tout accepter',
    rejectAll: 'Nécessaires uniquement',
    customize: 'Personnaliser',
    save: 'Enregistrer les préférences',
    necessary: 'Nécessaires',
    necessaryDesc: 'Indispensables au fonctionnement du site.',
    analytics: 'Analyse',
    analyticsDesc: 'Nous aident à comprendre comment vous utilisez le site.',
    marketing: 'Publicité',
    marketingDesc: 'Permettent d\'afficher des annonces pertinentes.',
    alwaysOn: 'Toujours actif',
    policy: 'Politique de cookies',
  },
  it: {
    title: '🍪 Utilizziamo i cookie',
    desc: 'Utilizziamo i cookie per migliorare la tua esperienza, analizzare il traffico e mostrarti annunci pertinenti.',
    acceptAll: 'Accetta tutti',
    rejectAll: 'Solo necessari',
    customize: 'Personalizza',
    save: 'Salva preferenze',
    necessary: 'Necessari',
    necessaryDesc: 'Essenziali per il funzionamento del sito.',
    analytics: 'Analisi',
    analyticsDesc: 'Ci aiutano a capire come utilizzi il sito.',
    marketing: 'Marketing',
    marketingDesc: 'Consentono di mostrare annunci pertinenti.',
    alwaysOn: 'Sempre attivi',
    policy: 'Cookie policy',
  },
  nl: {
    title: '🍪 Wij gebruiken cookies',
    desc: 'We gebruiken cookies om uw ervaring te verbeteren, verkeer te analyseren en relevante advertenties te tonen.',
    acceptAll: 'Alles accepteren',
    rejectAll: 'Alleen noodzakelijk',
    customize: 'Aanpassen',
    save: 'Voorkeuren opslaan',
    necessary: 'Noodzakelijk',
    necessaryDesc: 'Essentieel voor de werking van de website.',
    analytics: 'Analyse',
    analyticsDesc: 'Helpen ons begrijpen hoe u de site gebruikt.',
    marketing: 'Marketing',
    marketingDesc: 'Staan relevante advertenties en meting toe.',
    alwaysOn: 'Altijd aan',
    policy: 'Cookiebeleid',
  },
};

export default function CookieBanner() {
  const { lang } = useLanguage();
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  const tx = cookieTexts[lang] || cookieTexts.es;

  useEffect(() => {
    if (!hasConsented()) {
      // Small delay so page loads first
      const timer = setTimeout(() => setVisible(true), 1200);
      return () => clearTimeout(timer);
    } else {
      const consent = getCookieConsent();
      if (consent?.analytics) loadGoogleAnalytics();
      updateGoogleAdsConsent(consent?.analytics, consent?.marketing);
    }
  }, []);

  const applyConsent = (analyticsVal, marketingVal) => {
    setCookieConsent({ analytics: analyticsVal, marketing: marketingVal });
    updateGoogleAdsConsent(analyticsVal, marketingVal);
    if (analyticsVal) loadGoogleAnalytics();
    setVisible(false);
  };

  const handleAcceptAll = () => applyConsent(true, true);
  const handleRejectAll = () => applyConsent(false, false);
  const handleSaveCustom = () => applyConsent(analytics, marketing);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 z-[9999] p-4 md:p-6"
        >
          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl border border-border overflow-hidden">
            {/* Main Banner */}
            <div className="p-5 md:p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                  <Cookie className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-foreground text-base mb-1">{tx.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{tx.desc}</p>
                </div>
              </div>

              {/* Expanded customization */}
              <AnimatePresence>
                {expanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-4 space-y-3 border-t pt-4">
                      {/* Necessary */}
                      <div className="flex items-center justify-between p-3 bg-muted rounded-xl">
                        <div>
                          <p className="text-sm font-semibold">{tx.necessary}</p>
                          <p className="text-xs text-muted-foreground">{tx.necessaryDesc}</p>
                        </div>
                        <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">{tx.alwaysOn}</span>
                      </div>
                      {/* Analytics */}
                      <div className="flex items-center justify-between p-3 bg-muted rounded-xl">
                        <div>
                          <p className="text-sm font-semibold">{tx.analytics}</p>
                          <p className="text-xs text-muted-foreground">{tx.analyticsDesc}</p>
                        </div>
                        <button
                          onClick={() => setAnalytics(!analytics)}
                          className={`relative w-11 h-6 rounded-full transition-colors ${analytics ? 'bg-primary' : 'bg-gray-300'}`}
                        >
                          <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${analytics ? 'translate-x-5' : ''}`} />
                        </button>
                      </div>
                      {/* Marketing */}
                      <div className="flex items-center justify-between p-3 bg-muted rounded-xl">
                        <div>
                          <p className="text-sm font-semibold">{tx.marketing}</p>
                          <p className="text-xs text-muted-foreground">{tx.marketingDesc}</p>
                        </div>
                        <button
                          onClick={() => setMarketing(!marketing)}
                          className={`relative w-11 h-6 rounded-full transition-colors ${marketing ? 'bg-primary' : 'bg-gray-300'}`}
                        >
                          <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${marketing ? 'translate-x-5' : ''}`} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Actions */}
              <div className="mt-4 flex flex-wrap gap-2 items-center">
                {!expanded ? (
                  <>
                    <Button size="sm" onClick={handleAcceptAll} className="rounded-full text-sm">
                      {tx.acceptAll}
                    </Button>
                    <Button size="sm" variant="outline" onClick={handleRejectAll} className="rounded-full text-sm">
                      {tx.rejectAll}
                    </Button>
                    <button
                      onClick={() => setExpanded(true)}
                      className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1 ml-auto"
                    >
                      {tx.customize} <ChevronDown className="w-3.5 h-3.5" />
                    </button>
                  </>
                ) : (
                  <>
                    <Button size="sm" onClick={handleSaveCustom} className="rounded-full text-sm">
                      {tx.save}
                    </Button>
                    <Button size="sm" onClick={handleAcceptAll} variant="outline" className="rounded-full text-sm">
                      {tx.acceptAll}
                    </Button>
                    <button
                      onClick={() => setExpanded(false)}
                      className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1 ml-auto"
                    >
                      <ChevronUp className="w-3.5 h-3.5" />
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}