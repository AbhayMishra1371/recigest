"use client"

import { Navbar } from "@/components/Navbar"
import { Sparkles, MessageSquare, ChefHat, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useEffect, useState } from "react"
import api from "@/lib/axios"

import Image from "next/image"

const features = [
  {
    title: "Leftover Wizard",
    description: "Turn your pantry items into culinary masterpieces. Simply type what you have, and our AI chef conjures a perfect recipe just for you.",
    icon: Sparkles,
    color: "bg-[#AA4D4D]",
    status: "Active",
    image: "/assets/features/leftover-wizard.png"
  },
  {
    title: "Chef AI Chatbot",
    description: "Your personal 24/7 culinary assistant. Ask for substitutions, cooking tips, or wine pairings in real-time. Coming soon to enhance your kitchen experience.",
    icon: MessageSquare,
    color: "bg-[#5A7C5E]",
    status: "Coming Soon",
    image: "/assets/features/chef-chatbot.png"
  },
  {
    title: "Smart Search",
    description: "Discover thousands of recipes with our intelligent search. Filter by cuisine, diet, or preparation time to find exactly what you crave.",
    icon: Search,
    color: "bg-[#A78B71]",
    status: "Active",
    image: "/assets/features/smart-search.png"
  },
  {
    title: "Community Recipes",
    description: "Join a growing community of food enthusiasts. Share your creations, save favorites, and get inspired by fellow home chefs.",
    icon: ChefHat,
    color: "bg-[#3D4A3E]",
    status: "Active",
    image: "/assets/features/community-recipes.png"
  }
]

export default function FeaturesPage() {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    api.get("/auth/curruser")
      .then(res => {
        if (res.data.authenticated) {
          setIsAuth(true);
        }
      })
      .catch(() => {});
  }, []);
  return (
    <main className="min-h-screen bg-[#FDFBF7]">
      <Navbar />
      
      <div className="container mx-auto px-6 pt-32 pb-20">
        {/* Header Section */}
        <div className="max-w-3xl mb-16 animate-fade-in text-center mx-auto">
          <h1 className="text-5xl font-bold text-[#3D4A3E] mb-6 leading-tight">
            Elevate Your Cooking with <span className="text-[#AA4D4D]">AI Magic</span>
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Recigest combines cutting-edge AI technology with culinary expertise to help you make the most of your kitchen. Explore our powerful features designed for the modern home chef.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {features.map((feature, idx) => (
            <div 
              key={idx} 
              className="group relative h-[450px] rounded-[3rem] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-default"
            >
              {/* Background Image */}
              <Image 
                src={feature.image}
                alt={feature.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              
              {/* Overlay with Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-opacity duration-500"></div>

              {/* Content */}
              <div className="absolute inset-0 p-10 flex flex-col justify-end text-white">
                {/* Icon and Tag Group */}
                <div className="flex items-center justify-between mb-6">
                  <div className={`${feature.color} w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:rotate-6 transition-transform`}>
                    <feature.icon className="w-7 h-7" />
                  </div>
                  
                  {feature.status === "Coming Soon" && (
                    <span className="bg-white/20 backdrop-blur-md text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider">
                      Coming Soon
                    </span>
                  )}
                </div>

                <h2 className="text-4xl font-bold mb-4 tracking-tight">
                  {feature.title}
                </h2>
                <p className="text-white/80 text-lg leading-relaxed mb-8 max-w-lg">
                  {feature.description}
                </p>

                <div className="flex items-center gap-4">
                  {feature.status === "Active" ? (
                    <Link href="/">
                      <Button className="bg-[#AA4D4D] hover:bg-[#823131] text-white rounded-full px-10 py-6 h-auto text-lg font-semibold shadow-lg">
                        Try Now
                      </Button>
                    </Link>
                  ) : (
                    <Button disabled className="bg-white/10 backdrop-blur-sm text-white/50 rounded-full px-10 py-6 h-auto text-lg font-semibold cursor-not-allowed border border-white/10">
                      Stay Tuned
                    </Button>
                  )}
                </div>
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
          <Link href={isAuth ? "/" : "/signup"}>
            <Button size="lg" className="bg-[#AA4D4D] hover:bg-[#823131] text-white rounded-full px-10 py-7 h-auto text-xl">
              Get Started for Free
            </Button>
          </Link>
        </div>
      </div>
    </main>
  )
}
