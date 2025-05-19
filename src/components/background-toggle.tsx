"use client";

import { useState, useEffect } from 'react';

export function BackgroundToggle() {
  const [isEnabled, setIsEnabled] = useState(true);
  const [mounted, setMounted] = useState(false);

  // Initialize state from localStorage when component mounts
  useEffect(() => {
    setMounted(true);
    const disabled = localStorage.getItem('thiran-background-disabled') === 'true';
    setIsEnabled(!disabled);
  }, []);

  // Toggle the background state
  const toggleBackground = () => {
    const newState = !isEnabled;
    setIsEnabled(newState);
    
    // Call the global toggle function if available
    if (window.toggleThiranBackground) {
      window.toggleThiranBackground(newState);
    }
  };
  
  // Don't render anything during SSR
  if (!mounted) return null;

  return (
    <button
      onClick={toggleBackground}
      className="fixed z-50 bottom-4 right-4 bg-black/30 backdrop-blur-sm 
                 rounded-full p-2 text-xs text-white/80 flex items-center 
                 gap-1.5 hover:bg-black/50 transition-all duration-200
                 border border-white/10 shadow-lg"
      title={isEnabled ? "Disable background effects" : "Enable background effects"}
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="16" 
        height="16" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      >
        {isEnabled ? (
          <>
            <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
            <path d="M19 3v4"></path>
            <path d="M21 5h-4"></path>
          </>
        ) : (
          <>
            <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
            <path d="m9 16 3-3"></path>
            <path d="m12 13-3-3"></path>
          </>
        )}
      </svg>
      {isEnabled ? 'Disable Effects' : 'Enable Effects'}
    </button>
  );
}
