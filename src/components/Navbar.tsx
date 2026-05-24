import { Apple, Play, Globe } from "lucide-react";
import logo from "@/assets/logo.png";
import { useLanguage } from "@/i18n/LanguageContext";
import { languageFlags, languageLabels, type Language } from "@/i18n/translations";
import { useState, useRef, useEffect } from "react";
import { APP_STORE_URL, GOOGLE_PLAY_URL } from "@/constants/storeUrls";
import { Link } from "react-router-dom";

const NAV_TABS = [
  { label: "Funktionen", href: "funktionen" },
  { label: "Preise", href: "preise" },
  { label: "Feedback", href: "feedback" },
] as const;

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (el) {
    const isMobile = window.innerWidth < 768;
    const offset = isMobile ? 128 : 108;
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: "smooth" });
  }
}

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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#182331] border-b border-[#182331]">
      <div className="container flex items-center justify-between py-2 min-h-[5rem] md:min-h-[5.75rem]">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 sm:gap-4 hover:opacity-90 transition-opacity shrink-0">
          <img src={logo} alt="Moonli Logo" className="w-16 h-16 sm:w-[4.5rem] sm:h-[4.5rem] md:w-20 md:h-20 rounded-full object-cover" />
          <span className="text-xl sm:text-2xl md:text-[1.75rem] font-normal tracking-[0.2em] text-white leading-none">
            MOONLI
          </span>
          <span className="hidden lg:flex items-center gap-1.5 text-xs text-white/70 font-medium ml-2 pl-3 border-l border-white/20">
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

        {/* Center nav tabs – only md+ */}
        <div className="hidden md:flex items-center gap-2 absolute left-1/2 -translate-x-1/2">
          {NAV_TABS.map((tab) => (
            <button
              key={tab.href}
              type="button"
              onClick={() => scrollToSection(tab.href)}
              className="px-5 py-2 rounded-full text-base font-semibold text-white/80 hover:text-white hover:bg-white/10 transition-all duration-200"
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2">
          {/* Language Switcher */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setOpen(!open)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-full glass-button text-sm font-semibold text-white hover:scale-[1.03] transition-all duration-200"
            >
              <span>{languageFlags[language]}</span>
              <Globe className="w-3.5 h-3.5 text-muted-foreground" />
            </button>
            {open && (
              <div className="absolute right-0 top-full mt-2 py-1 rounded-2xl bg-slate-900 shadow-soft-xl min-w-[140px] z-50 border border-white/15">
                {languages.map((lang) => (
                  <button
                    key={lang}
                    onClick={() => { setLanguage(lang); setOpen(false); }}
                    className={`w-full flex items-center gap-2.5 px-4 py-2 text-sm hover:bg-white/10 transition-colors text-white ${lang === language ? "font-bold" : ""}`}
                  >
                    <span>{languageFlags[lang]}</span>
                    <span>{languageLabels[lang]}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <a
            href={APP_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full bg-white text-slate-900 text-sm font-semibold hover:opacity-90 transition-all hover:scale-[1.03] duration-200"
          >
            <Apple className="w-4 h-4" />
            {t("nav.appStore")}
          </a>
          <a
            href={GOOGLE_PLAY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-white text-sm font-semibold hover:opacity-90 transition-all hover:scale-[1.03] duration-200"
          >
            <Play className="w-4 h-4 text-white" />
            {t("nav.googlePlay")}
          </a>
        </div>
      </div>

      {/* Mobile tab row */}
      <div className="flex md:hidden items-center justify-center gap-2 px-4 pb-2.5 border-t border-[#1f2a3a]">
        {NAV_TABS.map((tab) => (
          <button
            key={tab.href}
            type="button"
            onClick={() => scrollToSection(tab.href)}
            className="flex-1 max-w-[140px] py-2 rounded-full text-sm font-semibold text-white/75 hover:text-white hover:bg-white/10 transition-all duration-200 text-center"
          >
            {tab.label}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
