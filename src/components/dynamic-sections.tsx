"use client"

import dynamic from 'next/dynamic'

// Use dynamic imports with ssr: false for components that might have hydration issues
export const DynamicEventsShowcase = dynamic(() => import("@/components/events-showcase").then(mod => ({ default: mod.EventsShowcase })), {
  ssr: false,
  loading: () => <div className="py-24 px-4">Loading events...</div>
})

export const DynamicCelebrityLineup = dynamic(() => import("@/components/celebrity-lineup").then(mod => ({ default: mod.CelebrityLineup })), {
  ssr: false
})
