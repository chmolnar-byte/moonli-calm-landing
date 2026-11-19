import { useLanguage, detectBrowserLanguage } from "@/i18n/LanguageContext";
import translations, { languageFlags, languageLabels } from "@/i18n/translations";

// Unaufdringlicher Hinweis statt Vollbild-Dialog: Die Seite bleibt sofort
// benutzbar. Er erscheint nur, wenn die Browsersprache nicht Deutsch ist.
const LanguagePrompt = () => {
  const { needsLanguageChoice, confirmLanguageChoice } = useLanguage();

  if (!needsLanguageChoice) return null;

  const detected = detectBrowserLanguage();
  const title =
    translations[detected]?.["lang.prompt.title"] ?? translations.en["lang.prompt.title"];

  return (
    <div
      className="fixed left-1/2 top-20 z-[60] w-[calc(100%-2rem)] max-w-md -translate-x-1/2 rounded-2xl border border-border/60 bg-card/95 p-3 shadow-soft-xl backdrop-blur"
      role="region"
      aria-label={title}
    >
      <p className="mb-2 text-sm font-bold text-foreground">{title}</p>
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => confirmLanguageChoice(detected)}
          className="pressable inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
        >
          <span aria-hidden="true">{languageFlags[detected]}</span>
          {languageLabels[detected]}
        </button>
        <button
          type="button"
          onClick={() => confirmLanguageChoice("de")}
          className="pressable inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/50 px-4 py-2 text-sm font-semibold text-foreground"
        >
          <span aria-hidden="true">{languageFlags.de}</span>
          {languageLabels.de}
        </button>
      </div>
    </div>
  );
};

export default LanguagePrompt;
