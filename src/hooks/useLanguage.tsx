'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { zh, en, TranslationKeys } from '@/i18n';

type Language = 'zh' | 'en';

interface LanguageContextType {
  language: Language;
  t: TranslationKeys;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = { zh, en };

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('zh');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedLang = localStorage.getItem('language') as Language | null;
    if (savedLang && (savedLang === 'zh' || savedLang === 'en')) {
      setLanguageState(savedLang);
    } else {
      const browserLang = navigator.language.toLowerCase();
      if (browserLang.startsWith('en')) {
        setLanguageState('en');
      }
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
  };

  const toggleLanguage = () => {
    const newLang = language === 'zh' ? 'en' : 'zh';
    setLanguage(newLang);
  };

  const value: LanguageContextType = {
    language,
    t: translations[language],
    setLanguage,
    toggleLanguage,
  };

  if (!mounted) {
    return (
      <LanguageContext.Provider value={{ language: 'zh', t: zh, setLanguage: () => {}, toggleLanguage: () => {} }}>
        {children}
      </LanguageContext.Provider>
    );
  }

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
