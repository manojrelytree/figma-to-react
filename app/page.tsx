import Footer from "./components/Footer";
import Header from "./components/Header";
import BenefitsGrid from "./components/sections/benefits-grid";
import TestimonialsSection from "./components/sections/client-testimonial";
import { CoreFeatures } from "./components/sections/core-features";
import FaqAccordion from "./components/sections/faq-accordion";
import HeroSection from "./components/sections/hero-section";
import PricingSection from "./components/sections/pricing";
import ToolsTab from "./components/tools-tab";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <CoreFeatures />
        <ToolsTab />
        <BenefitsGrid />
        <TestimonialsSection />
        <PricingSection />
        <FaqAccordion />
      </main>
      <Footer />
    </div>
  );
}
