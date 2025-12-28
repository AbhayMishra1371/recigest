"use client";

import { useEffect, useState } from "react";
import api from "@/lib/axios";
import { History, ArrowRight, Search, Loader2 } from "lucide-react";
import Link from "next/link";

export function RecentSearches() {
  const [history, setHistory] = useState<{food: string, image: string | null}[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/recipe/history")
      .then(res => {
        if (res.data.success) {
          setHistory(res.data.history);
        }
      })
      .catch(err => console.error("Failed to fetch history:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex items-center gap-3 mb-8">
            <History className="w-6 h-6 text-[#AA4D4D]" />
            <h2 className="text-3xl font-bold text-[#2C3E3D]">Recent Searches</h2>
        </div>
        <div className="flex items-center gap-2 text-gray-400">
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Loading history...</span>
        </div>
      </section>
    );
  }

  if (history.length === 0) {
    return null; // Don't show anything if no history
  }

  return (
    <section className="max-w-7xl mx-auto px-6 py-16 animate-fade-in">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#AA4D4D]/10 rounded-xl flex items-center justify-center">
                <History className="w-5 h-5 text-[#AA4D4D]" />
            </div>
            <h2 className="text-3xl font-bold text-[#2C3E3D]">Jump Back In</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {history.map((item, idx) => (
          <Link 
            key={idx} 
            href={`/recipe/${encodeURIComponent(item.food)}`}
            className="group relative h-48 rounded-[2.5rem] overflow-hidden shadow-sm border border-[#F5F3EE] hover:border-[#AA4D4D]/30 transition-all hover:shadow-xl hover:-translate-y-1"
          >
            {/* Background Image */}
            {item.image ? (
                <div className="absolute inset-0 z-0">
                    <img 
                        src={item.image} 
                        alt={item.food} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                </div>
            ) : (
                <div className="absolute inset-0 bg-[#FDFBF7] z-0 flex items-center justify-center">
                    <Search className="w-12 h-12 text-gray-100" />
                </div>
            )}

            {/* Content */}
            <div className="relative z-10 p-6 h-full flex flex-col justify-between">
                <div>
                   <div className="w-8 h-8 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mb-2">
                        <Search className={`w-4 h-4 ${item.image ? "text-white" : "text-gray-300"}`} />
                   </div>
                    <h3 className={`font-bold text-lg leading-tight line-clamp-2 ${item.image ? "text-white" : "text-[#3D4A3E]"}`}>
                        {item.food}
                    </h3>
                </div>
                <div className="flex items-center gap-2 text-white font-medium text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                    <span>View Recipe</span>
                    <ArrowRight className="w-4 h-4" />
                </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
