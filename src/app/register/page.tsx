"use client"

import { useState } from "react"
import { MainNav } from "@/components/main-nav"
import { Footer } from "@/components/footer"
import { motion } from "framer-motion"
import { FiUser, FiMail, FiPhone, FiMapPin, FiCheckCircle, FiLoader } from "react-icons/fi"

const collegesList = [
  "Sri Eshwar College of Engineering",
  "PSG College of Technology",
  "Coimbatore Institute of Technology",
  "Amrita University",
  "Anna University",
  "Other"
]

export default function RegisterPage() {
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    college: "",
    otherCollege: "",
    year: "",
    department: "",
    eventsInterested: {
      tech: false,
      cultural: false,
      sports: false
    },
    accommodation: "no",
    referralCode: ""
  })
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }
  
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target
    setFormData(prev => ({
      ...prev,
      eventsInterested: {
        ...prev.eventsInterested,
        [name]: checked
      }
    }))
  }
  
  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }
  
  const nextStep = () => {
    setStep(prev => prev + 1)
    window.scrollTo(0, 0)
  }
  
  const prevStep = () => {
    setStep(prev => prev - 1)
    window.scrollTo(0, 0)
  }
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      
      // Reset form after submission
      setFormData({
        name: "",
        email: "",
        phone: "",
        college: "",
        otherCollege: "",
        year: "",
        department: "",
        eventsInterested: {
          tech: false,
          cultural: false,
          sports: false
        },
        accommodation: "no",
        referralCode: ""
      })
    }, 2000)
  }
  
  // Animation variants
  const formVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, x: 50, transition: { duration: 0.3 } }
  }
  
  return (
    <>
      <MainNav />
      <main className="pt-32 pb-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
              <span className="text-glow-purple">Register</span> for Thiran <span className="text-glow-blue">2025</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Join us for three days of innovation, creativity, and competition. 
              Register now to secure your spot at Sri Eshwar College's premier fest.
            </p>
          </div>
          
          {/* Registration Container */}
          <div className="max-w-3xl mx-auto">
            {isSubmitted ? (
              <motion.div 
                initial="hidden"
                animate="visible"
                variants={formVariants}
                className="glassmorphism rounded-2xl p-8 md:p-12 text-center"
              >
                <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
                  <FiCheckCircle size={40} className="text-green-400" />
                </div>
                
                <h2 className="text-3xl font-bold mb-4">Registration Successful!</h2>
                <p className="text-xl text-gray-300 mb-6">
                  Thank you for registering for Thiran 2025. 
                </p>
                <p className="text-gray-400 mb-8">
                  We've sent a confirmation email with all the details. 
                  Check your inbox and get ready for an amazing experience!
                </p>
                
                <div className="flex justify-center space-x-4">
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="px-6 py-3 border border-gray-700 rounded-lg hover:bg-black/30 transition-colors"
                  >
                    Register Another
                  </button>
                  
                  <a
                    href="/events"
                    className="px-6 py-3 bg-gradient-to-r from-[hsl(var(--neon-blue))] to-[hsl(var(--neon-purple))] rounded-lg hover:opacity-90 transition-opacity"
                  >
                    Explore Events
                  </a>
                </div>
              </motion.div>
            ) : (
              <div className="glassmorphism rounded-2xl p-6 md:p-10">
                {/* Progress Steps */}
                <div className="flex justify-between items-center mb-10 px-4">
                  {[1, 2, 3].map((item) => (
                    <div key={item} className="flex flex-col items-center relative z-10">
                      <div 
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          step >= item
                            ? 'bg-gradient-to-r from-[hsl(var(--neon-blue))] to-[hsl(var(--neon-purple))] text-white'
                            : 'bg-black/30 border border-gray-700 text-gray-400'
                        }`}
                      >
                        {step > item ? (
                          <FiCheckCircle size={20} />
                        ) : (
                          <span>{item}</span>
                        )}
                      </div>
                      <span className={`text-sm mt-2 ${step >= item ? 'text-white' : 'text-gray-400'}`}>
                        {item === 1 ? 'Personal' : item === 2 ? 'Academic' : 'Preferences'}
                      </span>
                    </div>
                  ))}
                  
                  {/* Progress line */}
                  <div className="absolute left-0 right-0 h-0.5 bg-gray-700">
                    <div 
                      className="h-full bg-gradient-to-r from-[hsl(var(--neon-blue))] to-[hsl(var(--neon-purple))]"
                      style={{ width: `${(step - 1) * 50}%` }}
                    />
                  </div>
                </div>
                
                <form onSubmit={(e) => e.preventDefault()}>
                  {/* Step 1: Personal Information */}
                  {step === 1 && (
                    <motion.div
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      variants={formVariants}
                      className="space-y-6"
                    >
                      <h2 className="text-2xl font-bold mb-6">Personal Information</h2>
                      
                      <div className="space-y-4">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium mb-2 flex items-center">
                            <FiUser className="mr-2 text-[hsl(var(--neon-blue))]" />
                            Full Name
                          </label>
                          <input
                            id="name"
                            name="name"
                            type="text"
                            required
                            value={formData.name}
                            onChange={handleInputChange}
                            className="w-full bg-black/30 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[hsl(var(--neon-blue))]"
                            placeholder="Enter your full name"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium mb-2 flex items-center">
                            <FiMail className="mr-2 text-[hsl(var(--neon-purple))]" />
                            Email Address
                          </label>
                          <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full bg-black/30 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[hsl(var(--neon-blue))]"
                            placeholder="Enter your email address"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="phone" className="block text-sm font-medium mb-2 flex items-center">
                            <FiPhone className="mr-2 text-[hsl(var(--neon-magenta))]" />
                            Phone Number
                          </label>
                          <input
                            id="phone"
                            name="phone"
                            type="tel"
                            required
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="w-full bg-black/30 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[hsl(var(--neon-blue))]"
                            placeholder="Enter your phone number"
                          />
                        </div>
                      </div>
                      
                      <div className="pt-6 flex justify-end">
                        <button
                          type="button"
                          onClick={nextStep}
                          className="px-8 py-3 bg-gradient-to-r from-[hsl(var(--neon-blue))] to-[hsl(var(--neon-purple))] rounded-lg hover:opacity-90 transition-opacity flex items-center"
                        >
                          Next
                          <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                          </svg>
                        </button>
                      </div>
                    </motion.div>
                  )}
                  
                  {/* Step 2: Academic Information */}
                  {step === 2 && (
                    <motion.div
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      variants={formVariants}
                      className="space-y-6"
                    >
                      <h2 className="text-2xl font-bold mb-6">Academic Information</h2>
                      
                      <div className="space-y-4">
                        <div>
                          <label htmlFor="college" className="block text-sm font-medium mb-2 flex items-center">
                            <FiMapPin className="mr-2 text-[hsl(var(--neon-blue))]" />
                            College/Institution
                          </label>
                          <select
                            id="college"
                            name="college"
                            required
                            value={formData.college}
                            onChange={handleInputChange}
                            className="w-full bg-black/30 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[hsl(var(--neon-blue))]"
                          >
                            <option value="">Select your college</option>
                            {collegesList.map((college) => (
                              <option key={college} value={college}>{college}</option>
                            ))}
                          </select>
                        </div>
                        
                        {formData.college === "Other" && (
                          <div>
                            <label htmlFor="otherCollege" className="block text-sm font-medium mb-2 flex items-center">
                              <FiMapPin className="mr-2 text-[hsl(var(--neon-purple))]" />
                              Specify College Name
                            </label>
                            <input
                              id="otherCollege"
                              name="otherCollege"
                              type="text"
                              required={formData.college === "Other"}
                              value={formData.otherCollege}
                              onChange={handleInputChange}
                              className="w-full bg-black/30 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[hsl(var(--neon-blue))]"
                              placeholder="Enter your college name"
                            />
                          </div>
                        )}
                        
                        <div>
                          <label htmlFor="year" className="block text-sm font-medium mb-2">Year of Study</label>
                          <select
                            id="year"
                            name="year"
                            required
                            value={formData.year}
                            onChange={handleInputChange}
                            className="w-full bg-black/30 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[hsl(var(--neon-blue))]"
                          >
                            <option value="">Select year</option>
                            <option value="1">First Year</option>
                            <option value="2">Second Year</option>
                            <option value="3">Third Year</option>
                            <option value="4">Fourth Year</option>
                            <option value="other">Other</option>
                          </select>
                        </div>
                        
                        <div>
                          <label htmlFor="department" className="block text-sm font-medium mb-2">Department/Major</label>
                          <input
                            id="department"
                            name="department"
                            type="text"
                            required
                            value={formData.department}
                            onChange={handleInputChange}
                            className="w-full bg-black/30 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[hsl(var(--neon-blue))]"
                            placeholder="Enter your department or major"
                          />
                        </div>
                      </div>
                      
                      <div className="pt-6 flex justify-between">
                        <button
                          type="button"
                          onClick={prevStep}
                          className="px-8 py-3 border border-gray-700 rounded-lg hover:bg-black/30 transition-colors flex items-center"
                        >
                          <svg className="mr-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                          </svg>
                          Previous
                        </button>
                        
                        <button
                          type="button"
                          onClick={nextStep}
                          className="px-8 py-3 bg-gradient-to-r from-[hsl(var(--neon-blue))] to-[hsl(var(--neon-purple))] rounded-lg hover:opacity-90 transition-opacity flex items-center"
                        >
                          Next
                          <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                          </svg>
                        </button>
                      </div>
                    </motion.div>
                  )}
                  
                  {/* Step 3: Event Preferences */}
                  {step === 3 && (
                    <motion.div
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      variants={formVariants}
                      className="space-y-6"
                    >
                      <h2 className="text-2xl font-bold mb-6">Event Preferences</h2>
                      
                      <div className="space-y-6">
                        <div>
                          <p className="block text-sm font-medium mb-4">Which events are you interested in participating?</p>
                          <div className="space-y-3">
                            <div className="flex items-center">
                              <input
                                id="tech"
                                name="tech"
                                type="checkbox"
                                checked={formData.eventsInterested.tech}
                                onChange={handleCheckboxChange}
                                className="w-5 h-5 bg-black/30 border border-gray-700 rounded focus:ring-[hsl(var(--neon-blue))]"
                              />
                              <label htmlFor="tech" className="ml-3 text-sm">Technical Events</label>
                            </div>
                            
                            <div className="flex items-center">
                              <input
                                id="cultural"
                                name="cultural"
                                type="checkbox"
                                checked={formData.eventsInterested.cultural}
                                onChange={handleCheckboxChange}
                                className="w-5 h-5 bg-black/30 border border-gray-700 rounded focus:ring-[hsl(var(--neon-blue))]"
                              />
                              <label htmlFor="cultural" className="ml-3 text-sm">Cultural Events</label>
                            </div>
                            
                            <div className="flex items-center">
                              <input
                                id="sports"
                                name="sports"
                                type="checkbox"
                                checked={formData.eventsInterested.sports}
                                onChange={handleCheckboxChange}
                                className="w-5 h-5 bg-black/30 border border-gray-700 rounded focus:ring-[hsl(var(--neon-blue))]"
                              />
                              <label htmlFor="sports" className="ml-3 text-sm">Sports Events</label>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <p className="block text-sm font-medium mb-4">Do you need accommodation during the fest?</p>
                          <div className="space-y-3">
                            <div className="flex items-center">
                              <input
                                id="accommodation-yes"
                                name="accommodation"
                                type="radio"
                                value="yes"
                                checked={formData.accommodation === "yes"}
                                onChange={handleRadioChange}
                                className="w-5 h-5 bg-black/30 border border-gray-700 rounded-full focus:ring-[hsl(var(--neon-blue))]"
                              />
                              <label htmlFor="accommodation-yes" className="ml-3 text-sm">Yes, I need accommodation</label>
                            </div>
                            
                            <div className="flex items-center">
                              <input
                                id="accommodation-no"
                                name="accommodation"
                                type="radio"
                                value="no"
                                checked={formData.accommodation === "no"}
                                onChange={handleRadioChange}
                                className="w-5 h-5 bg-black/30 border border-gray-700 rounded-full focus:ring-[hsl(var(--neon-blue))]"
                              />
                              <label htmlFor="accommodation-no" className="ml-3 text-sm">No, I'll manage on my own</label>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <label htmlFor="referralCode" className="block text-sm font-medium mb-2">Referral Code (if any)</label>
                          <input
                            id="referralCode"
                            name="referralCode"
                            type="text"
                            value={formData.referralCode}
                            onChange={handleInputChange}
                            className="w-full bg-black/30 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[hsl(var(--neon-blue))]"
                            placeholder="Enter referral code (optional)"
                          />
                        </div>
                      </div>
                      
                      <div className="pt-6 flex justify-between">
                        <button
                          type="button"
                          onClick={prevStep}
                          className="px-8 py-3 border border-gray-700 rounded-lg hover:bg-black/30 transition-colors flex items-center"
                        >
                          <svg className="mr-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                          </svg>
                          Previous
                        </button>
                        
                        <button
                          type="button"
                          onClick={handleSubmit}
                          disabled={isSubmitting}
                          className={`px-8 py-3 rounded-lg flex items-center ${
                            isSubmitting 
                              ? "bg-gray-700 cursor-not-allowed" 
                              : "bg-gradient-to-r from-[hsl(var(--neon-blue))] to-[hsl(var(--neon-purple))] hover:opacity-90"
                          }`}
                        >
                          {isSubmitting ? (
                            <>
                              <FiLoader className="mr-2 animate-spin" />
                              Submitting...
                            </>
                          ) : (
                            <>
                              Complete Registration
                              <FiCheckCircle className="ml-2" />
                            </>
                          )}
                        </button>
                      </div>
                    </motion.div>
                  )}
                </form>
              </div>
            )}
            
            {/* Additional Information */}
            <div className="mt-8 p-6 rounded-xl bg-black/30 border border-gray-800">
              <h3 className="text-lg font-semibold mb-3">Registration Information</h3>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start">
                  <span className="text-[hsl(var(--neon-blue))] mr-2">•</span>
                  Registration is free for all students with valid college ID.
                </li>
                <li className="flex items-start">
                  <span className="text-[hsl(var(--neon-blue))] mr-2">•</span>
                  Individual events may have separate registration fees.
                </li>
                <li className="flex items-start">
                  <span className="text-[hsl(var(--neon-blue))] mr-2">•</span>
                  Limited accommodation available on first-come-first-serve basis.
                </li>
                <li className="flex items-start">
                  <span className="text-[hsl(var(--neon-blue))] mr-2">•</span>
                  For any queries, contact us at thiran2025@sece.ac.in
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
