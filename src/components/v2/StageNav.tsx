import { Moon, Sun } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import logo from "@/assets/logo.webp";
import { assetUrl } from "@/lib/assetUrl";
import { APP_STORE_URL } from "@/constants/storeUrls";
import { useLanguage } from "@/i18n/LanguageContext";
import { languageFlags, languageLabels, type Language } from "@/i18n/translations";
import { pageCopy } from "@/components/v2/copy";
import { scrollToSection, sectionHashPath } from "@/lib/scrollToSection";
import { useTheme } from "@/theme/ThemeContext";
import { trackEvent } from "@/lib/analytics";

const languages: Language[] = ["de", "en", "es", "fr", "ru"];

const StageNav = () => {
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const copy = pageCopy(language);
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onPointer = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onPointer);
    return () => document.removeEventListener("mousedown", onPointer);
  }, []);

  const go = (id: string) => {
    scrollToSection(id);
    window.history.replaceState(null, "", sectionHashPath(id));
  };

  const links = [
    [copy.navNight, "ablauf"],
    [copy.navYou, "mama"],
    [copy.navPrice, "preise"],
  ] as const;

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5">
      <div className="mx-auto flex h-14 max-w-[1280px] items-center gap-3 rounded-full border border-foreground/10 bg-background/75 px-3 shadow-[0_10px_40px_-24px_hsl(24_16%_20%/0.45)] backdrop-blur-xl sm:h-16 sm:px-4">
        <a href="/v2/" className="flex min-w-0 items-center gap-2 pr-1">
          <img src={assetUrl(logo)} alt="" className="h-8 w-8 rounded-full object-cover" />
          <span className="text-[15px] font-extrabold tracking-[0.16em] text-foreground">MOONLI</span>
        </a>

        <nav className="ml-2 hidden items-center gap-1 md:flex" aria-label="Moonli">
          {links.map(([label, id]) => (
            <button
              key={id}
              type="button"
              onClick={() => go(id)}
              className="rounded-full px-3 py-2 text-[15px] font-semibold text-foreground/70 transition-colors hover:bg-foreground/5 hover:text-foreground"
            >
              {label}
            </button>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-1.5">
          <div className="relative" ref={menuRef}>
            <button
              type="button"
              className="grid h-10 w-10 place-items-center rounded-full text-lg hover:bg-foreground/5"
              aria-label={t("nav.language")}
              aria-expanded={open}
              onClick={() => setOpen((value) => !value)}
            >
              {languageFlags[language]}
            </button>
            {open && (
              <ul className="absolute right-0 top-[calc(100%+8px)] z-20 min-w-[10rem] rounded-2xl border border-border bg-card p-1 shadow-lg">
                {languages.map((code) => (
                  <li key={code}>
                    <button
                      type="button"
                      className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-sm font-semibold hover:bg-foreground/5"
                      onClick={() => {
                        setLanguage(code);
                        setOpen(false);
                      }}
                    >
                      <span>{languageFlags[code]}</span>
                      {languageLabels[code]}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <button
            type="button"
            onClick={toggleTheme}
            className="grid h-10 w-10 place-items-center rounded-full hover:bg-foreground/5"
            aria-label={theme === "dark" ? t("nav.themeLight") : t("nav.themeDark")}
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <a
            href={APP_STORE_URL}
            onClick={() => trackEvent("store_click", { store: "app_store", location: "nav_v2" })}
            className="inline-flex h-10 items-center rounded-full bg-primary px-4 text-sm font-extrabold text-primary-foreground sm:h-11 sm:px-5"
          >
            {copy.navLoad}
          </a>
        </div>
      </div>
      <nav className="mx-auto mt-2 flex max-w-[1280px] justify-center gap-1 md:hidden" aria-label="Moonli">
        {links.map(([label, id]) => (
          <button
            key={id}
            type="button"
            onClick={() => go(id)}
            className="rounded-full px-3 py-1.5 text-[13px] font-semibold text-foreground/70"
          >
            {label}
          </button>
        ))}
      </nav>
    </header>
  );
};

export default StageNav;
