import heroImageGradient from "/backgrounds/gradient-noise-purple-azure-light.png";
import { HeroSection } from "@/components/Home/HeroLandingSection ";
import { Customers } from "@/components/Home/Customers";
import { Features } from "@/components/Home/Features";
import { FAQS } from "@/components/Home/FAQS";
import { Separator } from "@/components/common/Separator";

export default function Home() {
  return (
    <>
      <HeroSection
        title="AI-Powered Invoicing"
        subtitle={{
          regular: "AI-Powered Invoicing, ",
          gradient: "Made Effortless",
        }}
        description="Let our AI create invoices from simple test, generate payment reminders, and provide smart insights to help you manage your finances."
        heroImage={heroImageGradient}
        showGradientImage={true}
      />
      {/* <Separator /> */}
      <Customers count={90} />
      <Separator />
      <Features />
      <FAQS />
      <Separator />
    </>
  );
}
