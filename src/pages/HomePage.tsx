import VIPHero from "@/components/VIPHero";
import ProblemSection from "@/components/home/ProblemSection";
import SolutionSection from "@/components/home/SolutionSection";
import BeforeAfterSection from "@/components/home/BeforeAfterSection";
import ResultsSection from "@/components/home/ResultsSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import HowItWorksSection from "@/components/home/HowItWorksSection";
import PlatformsSection from "@/components/home/PlatformsSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import FAQSection from "@/components/home/FAQSection";

const HomePage = () => (
  <div>
    <VIPHero />
    <ProblemSection />
    <SolutionSection />
    <BeforeAfterSection />
    <ResultsSection />
    <FeaturesSection />
    <HowItWorksSection />
    <PlatformsSection />
    <TestimonialsSection />
    <FAQSection />
  </div>
);

export default HomePage;
