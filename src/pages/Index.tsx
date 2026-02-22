import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import PremiumSection from "@/components/PremiumSection";
import ComingSoonBanner from "@/components/ComingSoonBanner";
import CTAFooter from "@/components/CTAFooter";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-page overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <PremiumSection />
      <ComingSoonBanner />
      <CTAFooter />
    </div>
  );
};

export default Index;
