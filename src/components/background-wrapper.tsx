"use client"

import { ReactNode, useState, useEffect } from 'react'
import { InteractiveBackground } from './interactive-background'
import { PerformanceMonitor } from './performance-monitor'

interface BackgroundWrapperProps {
  children: ReactNode
}

export function BackgroundWrapper({ children }: BackgroundWrapperProps) {
  // State to control whether background is enabled or disabled by user preference
  const [backgroundEnabled, setBackgroundEnabled] = useState(true)
  
  // Check for user preference to disable background
  useEffect(() => {
    // Check if user has previously disabled animations
    const disabledByUser = localStorage.getItem('thiran-background-disabled') === 'true'
    if (disabledByUser) {
      setBackgroundEnabled(false)
    }
    
    // Provide a method for users to toggle background via a global function
    // This can be called from a settings menu or performance control button
    window.toggleThiranBackground = (enabled?: boolean) => {
      const newState = enabled !== undefined ? enabled : !backgroundEnabled
      setBackgroundEnabled(newState)
      localStorage.setItem('thiran-background-disabled', (!newState).toString())
    }
    
    return () => {
      // Clean up global function when component unmounts
      delete window.toggleThiranBackground
    }
  }, [backgroundEnabled])
  
  return (
    <>
      {/* Only render background if enabled */}
      {backgroundEnabled && <InteractiveBackground />}
      
      {/* Always include performance monitor to check system capabilities */}
      <PerformanceMonitor />
      
      {children}
    </>
  )
}

// Add global function type to window object
declare global {
  interface Window {
    toggleThiranBackground?: (enabled?: boolean) => void
  }
}
