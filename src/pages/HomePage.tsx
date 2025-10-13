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
  <>
  <title>RoktoShare: বাংলাদেশে জরুরি রক্তদাতা খুঁজুন | রক্ত দিন, জীবন বাঁচান</title>
      <meta
        name="description"
        content="RoktoShare বাংলাদেশের বৃহত্তম অনলাইন রক্তদান প্ল্যাটফর্ম। জরুরি প্রয়োজনে মুহূর্তের মধ্যে আপনার এলাকার রক্তদাতা খুঁজুন। রক্তদাতা হিসেবে নিবন্ধন করে আপনিও জীবন বাঁচানোর এই মহৎ উদ্যোগে সামিল হোন।"
      />
      <meta
        name="keywords"
        content="রক্তদান, রক্তদাতা, ব্লাড ব্যাংক, জরুরি রক্ত, রক্ত খুঁজুন, জীবন বাঁচান, RoktoShare, blood donation Bangladesh, find blood donor, online blood bank, Sherpur"
      />
    <div>
      <HeroSection />
      <StatsSection />
      <CompatibilitySection />
      <FeaturesSection />
      <ProfileBadgeSection />
      <AwarenessSection />
      <TestimonialsSection />
      <DonationProcessSection />
    </div>
  </>
  );
};

export default HomePage;
