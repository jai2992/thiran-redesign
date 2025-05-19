import { AboutSection } from "@/components/about-section"
import { MainNav } from "@/components/main-nav"
import { Footer } from "@/components/footer"
import { ContactSection } from "@/components/contact-section"

export const metadata = {
  title: "About | Thiran 2025",
  description: "Learn about Sri Eshwar College's premier national-level techno-cultural-sports festival, Thiran 2025.",
}

export default function AboutPage() {
  return (
    <>
      <MainNav />
      <main className="pt-24">
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}
