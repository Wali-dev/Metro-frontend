"use client";
import HeroSection from "./landingpage/components/HeroSection";
import FeaturesSection from "./landingpage/components/FeaturesSection";
import HowItWorksSection from "./landingpage/components/HowItWorksSection";
import DemoSection from "./landingpage/components/DemoSection";
import PricingSection from "./landingpage/components/PricingSection";
import TestimonialsSection from "./landingpage/components/TestimonialsSection";
import CtaSection from "./landingpage/components/CtaSection";
import Footer from "./landingpage/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 to-gray-900 text-white overflow-x-hidden">
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <DemoSection />
      <PricingSection />
      <TestimonialsSection />
      <CtaSection />
      <Footer />
    </div>
  );
}
