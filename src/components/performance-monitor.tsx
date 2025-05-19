"use client";

import { useEffect } from 'react';
import { getPerformanceSettings } from '@/utils/performance';
// PerformanceSettings is removed as it's unused

// This component doesn't render anything but monitors system performance
// and dynamically adjusts settings based on FPS and device capabilities
export function PerformanceMonitor() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
      // Get initial performance settings but don't use them directly
    // initialSettings is removed as it's unused
    getPerformanceSettings();
    let performanceDecreased = false;
    let lastFrameTime = performance.now();
    let frameCount = 0;
    let totalTime = 0;
    
    // Check if device prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      // Immediately set to minimal settings
      window.sessionStorage.setItem('thiran-performance-preset', 'minimal');
      window.dispatchEvent(new CustomEvent('performance-settings-changed', { 
        detail: { preset: 'minimal' } 
      }));
      return;
    }
    
    // Monitor FPS to detect performance issues
    const checkPerformance = () => {
      const now = performance.now();
      const elapsed = now - lastFrameTime;
      
      frameCount++;
      totalTime += elapsed;
      
      // Calculate FPS every 2 seconds
      if (totalTime >= 2000) {
        const fps = frameCount / (totalTime / 1000);
        frameCount = 0;
        totalTime = 0;
        
        // If FPS is consistently low, reduce visual quality
        if (fps < 30 && !performanceDecreased) {
          performanceDecreased = true;
          
          // Determine which performance preset to use based on current FPS
          let newPreset = 'medium';
          if (fps < 20) newPreset = 'low';
          if (fps < 15) newPreset = 'minimal';
          
          // Store performance preference in session storage
          window.sessionStorage.setItem('thiran-performance-preset', newPreset);
          
          // Notify components that performance settings have changed
          window.dispatchEvent(new CustomEvent('performance-settings-changed', { 
            detail: { preset: newPreset } 
          }));
        }
      }
      
      lastFrameTime = now;
      requestAnimationFrame(checkPerformance);
    };
    
    // Start monitoring performance after a short delay to let the page load
    const timeoutId = setTimeout(() => {
      requestAnimationFrame(checkPerformance);
    }, 2000);
    
    return () => {
      clearTimeout(timeoutId);
    };
  }, []);
  
  // This component doesn't render anything
  return null;
}
