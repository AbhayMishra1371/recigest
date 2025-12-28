"use client";

import { CheckCircle } from "lucide-react";

export const Benefits = () => {
  return (
    <section className="py-24 bg-[#3D4A3E] text-white overflow-hidden relative">
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
          <h2 className="text-4xl font-bold mb-12">Why Choose <span className="text-[#AA4D4D]">Recigest?</span></h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-left w-full">
            <div className="bg-white/5 backdrop-blur-md p-8 rounded-3xl border border-white/10 hover:bg-white/10 transition-colors">
              <div className="flex items-center gap-4 mb-4 text-[#AA4D4D]">
                <CheckCircle className="w-6 h-6" />
                <h4 className="text-xl font-bold">Save 10+ hours/week</h4>
              </div>
              <p className="text-white/70">Stop browsing endless blogs. Get exact plans for your ingredients instantly.</p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-md p-8 rounded-3xl border border-white/10 hover:bg-white/10 transition-colors">
              <div className="flex items-center gap-4 mb-4 text-[#AA4D4D]">
                <CheckCircle className="w-6 h-6" />
                <h4 className="text-xl font-bold">Reduce errors by 80%</h4>
              </div>
              <p className="text-white/70">Follow AI-verified steps and measurements to avoid common kitchen disasters.</p>
            </div>

            <div className="bg-white/5 backdrop-blur-md p-8 rounded-3xl border border-white/10 hover:bg-white/10 transition-colors">
              <div className="flex items-center gap-4 mb-4 text-[#AA4D4D]">
                <CheckCircle className="w-6 h-6" />
                <h4 className="text-xl font-bold">Easy for beginners</h4>
              </div>
              <p className="text-white/70">No professional training needed. Our instructions are written for every skill level.</p>
            </div>

            <div className="bg-white/5 backdrop-blur-md p-8 rounded-3xl border border-white/10 hover:bg-white/10 transition-colors">
              <div className="flex items-center gap-4 mb-4 text-[#AA4D4D]">
                <CheckCircle className="w-6 h-6" />
                <h4 className="text-xl font-bold">Health-Conscious</h4>
              </div>
              <p className="text-white/70">AI analyzes nutritional value and suggests healthier alternatives automatically.</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative Blur */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#AA4D4D]/20 rounded-full blur-[120px] -mr-48 -mt-48"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#5A7C5E]/20 rounded-full blur-[120px] -ml-48 -mb-48"></div>
    </section>
  );
};
