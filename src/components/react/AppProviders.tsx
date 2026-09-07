import type { ReactNode } from "react";
import { LanguageProvider } from "@/i18n/LanguageContext";
import { ThemeProvider } from "@/theme/ThemeContext";
import AnalyticsPageView from "@/components/AnalyticsPageView";
import CookieBanner from "@/components/CookieBanner";
import LanguagePrompt from "@/components/LanguagePrompt";

type AppProvidersProps = {
  children: ReactNode;
};

const AppProviders = ({ children }: AppProvidersProps) => (
  <ThemeProvider>
    <LanguageProvider>
      <AnalyticsPageView />
      <LanguagePrompt />
      <CookieBanner />
      {children}
    </LanguageProvider>
  </ThemeProvider>
);

export default AppProviders;
