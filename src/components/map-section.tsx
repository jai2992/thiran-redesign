"use client"

import React from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { images } from "@/config/images"

export function MapSection() {
  return (
    <section className="py-12 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold font-display mb-4"
          >
            Venue <span className="text-glow-blue">Location</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-300 max-w-2xl mx-auto"
          >
            Sri Eshwar College of Engineering, Coimbatore, Tamil Nadu
          </motion.p>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-xl overflow-hidden glassmorphism border border-white/10 h-[400px]"
        >
          <Image
            src={images.backgrounds.contact}
            alt="Event Location Map"
            fill
            className="object-cover"
            placeholder="blur"
            blurDataURL="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiMyMjIiLz48L3N2Zz4="
          />
          <div className="absolute top-0 left-0 w-full h-full bg-black/30"></div>
          
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black/70 rounded-lg p-4 glassmorphism border border-white/20">
            <div className="text-center">
              <h3 className="font-bold text-xl mb-2">Sri Eshwar College of Engineering</h3>
              <p className="text-gray-300">Coimbatore - Pollachi Highway, Kondampatti Post</p>
              <p className="text-gray-300 mb-4">Vadasithur, Coimbatore, Tamil Nadu 641202</p>
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
        </motion.div>
      </div>
    </section>
  )
}
