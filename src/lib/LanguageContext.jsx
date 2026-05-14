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
  const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  const initialLang = isMobile ? detectLanguage() : 'es';

  const [lang, setLang] = useState(initialLang);
  const [t, setT] = useState(initialLang === 'es' ? esTranslations : null);

  useEffect(() => {
    if (lang === 'es' && t === esTranslations) return;
    langLoaders[lang]().then(setT);
  }, [lang]);

  const changeLang = (newLang) => {
    if (SUPPORTED_LANGS.includes(newLang)) setLang(newLang);
  };

  if (!t) return null; // brief loading while non-ES translation loads

  return (
    <LanguageContext.Provider value={{ lang, setLang: changeLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}