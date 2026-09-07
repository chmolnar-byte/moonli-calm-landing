import { Apple, Play, Globe, Moon, Sun } from "lucide-react";
import logo from "@/assets/logo.webp";
import { assetUrl } from "@/lib/assetUrl";
import { useLanguage } from "@/i18n/LanguageContext";
import { languageFlags, languageLabels, type Language } from "@/i18n/translations";
import { useTheme } from "@/theme/ThemeContext";
import { useState, useRef, useEffect, type MouseEvent as ReactMouseEvent } from "react";
import MagneticCta from "@/components/MagneticCta";
import { APP_STORE_URL, GOOGLE_PLAY_URL } from "@/constants/storeUrls";
import { isHomePath, scrollToSection } from "@/lib/scrollToSection";

const NAV_TABS = [
  { labelKey: "nav.features", href: "funktionen" },
  { labelKey: "nav.feedback", href: "feedback" },
  { labelKey: "nav.pricing", href: "preise" },
] as const;

const tabClassName =
  "px-5 py-2 rounded-full text-base font-semibold text-foreground/70 hover:text-foreground hover:bg-foreground/5 transition-colors duration-200 pointer-events-auto";

const mobileTabClassName =
  "flex-1 max-w-[140px] py-2 rounded-full text-sm font-semibold text-foreground/65 hover:text-foreground hover:bg-foreground/5 transition-colors duration-200 text-center pointer-events-auto";

const languages: Language[] = ["de", "en", "es", "fr", "ru"];

const Navbar = () => {
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: globalThis.MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSectionNav = (event: ReactMouseEvent<HTMLAnchorElement>, sectionId: string) => {
    if (isHomePath(window.location.pathname)) {
      event.preventDefault();
      scrollToSection(sectionId);
      window.history.replaceState(null, "", `/#${sectionId}`);
    }
  };

  const renderNavTab = (tab: (typeof NAV_TABS)[number], className: string) => (
    <a
      key={tab.href}
      href={`/#${tab.href}`}
      className={className}
      onClick={(event) => handleSectionNav(event, tab.href)}
    >
      {t(tab.labelKey)}
    </a>
  );

  return (
    <nav className="nav-glass fixed top-0 left-0 right-0 z-50">
      <div className="container relative flex items-center justify-between h-16 md:h-[4.5rem]">
        <a href="/" className="relative z-20 flex items-center gap-2.5 hover:opacity-90 transition-opacity shrink-0 min-w-0">
          <img src={assetUrl(logo)} alt="Moonli Logo" className="w-10 h-10 md:w-11 md:h-11 rounded-full object-cover" />
          <span className="flex min-w-0 flex-col justify-center gap-[5px]">
            <span className="flex items-center gap-1.5">
              <span className="text-lg md:text-xl font-semibold tracking-[0.18em] text-foreground leading-none">
                MOONLI
              </span>
              <span
                className="block h-[9px] w-[13px] shrink-0 overflow-hidden"
                title="Österreich"
                aria-hidden="true"
              >
                <svg
                  viewBox="0 0 9 6"
                  className="block h-full w-full"
                  xmlns="http://www.w3.org/2000/svg"
                  shapeRendering="crispEdges"
                >
                  <rect width="9" height="6" fill="#C8102E" />
                  <rect y="2" width="9" height="2" fill="#fff" />
                </svg>
              </span>
            </span>
            <span className="text-[8px] sm:text-[10px] font-medium tracking-[0.1em] sm:tracking-[0.14em] text-muted-foreground/70 leading-none whitespace-nowrap">
              From Vienna with Love
            </span>
          </span>
        </a>

        <div className="hidden md:flex items-center gap-2 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none">
          {NAV_TABS.map((tab) => renderNavTab(tab, tabClassName))}
        </div>

        <div className="relative z-40 flex items-center gap-2 shrink-0 ml-auto">
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setOpen(!open)}
              className="pressable inline-flex h-11 items-center gap-1.5 rounded-full bg-card border border-border px-3 text-foreground shadow-soft"
              aria-label={t("nav.language")}
              aria-expanded={open}
              aria-haspopup="listbox"
            >
              <span className="text-sm leading-none">{languageFlags[language]}</span>
              <Globe className="w-3.5 h-3.5 text-muted-foreground" />
            </button>
            {open && (
              <div className="popover-menu absolute right-0 top-full mt-2 py-1 rounded-2xl bg-card shadow-soft-xl min-w-[220px] z-[120] border border-border">
                {languages.map((lang) => (
                  <button
                    key={lang}
                    onClick={() => { setLanguage(lang); setOpen(false); }}
                    className={`w-full flex items-center gap-2.5 px-4 py-2 text-sm hover:bg-muted transition-colors text-foreground ${lang === language ? "font-bold" : ""}`}
                  >
                    <span>{languageFlags[lang]}</span>
                    <span>{languageLabels[lang]}</span>
                  </button>
                ))}
                {language !== "de" && (
                  <p className="mx-3 mb-2 mt-1 border-t border-border pt-2 text-[11px] leading-relaxed text-muted-foreground">
                    {t("lang.mediaNote")}
                  </p>
                )}
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={toggleTheme}
            className="icon-circle"
            aria-label={theme === "dark" ? t("nav.themeLight") : t("nav.themeDark")}
          >
            {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          <MagneticCta
            href={APP_STORE_URL}
            variant="ghost"
            size="sm"
            className="hidden sm:inline-flex"
          >
            <Apple className="w-4 h-4" />
            {t("nav.appStore")}
          </MagneticCta>
          <MagneticCta href={GOOGLE_PLAY_URL} variant="primary" size="sm">
            <Play className="w-4 h-4" />
            {t("nav.googlePlay")}
          </MagneticCta>
        </div>
      </div>

      <div className="relative z-30 flex md:hidden items-center justify-center gap-2 px-4 pb-2.5 border-t border-border">
        {NAV_TABS.map((tab) => renderNavTab(tab, mobileTabClassName))}
      </div>
    </nav>
  );
};

export default Navbar;
