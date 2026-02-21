import { Suspense } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import BabyScene3D from "@/components/BabyScene3D";
import FeaturesSection from "@/components/FeaturesSection";
import GamificationSection from "@/components/GamificationSection";
import CTAFooter from "@/components/CTAFooter";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-page overflow-x-hidden">
      <Navbar />
      <HeroSection />

      {/* 3D Eyecatcher */}
      <section className="relative -mt-10 mb-8">
        <div className="container">
          <Suspense fallback={<div className="h-[420px]" />}>
            <BabyScene3D />
          </Suspense>
        </div>
      </section>

      <FeaturesSection />
      <GamificationSection />
      <CTAFooter />
    </div>
  );
};

export default Index;
