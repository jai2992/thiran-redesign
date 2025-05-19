"use client"

import React from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { images } from "@/config/images"

export function SponsorsSection() {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-display mb-4">
            Our <span className="text-glow-blue">Sponsors</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            We&apos;re proud to partner with these amazing organizations to bring Thiran 2025 to life.
          </p>
        </motion.div>
        
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
          {images.logos.sponsors.map((logo, index) => (
            <motion.div
              key={`sponsor-${index}`}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="w-32 h-32 md:w-40 md:h-40 relative neumorphism rounded-xl overflow-hidden p-4 flex items-center justify-center"
            >
              <div className="relative w-full h-full">
                <Image
                  src={logo}
                  alt={`Sponsor ${index + 1}`}
                  fill
                  className="object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                />
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <p className="text-gray-400">
            Interested in sponsoring Thiran 2025? 
            <a href="/contact" className="ml-2 text-[hsl(var(--neon-blue))] hover:underline">
              Contact us
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  )
}
