import Navbar from "@/components/Navbar";
import ScrollProgress from "@/components/ScrollProgress";
import HeroSection from "@/components/HeroSection";
import StatsCounter from "@/components/StatsCounter";
import Marquee from "@/components/Marquee";
import FeaturesSection from "@/components/FeaturesSection";
import Testimonials from "@/components/Testimonials";
import PremiumSection from "@/components/PremiumSection";
import ComingSoonBanner from "@/components/ComingSoonBanner";
import CTAFooter from "@/components/CTAFooter";

const SectionDivider = () => (
  <div className="relative h-24 -my-12 z-0">
    <div className="absolute inset-x-0 top-0 h-full bg-gradient-to-b from-transparent via-pastel-lavender/10 to-transparent" />
  </div>
);

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-page overflow-x-hidden">
      <ScrollProgress />
      <Navbar />
      <HeroSection />
      <StatsCounter />
      <Marquee />
      <SectionDivider />
      <FeaturesSection />
      <SectionDivider />
      <Testimonials />
      <SectionDivider />
      <PremiumSection />
      <ComingSoonBanner />
      <CTAFooter />
    </div>
  );
};

export default Index;
