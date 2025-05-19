"use client"

import { useState } from "react"
import { MainNav } from "@/components/main-nav"
import { Footer } from "@/components/footer"
import { motion, AnimatePresence } from "framer-motion"
import { FiClock, FiMapPin, FiCalendar, FiStar } from "react-icons/fi"
import { images } from "@/config/images"
import { ScheduleCard } from "@/components/schedule-card"

interface ScheduleEvent {
  id: string
  title: string
  time: string
  venue: string
  category: "tech" | "cultural" | "sports" | "other"
  featured?: boolean
  description?: string
}

interface DaySchedule {
  date: string
  events: ScheduleEvent[]
}

// Sample schedule data (replace with actual data later)
const scheduleData: DaySchedule[] = [
  {
    date: "May 15, 2025",
    events: [
      {
        id: "opening",
        title: "Opening Ceremony",
        time: "09:00 AM - 10:00 AM",
        venue: "Main Auditorium",
        category: "other",
        featured: true,
        description: "Official inauguration of Thiran 2025 with special guests and performances."
      },
      {
        id: "hackathon-start",
        title: "Hackathon Kickoff",
        time: "10:30 AM - 11:30 AM",
        venue: "Tech Hub",
        category: "tech",
        featured: true,
        description: "48-hour hackathon begins with problem statements and team formations."
      },
      {
        id: "coding",
        title: "Code Rush",
        time: "11:00 AM - 02:00 PM",
        venue: "Computer Lab",
        category: "tech",
        description: "Competitive coding competition with multiple rounds."
      },
      {
        id: "singing",
        title: "Solo Singing Round 1",
        time: "03:00 PM - 06:00 PM",
        venue: "Auditorium",
        category: "cultural",
        description: "Preliminary round for solo singing competition."
      },
      {
        id: "cricket-day1",
        title: "Cricket Tournament - Day 1",
        time: "08:00 AM - 05:00 PM",
        venue: "College Ground",
        category: "sports",
        description: "First day of cricket matches between participating teams."
      },
      {
        id: "chess",
        title: "Chess Championship",
        time: "10:00 AM - 04:00 PM",
        venue: "Indoor Hall",
        category: "sports",
        description: "Strategic chess battles among participants."
      },
      {
        id: "dj-night",
        title: "DJ Night with DJ Sonic",
        time: "07:00 PM - 10:00 PM",
        venue: "Open Air Theater",
        category: "cultural",
        featured: true,
        description: "Electrifying DJ performance to end Day 1 on a high note."
      }
    ]
  },
  {
    date: "May 16, 2025",
    events: [
      {
        id: "hackathon-mid",
        title: "Hackathon - Day 2",
        time: "All Day",
        venue: "Tech Hub",
        category: "tech",
        description: "Ongoing hackathon with mentorship sessions."
      },
      {
        id: "robotics",
        title: "Robo Wars",
        time: "02:00 PM - 06:00 PM",
        venue: "Tech Arena",
        category: "tech",
        featured: true,
        description: "Robot battles showcasing engineering excellence."
      },
      {
        id: "iot",
        title: "IoT Challenge",
        time: "10:00 AM - 04:00 PM",
        venue: "Innovation Lab",
        category: "tech",
        description: "Internet of Things challenge with real-world problem statements."
      },
      {
        id: "dance",
        title: "Group Dance Competition",
        time: "05:00 PM - 08:00 PM",
        venue: "Open Air Theater",
        category: "cultural",
        featured: true,
        description: "Energetic group dance performances from various colleges."
      },
      {
        id: "drama",
        title: "Street Play",
        time: "12:00 PM - 02:00 PM",
        venue: "College Courtyard",
        category: "cultural",
        description: "Street plays addressing social issues with creative performances."
      },
      {
        id: "basketball",
        title: "Basketball Tournament",
        time: "09:00 AM - 04:00 PM",
        venue: "Indoor Stadium",
        category: "sports",
        description: "Thrilling basketball matches between college teams."
      },
      {
        id: "cricket-day2",
        title: "Cricket Tournament - Day 2",
        time: "08:00 AM - 05:00 PM",
        venue: "College Ground",
        category: "sports",
        description: "Continued cricket matches with quarter-finals."
      },
      {
        id: "dance-troupe",
        title: "Special Performance: Dance Troupe X",
        time: "08:00 PM - 09:30 PM",
        venue: "Main Stage",
        category: "cultural",
        featured: true,
        description: "Exclusive performance by the renowned Dance Troupe X."
      }
    ]
  },
  {
    date: "May 17, 2025",
    events: [
      {
        id: "hackathon-final",
        title: "Hackathon Finals and Judging",
        time: "09:00 AM - 12:00 PM",
        venue: "Tech Hub",
        category: "tech",
        featured: true,
        description: "Final presentations and judging of hackathon projects."
      },
      {
        id: "ctf",
        title: "Capture The Flag",
        time: "09:00 AM - 05:00 PM",
        venue: "Tech Hall",
        category: "tech",
        description: "Cybersecurity challenge with multiple difficulty levels."
      },
      {
        id: "fashion",
        title: "Fashion Show",
        time: "04:00 PM - 06:00 PM",
        venue: "Main Hall",
        category: "cultural",
        description: "Showcase of style, creativity and runway talent."
      },
      {
        id: "music",
        title: "Battle of Bands",
        time: "06:00 PM - 09:00 PM",
        venue: "Main Stage",
        category: "cultural",
        featured: true,
        description: "Live band performances competing for the title."
      },
      {
        id: "athletics",
        title: "Athletics Meet",
        time: "07:00 AM - 12:00 PM",
        venue: "Athletic Track",
        category: "sports",
        description: "Track and field events showcasing athletic prowess."
      },
      {
        id: "cricket-finals",
        title: "Cricket Finals",
        time: "10:00 AM - 02:00 PM",
        venue: "College Ground",
        category: "sports",
        featured: true,
        description: "Final cricket match to determine the champion team."
      },
      {
        id: "closing",
        title: "Closing Ceremony & Awards",
        time: "07:00 PM - 09:00 PM",
        venue: "Main Auditorium",
        category: "other",
        featured: true,
        description: "Concluding ceremony with award distribution and celebrations."
      },
      {
        id: "rockband",
        title: "Rock Band Alpha Concert",
        time: "09:00 PM - 11:00 PM",
        venue: "Open Air Theater",
        category: "cultural",
        featured: true,
        description: "Grand finale concert by the popular Rock Band Alpha."
      }
    ]
  }
]

export default function SchedulePage() {
  const [activeDay, setActiveDay] = useState(0)
  const [activeCategory, setActiveCategory] = useState<"all" | "tech" | "cultural" | "sports" | "other">("all")
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false)
  
  // Filter events based on selected category and featured status
  const filteredEvents = scheduleData[activeDay].events.filter(event => {
    if (showFeaturedOnly && !event.featured) return false
    if (activeCategory === "all") return true
    return event.category === activeCategory
  })
  
  return (
    <>
      <MainNav />
      <main className="pt-32 pb-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
              Event <span className="text-glow-blue">Schedule</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Plan your Thiran experience with our comprehensive festival schedule.
              Don't miss any of the exciting events across all three days!
            </p>
          </div>
          
          {/* Day Selection Tabs */}
          <div className="max-w-4xl mx-auto mb-10">
            <div className="glassmorphism rounded-2xl p-2 flex">
              {scheduleData.map((day, index) => (
                <button
                  key={index}
                  onClick={() => setActiveDay(index)}
                  className="flex-1 relative py-3 px-4 text-center transition-colors z-10"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-center gap-1 md:gap-3">
                    <FiCalendar className={`${activeDay === index ? 'text-white' : 'text-gray-400'} md:text-lg`} />
                    <span className={`${activeDay === index ? 'text-white' : 'text-gray-400'} text-sm md:text-base`}>
                      Day {index + 1}
                    </span>
                  </div>
                  
                  {activeDay === index && (
                    <motion.div
                      layoutId="dayTab"
                      className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--neon-blue))] to-[hsl(var(--neon-purple))] rounded-xl -z-10"
                      initial={false}
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
          
          {/* Current Date Display */}
          <div className="max-w-4xl mx-auto mb-8">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl md:text-3xl font-semibold">
                <span className="text-gray-400">Day {activeDay + 1}:</span> {scheduleData[activeDay].date}
              </h2>
              
              <div className="flex items-center">
                <label className="inline-flex items-center cursor-pointer mr-4">
                  <input
                    type="checkbox"
                    checked={showFeaturedOnly}
                    onChange={() => setShowFeaturedOnly(!showFeaturedOnly)}
                    className="sr-only peer"
                  />
                  <div className="relative w-11 h-6 bg-black/30 rounded-full peer peer-checked:bg-[hsl(var(--neon-blue))] peer-focus:outline-none peer-focus:ring-1 peer-focus:ring-[hsl(var(--neon-blue))]">
                    <div className={`absolute top-[2px] left-[2px] bg-white rounded-full w-5 h-5 transition-transform ${showFeaturedOnly ? 'translate-x-5' : 'translate-x-0'}`}></div>
                  </div>
                  <span className="ml-3 text-sm text-gray-300">Featured Events Only</span>
                </label>
              </div>
            </div>
          </div>
          
          {/* Category Filter */}
          <div className="max-w-4xl mx-auto mb-8 flex flex-wrap gap-2">
            {(["all", "tech", "cultural", "sports", "other"] as const).map((category) => (
              <button 
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-sm transition-colors ${
                  activeCategory === category
                    ? 'bg-gradient-to-r from-[hsl(var(--neon-blue))] to-[hsl(var(--neon-purple))] text-white'
                    : 'bg-black/30 text-gray-300 hover:bg-black/50'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
          
          {/* Timeline Schedule */}
          <div className="max-w-4xl mx-auto">
            <AnimatePresence mode="wait">
              {filteredEvents.length > 0 ? (
                <motion.div
                  key={`${activeDay}-${activeCategory}-${showFeaturedOnly}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="relative"
                >
                  {/* Timeline line */}
                  <div className="absolute left-0 md:left-16 top-0 bottom-0 w-px bg-gray-700 ml-4 md:ml-0" />
                    {/* Events */}
                  <div className="space-y-6">
                    {filteredEvents.map((event, index) => (
                      <div key={event.id} className="relative">
                        {/* Timeline dot */}
                        <div 
                          className={`absolute left-0 md:left-16 w-9 h-9 rounded-full flex items-center justify-center z-10 ml-0 md:-ml-4 ${
                            event.featured 
                              ? 'bg-gradient-to-r from-[hsl(var(--neon-blue))] to-[hsl(var(--neon-purple))]' 
                              : 'bg-gray-800 border border-gray-600'
                          }`}
                        >
                          {event.featured ? (
                            <FiStar className="text-white" />
                          ) : (
                            <div className="w-3 h-3 rounded-full bg-gray-400" />
                          )}
                        </div>
                        
                        {/* Event card */}
                        <div className="ml-12 md:ml-32">
                          <ScheduleCard
                            id={event.id}
                            title={event.title}
                            time={event.time}
                            venue={event.venue}
                            category={event.category}
                            featured={event.featured}
                            description={event.description}
                            index={index}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-center py-12"
                >
                  <p className="text-2xl text-gray-400 mb-4">No events found</p>
                  <p className="text-gray-500">Try a different category or day</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
