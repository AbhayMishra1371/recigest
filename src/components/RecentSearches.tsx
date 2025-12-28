"use client";

import { useEffect, useState } from "react";
import api from "@/lib/axios";
import { History, ArrowRight, Search, Loader2 } from "lucide-react";
import Link from "next/link";

export function RecentSearches() {
  const [history, setHistory] = useState<string[]>([]);
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
            href={`/recipe/${encodeURIComponent(item)}`}
            className="group bg-white p-6 rounded-3xl shadow-sm border border-[#F5F3EE] hover:border-[#AA4D4D]/30 transition-all hover:shadow-md flex flex-col justify-between h-40"
          >
            <div>
                <Search className="w-5 h-5 text-gray-300 mb-4 group-hover:text-[#AA4D4D] transition-colors" />
                <h3 className="font-bold text-[#3D4A3E] text-lg leading-tight line-clamp-2">
                    {item}
                </h3>
            </div>
            <div className="flex items-center gap-2 text-[#AA4D4D] font-medium text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                <span>View Recipe</span>
                <ArrowRight className="w-4 h-4" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
