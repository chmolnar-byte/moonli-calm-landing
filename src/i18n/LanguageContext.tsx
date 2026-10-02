import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react";
import translations, { type Language } from "./translations";

const LANGUAGES: Language[] = ["de", "en", "es", "fr", "ru"];

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  needsLanguageChoice: boolean;
  confirmLanguageChoice: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = "moonli_lang_v1";
const CHOICE_KEY = "moonli_lang_choice_v1";

const isLanguage = (value: string | null): value is Language =>
  !!value && LANGUAGES.includes(value as Language);

export const detectBrowserLanguage = (): Language => {
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

const readHasLanguageChoice = (): boolean => {
  if (typeof window === "undefined") return true;
  try {
    return window.localStorage.getItem(CHOICE_KEY) === "1";
  } catch {
    return true;
  }
};

const readStoredLanguage = (): Language => {
  if (typeof window === "undefined") return "de";
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (isLanguage(stored)) return stored;
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
  needsLanguageChoice: false,
  confirmLanguageChoice: () => {},
  t: createTranslator("de"),
};

export const LanguageProvider = ({
  children,
  language: pageLanguage,
}: {
  children: ReactNode;
  language?: Language;
}) => {
  const locked = pageLanguage !== undefined;
  const [language, setLanguageState] = useState<Language>(pageLanguage ?? readStoredLanguage);
  const [needsLanguageChoice, setNeedsLanguageChoice] = useState(false);

  useEffect(() => {
    if (locked) return;
    setNeedsLanguageChoice(!readHasLanguageChoice());
  }, [locked]);

  useEffect(() => {
    if (locked) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, language);
    } catch {
      // ignore
    }
  }, [language, locked]);

  const markChoice = useCallback(() => {
    try {
      window.localStorage.setItem(CHOICE_KEY, "1");
    } catch {
      // ignore
    }
    setNeedsLanguageChoice(false);
  }, []);

  const setLanguage = useCallback(
    (lang: Language) => {
      setLanguageState(lang);
      markChoice();
    },
    [markChoice],
  );

  const confirmLanguageChoice = useCallback(
    (lang: Language) => {
      setLanguageState(lang);
      markChoice();
    },
    [markChoice],
  );

  const t = useCallback((key: string) => createTranslator(language)(key), [language]);

  return (
    <LanguageContext.Provider
      value={{ language, setLanguage, needsLanguageChoice, confirmLanguageChoice, t }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) return defaultContext;
  return ctx;
};
