"use client"

import type React from "react"

import { useState } from "react"
import { Search, Camera } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function HeroSearch() {
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[v0] Search query:", searchQuery)
    // Add your search logic here
  }

  const handleSnapLeftovers = () => {
    console.log("[v0] Snap Leftovers clicked")
    // Add your camera logic here
  }

  return (
    <section className="relative w-full overflow-hidden">
      {/* Hero Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url(/placeholder.svg?height=600&width=1200&query=rustic+kitchen+wooden+background+with+fresh+vegetables+and+cooking+utensils)",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/20" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 container mx-auto px-4 py-24 lg:py-32">
        <div className="max-w-3xl mx-auto text-center">
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="What's in your pantry? (e.g., Chicken, Rice ...)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-14 text-base bg-white shadow-lg border-0 focus-visible:ring-2 focus-visible:ring-primary"
              />
            </div>
            <Button
              type="button"
              onClick={handleSnapLeftovers}
              className="h-14 px-6 bg-secondary hover:bg-secondary/90 text-secondary-foreground font-medium shadow-lg"
            >
              <Camera className="mr-2 h-5 w-5" />
              Snap Leftovers
            </Button>
          </form>

          {/* Tagline */}
          <p className="text-foreground bg-background/90 backdrop-blur-sm inline-block px-6 py-3 rounded-lg text-base font-medium shadow-md">
            Our AI chef turns what you have into meals you'll love.
          </p>
        </div>
      </div>
    </section>
  )
}
