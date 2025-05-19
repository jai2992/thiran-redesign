"use client"

import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { FaInstagram, FaTwitter } from "react-icons/fa"
import { images } from "@/config/images"

interface Celebrity {
  id: string
  name: string
  role: string
  image: string
  instagram?: string
  twitter?: string
  day: 1 | 2 | 3
}

// Celebrity data with dynamic images from our configuration
const celebrities: Celebrity[] = [
  {
    id: "celeb1",
    name: "DJ Sonic",
    role: "Music Producer",
    image: images.celebrities.performer1,
    instagram: "https://instagram.com/",
    twitter: "https://twitter.com/",
    day: 1
  },
  {
    id: "celeb2",
    name: "Dance Troupe X",
    role: "Dance Group",
    image: images.celebrities.performer2,
    instagram: "https://instagram.com/",
    day: 2
  },
  {
    id: "celeb3",
    name: "Rock Band Alpha",
    role: "Music Band",
    image: images.celebrities.performer1,
    instagram: "https://instagram.com/",
    twitter: "https://twitter.com/",
    day: 3
  },
  {
    id: "celeb4",
    name: "Tech Speaker",
    role: "Industry Expert",
    image: images.celebrities.speaker1,
    twitter: "https://twitter.com/",
    day: 1
  },
]

export function CelebrityLineup() {
  const [activeDay, setActiveDay] = useState<1 | 2 | 3>(1)
  const [activeIndex, setActiveIndex] = useState(0)
  
  // Filter celebrities by selected day
  const dayCelebrities = celebrities.filter(celeb => celeb.day === activeDay)
  
  // Auto rotate carousel every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (dayCelebrities.length > 1) {
        setActiveIndex(prevIndex => (prevIndex + 1) % dayCelebrities.length)
      }
    }, 5000)
    
    return () => clearInterval(interval)
  }, [dayCelebrities.length, activeDay])
  
  // Reset active index when changing days
  useEffect(() => {
    setActiveIndex(0)
  }, [activeDay])

  return (
    <section className="py-24 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold font-display mb-4"
          >
            Celebrity <span className="text-glow-magenta">Lineup</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-300 max-w-2xl mx-auto"
          >
            Experience performances from top artists, industry experts, and influential personalities across three exciting days.
          </motion.p>
        </div>
        
        {/* Day Selector */}
        <div className="flex justify-center mb-12">
          <div className="glassmorphism p-1 rounded-full flex">
            {[1, 2, 3].map(day => (
              <button
                key={day}
                onClick={() => setActiveDay(day as 1 | 2 | 3)}
                className={`relative px-8 py-3 rounded-full font-medium transition-colors z-10 ${
                  activeDay === day ? "text-white" : "text-gray-400 hover:text-gray-200"
                }`}
              >
                Day {day}
                {activeDay === day && (
                  <motion.div
                    layoutId="dayIndicator"
                    className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--neon-blue))] to-[hsl(var(--neon-purple))] rounded-full -z-10"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
        
        {/* Celebrity Carousel */}
        <div className="relative overflow-hidden py-10">
          {/* Display if no celebrities for the selected day */}
          {dayCelebrities.length === 0 ? (
            <div className="flex justify-center">
              <p className="text-lg text-gray-400">Lineup coming soon...</p>
            </div>
          ) : (
            <>
              {/* Main Carousel */}
              <div className="relative h-[500px]">
                {dayCelebrities.map((celebrity, index) => (
                  <motion.div
                    key={celebrity.id}
                    initial={{ opacity: 0, y: 50, scale: 0.9 }}
                    animate={{
                      opacity: index === activeIndex ? 1 : 0,
                      y: index === activeIndex ? 0 : 50,
                      scale: index === activeIndex ? 1 : 0.9,
                      zIndex: index === activeIndex ? 1 : 0
                    }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="absolute inset-0 flex flex-col md:flex-row items-center gap-8 md:gap-16"
                  >
                    {/* Celebrity Image */}
                    <div className="w-full md:w-1/2 flex justify-center">
                      <div className="relative w-80 h-80">
                        <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--neon-blue))] to-[hsl(var(--neon-magenta))] opacity-70 rounded-2xl -rotate-6 scale-[0.96]" />
                        <div className="absolute inset-0 bg-black rounded-2xl overflow-hidden">
                          <Image 
                            src={celebrity.image} 
                            alt={celebrity.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </div>
                    </div>
                    
                    {/* Celebrity Info */}
                    <div className="w-full md:w-1/2 text-center md:text-left">
                      <h3 className="text-4xl md:text-5xl font-bold font-display mb-4 text-glow-purple">
                        {celebrity.name}
                      </h3>
                      
                      <p className="text-xl md:text-2xl text-[hsl(var(--neon-blue))] mb-6">
                        {celebrity.role}
                      </p>
                      
                      <p className="text-gray-300 mb-8 max-w-md">
                        Don&apos;t miss this extraordinary performance that will transform your festival experience.
                      </p>
                      
                      {/* Social Media Links */}
                      <div className="flex gap-4 justify-center md:justify-start">
                        {celebrity.instagram && (
                          <a 
                            href={celebrity.instagram}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 neumorphism rounded-full text-[hsl(var(--neon-magenta))] hover:neon-glow-magenta transition-all"
                          >
                            <FaInstagram size={24} />
                          </a>
                        )}
                        
                        {celebrity.twitter && (
                          <a 
                            href={celebrity.twitter}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 neumorphism rounded-full text-[hsl(var(--neon-blue))] hover:neon-glow-blue transition-all"
                          >
                            <FaTwitter size={24} />
                          </a>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              {/* Carousel Indicators */}
              {dayCelebrities.length > 1 && (
                <div className="flex justify-center gap-2 mt-4">
                  {dayCelebrities.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveIndex(index)}
                      className={`w-3 h-3 rounded-full transition-colors ${
                        activeIndex === index
                          ? "bg-[hsl(var(--neon-purple))]"
                          : "bg-gray-600 hover:bg-gray-500"
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  )
}
