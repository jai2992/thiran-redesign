"use client"

import { useState } from "react"
import { MainNav } from "@/components/main-nav"
import { Footer } from "@/components/footer"
import { EventCard, EventCardProps } from "@/components/event-card"
import { motion, AnimatePresence } from "framer-motion"
import { FiSearch, FiFilter, FiChevronDown } from "react-icons/fi"
import { images } from "@/config/images"

// Sample events data with dynamic images from our configuration
const allEvents: EventCardProps[] = [
  // Tech Events
  {
    id: "hackathon",
    title: "48-Hour Hackathon",
    category: "tech",
    image: images.events.hackathon,
    date: "May 15-16, 2025",
    time: "10:00 AM - 10:00 AM",
    venue: "Main Auditorium",
    teamSize: "3-5 members",
    featured: true,
    index: 0
  },
  {
    id: "robotics",
    title: "Robo Wars",
    category: "tech",
    image: images.events.robotics,
    date: "May 16, 2025",
    time: "2:00 PM - 6:00 PM",
    venue: "Tech Arena",
    teamSize: "4 members",
    index: 1
  },  {
    id: "coding",
    title: "Code Rush",
    category: "tech",
    image: images.events.workshops,
    date: "May 15, 2025",
    time: "11:00 AM - 2:00 PM",
    venue: "Computer Lab",
    teamSize: "2 members",
    index: 2
  },
  {
    id: "ctf",
    title: "Capture The Flag",
    category: "tech",
    image: images.events.hackathon,
    date: "May 17, 2025",
    time: "9:00 AM - 5:00 PM",
    venue: "Tech Hall",
    teamSize: "3 members",
    index: 3
  },  {
    id: "iot",
    title: "IoT Challenge",
    category: "tech",
    image: images.events.workshops,
    date: "May 16, 2025",
    time: "10:00 AM - 4:00 PM",
    venue: "Innovation Lab",
    teamSize: "2-4 members",
    index: 4
  },
  // Cultural Events
  {
    id: "dance",
    title: "Group Dance Competition",
    category: "cultural",
    image: images.events.dance,
    date: "May 16, 2025",
    time: "5:00 PM - 8:00 PM",
    venue: "Open Air Theater",
    teamSize: "5-10 members",
    featured: true,
    index: 5
  },
  {
    id: "music",
    title: "Battle of Bands",
    category: "cultural",
    image: images.events.music,
    date: "May 17, 2025",
    time: "6:00 PM - 9:00 PM",
    venue: "Main Stage",
    teamSize: "4-6 members",
    index: 6
  },  {
    id: "fashion",
    title: "Fashion Show",
    category: "cultural",
    image: images.events.music, // Using music as a placeholder for fashion
    date: "May 17, 2025",
    time: "4:00 PM - 6:00 PM",
    venue: "Main Hall",
    teamSize: "6-12 members",
    index: 7
  },
  {
    id: "drama",
    title: "Street Play",
    category: "cultural",
    image: images.events.dance, // Using dance as a placeholder for drama
    date: "May 16, 2025",
    time: "12:00 PM - 2:00 PM",
    venue: "College Courtyard",
    teamSize: "5-8 members", 
    index: 8
  },
  {
    id: "singing",
    title: "Solo Singing",
    category: "cultural",
    image: images.events.music,
    date: "May 15, 2025",
    time: "3:00 PM - 6:00 PM",
    venue: "Auditorium",
    teamSize: "1 member",
    index: 9
  },  // Sports Events
  {
    id: "cricket",
    title: "Cricket Tournament",
    category: "sports",
    image: images.events.gaming, // Using gaming image as a placeholder for sports
    date: "May 15-17, 2025",
    time: "8:00 AM - 5:00 PM",
    venue: "College Ground",
    teamSize: "11 members",
    featured: true,
    index: 10
  },
  {
    id: "basketball",
    title: "Basketball Showdown",
    category: "sports",
    image: images.events.gaming, // Using gaming image as a placeholder for sports
    date: "May 16, 2025",
    time: "9:00 AM - 4:00 PM",
    venue: "Indoor Stadium",
    teamSize: "5 members",
    index: 11
  },  {
    id: "football",
    title: "Football League",
    category: "sports",
    image: images.events.gaming, // Using gaming image as a placeholder for sports
    date: "May 15-17, 2025",
    time: "8:00 AM - 5:00 PM",
    venue: "Football Ground",
    teamSize: "11 members",
    index: 12
  },
  {
    id: "chess",
    title: "Chess Championship",
    category: "sports",
    image: images.events.gaming, // Using gaming image as a placeholder for sports
    date: "May 15, 2025",
    time: "10:00 AM - 4:00 PM",
    venue: "Indoor Hall",
    teamSize: "1 member",
    index: 13
  },
  {
    id: "athletics",
    title: "Athletics Meet",
    category: "sports",
    image: images.events.gaming, // Using gaming image as a placeholder for sports
    date: "May 17, 2025",
    time: "7:00 AM - 12:00 PM",
    venue: "Athletic Track",
    teamSize: "Individual/Team",
    index: 14
  },
]

type EventCategory = "all" | "tech" | "cultural" | "sports"

export default function EventsPage() {
  const [activeCategory, setActiveCategory] = useState<EventCategory>("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [dayFilter, setDayFilter] = useState<string>("all")
  
  // Filter events by category, search term, and day
  let filteredEvents = activeCategory === "all"
    ? allEvents
    : allEvents.filter(event => event.category === activeCategory)
  
  // Apply search filter
  if (searchTerm) {
    filteredEvents = filteredEvents.filter(event => 
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.venue.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }
  
  // Apply day filter
  if (dayFilter !== "all") {
    filteredEvents = filteredEvents.filter(event => 
      event.date.includes(`May ${dayFilter}`)
    )
  }
    
  // Update indices for animation staggering after filtering
  const eventsWithUpdatedIndices = filteredEvents.map((event, index) => ({
    ...event,
    index
  }))

  return (
    <>
      <MainNav />
      <main className="pt-32 pb-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
              Explore <span className="text-glow-blue">Events</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Discover our diverse range of events spanning technology, culture, and sports. 
              Find something that matches your interests and skills.
            </p>
          </div>
          
          {/* Search and Filters */}
          <div className="mb-12 max-w-4xl mx-auto">
            <div className="glassmorphism rounded-xl p-4 md:p-6">
              {/* Search bar */}
              <div className="relative mb-4">
                <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search events by name or venue..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-black/30 border border-gray-700 rounded-lg pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-[hsl(var(--neon-blue))] transition-all"
                />
              </div>
              
              {/* Filter options */}
              <div className="flex flex-wrap gap-4 items-center">
                <div className="flex flex-wrap gap-2 md:gap-4">
                  {(["all", "tech", "cultural", "sports"] as EventCategory[]).map((category) => (
                    <button
                      key={category}
                      onClick={() => setActiveCategory(category)}
                      className={`px-4 md:px-6 py-2 rounded-full text-sm font-medium uppercase tracking-wider transition-all ${
                        activeCategory === category 
                          ? "bg-gradient-to-r from-[hsl(var(--neon-blue))] to-[hsl(var(--neon-purple))] text-white" 
                          : "bg-black/20 text-gray-300 hover:bg-black/30"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
                
                <button 
                  onClick={() => setShowFilters(!showFilters)}
                  className="ml-auto flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-700 hover:bg-black/30 transition-colors"
                >
                  <FiFilter size={16} />
                  <span>Filters</span>
                  <FiChevronDown className={`transition-transform ${showFilters ? 'rotate-180' : ''}`} />
                </button>
              </div>
              
              {/* Expanded filters */}
              <AnimatePresence>
                {showFilters && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="pt-4 mt-4 border-t border-gray-700 grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Filter by Day</label>
                        <select
                          value={dayFilter}
                          onChange={(e) => setDayFilter(e.target.value)}
                          className="w-full bg-black/30 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[hsl(var(--neon-blue))]"
                        >
                          <option value="all">All Days</option>
                          <option value="15">Day 1 (May 15)</option>
                          <option value="16">Day 2 (May 16)</option>
                          <option value="17">Day 3 (May 17)</option>
                        </select>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
          
          {/* Events Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {eventsWithUpdatedIndices.length > 0 ? (
              eventsWithUpdatedIndices.map((event) => (
                <EventCard key={event.id} {...event} />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-2xl text-gray-400 mb-4">No events found</p>
                <p className="text-gray-500">Try adjusting your filters or search term</p>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
