import type { ReactNode } from "react";
import { LanguageProvider } from "@/i18n/LanguageContext";
import type { Language } from "@/i18n/translations";
import { ThemeProvider } from "@/theme/ThemeContext";
import AnalyticsPageView from "@/components/AnalyticsPageView";
import CookieBanner from "@/components/CookieBanner";
import LanguagePrompt from "@/components/LanguagePrompt";

type AppProvidersProps = {
  children: ReactNode;
  language?: Language;
};

const AppProviders = ({ children, language }: AppProvidersProps) => (
  <ThemeProvider>
    <LanguageProvider language={language}>
      <AnalyticsPageView />
      <LanguagePrompt />
      <CookieBanner />
      {children}
    </LanguageProvider>
  </ThemeProvider>
);

export default AppProviders;
