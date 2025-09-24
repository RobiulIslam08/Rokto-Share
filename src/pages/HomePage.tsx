import HeroSection from "@/components/homePage/HeroSection";
import StatsSection from "@/components/homePage/StatsSection";
import FeaturesSection from "../components/homePage/FeaturesSection";
import TestimonialsSection from "../components/homePage/TestimonialsSection";
import AwarenessSection from "@/components/homePage/AwarenessSection";
import { CompatibilitySection } from "@/components/homePage/CompatibilitySection";
import DonationProcessSection from "@/components/homePage/DonationProcessSection";
import ProfileBadgeSection from "@/components/homePage/ProfileBadgeSection";

const HomePage = () => {
	
  return (
    <div className="">
      <HeroSection />
      <StatsSection />
      <CompatibilitySection />
      <FeaturesSection />
      <ProfileBadgeSection />
      <AwarenessSection />
      <TestimonialsSection />
      <DonationProcessSection />
    </div>
  );
};

export default HomePage;
