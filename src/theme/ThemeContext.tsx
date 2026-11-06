import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

/** A manual choice is stored as "<chosen>:<phase it was made in>" and only holds until day turns to night or back. */
const CHOICE_KEY = "moonli_theme_choice_v2";

const NIGHT_FROM_HOUR = 19;
const NIGHT_UNTIL_HOUR = 7;

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const isTheme = (value: string | null | undefined): value is Theme =>
  value === "light" || value === "dark";

export const themeForTime = (date: Date = new Date()): Theme => {
  const hour = date.getHours();
  return hour >= NIGHT_FROM_HOUR || hour < NIGHT_UNTIL_HOUR ? "dark" : "light";
};

const applyThemeClass = (theme: Theme) => {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  root.classList.toggle("dark", theme === "dark");
  root.dataset.theme = theme;
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) {
    meta.setAttribute("content", theme === "dark" ? "#0e1519" : "#EFE4D4");
  }
};

const readChoice = (phase: Theme): Theme | null => {
  try {
    const [chosen, madeIn] = (window.localStorage.getItem(CHOICE_KEY) ?? "").split(":");
    if (isTheme(chosen) && madeIn === phase) return chosen;
  } catch {
    // ignore
  }
  return null;
};

const writeChoice = (chosen: Theme) => {
  try {
    window.localStorage.setItem(CHOICE_KEY, `${chosen}:${themeForTime()}`);
  } catch {
    // ignore
  }
};

export const readStoredTheme = (): Theme => {
  if (typeof window === "undefined") return "light";
  const phase = themeForTime();
  return readChoice(phase) ?? phase;
};

const defaultContext: ThemeContextType = {
  theme: "light",
  setTheme: () => {},
  toggleTheme: () => {},
};

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setThemeState] = useState<Theme>(readStoredTheme);

  useEffect(() => {
    applyThemeClass(theme);
  }, [theme]);

  // Follow the clock while the page stays open: re-evaluate every minute.
  useEffect(() => {
    const id = window.setInterval(() => {
      setThemeState(readStoredTheme());
    }, 60_000);
    return () => window.clearInterval(id);
  }, []);

  const setTheme = useCallback((next: Theme) => {
    writeChoice(next);
    setThemeState(next);
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeState((current) => {
      const next = current === "dark" ? "light" : "dark";
      writeChoice(next);
      return next;
    });
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) return defaultContext;
  return ctx;
};
