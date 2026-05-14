import React, { createContext, useContext, useState, useEffect } from 'react';
import esTranslations from './translations/es';

const SUPPORTED_LANGS = ['es', 'en', 'de', 'fr', 'it', 'nl'];

const langLoaders = {
  es: () => Promise.resolve(esTranslations),
  en: () => import('./translations/en').then(m => m.default),
  de: () => import('./translations/de').then(m => m.default),
  fr: () => import('./translations/fr').then(m => m.default),
  it: () => import('./translations/it').then(m => m.default),
  nl: () => import('./translations/nl').then(m => m.default),
};

const LanguageContext = createContext();

function detectLanguage() {
  const browserLang = navigator.language || navigator.userLanguage || '';
  const code = browserLang.slice(0, 2).toLowerCase();
  if (SUPPORTED_LANGS.includes(code)) return code;
  return 'es';
}

export function LanguageProvider({ children }) {
  // ALWAYS render with Spanish first — prevents NO_FCP / blank page on Lighthouse
  // Language detection happens after first paint via useEffect
  const [lang, setLang] = useState('es');
  const [t, setT] = useState(esTranslations);

  useEffect(() => {
    // Detect browser language AFTER first render — no CLS, no blocked paint
    const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    if (!isMobile) return; // Desktop always shows Spanish

    const detected = detectLanguage();
    if (detected !== 'es') {
      setLang(detected);
      langLoaders[detected]().then(setT);
    }
  }, []);

  const changeLang = (newLang) => {
    if (!SUPPORTED_LANGS.includes(newLang)) return;
    setLang(newLang);
    langLoaders[newLang]().then(setT);
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang: changeLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}