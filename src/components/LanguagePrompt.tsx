import { useMemo, useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import translations, {
  languageFlags,
  languageLabels,
  type Language,
} from "@/i18n/translations";

const languages: Language[] = ["de", "en", "es", "fr", "ru"];

const LanguagePrompt = () => {
  const { language, needsLanguageChoice, confirmLanguageChoice } = useLanguage();
  const [selected, setSelected] = useState<Language>(language);

  const t = useMemo(
    () => (key: string) =>
      translations[selected]?.[key] ?? translations.de[key] ?? key,
    [selected],
  );

  if (!needsLanguageChoice) return null;

  return (
    <div className="overlay-enter fixed inset-0 z-[70] flex items-end sm:items-center justify-center bg-background/70 backdrop-blur-sm px-4 py-6">
      <div
        className="sheet-enter glass-card-premium max-w-md w-full p-5 sm:p-6 shadow-soft-xl border border-border/60"
        role="dialog"
        aria-modal="true"
        aria-labelledby="lang-prompt-title"
      >
        <h2 id="lang-prompt-title" className="text-base sm:text-lg font-extrabold mb-2">
          {t("lang.prompt.title")}
        </h2>
        <p className="text-xs sm:text-sm text-muted-foreground mb-4">
          {t("lang.prompt.text")}
        </p>
        {selected !== "de" && (
          <p className="mb-4 rounded-2xl border border-border/60 bg-background/50 px-3 py-2.5 text-xs sm:text-sm leading-relaxed text-muted-foreground">
            {t("lang.mediaNote")}
          </p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-5">
          {languages.map((lang) => {
            const isActive = selected === lang;
            return (
              <button
                key={lang}
                type="button"
                onClick={() => setSelected(lang)}
                className={`pressable flex items-center gap-2.5 px-3 py-2.5 rounded-2xl border text-sm font-semibold ${
                  isActive
                    ? "border-primary bg-primary/15 text-foreground"
                    : "border-border/60 bg-background/50 text-foreground hover:bg-foreground/5"
                }`}
                aria-pressed={isActive}
              >
                <span className="text-base" aria-hidden="true">
                  {languageFlags[lang]}
                </span>
                <span>{languageLabels[lang]}</span>
              </button>
            );
          })}
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => confirmLanguageChoice(selected)}
            className="pressable inline-flex items-center justify-center px-4 py-2 rounded-full bg-primary text-primary-foreground font-semibold text-xs sm:text-sm shadow-soft-lg"
          >
            {t("lang.prompt.continue")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LanguagePrompt;
