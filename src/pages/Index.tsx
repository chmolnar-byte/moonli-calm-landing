import Navbar from "@/components/Navbar";
import ScrollProgress from "@/components/ScrollProgress";
import HeroSection from "@/components/HeroSection";
import StatsCounter from "@/components/StatsCounter";
import Marquee from "@/components/Marquee";
import FeaturesSection from "@/components/FeaturesSection";
import Testimonials from "@/components/Testimonials";
import PricingSection from "@/components/PricingSection";
import CTAFooter from "@/components/CTAFooter";
import ContactSection from "@/components/ContactSection";
import capybaraImg from "@/assets/capybara.png";

const SectionDivider = () => (
  <div className="relative h-16 -my-8 z-0">
    <div className="absolute inset-x-0 top-0 h-full bg-gradient-to-b from-transparent via-pastel-lavender/10 to-transparent" />
  </div>
);

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-page overflow-x-hidden">
      <img
        src={capybaraImg}
        alt=""
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[420px] opacity-10 z-0 pointer-events-none select-none"
      />
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
