"use client"

import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { FiCalendar, FiClock, FiMapPin, FiUsers } from "react-icons/fi"
import { images } from "@/config/images"

export interface EventCardProps {
  id: string
  title: string
  category: "tech" | "cultural" | "sports"
  image: string
  date: string
  time: string
  venue: string
  teamSize: string
  featured?: boolean
  index: number
}

// Card animation variants
const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.6,
      ease: "easeOut"
    }
  }),
  hover: {
    y: -10,
    scale: 1.02,
    transition: { duration: 0.3, ease: "easeOut" }
  }
}

// Button animation variants - currently not used but kept for future use
// const buttonVariants = {
//  rest: { scale: 1 },
//  hover: { scale: 1.05 },
//  tap: { scale: 0.95 }
//}

export function EventCard({ id, title, category, image: providedImage, date, time, venue, teamSize, featured = false, index }: EventCardProps) {
  // Handle image fallback and dynamically get an image if none provided
  const [imageUrl, setImageUrl] = useState<string>(providedImage);
  
  useEffect(() => {
    // If the image starts with http or https, it's already a full URL
    if (providedImage && (providedImage.startsWith('http://') || providedImage.startsWith('https://'))) {
      setImageUrl(providedImage);
    } 
    // If the image starts with a slash, it's a local image
    else if (providedImage && providedImage.startsWith('/')) {
      setImageUrl(providedImage);
    } 
    // Otherwise, get an image from our config based on the event category
    else {
      const categoryMap: Record<string, keyof typeof images.events> = {
        'tech': 'hackathon',
        'cultural': 'music',
        'sports': 'gaming'
      };
      
      // Get the appropriate image type based on category and event title
      let imageKey: keyof typeof images.events = 'workshops';
      
      if (title.toLowerCase().includes('hack')) {
        imageKey = 'hackathon';
      } else if (title.toLowerCase().includes('robot') || title.toLowerCase().includes('robo')) {
        imageKey = 'robotics';
      } else if (title.toLowerCase().includes('dance')) {
        imageKey = 'dance';
      } else if (title.toLowerCase().includes('music') || title.toLowerCase().includes('band')) {
        imageKey = 'music';
      } else if (title.toLowerCase().includes('game') || title.toLowerCase().includes('gaming')) {
        imageKey = 'gaming';
      } else if (category in categoryMap) {
        imageKey = categoryMap[category];
      }
      
      // Get the image URL from our configuration
      setImageUrl(images.events[imageKey]);
    }
  }, [providedImage, title, category]);

  // Category-specific styling
  const categoryStyles = {
    tech: {
      gradient: "from-blue-500/80 to-purple-600/80",
      glow: "neon-glow-blue",
      textGlow: "text-glow-blue",
      pulseColor: "rgba(56, 128, 255, 0.3)"
    },
    cultural: {
      gradient: "from-purple-500/80 to-pink-600/80",
      glow: "neon-glow-purple",
      textGlow: "text-glow-purple",
      pulseColor: "rgba(157, 78, 221, 0.3)"
    },
    sports: {
      gradient: "from-pink-500/80 to-red-600/80",
      glow: "neon-glow-magenta",
      textGlow: "text-glow-magenta",
      pulseColor: "rgba(236, 72, 153, 0.3)"
    }
  }
  
  const { gradient, glow } = categoryStyles[category]
  // textGlow and pulseColor are removed as they're unused

  return (
    <motion.div
      custom={index}
      initial="hidden"
      whileInView="visible"
      whileHover="hover"
      viewport={{ once: true, margin: "-100px" }}
      variants={cardVariants}
      className={`relative group ${featured ? 'md:col-span-2' : ''}`}
    >
      <div className={`absolute inset-0 rounded-2xl ${glow} opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10`}></div>
      
      <div className="h-full neumorphism rounded-2xl overflow-hidden bg-black/20">
        {/* Card Header with Image */}        <div className="relative h-48 overflow-hidden">
          <div className={`absolute inset-0 bg-gradient-to-r ${gradient} mix-blend-multiply`}></div>
          <Image 
            src={imageUrl} 
            alt={title}
            fill
            className="object-cover"
            placeholder="blur"
            blurDataURL="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiMyMjIiLz48L3N2Zz4="
          />
          
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 text-xs uppercase tracking-wider glassmorphism rounded-full">
              {category}
            </span>
          </div>
          
          {featured && (
            <div className="absolute top-4 right-4">
              <span className="px-3 py-1 text-xs font-semibold bg-yellow-500/80 rounded-full">
                Featured
              </span>
            </div>
          )}
        </div>
        
        {/* Card Content */}
        <div className="p-6">
          <h3 className="text-xl font-display font-bold mb-3">{title}</h3>
          
          <div className="space-y-2 mb-4">
            <div className="flex items-center text-sm text-gray-300">
              <FiCalendar className="mr-2 text-[hsl(var(--neon-blue))]" />
              <span>{date}</span>
            </div>
            
            <div className="flex items-center text-sm text-gray-300">
              <FiClock className="mr-2 text-[hsl(var(--neon-purple))]" />
              <span>{time}</span>
            </div>
            
            <div className="flex items-center text-sm text-gray-300">
              <FiMapPin className="mr-2 text-[hsl(var(--neon-magenta))]" />
              <span>{venue}</span>
            </div>
            
            <div className="flex items-center text-sm text-gray-300">
              <FiUsers className="mr-2 text-[hsl(var(--neon-blue))]" />
              <span>Team: {teamSize}</span>
            </div>
          </div>
          
          <Link 
            href={`/events/${id}`}
            className="inline-block w-full py-3 text-center rounded-lg glassmorphism border border-white/10 font-semibold hover:bg-white/10 transition-colors"
          >
            View Details
          </Link>
        </div>
      </div>
    </motion.div>
  )
}
