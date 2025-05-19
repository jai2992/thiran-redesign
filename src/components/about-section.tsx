"use client"

import React from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { FiAward, FiUsers, FiCalendar, FiMapPin } from "react-icons/fi"
import { images } from "@/config/images"

export function AboutSection() {
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
            About <span className="text-glow-blue">Thiran</span> <span className="text-glow-purple">2025</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-300 max-w-2xl mx-auto"
          >
            Discover the story behind Sri Eshwar College&apos;s premier national-level techno-cultural-sports festival.
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Image with effects */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="absolute -top-8 -left-8 right-8 bottom-8 bg-gradient-to-br from-[hsl(var(--neon-blue))] to-[hsl(var(--neon-purple))] opacity-20 rounded-2xl" />
              <div className="relative overflow-hidden rounded-2xl glassmorphism border border-white/10 aspect-video">
              {/* Dynamic image from our configuration */}
              <Image
                src={images.backgrounds.about}
                alt="Thiran Festival"
                fill
                className="object-cover"
                placeholder="blur"
                blurDataURL="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiMyMjIiLz48L3N2Zz4="
              />
            </div>
          </motion.div>
          
          {/* Right side - Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-semibold font-display">A Legacy of Excellence</h3>
            
            <p className="text-gray-300">
              Thiran is Sri Eshwar College of Engineering&apos;s flagship festival that brings together students 
              from across the country to showcase their talents in technology, arts, and sports. Since its 
              inception, Thiran has been a platform for innovation, creativity, and sportsmanship.
            </p>
            
            <p className="text-gray-300">
              The 2025 edition aims to push boundaries with cutting-edge tech events, mesmerizing cultural 
              performances, and high-energy sports competitions, all wrapped in a futuristic and immersive 
              experience.
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-2 gap-6 mt-8">
              <div className="glassmorphism p-6 rounded-xl">
                <div className="flex items-center mb-3">
                  <div className="p-2 rounded-md bg-[hsl(var(--neon-blue))]/20 mr-3">
                    <FiUsers className="text-[hsl(var(--neon-blue))]" size={20} />
                  </div>
                  <span className="text-lg font-semibold">5,000+</span>
                </div>
                <p className="text-gray-400 text-sm">Participants from across India</p>
              </div>
              
              <div className="glassmorphism p-6 rounded-xl">
                <div className="flex items-center mb-3">
                  <div className="p-2 rounded-md bg-[hsl(var(--neon-purple))]/20 mr-3">
                    <FiAward className="text-[hsl(var(--neon-purple))]" size={20} />
                  </div>
                  <span className="text-lg font-semibold">50+</span>
                </div>
                <p className="text-gray-400 text-sm">Events across 3 categories</p>
              </div>
              
              <div className="glassmorphism p-6 rounded-xl">
                <div className="flex items-center mb-3">
                  <div className="p-2 rounded-md bg-[hsl(var(--neon-magenta))]/20 mr-3">
                    <FiCalendar className="text-[hsl(var(--neon-magenta))]" size={20} />
                  </div>
                  <span className="text-lg font-semibold">3 Days</span>
                </div>
                <p className="text-gray-400 text-sm">Of non-stop excitement</p>
              </div>
              
              <div className="glassmorphism p-6 rounded-xl">
                <div className="flex items-center mb-3">
                  <div className="p-2 rounded-md bg-[hsl(var(--neon-blue))]/20 mr-3">
                    <FiMapPin className="text-[hsl(var(--neon-blue))]" size={20} />
                  </div>
                  <span className="text-lg font-semibold">30+</span>
                </div>
                <p className="text-gray-400 text-sm">Colleges participating</p>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Vision and Mission */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-24">
          {/* Vision */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glassmorphism p-8 rounded-2xl border border-white/10 relative overflow-hidden"
          >
            {/* Background element */}
            <div className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full bg-[hsl(var(--neon-blue))] opacity-20 blur-[100px]" />
            
            <h3 className="text-2xl font-semibold font-display mb-4 text-glow-blue">Our Vision</h3>
            
            <p className="text-gray-300 relative z-10">
              To create a platform that fosters innovation, creativity, and sportsmanship among students, 
              preparing them to tackle real-world challenges while celebrating diverse talents and cultures.
            </p>
            
            <ul className="mt-6 space-y-3 relative z-10">
              <li className="flex items-start">
                <div className="p-1 rounded-full bg-[hsl(var(--neon-blue))]/20 mr-3 mt-1">
                  <div className="w-2 h-2 rounded-full bg-[hsl(var(--neon-blue))]" />
                </div>
                <span className="text-gray-300">Encouraging technological innovation</span>
              </li>
              
              <li className="flex items-start">
                <div className="p-1 rounded-full bg-[hsl(var(--neon-blue))]/20 mr-3 mt-1">
                  <div className="w-2 h-2 rounded-full bg-[hsl(var(--neon-blue))]" />
                </div>
                <span className="text-gray-300">Promoting cultural exchange and appreciation</span>
              </li>
              
              <li className="flex items-start">
                <div className="p-1 rounded-full bg-[hsl(var(--neon-blue))]/20 mr-3 mt-1">
                  <div className="w-2 h-2 rounded-full bg-[hsl(var(--neon-blue))]" />
                </div>
                <span className="text-gray-300">Fostering competitive spirit and teamwork</span>
              </li>
            </ul>
          </motion.div>
          
          {/* Mission */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glassmorphism p-8 rounded-2xl border border-white/10 relative overflow-hidden"
          >
            {/* Background element */}
            <div className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full bg-[hsl(var(--neon-purple))] opacity-20 blur-[100px]" />
            
            <h3 className="text-2xl font-semibold font-display mb-4 text-glow-purple">Our Mission</h3>
            
            <p className="text-gray-300 relative z-10">
              To organize a well-structured and memorable festival experience that provides students with opportunities 
              to showcase their talents, learn new skills, and build lasting connections across institutions.
            </p>
            
            <ul className="mt-6 space-y-3 relative z-10">
              <li className="flex items-start">
                <div className="p-1 rounded-full bg-[hsl(var(--neon-purple))]/20 mr-3 mt-1">
                  <div className="w-2 h-2 rounded-full bg-[hsl(var(--neon-purple))]" />
                </div>
                <span className="text-gray-300">Creating a safe and inclusive environment</span>
              </li>
              
              <li className="flex items-start">
                <div className="p-1 rounded-full bg-[hsl(var(--neon-purple))]/20 mr-3 mt-1">
                  <div className="w-2 h-2 rounded-full bg-[hsl(var(--neon-purple))]" />
                </div>
                <span className="text-gray-300">Delivering exceptional event experiences</span>
              </li>
              
              <li className="flex items-start">
                <div className="p-1 rounded-full bg-[hsl(var(--neon-purple))]/20 mr-3 mt-1">
                  <div className="w-2 h-2 rounded-full bg-[hsl(var(--neon-purple))]" />
                </div>
                <span className="text-gray-300">Building a sustainable and impactful festival</span>
              </li>
            </ul>
          </motion.div>
        </div>
        
        {/* Team Section */}
        <div className="mt-24">
          <div className="text-center mb-12">
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl font-bold font-display mb-4"
            >
              Meet Our <span className="text-glow-magenta">Team</span>
            </motion.h3>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-lg text-gray-300 max-w-2xl mx-auto"
            >
              The dedicated individuals working tirelessly to make Thiran 2025 an unforgettable experience.
            </motion.p>
          </div>
          
          {/* Team Members Grid (placeholder) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {/* This would be populated with actual team members */}
            <div className="text-center glassmorphism p-4 rounded-xl">
              <div className="w-32 h-32 mx-auto rounded-full overflow-hidden mb-4 bg-gradient-to-br from-[hsl(var(--neon-blue))] to-[hsl(var(--neon-purple))] p-1">
                <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                  {/* Replace with actual team member photo */}
                  <span className="text-white">Photo</span>
                </div>
              </div>
              <h4 className="font-semibold text-lg">Member Name</h4>
              <p className="text-sm text-[hsl(var(--neon-blue))]">Position</p>
            </div>
            
            {/* Repeat for other team members */}
          </div>
        </div>
      </div>
    </section>
  )
}
