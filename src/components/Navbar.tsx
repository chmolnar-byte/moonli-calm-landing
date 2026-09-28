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
  "px-4 py-2 rounded-full text-base font-semibold text-foreground/70 hover:text-foreground hover:bg-foreground/5 transition-colors duration-200";

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

  const storeFaceClassName =
    "h-9 w-9 px-0 py-0 gap-0 xl:h-11 xl:w-auto xl:px-3.5 xl:py-2 xl:gap-2";

  return (
    <nav className="nav-glass fixed top-0 left-0 right-0 z-50">
      <div className="container relative flex h-14 items-center gap-2 px-3 sm:h-16 sm:px-6 md:h-[4.5rem]">
        <a href="/" className="relative z-20 flex min-w-0 items-center gap-2 hover:opacity-90 transition-opacity sm:gap-2.5 lg:flex-1">
          <img src={assetUrl(logo)} alt="Moonli Logo" className="h-8 w-8 shrink-0 rounded-full object-cover sm:h-10 sm:w-10 md:h-11 md:w-11" />
          <span className="flex min-w-0 flex-col justify-center gap-[3px] sm:gap-[5px]">
            <span className="flex items-center gap-1.5">
              <span className="text-[15px] font-semibold leading-none tracking-[0.14em] text-foreground sm:text-lg sm:tracking-[0.18em] md:text-xl">
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
            <span className="hidden text-[10px] font-medium leading-none tracking-[0.14em] text-muted-foreground/70 sm:block">
              From Vienna with Love
            </span>
          </span>
        </a>

        <div className="hidden items-center justify-center gap-1 lg:flex">
          {NAV_TABS.map((tab) => renderNavTab(tab, tabClassName))}
        </div>

        <div className="relative z-40 ml-auto flex shrink-0 items-center justify-end gap-1 sm:gap-2 lg:ml-0 lg:flex-1">
          <div className="relative shrink-0" ref={dropdownRef}>
            <button
              onClick={() => setOpen(!open)}
              className="pressable icon-circle shrink-0 sm:h-11 sm:w-auto sm:gap-1.5 sm:px-3"
              aria-label={t("nav.language")}
              aria-expanded={open}
              aria-haspopup="listbox"
            >
              <span className="text-sm leading-none">{languageFlags[language]}</span>
              <Globe className="hidden h-3.5 w-3.5 text-muted-foreground sm:block" />
            </button>
            {open && (
              <div className="popover-menu absolute right-0 top-full z-[120] mt-2 min-w-[min(220px,calc(100vw-1.5rem))] rounded-2xl border border-border bg-card py-1 shadow-soft-xl">
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
            className="icon-circle h-9 w-9 shrink-0 sm:h-10 sm:w-10"
            aria-label={theme === "dark" ? t("nav.themeLight") : t("nav.themeDark")}
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          <MagneticCta
            href={APP_STORE_URL}
            variant="ghost"
            size="sm"
            className="shrink-0"
            faceClassName={storeFaceClassName}
            trackEventName="store_click"
            trackParams={{ store: "app_store", location: "nav" }}
          >
            <Apple className="h-4 w-4" />
            <span className="sr-only xl:not-sr-only">{t("nav.appStore")}</span>
          </MagneticCta>
          <MagneticCta
            href={GOOGLE_PLAY_URL}
            variant="primary"
            size="sm"
            className="shrink-0"
            faceClassName={storeFaceClassName}
            trackEventName="store_click"
            trackParams={{ store: "google_play", location: "nav" }}
          >
            <Play className="h-4 w-4" />
            <span className="sr-only xl:not-sr-only">{t("nav.googlePlay")}</span>
          </MagneticCta>
        </div>
      </div>

      <div className="relative z-30 flex items-center justify-center gap-1 border-t border-border px-3 py-1.5 lg:hidden">
        {NAV_TABS.map((tab) => renderNavTab(tab, mobileTabClassName))}
      </div>
    </nav>
  );
};

export default Navbar;
