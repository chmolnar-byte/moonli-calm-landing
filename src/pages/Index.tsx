import Navbar from "@/components/Navbar";
import ScrollProgress from "@/components/ScrollProgress";
import HeroSection from "@/components/HeroSection";
import StatsCounter from "@/components/StatsCounter";
import Marquee from "@/components/Marquee";
import FeaturesSection from "@/components/FeaturesSection";
import Testimonials from "@/components/Testimonials";
import PricingSection from "@/components/PricingSection";
import FounderSection from "@/components/FounderSection";
import CTAFooter from "@/components/CTAFooter";
import capybaraImg from "@/assets/capybara.png";

const SectionDivider = () => (
  <div className="relative h-16 -my-8 z-0">
    <div className="absolute inset-x-0 top-0 h-full bg-gradient-to-b from-transparent via-primary/12 to-transparent" />
  </div>
);

const Index = () => {
  return (
    <div className="night-sky min-h-screen bg-gradient-page overflow-x-hidden text-foreground">
      <div className="night-sky-stars fixed inset-0 z-0 pointer-events-none" />
      <div className="fixed top-[12%] right-[8%] h-44 w-44 rounded-full dream-gradient blur-3xl pointer-events-none z-0" />
      <div className="fixed bottom-[8%] left-[6%] h-52 w-52 rounded-full dream-gradient blur-3xl pointer-events-none z-0" />

      <img
        src={capybaraImg}
        alt=""
        className="fixed top-[11%] right-[2.5%] w-[180px] md:w-[250px] opacity-30 z-0 pointer-events-none select-none"
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
      <SectionDivider />
      <FounderSection />
      <SectionDivider />
      <Testimonials />
      <CTAFooter />
    </div>
  );
};

export default Index;
