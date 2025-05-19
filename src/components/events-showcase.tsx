"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { EventCard, EventCardProps } from "./event-card"
import { images } from "@/config/images"

// Sample event data with dynamic images from our configuration
// Using a function to generate the sample data ensures it's the same on both server and client
const getSampleEvents = (): EventCardProps[] => [
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
  },
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
    index: 2
  },  {
    id: "music",
    title: "Battle of Bands",
    category: "cultural",
    image: images.events.music,
    date: "May 17, 2025",
    time: "6:00 PM - 9:00 PM",
    venue: "Main Stage",
    teamSize: "4-6 members",
    index: 3
  },
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
    index: 4
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
    index: 5
  },
]

type EventCategory = "all" | "tech" | "cultural" | "sports"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

export function EventsShowcase() {
  const [activeCategory, setActiveCategory] = useState<EventCategory>("all")
  const [sampleEvents] = useState(getSampleEvents)
  
  const filteredEvents = activeCategory === "all"
    ? sampleEvents
    : sampleEvents.filter(event => event.category === activeCategory)
      // Update indices for animation staggering after filtering
  const eventsWithUpdatedIndices = filteredEvents.map((event, index) => ({
    ...event,
    index
  }));
  
  return (
    <section className="py-24 px-4 cyber-grid">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold font-display mb-4"
          >
            Explore <span className="text-glow-purple animate-flicker">Events</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-300 max-w-2xl mx-auto"
          >
            Discover a diverse range of technical, cultural, and sports events designed to showcase your talents and challenge your abilities.
          </motion.p>
        </div>
        {/* Category Filters */}
        <motion.div 
          className="flex flex-wrap gap-4 justify-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          {(["all", "tech", "cultural", "sports"] as EventCategory[]).map((category, index) => (
            <motion.button
              key={category}
              onClick={() => setActiveCategory(category)}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`px-6 py-3 rounded-full font-medium text-sm uppercase tracking-wider transition-all ${
                activeCategory === category 
                  ? "glassmorphism neon-glow-purple animate-pulse"
                  : "bg-black/20 hover:bg-black/30"
              }`}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>
        
        {/* Events Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {eventsWithUpdatedIndices.map((event) => (
              <EventCard key={event.id} {...event} />
            ))}
          </motion.div>
        </AnimatePresence>
        
        {/* View All Button */}
        <div className="mt-16 text-center">
          <Link 
            href="/events"
            className="px-8 py-4 rounded-full bg-black/30 border border-[hsl(var(--neon-purple))] hover:bg-[hsl(var(--neon-purple))]/10 transition-colors inline-flex items-center"
          >
            View All Events
            
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
