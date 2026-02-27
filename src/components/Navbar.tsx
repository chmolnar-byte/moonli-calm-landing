import { Apple, Play, Globe } from "lucide-react";
import logo from "@/assets/logo.png";
import { useLanguage } from "@/i18n/LanguageContext";
import { languageFlags, languageLabels, type Language } from "@/i18n/translations";
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

const languages: Language[] = ["de", "en", "es", "fr", "ru"];

const Navbar = () => {
  const { language, setLanguage, t } = useLanguage();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="container flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 hover:opacity-90 transition-opacity">
          <img src={logo} alt="Moonli Logo" className="w-9 h-9 rounded-full object-cover shadow-soft" />
          <span className="text-lg font-extrabold tracking-tight text-foreground">
            MOONLI
          </span>
          <span className="hidden md:flex items-center gap-1.5 text-xs text-muted-foreground font-medium ml-2 pl-3 border-l border-border/50">
            From Vienna with Love
            <span className="inline-flex w-4 h-3 rounded-sm overflow-hidden shadow-sm">
              <span className="flex flex-col w-full h-full">
                <span className="h-1/3 bg-[hsl(0,80%,55%)]" />
                <span className="h-1/3 bg-white" />
                <span className="h-1/3 bg-[hsl(0,80%,55%)]" />
              </span>
            </span>
          </span>
        </Link>

        {/* Right side */}
        <div className="flex items-center gap-2">
          {/* Language Switcher */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setOpen(!open)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-full glass-button text-sm font-semibold hover:scale-[1.03] transition-all duration-200"
            >
              <span>{languageFlags[language]}</span>
              <Globe className="w-3.5 h-3.5 text-muted-foreground" />
            </button>
            {open && (
              <div className="absolute right-0 top-full mt-2 py-1 rounded-2xl glass-card-premium shadow-soft-xl min-w-[140px] z-50">
                {languages.map((lang) => (
                  <button
                    key={lang}
                    onClick={() => { setLanguage(lang); setOpen(false); }}
                    className={`w-full flex items-center gap-2.5 px-4 py-2 text-sm hover:bg-muted/50 transition-colors ${lang === language ? "font-bold" : ""}`}
                  >
                    <span>{languageFlags[lang]}</span>
                    <span>{languageLabels[lang]}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <a
            href="#"
            className="relative hidden sm:flex items-center gap-2 px-4 py-2 rounded-full bg-foreground text-background text-sm font-semibold hover:opacity-90 transition-all hover:scale-[1.03] duration-200"
          >
            <Apple className="w-4 h-4" />
            {t("nav.appStore")}
            <span className="absolute -top-2 -right-2 px-1.5 py-0.5 rounded-full bg-primary text-primary-foreground text-[9px] font-bold leading-none shadow-sm">
              {t("nav.comingSoon")}
            </span>
          </a>
          <a
            href="#"
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-all hover:scale-[1.03] duration-200"
          >
            <Play className="w-4 h-4" />
            {t("nav.googlePlay")}
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
