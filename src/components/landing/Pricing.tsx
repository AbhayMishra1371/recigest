"use client";

import { Check, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const plans = [
  {
    name: "Free Plan",
    price: "$0",
    description: "Perfect for home chefs starting out.",
    features: [
      "AI Recipe Generation (10/day)",
      "Basic Search & Filters",
      "Pantry Ingredient Input",
      "Community Access",
    ],
    buttonText: "Start Free",
    link: "/signup",
    highlight: false,
  },
  {
    name: "Pro Chef",
    price: "$9.99",
    description: "Advanced tools for culinary creators.",
    features: [
      "Unlimited AI Generations",
      "Priority API Access",
      "Smart Shopping Lists",
      "Save Favorite Recipes",
      "Ad-Free Experience",
    ],
    buttonText: "Join Pro",
    link: "/signup",
    highlight: true,
  },
];

export const Pricing = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[#3D4A3E] mb-4">Simple, Transparent Pricing</h2>
          <p className="text-gray-600">Choose the plan that's right for your kitchen.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan, idx) => (
            <div 
              key={idx} 
              className={`p-10 rounded-[3rem] border transition-all ${
                plan.highlight 
                  ? "bg-[#3D4A3E] text-white border-[#3D4A3E] scale-105 shadow-2xl relative" 
                  : "bg-[#FDFBF7] border-gray-100"
              }`}
            >
              {plan.highlight && (
                <div className="absolute top-0 right-10 -translate-y-1/2 bg-[#AA4D4D] text-white px-4 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
                  <Zap className="w-3 h-3" /> Popular
                </div>
              )}
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-5xl font-black">{plan.price}</span>
                <span className={`${plan.highlight ? "text-white/60" : "text-gray-400"} text-sm`}>/month</span>
              </div>
              <p className={`mb-8 ${plan.highlight ? "text-white/70" : "text-gray-500"}`}>
                {plan.description}
              </p>
              
              <ul className="space-y-4 mb-10">
                {plan.features.map((feature, fIdx) => (
                  <li key={fIdx} className="flex items-center gap-3">
                    <Check className={`w-5 h-5 ${plan.highlight ? "text-[#AA4D4D]" : "text-[#5A7C5E]"}`} />
                    <span className="text-sm font-medium">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Link href={plan.link}>
                <Button className={`w-full rounded-full py-6 font-bold text-lg shadow-lg ${
                  plan.highlight 
                    ? "bg-[#AA4D4D] hover:bg-[#AA4D4D]/90" 
                    : "bg-[#3D4A3E] text-white hover:bg-[#3D4A3E]/90"
                }`}>
                  {plan.buttonText}
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
