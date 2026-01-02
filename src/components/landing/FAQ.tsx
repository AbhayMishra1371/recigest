"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    question: "Is Recigest free to use?",
    answer: "Yes! We offer a free plan that includes 10 AI recipe generations per day, which is more than enough for most home cooks. You can upgrade to Pro for unlimited usage and advanced features.",
  },
  {
    question: "Is my data safe?",
    answer: "Absolutely. We encrypt all your personal information and never share your data with third parties. Your privacy is our priority.",
  },
  {
    question: "How does the AI create recipes?",
    answer: "Our system uses advanced Google Gemini models combined with a curated database of culinary knowledge to ensure the recipes are accurate, edible, and delicious.",
  },
  {
    question: "Can I cancel my Pro subscription anytime?",
    answer: "Yes, you can cancel your subscription at any time through your account settings. There are no hidden fees or long-term contracts.",
  },
];

export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-24 bg-[#FDFBF7]">
      <div className="container mx-auto px-6 max-w-3xl">
        <h2 className="text-4xl font-bold text-[#3D4A3E] text-center mb-16">Frequently Asked Questions</h2>
        
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div 
              key={idx} 
              className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 transition-all hover:border-[#5A7C5E]/30"
            >
              <button 
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="w-full p-6 text-left flex items-center justify-between"
              >
                <span className="font-bold text-[#3D4A3E] text-lg">{faq.question}</span>
                <div className={`transition-transform duration-300 ${openIndex === idx ? "rotate-180" : ""}`}>
                   {openIndex === idx ? (
                     <Minus className="w-5 h-5 text-[#AA4D4D]" />
                   ) : (
                     <Plus className="w-5 h-5 text-[#3D4A3E]" />
                   )}
                </div>
              </button>
              
              {openIndex === idx && (
                <div className="px-6 pb-6 text-gray-600 leading-relaxed animate-fade-in">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
