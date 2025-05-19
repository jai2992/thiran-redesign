"use client"

import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { MainNav } from "@/components/main-nav"
import { Footer } from "@/components/footer"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { FiCalendar, FiClock, FiMapPin, FiUsers, FiAward, FiInfo, FiChevronLeft } from "react-icons/fi"

// Sample event data - in a real app, this would be fetched from an API or database
const eventsData = [
  {
    id: "hackathon",
    title: "48-Hour Hackathon",
    category: "tech",
    image: "/images/events/hackathon.jpg",
    date: "May 15-16, 2025",
    time: "10:00 AM - 10:00 AM (Next Day)",
    venue: "Main Auditorium",
    teamSize: "3-5 members",
    featured: true,
    description: "Push your creativity and technical skills to the limit in this intense 48-hour hackathon. Teams will work together to develop innovative solutions to real-world problems.",
    organizers: ["Tech Club", "Innovation Cell"],
    prizes: [
      "First Prize: ₹50,000",
      "Second Prize: ₹30,000",
      "Third Prize: ₹15,000",
      "Best UI/UX: ₹10,000"
    ],
    rules: [
      "Teams must have 3-5 members",
      "All code must be written during the hackathon",
      "Use of open-source libraries is permitted",
      "Teams must present a working prototype",
      "Judging criteria includes innovation, technical complexity, and practical application"
    ],
    requirements: [
      "Participants must bring their own laptops",
      "Power outlets and internet will be provided",
      "Food and refreshments will be available",
      "At least one team member should know web/mobile development"
    ],
    contact: {
      name: "Arjun Kumar",
      email: "hackathon@thiran2025.in",
      phone: "+91 9876543210"
    }
  },
  // Add more events as needed
]

export default function EventDetailPage() {
  const { eventId } = useParams()
  const [event, setEvent] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [registering, setRegistering] = useState(false)
  const [registered, setRegistered] = useState(false)
  
  useEffect(() => {
    // In a real app, fetch from API using eventId
    const foundEvent = eventsData.find(e => e.id === eventId)
    
    // Simulate API fetch
    setTimeout(() => {
      setEvent(foundEvent || null)
      setLoading(false)
    }, 500)
  }, [eventId])
  
  const handleRegister = () => {
    setRegistering(true)
    
    // Simulate registration process
    setTimeout(() => {
      setRegistering(false)
      setRegistered(true)
    }, 1500)
  }
  
  if (loading) {
    return (
      <>
        <MainNav />
        <main className="pt-32 pb-20 px-4 min-h-screen">
          <div className="container mx-auto flex justify-center items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[hsl(var(--neon-blue))]"></div>
          </div>
        </main>
        <Footer />
      </>
    )
  }
  
  if (!event) {
    return (
      <>
        <MainNav />
        <main className="pt-32 pb-20 px-4 min-h-screen">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4">Event Not Found</h1>
            <p className="text-xl text-gray-400 mb-8">The event you're looking for doesn't exist or has been removed.</p>
            <Link
              href="/events"
              className="px-6 py-3 bg-gradient-to-r from-[hsl(var(--neon-blue))] to-[hsl(var(--neon-purple))] rounded-lg hover:opacity-90 transition-opacity inline-flex items-center"
            >
              <FiChevronLeft className="mr-2" />
              Back to Events
            </Link>
          </div>
        </main>
        <Footer />
      </>
    )
  }
  
  // Category-specific styling
  const categoryStyles = {
    tech: {
      gradient: "from-blue-500 to-purple-600",
      glow: "neon-glow-blue",
      textGlow: "text-glow-blue",
      bgColor: "bg-[hsl(var(--neon-blue))]/20",
      textColor: "text-[hsl(var(--neon-blue))]"
    },
    cultural: {
      gradient: "from-purple-500 to-pink-600",
      glow: "neon-glow-purple",
      textGlow: "text-glow-purple",
      bgColor: "bg-[hsl(var(--neon-purple))]/20",
      textColor: "text-[hsl(var(--neon-purple))]"
    },
    sports: {
      gradient: "from-pink-500 to-red-600",
      glow: "neon-glow-magenta",
      textGlow: "text-glow-magenta",
      bgColor: "bg-[hsl(var(--neon-magenta))]/20",
      textColor: "text-[hsl(var(--neon-magenta))]"
    }
  }
  
  const style = categoryStyles[event.category as keyof typeof categoryStyles]
  
  return (
    <>
      <MainNav />
      <main className="pt-32 pb-20">
        {/* Hero Section */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/90 z-10" />
          
          {/* Background Image */}
          <div className="relative h-[50vh] md:h-[60vh]">
            <div className="absolute inset-0 bg-black">
              <Image 
                src={event.image} 
                alt={event.title}
                fill
                className="object-cover opacity-50"
                priority
              />
            </div>
          </div>
          
          {/* Event Info Overlay */}
          <div className="container mx-auto px-4 absolute inset-0 flex flex-col justify-end z-20 pb-20">
            <div className="max-w-4xl">
              <div className={`inline-block px-4 py-1 rounded-full mb-4 ${style.bgColor} ${style.textColor} text-sm uppercase tracking-wider font-semibold`}>
                {event.category}
              </div>
              
              <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold font-display mb-6 ${style.textGlow}`}>
                {event.title}
              </h1>
              
              <div className="flex flex-wrap gap-6 text-white/80">
                <div className="flex items-center">
                  <FiCalendar className={`mr-2 ${style.textColor}`} />
                  <span>{event.date}</span>
                </div>
                
                <div className="flex items-center">
                  <FiClock className={`mr-2 ${style.textColor}`} />
                  <span>{event.time}</span>
                </div>
                
                <div className="flex items-center">
                  <FiMapPin className={`mr-2 ${style.textColor}`} />
                  <span>{event.venue}</span>
                </div>
                
                <div className="flex items-center">
                  <FiUsers className={`mr-2 ${style.textColor}`} />
                  <span>Team: {event.teamSize}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Event Content */}
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content - Left Side */}
            <div className="lg:col-span-2 space-y-10">
              {/* Back to Events Link */}
              <Link
                href="/events"
                className="inline-flex items-center text-gray-400 hover:text-white transition-colors mb-6"
              >
                <FiChevronLeft className="mr-2" />
                Back to Events
              </Link>
              
              {/* Description */}
              <section>
                <h2 className="text-2xl font-bold mb-4">About This Event</h2>
                <div className="glassmorphism rounded-xl p-6">
                  <p className="text-gray-300 leading-relaxed">{event.description}</p>
                </div>
              </section>
              
              {/* Rules */}
              {event.rules && (
                <section>
                  <h2 className="text-2xl font-bold mb-4">Rules & Guidelines</h2>
                  <div className="glassmorphism rounded-xl p-6">
                    <ul className="space-y-2">
                      {event.rules.map((rule: string, index: number) => (
                        <li key={index} className="flex items-start">
                          <span className={`mr-2 ${style.textColor}`}>•</span>
                          <span className="text-gray-300">{rule}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </section>
              )}
              
              {/* Requirements */}
              {event.requirements && (
                <section>
                  <h2 className="text-2xl font-bold mb-4">Requirements</h2>
                  <div className="glassmorphism rounded-xl p-6">
                    <ul className="space-y-2">
                      {event.requirements.map((req: string, index: number) => (
                        <li key={index} className="flex items-start">
                          <span className={`mr-2 ${style.textColor}`}>•</span>
                          <span className="text-gray-300">{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </section>
              )}
              
              {/* Organizers */}
              {event.organizers && (
                <section>
                  <h2 className="text-2xl font-bold mb-4">Organized By</h2>
                  <div className="flex flex-wrap gap-3">
                    {event.organizers.map((org: string, index: number) => (
                      <div key={index} className={`px-4 py-2 ${style.bgColor} rounded-lg ${style.textColor}`}>
                        {org}
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>
            
            {/* Sidebar - Right Side */}
            <div className="space-y-8">
              {/* Registration Box */}
              <div className={`glassmorphism rounded-xl p-6 border border-${style.textColor}/20`}>
                <h3 className="text-xl font-bold mb-4">Event Registration</h3>
                
                {registered ? (
                  <div className="text-center py-4">
                    <div className="w-16 h-16 mx-auto bg-green-500/20 rounded-full flex items-center justify-center mb-4">
                      <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                    <h4 className="text-lg font-semibold text-white mb-2">You're Registered!</h4>
                    <p className="text-gray-400 text-sm mb-4">Check your email for confirmation and details.</p>
                  </div>
                ) : (
                  <>
                    <p className="text-gray-300 mb-6">
                      Secure your spot for this event by registering through our simple process.
                    </p>
                    
                    <button
                      onClick={handleRegister}
                      disabled={registering}
                      className={`w-full py-3 rounded-lg font-medium ${
                        registering
                          ? "bg-gray-700 cursor-not-allowed"
                          : `bg-gradient-to-r ${style.gradient} hover:opacity-90`
                      } flex items-center justify-center`}
                    >
                      {registering ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-3"></div>
                          Processing...
                        </>
                      ) : (
                        "Register Now"
                      )}
                    </button>
                    
                    <p className="text-xs text-gray-400 mt-3 text-center">
                      By registering, you agree to our terms and conditions.
                    </p>
                  </>
                )}
              </div>
              
              {/* Prizes Box */}
              {event.prizes && (
                <div className="glassmorphism rounded-xl p-6">
                  <div className="flex items-center mb-4">
                    <FiAward className={`${style.textColor} mr-3`} size={24} />
                    <h3 className="text-xl font-bold">Prizes</h3>
                  </div>
                  
                  <ul className="space-y-2">
                    {event.prizes.map((prize: string, index: number) => (
                      <li key={index} className="flex items-center">
                        <span className={`mr-2 ${style.textColor}`}>•</span>
                        <span className="text-gray-300">{prize}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {/* Contact Box */}
              {event.contact && (
                <div className="glassmorphism rounded-xl p-6">
                  <div className="flex items-center mb-4">
                    <FiInfo className={`${style.textColor} mr-3`} size={24} />
                    <h3 className="text-xl font-bold">Contact Person</h3>
                  </div>
                  
                  <p className="font-semibold mb-2">{event.contact.name}</p>
                  <p className="text-gray-400 mb-1">{event.contact.email}</p>
                  <p className="text-gray-400">{event.contact.phone}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
