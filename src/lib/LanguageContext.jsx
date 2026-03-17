import React, { createContext, useContext, useState } from 'react';
import { translations } from './translations';

const LanguageContext = createContext();

function detectLanguage() {
  // On mobile, try to detect browser language
  const browserLang = navigator.language || navigator.userLanguage || '';
  const code = browserLang.slice(0, 2).toLowerCase();
  if (translations[code]) return code;
  return 'es'; // default is Spanish
}

export function LanguageProvider({ children }) {
  const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  const [lang, setLang] = useState(isMobile ? detectLanguage() : 'es');
  const t = translations[lang];
  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}