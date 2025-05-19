"use client"

import React from "react"
import Link from "next/link"
import { FaInstagram, FaTwitter, FaFacebookF, FaYoutube } from "react-icons/fa"

export function Footer() {
  return (
    <footer className="relative pt-24 pb-6 overflow-hidden">
      {/* Background neon glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-1 bg-gradient-to-r from-[hsl(var(--neon-blue))] via-[hsl(var(--neon-purple))] to-[hsl(var(--neon-magenta))] blur-md" />
      
      <div className="container mx-auto px-4">
        {/* Top Section */}
        <div className="flex flex-wrap gap-y-16">
          {/* Logo & Info */}
          <div className="w-full md:w-1/3 pr-4">
            <h2 className="text-3xl font-bold font-display mb-4 text-glow-purple tracking-wider">
              THIRAN <span className="text-glow-blue">2025</span>
            </h2>
            
            <p className="text-gray-300 mb-6 max-w-xs">
              The ultimate celebration of technology, culture, and sports at 
              Sri Eshwar College of Engineering, Coimbatore.
            </p>
            
            <div className="flex space-x-4">
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2.5 rounded-full glassmorphism hover:neon-glow-magenta transition-all"
              >
                <FaInstagram className="text-[hsl(var(--neon-magenta))]" size={18} />
              </a>
              
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2.5 rounded-full glassmorphism hover:neon-glow-blue transition-all"
              >
                <FaTwitter className="text-[hsl(var(--neon-blue))]" size={18} />
              </a>
              
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2.5 rounded-full glassmorphism hover:neon-glow-blue transition-all"
              >
                <FaFacebookF className="text-[hsl(var(--neon-blue))]" size={18} />
              </a>
              
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2.5 rounded-full glassmorphism hover:neon-glow-purple transition-all"
              >
                <FaYoutube className="text-[hsl(var(--neon-purple))]" size={18} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="w-full md:w-1/5 px-4">
            <h3 className="text-lg font-semibold mb-5">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/events" className="text-gray-400 hover:text-white transition-colors">
                  Events
                </Link>
              </li>
              <li>
                <Link href="/schedule" className="text-gray-400 hover:text-white transition-colors">
                  Schedule
                </Link>
              </li>
              <li>
                <Link href="/celebrity" className="text-gray-400 hover:text-white transition-colors">
                  Celebrity
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Events */}
          <div className="w-full md:w-1/5 px-4">
            <h3 className="text-lg font-semibold mb-5">Events</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/events?category=tech" className="text-gray-400 hover:text-white transition-colors">
                  Technical Events
                </Link>
              </li>
              <li>
                <Link href="/events?category=cultural" className="text-gray-400 hover:text-white transition-colors">
                  Cultural Events
                </Link>
              </li>
              <li>
                <Link href="/events?category=sports" className="text-gray-400 hover:text-white transition-colors">
                  Sports Events
                </Link>
              </li>
              <li>
                <Link href="/events?featured=true" className="text-gray-400 hover:text-white transition-colors">
                  Featured Events
                </Link>
              </li>
              <li>
                <Link href="/register" className="text-gray-400 hover:text-white transition-colors">
                  Register
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div className="w-full md:w-1/5 px-4">
            <h3 className="text-lg font-semibold mb-5">Contact Info</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="mr-2 text-[hsl(var(--neon-blue))]">•</span>
                <span className="text-gray-400">
                  Sri Eshwar College of Engineering,<br />
                  Coimbatore, Tamil Nadu, India
                </span>
              </li>
              <li className="flex items-center">
                <span className="mr-2 text-[hsl(var(--neon-purple))]">•</span>
                <a href="mailto:thiran2025@sece.ac.in" className="text-gray-400 hover:text-white transition-colors">
                  thiran2025@sece.ac.in
                </a>
              </li>
              <li className="flex items-center">
                <span className="mr-2 text-[hsl(var(--neon-magenta))]">•</span>
                <a href="tel:+919876543210" className="text-gray-400 hover:text-white transition-colors">
                  +91 98765 43210
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Divider */}
        <div className="w-full h-px bg-gray-800 my-10" />
        
        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Thiran 2025. All rights reserved.
          </p>
          
          <div className="flex space-x-6">
            <Link href="/privacy-policy" className="text-gray-400 hover:text-white transition-colors text-sm">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="text-gray-400 hover:text-white transition-colors text-sm">
              Terms of Service
            </Link>
            <Link href="/faq" className="text-gray-400 hover:text-white transition-colors text-sm">
              FAQ
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
