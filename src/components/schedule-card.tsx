"use client"

import React from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { FiClock, FiMapPin } from "react-icons/fi"
import { images } from "@/config/images"

interface ScheduleCardProps {
  id: string
  title: string
  time: string
  venue: string
  category: "tech" | "cultural" | "sports" | "other"
  featured?: boolean
  description?: string
  index: number
}

// Card animation variants
const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, 
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: "easeOut"
    }
  })
}

export function ScheduleCard({ id, title, time, venue, category, featured, description, index }: ScheduleCardProps) {
  // Get appropriate image based on event category
  const getEventImage = () => {
    switch(category) {
      case "tech":
        return title.toLowerCase().includes("hackathon") ? images.events.hackathon : 
               title.toLowerCase().includes("robot") ? images.events.robotics : 
               images.events.workshops;
      case "cultural":
        return title.toLowerCase().includes("dance") ? images.events.dance : 
               title.toLowerCase().includes("music") || title.toLowerCase().includes("band") ? images.events.music : 
               images.events.dance;
      case "sports":
        return images.events.gaming;
      default:
        return images.backgrounds.schedule;
    }
  }
  
  return (
    <motion.div
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={cardVariants}
      className="w-full"
    >
      <div className={`glassmorphism rounded-xl p-4 ${featured ? 'border-[1px] border-[hsl(var(--neon-purple))]/50 neon-glow-purple' : 'border border-gray-700'}`}>
        <div className="flex flex-col md:flex-row">
          {/* Left: Event Image */}
          <div className="md:w-1/4 mb-4 md:mb-0 md:mr-4">
            <div className="relative h-40 md:h-full rounded-lg overflow-hidden">
              <Image
                src={getEventImage()}
                alt={title}
                fill
                className="object-cover"
                placeholder="blur"
                blurDataURL="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiMyMjIiLz48L3N2Zz4="
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-black/70 to-transparent"></div>
              {featured && (
                <div className="absolute top-2 right-2 bg-yellow-500/80 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center">
                  <FiStar className="mr-1" size={10} />
                  Featured
                </div>
              )}
            </div>
          </div>
          
          {/* Right: Event Details */}
          <div className="md:w-3/4">
            <h3 className={`text-xl font-semibold mb-2 ${featured ? 'text-glow-purple' : ''}`}>{title}</h3>
            
            {description && (
              <p className="text-gray-300 text-sm mb-3">{description}</p>
            )}
            
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center">
                <FiClock className="mr-2 text-[hsl(var(--neon-blue))]" />
                <span>{time}</span>
              </div>
              <div className="flex items-center">
                <FiMapPin className="mr-2 text-[hsl(var(--neon-magenta))]" />
                <span>{venue}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// Import FiStar in the component
import { FiStar } from "react-icons/fi"
