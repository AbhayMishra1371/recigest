"use client";

import { Sparkles, Brain, Clock } from "lucide-react";
import Image from "next/image";

export const Solution = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1">
            <h2 className="text-4xl font-bold text-[#3D4A3E] mb-8 leading-tight">
              Cooking Made <span className="text-[#5A7C5E]">Simple</span> with AI-Powered Magic
            </h2>
            <p className="text-xl text-gray-600 mb-10 leading-relaxed">
              Recigest is your personal AI sous-chef. We take the guesswork out of cooking by analyzing what you already have and suggesting delicious meals in seconds.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-[#5A7C5E]/10 text-[#5A7C5E] rounded-lg flex items-center justify-center flex-shrink-0">
                  <Brain className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-[#3D4A3E] mb-1">Intelligent Matching</h4>
                  <p className="text-gray-600">Our AI understands flavors and techniques to suggest recipes that actually work.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-[#AA4D4D]/10 text-[#AA4D4D] rounded-lg flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-[#3D4A3E] mb-1">Zero Waste Focus</h4>
                  <p className="text-gray-600">Turn your 'leftovers' into gourmet dishes and reduce your environmental footprint.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex-1 relative">
            <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl h-[500px]">
              <Image 
                src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=800" 
                alt="Cooking illustration" 
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#3D4A3E]/40 to-transparent"></div>
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-8 -right-8 w-32 h-32 bg-[#F5F3EE] rounded-full -z-0"></div>
            <div className="absolute -bottom-10 -left-10 bg-white p-6 rounded-2xl shadow-xl z-20 animate-bounce-slow">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-bold text-[#3D4A3E]">Cook Time Saved</p>
                  <p className="text-xs text-gray-500">1.2k hours this month</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
