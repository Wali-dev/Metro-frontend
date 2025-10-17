import BrandSlider from "@/components/landingpage/components/BrandsSlider";
import Header from "@/components/landingpage/components/Header";
import HeroSection from "@/components/landingpage/components/HeroSection";
import KeyFeatures from "@/components/landingpage/components/KeyFeaturesSection";


export default function Home() {
  return (
    <div>
      <Header />
      <HeroSection />
      <BrandSlider />
      <KeyFeatures />
    </div>
  );
}
