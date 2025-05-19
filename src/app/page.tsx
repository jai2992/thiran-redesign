import { MainNav } from "@/components/main-nav"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/hero-section"
import { ContactSection } from "@/components/contact-section"
import { SponsorsSection } from "@/components/sponsors-section"
import { DynamicEventsShowcase, DynamicCelebrityLineup } from "@/components/dynamic-sections"
// BackgroundWrapper is removed as it's unused

export default function Home() {
  return (
    <>
      <MainNav />
      <main>
        <HeroSection />
        <DynamicEventsShowcase />
        <DynamicCelebrityLineup />
        <SponsorsSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}
