"use client"

import * as React from "react"
import Link from "next/link"
// Image is removed as it's unused
import { usePathname } from "next/navigation"
import { FiMenu } from "react-icons/fi"
// FiX is removed as it's unused
import { BsFillSunFill, BsFillMoonFill } from "react-icons/bs"
import { motion, AnimatePresence } from "framer-motion"
import { useTheme } from "next-themes"
// images is removed as it's unused

interface NavItem {
  name: string
  path: string
}

const navItems: NavItem[] = [
  { name: "Home", path: "/" },
  { name: "Events", path: "/events" },
  { name: "Schedule", path: "/schedule" },
  { name: "Celebrity", path: "/celebrity" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
]

export function MainNav() {  
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const [isOpen, setIsOpen] = React.useState(false)
  const [mounted, setMounted] = React.useState(false)

  // This effect ensures hydration is complete before rendering theme-dependent elements
  React.useEffect(() => {
    setMounted(true)
  }, [])

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }
  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Theme toggle positioned at the top right */}
      <div className="absolute top-4 right-4 z-50">
        <button 
          onClick={toggleTheme}
          className="p-2 rounded-full bg-white/10 hover:bg-white/15 transition-colors duration-200 glassmorphism"
          aria-label="Toggle Theme"
        >
          {mounted ? (
            theme === "dark" ? (
              <BsFillSunFill className="text-glow-blue" size={20} />
            ) : (
              <BsFillMoonFill className="text-glow-purple" size={20} />
            )
          ) : (
            <div className="w-5 h-5"></div>
          )}
        </button>
      </div>
      
      <div className="flex justify-center">
        <nav className="glassmorphism mt-4 px-6 py-3 rounded-full flex items-center justify-between w-auto min-w-[320px] max-w-3xl">        
          <div className="flex items-center">
            <Link href="/" className="mr-6">
              <h1 className="text-2xl font-bold text-glow-purple">THIRAN </h1>
            </Link>
            <div className="hidden lg:flex space-x-2">
              {navItems.map((item) => (
                <Link 
                  key={item.path} 
                  href={item.path} 
                  className={`relative px-4 py-2 rounded-full transition-all duration-300 ${
                    pathname === item.path ? "text-glow-magenta bg-white/10" : "hover:text-glow-blue hover:bg-white/5"
                  }`}
                >
                  {item.name}
                  {pathname === item.path && (
                    <motion.span
                      layoutId="nav-pill-indicator"
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-[hsl(var(--neon-blue))]/5 via-[hsl(var(--neon-purple))]/5 to-[hsl(var(--neon-magenta))]/5 -z-10"
                      transition={{ type: "spring", duration: 0.6 }}
                    />
                  )}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button 
              onClick={toggleMenu}
              className="p-2 rounded-full bg-white/10 hover:bg-white/15 transition-colors duration-200 lg:hidden"
              aria-label="Toggle Menu"
            >
              <FiMenu size={20} />
            </button>
          </div>
        </nav>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="glassmorphism mt-2 p-4 rounded-2xl lg:hidden max-w-xs w-full"
          >
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (                
                <Link 
                  key={item.path} 
                  href={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`p-2 rounded-full text-center ${
                    pathname === item.path ? "text-glow-magenta bg-black/20" : "hover:text-glow-blue"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
