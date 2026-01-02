"use client";

import { Sparkles, Brain } from "lucide-react";


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
                  <h4 className="font-bold  text-[#3D4A3E] mb-1">Zero Waste Focus</h4>
                  <p className="text-gray-600">Turn your &apos;leftovers&apos; into gourmet dishes and reduce your environmental footprint.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
