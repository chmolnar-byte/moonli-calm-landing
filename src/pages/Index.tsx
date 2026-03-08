import Navbar from "@/components/Navbar";
import ScrollProgress from "@/components/ScrollProgress";
import CapybaraScene from "@/components/CapybaraScene";
import HeroSection from "@/components/HeroSection";
import StatsCounter from "@/components/StatsCounter";
import Marquee from "@/components/Marquee";
import FeaturesSection from "@/components/FeaturesSection";
import Testimonials from "@/components/Testimonials";
import PricingSection from "@/components/PricingSection";
import CTAFooter from "@/components/CTAFooter";
import ContactSection from "@/components/ContactSection";

const SectionDivider = () => (
  <div className="relative h-16 -my-8 z-0">
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
      <PricingSection />
      <ContactSection />
      <SectionDivider />
      <Testimonials />
      <CTAFooter />
    </div>
  );
};

export default Index;
