import { createContext, useContext, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import type { Lang } from '../types';
import { translations, type Translation } from './translations';

interface LanguageContextValue {
  lang: Lang;
  t: Translation;
  toggleLang: () => void;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('ja');

  const value = useMemo<LanguageContextValue>(
    () => ({
      lang,
      t: translations[lang],
      toggleLang: () => setLang((prev) => (prev === 'ja' ? 'en' : 'ja')),
    }),
    [lang],
  );

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return ctx;
}
