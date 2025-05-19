"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { FiMail, FiPhone, FiMapPin, FiSend } from "react-icons/fi"
import { FaWhatsapp, FaInstagram, FaFacebookF, FaTwitter } from "react-icons/fa"
import Image from "next/image"
import { images } from "@/config/images"

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      setFormData({ name: "", email: "", subject: "", message: "" })
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false)
      }, 5000)
    }, 1500)
  }

  return (
    <section className="py-24 px-4 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-96 h-96 bg-[hsl(var(--neon-blue))] opacity-20 blur-[100px] rounded-full" />
      <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-96 h-96 bg-[hsl(var(--neon-magenta))] opacity-20 blur-[100px] rounded-full" />
      
      <div className="container mx-auto relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold font-display mb-4"
          >
            Get in <span className="text-glow-blue">Touch</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-300 max-w-2xl mx-auto"
          >
            Have questions? Contact our team for more information about Thiran 2025.
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="glassmorphism rounded-2xl p-8">
              {isSubmitted ? (
                <div className="py-12 text-center">
                  <div className="mx-auto w-16 h-16 mb-4 flex items-center justify-center rounded-full bg-green-500/20 text-green-400">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-semibold mb-2">Message Sent!</h3>
                  <p className="text-gray-300">We'll get back to you as soon as possible.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">Your Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full bg-black/30 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[hsl(var(--neon-blue))] transition-all"
                      placeholder="Enter your name"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full bg-black/30 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[hsl(var(--neon-blue))] transition-all"
                      placeholder="Enter your email"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium mb-2">Subject</label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full bg-black/30 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[hsl(var(--neon-blue))] transition-all"
                      placeholder="Subject of your message"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full bg-black/30 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[hsl(var(--neon-blue))] transition-all resize-none"
                      placeholder="Your message"
                    ></textarea>
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-3 px-6 rounded-lg flex items-center justify-center font-medium transition-all ${
                      isSubmitting
                        ? "bg-gray-700 cursor-not-allowed"
                        : "bg-gradient-to-r from-[hsl(var(--neon-blue))] to-[hsl(var(--neon-purple))] hover:opacity-90"
                    }`}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      <span className="flex items-center">
                        <FiSend className="mr-2" />
                        Send Message
                      </span>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
          
          {/* Contact Info & QR Codes */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-8"
          >
            {/* Contact Info */}
            <div className="glassmorphism rounded-2xl p-8 space-y-6">
              <h3 className="text-2xl font-display font-bold mb-6">Contact Information</h3>
              
              <div className="flex items-start space-x-4">
                <div className="p-3 rounded-lg bg-[hsl(var(--neon-blue))]/20 text-[hsl(var(--neon-blue))]">
                  <FiMail size={24} />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Email</h4>
                  <a href="mailto:thiran2025@sece.ac.in" className="text-gray-300 hover:text-white transition-colors">
                    thiran2025@sece.ac.in
                  </a>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="p-3 rounded-lg bg-[hsl(var(--neon-purple))]/20 text-[hsl(var(--neon-purple))]">
                  <FiPhone size={24} />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Phone</h4>
                  <a href="tel:+919876543210" className="text-gray-300 hover:text-white transition-colors">
                    +91 98765 43210
                  </a>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="p-3 rounded-lg bg-[hsl(var(--neon-magenta))]/20 text-[hsl(var(--neon-magenta))]">
                  <FiMapPin size={24} />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Address</h4>
                  <p className="text-gray-300">
                    Sri Eshwar College of Engineering<br />
                    Coimbatore, Tamil Nadu, India
                  </p>
                </div>
              </div>
              
              {/* Social Media */}
              <div className="pt-4">
                <h4 className="font-semibold mb-4">Connect With Us</h4>
                <div className="flex space-x-4">
                  <a 
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 neumorphism rounded-full text-[hsl(var(--neon-magenta))] hover:neon-glow-magenta transition-all"
                  >
                    <FaInstagram size={20} />
                  </a>
                  
                  <a 
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 neumorphism rounded-full text-[hsl(var(--neon-blue))] hover:neon-glow-blue transition-all"
                  >
                    <FaTwitter size={20} />
                  </a>
                  
                  <a 
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 neumorphism rounded-full text-[hsl(var(--neon-blue))] hover:neon-glow-blue transition-all"
                  >
                    <FaFacebookF size={20} />
                  </a>
                  
                  <a 
                    href="https://wa.me/919876543210"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 neumorphism rounded-full text-[hsl(var(--neon-purple))] hover:neon-glow-purple transition-all"
                  >
                    <FaWhatsapp size={20} />
                  </a>
                </div>
              </div>
            </div>
            
            {/* QR Codes */}
            <div className="glassmorphism rounded-2xl p-8">
              <h3 className="text-2xl font-display font-bold mb-6">Scan & Connect</h3>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="flex flex-col items-center">
                  <div className="bg-white p-2 rounded-lg mb-3">
                    <div className="w-32 h-32 relative">
                      {/* Replace with actual QR code image */}
                      <div className="absolute inset-0 flex items-center justify-center text-black text-xs text-center">
                        Registration<br />QR Code
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-center">Registration</p>
                </div>
                
                <div className="flex flex-col items-center">
                  <div className="bg-white p-2 rounded-lg mb-3">
                    <div className="w-32 h-32 relative">
                      {/* Replace with actual QR code image */}
                      <div className="absolute inset-0 flex items-center justify-center text-black text-xs text-center">
                        Instagram<br />QR Code
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-center">Instagram</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
