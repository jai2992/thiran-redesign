import { MainNav } from "@/components/main-nav"
import { Footer } from "@/components/footer"
import { ContactSection } from "@/components/contact-section"
// MapSection is removed as it's unused
import Image from "next/image"
import { images } from "@/config/images"

export const metadata = {
  title: "Contact | Thiran 2025",
  description: "Get in touch with the Thiran 2025 team for queries regarding participation, sponsorship, or any other information.",
}

export default function ContactPage() {
  return (
    <>
      <MainNav />
      <main className="pt-24">
        <div className="container mx-auto px-4 mb-16">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
              Contact <span className="text-glow-blue">Us</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Have questions or need assistance? Reach out to our team for prompt support.
            </p>
          </div>
            {/* Location Map */}
          <div className="max-w-5xl mx-auto mb-16 glassmorphism rounded-2xl overflow-hidden">
            <div className="relative w-full h-[400px]">
              <Image 
                src={images.backgrounds.contact}
                alt="Sri Eshwar College Campus Map"
                fill
                className="object-cover"
                placeholder="blur"
                blurDataURL="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiMyMjIiLz48L3N2Zz4="
              />              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <div className="bg-black/70 p-6 rounded-xl max-w-md text-center">
                  <h2 className="text-xl font-bold mb-2">Sri Eshwar College of Engineering</h2>
                  <p className="mb-4">Coimbatore - Pollachi Highway, Kondampatti Post, Tamil Nadu 641202</p>
                  <a 
                    href="https://maps.google.com/?q=Sri+Eshwar+College+of+Engineering+Coimbatore"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-4 py-2 bg-gradient-to-r from-[hsl(var(--neon-blue))] to-[hsl(var(--neon-purple))] rounded-md font-medium hover:opacity-90 transition-opacity"
                    aria-label="Open in Google Maps"
                  >
                    Open in Google Maps
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}
