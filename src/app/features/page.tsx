"use client"

import { Navbar } from "@/components/Navbar"
import { Sparkles, MessageSquare, ChefHat, Zap, Clock, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const features = [
  {
    title: "Leftover Wizard",
    description: "Turn your pantry items into culinary masterpieces. Simply type what you have, and our AI chef conjures a perfect recipe just for you.",
    icon: Sparkles,
    color: "bg-[#AA4D4D]",
    status: "Active"
  },
  {
    title: "Chef AI Chatbot",
    description: "Your personal 24/7 culinary assistant. Ask for substitutions, cooking tips, or wine pairings in real-time. Coming soon to enhance your kitchen experience.",
    icon: MessageSquare,
    color: "bg-[#5A7C5E]",
    status: "Coming Soon"
  },
  {
    title: "Smart Search",
    description: "Discover thousands of recipes with our intelligent search. Filter by cuisine, diet, or preparation time to find exactly what you crave.",
    icon: Search,
    color: "bg-[#A78B71]",
    status: "Active"
  },
  {
    title: "Community Recipes",
    description: "Join a growing community of food enthusiasts. Share your creations, save favorites, and get inspired by fellow home chefs.",
    icon: ChefHat,
    color: "bg-[#3D4A3E]",
    status: "Active"
  }
]

export default function FeaturesPage() {
  return (
    <main className="min-h-screen bg-[#FDFBF7]">
      <Navbar />
      
      <div className="container mx-auto px-6 pt-32 pb-20">
        {/* Header Section */}
        <div className="max-w-3xl mb-16 animate-fade-in">
          <h1 className="text-5xl font-bold text-[#3D4A3E] mb-6 leading-tight">
            Elevate Your Cooking with <span className="text-[#AA4D4D]">AI Magic</span>
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Recigest combines cutting-edge AI technology with culinary expertise to help you make the most of your kitchen. Explore our powerful features designed for the modern home chef.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, idx) => (
            <div 
              key={idx} 
              className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-[#F5F3EE] hover:shadow-xl transition-all duration-300 group relative overflow-hidden"
            >
              {/* Coming Soon Badge */}
              {feature.status === "Coming Soon" && (
                <div className="absolute top-6 right-6">
                  <span className="bg-[#5A7C5E]/10 text-[#5A7C5E] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    Coming Soon
                  </span>
                </div>
              )}

              <div className={`${feature.color} w-16 h-16 rounded-2xl flex items-center justify-center mb-8 text-white shadow-lg group-hover:scale-110 transition-transform`}>
                <feature.icon className="w-8 h-8" />
              </div>

              <h2 className="text-3xl font-bold text-[#3D4A3E] mb-4">
                {feature.title}
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                {feature.description}
              </p>

              <div className="flex items-center gap-4">
                {feature.status === "Active" ? (
                  <Link href="/">
                    <Button className="bg-[#AA4D4D] hover:bg-[#823131] text-white rounded-full px-8 py-6 h-auto text-lg">
                      Try Now
                    </Button>
                  </Link>
                ) : (
                  <Button disabled className="bg-gray-100 text-gray-400 rounded-full px-8 py-6 h-auto text-lg cursor-not-allowed">
                    Coming Soon
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Call to Action */}
        <div className="mt-20 bg-[#F5F3EE] rounded-[3rem] p-12 text-center animate-slide-up">
          <h3 className="text-3xl font-bold text-[#3D4A3E] mb-4">Ready to start cooking?</h3>
          <p className="text-gray-600 mb-8 max-w-xl mx-auto">
            Join thousands of users who are transforming their leftovers into gourmet meals with Recigest.
          </p>
          <Link href="/signup">
            <Button size="lg" className="bg-[#AA4D4D] hover:bg-[#823131] text-white rounded-full px-10 py-7 h-auto text-xl">
              Get Started for Free
            </Button>
          </Link>
        </div>
      </div>
    </main>
  )
}
