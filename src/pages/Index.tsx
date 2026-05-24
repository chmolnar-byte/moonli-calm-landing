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
import BabyExpoPopup from "@/components/BabyExpoPopup";
import capybaraImg from "@/assets/capybara.png";
import capybara1Img from "@/assets/capybara1.png";
import capybara2Img from "@/assets/capybara2.png";

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

      {/* Capybara oben mittig */}
      <img
        src={capybaraImg}
        alt=""
        className="fixed top-[11%] left-1/2 -translate-x-1/2 w-[120px] md:w-[160px] opacity-20 z-0 pointer-events-none select-none"
      />
      {/* Capybara1 unten links */}
      <img
        src={capybara1Img}
        alt=""
        className="fixed bottom-[18%] left-[3%] w-[80px] md:w-[110px] opacity-15 z-0 pointer-events-none select-none rotate-[-8deg]"
      />
      {/* Capybara2 mittig rechts */}
      <img
        src={capybara2Img}
        alt=""
        className="fixed top-[48%] right-[2%] w-[75px] md:w-[100px] opacity-15 z-0 pointer-events-none select-none rotate-[6deg]"
      />
      <ScrollProgress />
      <Navbar />
      <HeroSection />
      <StatsCounter />
      <Marquee />
      <SectionDivider />
      <div id="funktionen"><FeaturesSection /></div>
      <SectionDivider />
      <div id="preise"><PricingSection /></div>
      <SectionDivider />
      <FounderSection />
      <SectionDivider />
      <div id="feedback"><Testimonials /></div>
      <CTAFooter />
      <BabyExpoPopup />
    </div>
  );
};

export default Index;
