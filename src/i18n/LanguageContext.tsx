import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react";
import translations, { type Language } from "./translations";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = "moonli_lang_v1";

const detectBrowserLanguage = (): Language => {
  if (typeof window === "undefined") return "de";
  const navLang =
    (navigator.languages && navigator.languages[0]) ||
    navigator.language ||
    "de";
  const code = navLang.toLowerCase();
  if (code.startsWith("de")) return "de";
  if (code.startsWith("es")) return "es";
  if (code.startsWith("fr")) return "fr";
  if (code.startsWith("ru")) return "ru";
  return "en";
};

const readStoredLanguage = (): Language => {
  if (typeof window === "undefined") return "de";
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY) as Language | null;
    if (stored && ["de", "en", "es", "fr", "ru"].includes(stored)) {
      return stored;
    }
  } catch {
    // ignore
  }
  return detectBrowserLanguage();
};

const createTranslator = (language: Language) => (key: string) =>
  translations[language]?.[key] ?? translations.de[key] ?? key;

const defaultContext: LanguageContextType = {
  language: "de",
  setLanguage: () => {},
  t: createTranslator("de"),
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>(readStoredLanguage);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, language);
    } catch {
      // ignore
    }
  }, [language]);

  const t = useCallback((key: string) => createTranslator(language)(key), [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) return defaultContext;
  return ctx;
};
