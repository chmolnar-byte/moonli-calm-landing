import AppProviders from "@/components/react/AppProviders";
import Navbar from "@/components/Navbar";
import ScrollProgress from "@/components/ScrollProgress";
import HeroSection from "@/components/HeroSection";
import StatsCounter from "@/components/StatsCounter";
import Marquee from "@/components/Marquee";
import FeaturesSection from "@/components/FeaturesSection";
import CompareSection from "@/components/CompareSection";
import Testimonials from "@/components/Testimonials";
import PricingSection from "@/components/PricingSection";
import FounderSection from "@/components/FounderSection";
import AnalyticsEngagement from "@/components/AnalyticsEngagement";
import CTAFooter from "@/components/CTAFooter";
import { scrollToHashFromUrl } from "@/lib/scrollToSection";
import { useTheme } from "@/theme/ThemeContext";
import { useEffect } from "react";

const LandingSurface = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div
      className={`${isDark ? "night-sky" : "linen"} min-h-[100dvh] bg-gradient-page text-foreground`}
    >
      <div className="night-sky-stars fixed inset-0 z-0 pointer-events-none" />
      <div className="linen-leaves pointer-events-none">
        <div className="linen-leaf top-[-8%] right-0 h-[380px] w-[380px] rounded-full" />
      </div>

      <ScrollProgress />
      <Navbar />
      <AnalyticsEngagement />
      <div className="relative overflow-x-clip">
        <div className="relative flex min-h-[100dvh] flex-col pb-2">
          <HeroSection />
          <Marquee />
        </div>
        <StatsCounter />
        <div id="funktionen"><FeaturesSection /></div>
        <div id="vergleich"><CompareSection /></div>
        <div id="feedback"><Testimonials /></div>
        <div id="preise"><PricingSection /></div>
        <div id="gruender"><FounderSection /></div>
        <CTAFooter />
      </div>
    </div>
  );
};

const LandingPage = () => {
  useEffect(() => {
    scrollToHashFromUrl();
  }, []);

  return (
    <AppProviders>
      <LandingSurface />
    </AppProviders>
  );
};

export default LandingPage;
