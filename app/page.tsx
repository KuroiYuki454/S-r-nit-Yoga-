import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { YogaClasses } from "@/components/yoga-classes";
import { FormatsSection } from "@/components/formats-section";
import { PricingSection } from "@/components/pricing-section";
import { Testimonials } from "@/components/testimonials";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      <Header />
      <Hero />
      <YogaClasses />
      <FormatsSection />
      <Testimonials />
      <PricingSection />
      <Footer />
    </main>
  );
}
