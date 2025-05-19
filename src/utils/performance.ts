// Device detection and performance utilities
export function isMobileDevice(): boolean {
  if (typeof window === 'undefined') return false
  
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    window.navigator.userAgent
  )
}

export function isLowEndDevice(): boolean {
  if (typeof window === 'undefined') return false
    // Check if the device has a low memory (less than 4GB RAM)
  // This is a rough estimate as browser APIs are limited
  const navigatorWithMemory = navigator as Navigator & { deviceMemory?: number }
  const lowMemory = !!navigatorWithMemory.deviceMemory && navigatorWithMemory.deviceMemory < 4
  
  // Check if the device has a small viewport
  const smallScreen = window.innerWidth < 768
  
  // Check for slow CPU heuristic
  const hasHardwareConcurrency = typeof navigator.hardwareConcurrency === 'number'
  const slowHardwareConcurrency = hasHardwareConcurrency && navigator.hardwareConcurrency <= 4
  
  return !!lowMemory || (smallScreen && !!slowHardwareConcurrency)
}

// Quality settings for different performance levels
export type PerformanceSettings = {
  particleCount: number;
  enableBlobs: boolean;
  enableDataFlow: boolean;
  enableNoise: boolean;
  enableStars: boolean;
  enableOrbs: boolean;
  animationFrameLimit: number; // ms per frame (0 = no limit)
}

export const performancePresets = {
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
    animationFrameLimit: 30, // ~33fps
  },
  minimal: {
    particleCount: 5,
    enableBlobs: false,
    enableDataFlow: false,
    enableNoise: false,
    enableStars: false,
    enableOrbs: false,
    animationFrameLimit: 60, // ~16fps
  }
} as const;

export function getPerformanceSettings(): PerformanceSettings {
  if (typeof window === 'undefined') return performancePresets.medium
  
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  
  if (prefersReducedMotion) return performancePresets.minimal
  if (isLowEndDevice()) return performancePresets.low
  if (isMobileDevice()) return performancePresets.medium
  
  return performancePresets.high
}

// For handling frame rate limiting
export class FrameRateLimiter {
  private lastFrameTime: number = 0;
  private frameLimit: number = 0; // ms, 0 means no limit
  
  constructor(frameLimit: number = 0) {
    this.frameLimit = frameLimit;
    this.lastFrameTime = 0;
  }
  
  setFrameLimit(limit: number): void {
    this.frameLimit = limit;
  }
  
  shouldRenderFrame(): boolean {
    if (this.frameLimit <= 0) return true;
    
    const currentTime = performance.now();
    if (currentTime - this.lastFrameTime >= this.frameLimit) {
      this.lastFrameTime = currentTime;
      return true;
    }
    
    return false;
  }
}
