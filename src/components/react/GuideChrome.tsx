import Navbar from "@/components/Navbar";
import AppProviders from "@/components/react/AppProviders";
import type { Language } from "@/i18n/translations";

type GuideChromeProps = {
  language: Language;
  languageHrefs: Partial<Record<Language, string>>;
};

const GuideChrome = ({ language, languageHrefs }: GuideChromeProps) => (
  <AppProviders language={language}>
    <Navbar languageHrefs={languageHrefs} />
  </AppProviders>
);

export default GuideChrome;
