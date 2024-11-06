import React from 'react'
import { Sparkles } from 'lucide-react';


const HeroSection = () => {
  return (
    <div className="bg-gradient-to-b border-t my-5 shadow-lg from-white to-gray-50 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <div className="inline-flex items-center justify-center mb-4">
            <Sparkles className="h-8 w-8 text-indigo-600 animate-pulse" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 tracking-tight sm:text-5xl mb-3">
            Welcome back, 
          </h1>
          
          <div className="h-1 w-20 bg-indigo-600 mx-auto mt-8 rounded-full" />
        </div>
      </div>
    </div>
  )
}

export default HeroSection
