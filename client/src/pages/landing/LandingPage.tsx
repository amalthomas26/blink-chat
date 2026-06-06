import { useEffect } from "react";
import { LazyMotion, domAnimation } from "framer-motion";
import { LandingNav } from "./sections/LandingNav";
import { HeroSection } from "./sections/HeroSection";
import { FeaturesSection } from "./sections/FeaturesSection";
import { TechStackSection } from "./sections/TechStackSection";
import { ArchitectureSection } from "./sections/ArchitectureSection";
import { HighlightsSection } from "./sections/HighlightsSection";
import { ScreenshotsSection } from "./sections/ScreenshotsSection";
import { FinalCTASection } from "./sections/FinalCTASection";
import { LandingFooter } from "./sections/LandingFooter";

/**
 * LandingPage — publicly visible marketing / portfolio page.
 * Rendered at "/" for unauthenticated visitors via LandingRoute.
 * No auth logic. No socket connections.
 */
export function LandingPage() {
  useEffect(() => {
    document.title = "Blink Chat — Real-Time Communication for Modern Teams";
  }, []);

  return (
    <LazyMotion features={domAnimation} strict>
      <div className="min-h-screen bg-[#0a0e17] text-white antialiased">
        <LandingNav />
        <main>
          <HeroSection />
          <FeaturesSection />
          <TechStackSection />
          <ArchitectureSection />
          <HighlightsSection />
          <ScreenshotsSection />
          <FinalCTASection />
        </main>
        <LandingFooter />
      </div>
    </LazyMotion>
  );
}
