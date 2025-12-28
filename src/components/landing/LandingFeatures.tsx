"use client";

import { Zap, Shield, Sparkles, Search } from "lucide-react";

const features = [
  {
    title: "Fast Performance",
    description: "Get recipe suggestions in under 2 seconds. No more waiting when you're hungry.",
    icon: Zap,
    color: "bg-yellow-500",
  },
  {
    title: "Secure & Reliable",
    description: "Your data is always safe. We prioritize your privacy and security.",
    icon: Shield,
    color: "bg-blue-500",
  },
  {
    title: "AI-Powered",
    description: "Leveraging the latest Gemini models for high-quality culinary insights.",
    icon: Sparkles,
    color: "bg-purple-500",
  },
  {
    title: "Smart Filter",
    description: "Filter by dietary restrictions, meal type, or preparation time easily.",
    icon: Search,
    color: "bg-green-500",
  },
];

export const LandingFeatures = () => {
  return (
    <section className="py-24 bg-[#FDFBF7]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[#3D4A3E] mb-4">Powerful Features</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Everything you need to transform your kitchen experience.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, idx) => (
            <div key={idx} className="flex flex-col items-center text-center p-8 bg-white rounded-3xl shadow-sm hover:shadow-md transition-all">
              <div className={`${feature.color} w-16 h-16 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg`}>
                <feature.icon className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-[#3D4A3E] mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
