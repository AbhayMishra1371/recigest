"use client"

import { useState } from "react"
import { Search, Camera } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function HeroSection() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <section className="relative h-[500px] flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center brightness-[0.85]"
        style={{
          backgroundImage: "url('/assets/hero-kitchen.jpg')",
        }}
      />

      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        <div className="bg-white/20 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-white/30">
          <div className="flex items-center gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder="What's in your pantry? (e.g., Chicken, Rice ...)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-6 text-base border-gray-200 rounded-xl focus:ring-2 focus:ring-[#5BA89D] focus:border-transparent"
              />
            </div>
            <Button
              size="lg"
              className="bg-[#B24B22] hover:bg-[#AB4343] text-white px-6 py-6 rounded-xl whitespace-nowrap"
            >
              <Camera className="w-5 h-5 mr-2" />
              Snap Leftovers
            </Button>
          </div>

          
        </div>
        <p className="text-[#2C3E3D] text-lg">Our AI chef turns what you have into meals you'll love.</p>
      </div>
    </section>
  )
}
