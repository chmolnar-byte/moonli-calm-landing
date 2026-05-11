import { Apple, Play, Globe } from "lucide-react";
import logo from "@/assets/logo.png";
import { useLanguage } from "@/i18n/LanguageContext";
import { languageFlags, languageLabels, type Language } from "@/i18n/translations";
import { toast } from "@/components/ui/sonner";
import { useState, useRef, useEffect } from "react";
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
    const offset = isMobile ? 110 : 84;
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: "smooth" });
  }
}

const languages: Language[] = ["de", "en", "es", "fr", "ru"];
const GOOGLE_PLAY_URL = "https://play.google.com/store/apps/details?id=com.christian.moonli&hl=en";
const IOS_SOON_TEXT = "Wir arbeiten mit Hochdruck an der iPhone-Version. Sie ist bald für dich verfügbar.";

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
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/10">
      <div className="container flex items-center justify-between h-16 md:h-[4.5rem]">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 hover:opacity-90 transition-opacity shrink-0">
          <img src={logo} alt="Moonli Logo" className="w-8 h-8 md:w-9 md:h-9 rounded-full object-cover shadow-soft" />
          <span className="text-base md:text-lg font-extrabold tracking-tight text-white">
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
        <div className="hidden md:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
          {NAV_TABS.map((tab) => (
            <button
              key={tab.href}
              type="button"
              onClick={() => scrollToSection(tab.href)}
              className="px-4 py-1.5 rounded-full text-sm font-semibold text-white/75 hover:text-white hover:bg-white/10 transition-all duration-200"
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
            href="#"
            onClick={(event) => {
              event.preventDefault();
              toast(IOS_SOON_TEXT);
            }}
            className="relative hidden sm:flex items-center gap-2 px-4 py-2 rounded-full bg-white text-slate-900 text-sm font-semibold hover:opacity-90 transition-all hover:scale-[1.03] duration-200"
          >
            <Apple className="w-4 h-4" />
            {t("nav.appStore")}
            <span className="absolute -top-2 -right-2 px-1.5 py-0.5 rounded-full bg-primary text-primary-foreground text-[9px] font-bold leading-none shadow-sm">
              {t("nav.comingSoon")}
            </span>
          </a>
          <a
            href={GOOGLE_PLAY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-all hover:scale-[1.03] duration-200"
          >
            <Play className="w-4 h-4" />
            {t("nav.googlePlay")}
          </a>
        </div>
      </div>

      {/* Mobile tab row */}
      <div className="flex md:hidden items-center justify-center gap-1 px-4 pb-2 border-t border-white/8">
        {NAV_TABS.map((tab) => (
          <button
            key={tab.href}
            type="button"
            onClick={() => scrollToSection(tab.href)}
            className="flex-1 max-w-[120px] py-1.5 rounded-full text-xs font-semibold text-white/70 hover:text-white hover:bg-white/10 transition-all duration-200 text-center"
          >
            {tab.label}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
