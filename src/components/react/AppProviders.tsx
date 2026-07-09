import type { ReactNode } from "react";
import { LanguageProvider } from "@/i18n/LanguageContext";
import AnalyticsPageView from "@/components/AnalyticsPageView";
import CookieBanner from "@/components/CookieBanner";

type AppProvidersProps = {
  children: ReactNode;
};

const AppProviders = ({ children }: AppProvidersProps) => (
  <LanguageProvider>
    <AnalyticsPageView />
    <CookieBanner />
    {children}
  </LanguageProvider>
);

export default AppProviders;
