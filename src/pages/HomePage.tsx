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
import CTABanner from "@/components/home/CTABanner";
import ParallaxSection from "@/components/ParallaxSection";

const HomePage = () => (
  <div>
    <VIPHero />
    <ParallaxSection speed={0.12}>
      <ProblemSection />
    </ParallaxSection>
    <ParallaxSection speed={0.08}>
      <SolutionSection />
    </ParallaxSection>
    <ParallaxSection speed={0.15}>
      <BeforeAfterSection />
    </ParallaxSection>
    <ParallaxSection speed={0.1}>
      <ResultsSection />
    </ParallaxSection>
    <ParallaxSection speed={0.12}>
      <FeaturesSection />
    </ParallaxSection>
    <ParallaxSection speed={0.08}>
      <HowItWorksSection />
    </ParallaxSection>
    <ParallaxSection speed={0.15}>
      <PlatformsSection />
    </ParallaxSection>
    <ParallaxSection speed={0.1}>
      <TestimonialsSection />
    </ParallaxSection>
    <ParallaxSection speed={0.08}>
      <FAQSection />
    </ParallaxSection>
    <CTABanner />
  </div>
);

export default HomePage;
