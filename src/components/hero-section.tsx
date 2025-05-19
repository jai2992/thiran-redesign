"use client"

import React, { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { FiArrowRight } from "react-icons/fi"
import Link from "next/link"
import { images } from "@/config/images"

// Animation variants
const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.8,
      ease: "easeOut"
    }
  })
}

const floatAnimation = {
  initial: { y: 0 },
  animate: {
    y: [0, -15, 0],
    transition: { 
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut" 
    }
  }
}

export function HeroSection() {
  // Parallax effect for mouse movement
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 })
  const heroRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const hero = heroRef.current
      if (!hero) return
      
      const rect = hero.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width
      const y = (e.clientY - rect.top) / rect.height
      
      setMousePosition({ x, y })
    }
    
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  // Countdown timer
  const [timeLeft, setTimeLeft] = React.useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })
  
  useEffect(() => {
    // Set fest date (example: May 15, 2025)
    const festDate = new Date('2025-05-15T09:00:00')
    
    const interval = setInterval(() => {
      const now = new Date()
      const difference = festDate.getTime() - now.getTime()
      
      if (difference <= 0) {
        clearInterval(interval)
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
        return
      }
      
      const days = Math.floor(difference / (1000 * 60 * 60 * 24))
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((difference % (1000 * 60)) / 1000)
      
      setTimeLeft({ days, hours, minutes, seconds })
    }, 1000)
    
    return () => clearInterval(interval)
  }, [])

  return (
    <section 
      ref={heroRef}
      className="relative min-h-screen overflow-hidden flex flex-col justify-center"
      style={{
        backgroundImage: "radial-gradient(circle at center, rgba(50, 0, 100, 0.3) 0%, transparent 80%)",
      }}
    >
      {/* Background elements that move with mouse */}
      <div 
        className="absolute inset-0 z-0 opacity-30"
        style={{ 
          backgroundImage: "url('/grid.svg')",
          transform: `translateX(${mousePosition.x * -10}px) translateY(${mousePosition.y * -10}px)`,
          transition: "transform 0.3s ease-out"
        }}
      />
      
      {/* Floating orbs */}
      <motion.div
        variants={floatAnimation}
        initial="initial"
        animate="animate"
        className="absolute top-1/4 right-1/4 w-32 h-32 rounded-full neon-glow-blue opacity-20 blur-xl"
        style={{ 
          background: "radial-gradient(circle at center, hsl(var(--neon-blue)), transparent 70%)",
          transform: `translateX(${mousePosition.x * 20}px) translateY(${mousePosition.y * 20}px)`
        }}
      />
      
      <motion.div
        variants={floatAnimation}
        initial="initial"
        animate="animate"
        className="absolute bottom-1/3 left-1/4 w-40 h-40 rounded-full neon-glow-purple opacity-20 blur-xl"
        style={{ 
          background: "radial-gradient(circle at center, hsl(var(--neon-purple)), transparent 70%)",
          transform: `translateX(${mousePosition.x * -30}px) translateY(${mousePosition.y * -30}px)`,
          animationDelay: "1s"
        }}
      />
      
      <motion.div
        variants={floatAnimation}
        initial="initial"
        animate="animate"
        className="absolute top-2/3 right-1/3 w-24 h-24 rounded-full neon-glow-magenta opacity-20 blur-xl"
        style={{ 
          background: "radial-gradient(circle at center, hsl(var(--neon-magenta)), transparent 70%)",
          transform: `translateX(${mousePosition.x * 40}px) translateY(${mousePosition.y * 40}px)`,
          animationDelay: "2s"
        }}
      />
      
      {/* Hero content */}
      <div className="container mx-auto px-4 pt-32 pb-16 relative z-10">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="flex-1 lg:pr-12">
            <motion.h2 
              custom={0}
              initial="hidden"
              animate="visible"
              variants={textVariants}
              className="text-xl md:text-2xl mb-2 text-glow-blue font-medium tracking-wider"
            >
              MAY 15-17, 2025 · SRI ESHWAR COLLEGE
            </motion.h2>
            
            <motion.h1 
              custom={1}
              initial="hidden"
              animate="visible"
              variants={textVariants}
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 font-display"
            >
              <span className="text-glow-purple">THIRAN</span> <span className="text-glow-blue">2025</span>
            </motion.h1>
            
            <motion.p 
              custom={2}
              initial="hidden"
              animate="visible"
              variants={textVariants}
              className="text-xl md:text-2xl mb-8 max-w-2xl text-gray-300"
            >
              The ultimate celebration of technology, culture, and sports. 
              Join us for three days of innovation, creativity, and competition.
            </motion.p>
            
            <motion.div 
              custom={3}
              initial="hidden"
              animate="visible"
              variants={textVariants}
              className="flex flex-wrap gap-4 mb-12"
            >
              <Link 
                href="/register" 
                className="px-8 py-4 rounded-full bg-gradient-to-r from-[hsl(var(--neon-blue))] to-[hsl(var(--neon-purple))] text-white font-semibold text-lg hover:opacity-90 transition-opacity flex items-center justify-center group"
              >
                Register Now 
                <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link 
                href="/events" 
                className="px-8 py-4 rounded-full border-2 border-[hsl(var(--neon-magenta))] text-[hsl(var(--neon-magenta))] font-semibold text-lg hover:bg-[hsl(var(--neon-magenta))]/10 transition-colors"
              >
                Explore Events
              </Link>
            </motion.div>
            
            {/* Countdown */}
            <motion.div 
              custom={4}
              initial="hidden"
              animate="visible"
              variants={textVariants}
              className="flex gap-4 md:gap-6"
            >
              <div className="flex flex-col items-center">
                <div className="text-3xl md:text-5xl font-bold font-display text-glow-blue">
                  {timeLeft.days.toString().padStart(2, '0')}
                </div>
                <div className="text-xs md:text-sm text-gray-400 uppercase">Days</div>
              </div>
              
              <div className="text-3xl md:text-5xl font-bold">:</div>
              
              <div className="flex flex-col items-center">
                <div className="text-3xl md:text-5xl font-bold font-display text-glow-purple">
                  {timeLeft.hours.toString().padStart(2, '0')}
                </div>
                <div className="text-xs md:text-sm text-gray-400 uppercase">Hours</div>
              </div>
              
              <div className="text-3xl md:text-5xl font-bold">:</div>
              
              <div className="flex flex-col items-center">
                <div className="text-3xl md:text-5xl font-bold font-display text-glow-magenta">
                  {timeLeft.minutes.toString().padStart(2, '0')}
                </div>
                <div className="text-xs md:text-sm text-gray-400 uppercase">Minutes</div>
              </div>
              
              <div className="text-3xl md:text-5xl font-bold">:</div>
              
              <div className="flex flex-col items-center">
                <div className="text-3xl md:text-5xl font-bold font-display text-glow-blue">
                  {timeLeft.seconds.toString().padStart(2, '0')}
                </div>
                <div className="text-xs md:text-sm text-gray-400 uppercase">Seconds</div>
              </div>
            </motion.div>
          </div>
          
          {/* Abstract hero image */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex-1 mt-12 lg:mt-0 max-w-md lg:max-w-none"
          >            {/* Dynamic hero image from our image configuration */}
            <div className="w-full h-80 md:h-96 lg:h-[500px] relative">
              <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--neon-blue))] via-[hsl(var(--neon-purple))] to-[hsl(var(--neon-magenta))] opacity-30 rounded-xl blur-xl" />
              <div className="absolute inset-0 p-2">
                <div className="w-full h-full glassmorphism rounded-xl overflow-hidden">
                  <Image 
                    src={images.hero.main}
                    alt="THIRAN 2025 Tech Fest"
                    fill
                    className="object-cover opacity-80 hover:opacity-100 transition-opacity duration-500"
                    placeholder="blur"
                    blurDataURL="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiMyMjIiLz48L3N2Zz4="
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent mix-blend-multiply" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
