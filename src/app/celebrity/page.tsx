import { MainNav } from "@/components/main-nav"
import { Footer } from "@/components/footer"
import { CelebrityLineup } from "@/components/celebrity-lineup"
import { ContactSection } from "@/components/contact-section"

export const metadata = {
  title: "Celebrity Lineup | Thiran 2025",
  description: "Check out the amazing celebrity performances and guest appearances at Thiran 2025, Sri Eshwar College's premier techno-cultural-sports fest.",
}

export default function CelebrityPage() {
  return (
    <>
      <MainNav />
      <main className="pt-24">
        <CelebrityLineup />
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}
