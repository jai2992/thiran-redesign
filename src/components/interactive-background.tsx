"use client"

import React, { useEffect, useRef, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { getPerformanceSettings, PerformanceSettings, FrameRateLimiter } from '@/utils/performance'
import './interactive-background.css'

export function InteractiveBackground() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })
  const [particles, setParticles] = useState<Array<{ x: number, y: number, size: number, color: string, speed: number }>>([])
  const [performanceSettings, setPerformanceSettings] = useState<PerformanceSettings>(getPerformanceSettings())
  const [isHydrated, setIsHydrated] = useState(false)
  
  const requestRef = useRef<number | null>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const frameLimiter = useRef<FrameRateLimiter>(new FrameRateLimiter(performanceSettings.animationFrameLimit))
  
  // Update mouse position with throttling
  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null
    
    const handleMouseMove = (e: MouseEvent) => {
      if (timeoutId) return
      
      timeoutId = setTimeout(() => {
        setMousePosition({
          x: e.clientX / window.innerWidth,
          y: e.clientY / window.innerHeight
        })
        timeoutId = null
      }, 16) // ~60fps
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [])
    // Initialize window size and particles based on performance settings
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight })
    }
    
    // Mark component as hydrated
    setIsHydrated(true)
    
    // Initial size
    handleResize()
    
    // Function to generate particles based on performance settings
    const generateParticles = (settings: PerformanceSettings) => {
      const newParticles = []
      const colors = [
        'hsl(var(--neon-blue))',
        'hsl(var(--neon-purple))',
        'hsl(var(--neon-magenta))'
      ]
      
      for (let i = 0; i < settings.particleCount; i++) {
        newParticles.push({
          x: Math.random(),
          y: Math.random(),
          size: Math.random() * 3 + 0.5,
          color: colors[Math.floor(Math.random() * colors.length)],
          speed: Math.random() * 0.0005 + 0.0002
        })
      }
      
      return newParticles
    }
    
    // Check session storage for saved performance preference
    const savedPreset = typeof window !== 'undefined' 
      ? window.sessionStorage.getItem('thiran-performance-preset')
      : null
    
    // Update performance settings on component mount - this ensures client-side values
    const settings = getPerformanceSettings()
    
    // Override with saved preference if available
    if (savedPreset && savedPreset in { high: true, medium: true, low: true, minimal: true }) {
      const performancePresets = {
        high: {
          particleCount: 50,
          enableBlobs: true,
          enableDataFlow: true,
          enableNoise: true,
          enableStars: true,
          enableOrbs: true,
          animationFrameLimit: 0,
        },
        medium: {
          particleCount: 30,
          enableBlobs: true,
          enableDataFlow: true,
          enableNoise: false,
          enableStars: true,
          enableOrbs: false,
          animationFrameLimit: 0,
        },
        low: {
          particleCount: 15,
          enableBlobs: false,
          enableDataFlow: false,
          enableNoise: false,
          enableStars: true,
          enableOrbs: false,
          animationFrameLimit: 30,
        },
        minimal: {
          particleCount: 5,
          enableBlobs: false,
          enableDataFlow: false,
          enableNoise: false,
          enableStars: false,
          enableOrbs: false,
          animationFrameLimit: 60,
        }
      } as const;
      
      const savedSettings = performancePresets[savedPreset as keyof typeof performancePresets]
      setPerformanceSettings(savedSettings)
      frameLimiter.current.setFrameLimit(savedSettings.animationFrameLimit)
      setParticles(generateParticles(savedSettings))
    } else {
      setPerformanceSettings(settings)
      frameLimiter.current.setFrameLimit(settings.animationFrameLimit)
      setParticles(generateParticles(settings))
    }
    
    // Listen for performance settings changes from PerformanceMonitor
    const handlePerformanceChange = (event: CustomEvent<{ preset: string }>) => {
      const { preset } = event.detail
      if (preset in { high: true, medium: true, low: true, minimal: true }) {
        const performancePresets = {
          high: {
            particleCount: 50,
            enableBlobs: true,
            enableDataFlow: true,
            enableNoise: true,
            enableStars: true,
            enableOrbs: true,
            animationFrameLimit: 0,
          },
          medium: {
            particleCount: 30,
            enableBlobs: true,
            enableDataFlow: true,
            enableNoise: false,
            enableStars: true,
            enableOrbs: false,
            animationFrameLimit: 0,
          },
          low: {
            particleCount: 15,
            enableBlobs: false,
            enableDataFlow: false,
            enableNoise: false,
            enableStars: true,
            enableOrbs: false,
            animationFrameLimit: 30,
          },
          minimal: {
            particleCount: 5,
            enableBlobs: false,
            enableDataFlow: false,
            enableNoise: false,
            enableStars: false,
            enableOrbs: false,
            animationFrameLimit: 60,
          }
        } as const;
        
        const newSettings = performancePresets[preset as keyof typeof performancePresets]
        setPerformanceSettings(newSettings)
        frameLimiter.current.setFrameLimit(newSettings.animationFrameLimit)
        
        // Only regenerate particles if count has changed significantly
        if (Math.abs(newSettings.particleCount - particles.length) > 5) {
          setParticles(generateParticles(newSettings))
        }
      }
    }
    
    window.addEventListener('performance-settings-changed', handlePerformanceChange as EventListener)
    window.addEventListener('resize', handleResize)
    
    return () => {
      window.removeEventListener('performance-settings-changed', handlePerformanceChange as EventListener)
      window.removeEventListener('resize', handleResize)
    }  }, [particles.length])
    // Canvas draw function with performance optimizations
  const drawFrame = useCallback((ctx: CanvasRenderingContext2D, width: number, height: number) => {
    // Clear canvas
    ctx.clearRect(0, 0, width, height)
    
    // Draw grid lines
    ctx.strokeStyle = 'rgba(100, 100, 255, 0.1)'
    ctx.lineWidth = 1
    
    // Grid with reduced complexity on mobile
    const gridSize = width < 768 ? 70 : 50
    const offsetX = mousePosition.x * 20
    const offsetY = mousePosition.y * 20
    
    // Limit the number of grid lines for performance
    const gridSteps = Math.min(100, Math.ceil(width / gridSize) + 1)
    const gridStepsY = Math.min(100, Math.ceil(height / gridSize) + 1)
    
    // Draw grid
    for (let i = 0; i < gridSteps; i++) {
      ctx.beginPath()
      ctx.moveTo(i * gridSize + offsetX % gridSize, 0)
      ctx.lineTo(i * gridSize + offsetX % gridSize, height)
      ctx.stroke()
    }
    
    for (let i = 0; i < gridStepsY; i++) {
      ctx.beginPath()
      ctx.moveTo(0, i * gridSize + offsetY % gridSize)
      ctx.lineTo(width, i * gridSize + offsetY % gridSize)
      ctx.stroke()
    }
    
    // Draw particles
    particles.forEach(particle => {
      ctx.beginPath()
      
      // Simplified gradient for better performance on low-end devices
      if (performanceSettings.particleCount > 20) {
        // Full quality particle with gradient
        const gradient = ctx.createRadialGradient(
          particle.x * width,
          particle.y * height,
          0,
          particle.x * width,
          particle.y * height,
          particle.size * 10
        )
        
        gradient.addColorStop(0, `${particle.color}`)
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)')
        ctx.fillStyle = gradient
      } else {
        // Simplified particle for low-end devices
        ctx.fillStyle = `${particle.color}`
      }
      
      ctx.arc(
        particle.x * width,
        particle.y * height,
        particle.size * 5,
        0,
        Math.PI * 2
      )
      ctx.fill()
      
      // Move particle
      particle.x += (Math.sin(Date.now() * particle.speed) * 0.001)
      particle.y += (Math.cos(Date.now() * particle.speed) * 0.001)
      
      // Wrap around
      if (particle.x < 0) particle.x = 1
      if (particle.x > 1) particle.x = 0
      if (particle.y < 0) particle.y = 1
      if (particle.y > 1) particle.y = 0
    })
    
    // Conditionally render blob effects based on performance settings
    if (performanceSettings.enableBlobs) {
      // Draw larger neon blobs that move with the mouse
      const drawBlob = (x: number, y: number, radius: number, color: string) => {
        ctx.beginPath()
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius)
        gradient.addColorStop(0, `${color}70`) // Semi-transparent color
        gradient.addColorStop(0.8, `${color}10`) // More transparent
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)')
        ctx.fillStyle = gradient
        ctx.arc(x, y, radius, 0, Math.PI * 2)
        ctx.fill()
      }
      
      // Reduce blob size on mobile
      const blobScale = width < 768 ? 0.7 : 1
      
      // Draw blobs that follow mouse
      drawBlob(
        width / 2 + (mousePosition.x - 0.5) * width * 0.3, 
        height / 2 + (mousePosition.y - 0.5) * height * 0.3,
        150 * blobScale,
        'hsl(var(--neon-blue))'
      )
      
      drawBlob(
        width / 2 - (mousePosition.x - 0.5) * width * 0.2, 
        height / 2 - (mousePosition.y - 0.5) * height * 0.2,
        120 * blobScale,
        'hsl(var(--neon-purple))'
      )
      
      drawBlob(
        width / 3 + (mousePosition.y - 0.5) * width * 0.1, 
        height / 3 + (mousePosition.x - 0.5) * height * 0.1,
        90 * blobScale,
        'hsl(var(--neon-magenta))'
      )
    }
    
    // Conditionally render data flow visualization
    if (performanceSettings.enableDataFlow) {
      const time = Date.now() * 0.001
      const numPoints = width < 768 ? 3 : 5 // Reduce points on mobile
      
      for (let i = 0; i < numPoints; i++) {
        const x = (Math.sin(time + i) * 0.5 + 0.5) * width
        const y = (Math.cos(time * 0.7 + i * 0.5) * 0.5 + 0.5) * height
        
        // Draw data pulse
        ctx.beginPath()
        const pulseRadius = width < 768 ? 30 : 50
        const pulseGradient = ctx.createRadialGradient(
          x, y, 0, x, y, pulseRadius + Math.sin(time * 3) * 10
        )
        pulseGradient.addColorStop(0, 'rgba(100, 200, 255, 0.3)')
        pulseGradient.addColorStop(1, 'rgba(100, 200, 255, 0)')
        
        ctx.fillStyle = pulseGradient
        ctx.arc(x, y, pulseRadius + Math.sin(time * 3) * 10, 0, Math.PI * 2)
        ctx.fill()
        
        // Draw connection lines to mouse position
        const mouseX = mousePosition.x * width
        const mouseY = mousePosition.y * height
        const distToMouse = Math.hypot(x - mouseX, y - mouseY)
        const connectionThreshold = width < 768 ? 250 : 400
        
        if (distToMouse < connectionThreshold) {
          const alpha = 1 - distToMouse / connectionThreshold
          ctx.beginPath()
          ctx.strokeStyle = `rgba(100, 200, 255, ${alpha * 0.15})`
          ctx.lineWidth = 1
          ctx.moveTo(x, y)
          ctx.lineTo(mouseX, mouseY)
          ctx.stroke()
          
          // Draw small data packets traveling along the line
          const packetPos = (time * 2) % 1
          const packetX = x + (mouseX - x) * packetPos
          const packetY = y + (mouseY - y) * packetPos
          
          ctx.beginPath()
          ctx.fillStyle = 'rgba(100, 200, 255, 0.8)'
          ctx.arc(packetX, packetY, 2, 0, Math.PI * 2)
          ctx.fill()
        }
      }
    }
    
    // Conditionally render noise effects
    if (performanceSettings.enableNoise) {
      // Digital noise effect - reduced frequency
      if (Math.random() > 0.98) {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.03)'
        ctx.fillRect(
          Math.random() * width,
          Math.random() * height,
          Math.random() * 20 + 1,
          1
        )
      }
      
      // Scanline effect
      const scanLineY = (Date.now() * 0.1) % height
      ctx.fillStyle = 'rgba(255, 255, 255, 0.03)'
      ctx.fillRect(0, scanLineY, width, 2)
    }
  }, [mousePosition, particles, performanceSettings])
  
  // Canvas animation loop with frame rate limiting
  useEffect(() => {
    if (!canvasRef.current || windowSize.width === 0 || !isHydrated) return
    
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    // Set canvas dimensions with device pixel ratio for sharper rendering on high-DPI screens
    const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1
    
    // For high-performance mode, use full resolution; for lower performance, reduce resolution
    const resolutionScale = performanceSettings.particleCount > 30 ? 1 : 0.8
    canvas.width = windowSize.width * dpr * resolutionScale
    canvas.height = windowSize.height * dpr * resolutionScale
    
    // Scale the canvas back to display size
    canvas.style.width = `${windowSize.width}px`
    canvas.style.height = `${windowSize.height}px`
    
    // Scale the context to account for device pixel ratio
    ctx.scale(dpr * resolutionScale, dpr * resolutionScale)
    
    const animate = () => {
      // Only render if we're within our frame rate limit
      if (frameLimiter.current.shouldRenderFrame()) {
        drawFrame(ctx, windowSize.width, windowSize.height)
      }
      
      requestRef.current = requestAnimationFrame(animate)
    }
    
    requestRef.current = requestAnimationFrame(animate)
    
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current)
        requestRef.current = null
      }
    }
  }, [drawFrame, windowSize, isHydrated, performanceSettings])
    // Use separate components for stars and orbs for better performance management
  const renderStars = () => {
    if (!performanceSettings.enableStars) return null;
    
    return (
      <div className="stars-container">
        {[...Array(performanceSettings.particleCount)].map((_, i) => {
          const starColor = i % 3 === 0 ? 'star-blue' : i % 3 === 1 ? 'star-purple' : 'star-magenta';
          const duration = 2 + Math.random() * 3;
          const delay = Math.random() * 5;
          const size = Math.random() * 3 + 1;
          const left = `${Math.random() * 100}%`;
          const top = `${Math.random() * 100}%`;
          
          return (
            <motion.div
              key={i}
              className={`star ${starColor}`}
              initial={{ opacity: 0.1 }}
              animate={{ 
                opacity: [0.2, 0.8, 0.2], 
                scale: [1, 1.2, 1] 
              }}
              transition={{ 
                repeat: Infinity, 
                duration,
                delay
              }}
              style={{
                left,
                top,
                width: `${size}px`,
                height: `${size}px`,
              }}
            />
          );
        })}
      </div>
    );
  };
  
  const renderOrbs = () => {
    if (!performanceSettings.enableOrbs) return null;
    
    // Use fewer orbs on mobile
    const orbCount = windowSize.width < 768 ? 4 : 8;
    
    return (
      <div className="orbs-container">
        {[...Array(orbCount)].map((_, i) => {
          const orbClass = i % 3 === 0 ? 'orb-blue' : i % 3 === 1 ? 'orb-purple' : 'orb-magenta';
          const duration = 20 + Math.random() * 40;
          const size = Math.random() * 40 + (windowSize.width < 768 ? 50 : 80);
          
          const positions = Array.from({ length: 4 }, () => ({
            x: `${Math.random() * 100}%`,
            y: `${Math.random() * 100}%`
          }));
          
          return (
            <motion.div
              key={`orb-${i}`}
              className={`orb ${orbClass}`}
              initial={{ x: positions[0].x, y: positions[0].y }}
              animate={{ 
                x: positions.map(p => p.x),
                y: positions.map(p => p.y)
              }}
              transition={{ 
                repeat: Infinity, 
                duration,
                ease: "linear"
              }}
              style={{
                width: `${size}px`,
                height: `${size}px`,
              }}
            />
          );
        })}
      </div>
    );
  };
    // Dynamic CSS styles using CSS variables instead of inline styles
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.style.setProperty('--mouse-offset-x', `${mousePosition.x * -5}px`);
      document.documentElement.style.setProperty('--mouse-offset-y', `${mousePosition.y * -5}px`);
    }
  }, [mousePosition]);
  
  // Only render visual effects when client-side
  if (!isHydrated) {
    return <div className="interactive-background-container" />;
  }

  return (
    <>
      <div className="interactive-background-container" />
      <canvas ref={canvasRef} className="interactive-background-canvas" />
        {/* Digital circuit pattern overlay */}
      <div className="circuit-pattern-overlay" />
      
      {/* Digital noise overlay for texture */}
      <div className="noise-overlay" />
      
      {/* Render stars and orbs based on performance settings */}
      {renderStars()}
      {renderOrbs()}
    </>
  )
}
