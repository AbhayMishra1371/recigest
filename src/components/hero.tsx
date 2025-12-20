"use client";

import { Search, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import api from "@/lib/axios";
import { useRouter } from "next/navigation";

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    // Click outside to close suggestions
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (query.trim().length === 0) {
        setSuggestions([]);
        return;
      }
      try {
        const res = await api.get(`/suggestions?query=${encodeURIComponent(query)}`);
        setSuggestions(res.data);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      }
    }, 300); // 300ms debounce

    return () => clearTimeout(timer);
  }, [query]);

  const handleSearch = (searchQuery: string) => {
    if (!searchQuery || searchQuery.trim().length === 0) return;
    setShowSuggestions(false);
    setQuery(searchQuery); // Update state to show what was clicked
    // Redirect to dynamic route /recipe/[foodItem]
    router.push(`/recipe/${encodeURIComponent(searchQuery)}`);
  };

  const handleSuggestionClick = (suggestion: string) => {
    handleSearch(suggestion);
    // Optional: Trigger search immediately or just fill input
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
        handleSearch(query);
    }
  };

  return (
    <section className="relative min-h-[500px] flex items-center justify-center overflow-hidden bg-cover bg-center">
      
      {/* Background Image */}
      <Image
        src="/assets/hero-kitchen.jpg"
        alt="Hero Kitchen"
        fill
        priority
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#F5F3EE]/40 to-[#F5F3EE]"></div>

      {/* Overlay */}
     <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#F5F3EE]/20 to-[#F5F3EE] pointer-events-none"></div>
      {/* Content */}
      <div className="relative z-10 w-full max-w-2xl px-4 py-16 flex flex-col items-center gap-8">

        {/* Glass Search Bar */}
        <div className="w-full relative" ref={wrapperRef}>
            <div className="w-full flex items-center gap-3 
                bg-white/60 backdrop-blur-xl 
                rounded-full shadow-2xl 
                p-2 pl-5 border border-white/30
                animate-slide-up relative z-20">

            <Search className="w-5 h-5 text-black/80 flex-shrink-0" />

            <input
                type="text"
                value={query}
                onChange={(e) => {
                    setQuery(e.target.value);
                    setShowSuggestions(true);
                }}
                onFocus={() => setShowSuggestions(true)}
                onKeyDown={handleKeyDown}
                placeholder="What's in your pantry? (e.g., Chicken, Rice...)"
                className="flex-1 bg-transparent border-none outline-none 
                text-black placeholder:text-black/70 py-3"
            />

            <Button 
                variant="default" 
                size="lg" 
                className="bg-[#AA4D4D] h-14 text-white hover:bg-[#AA4D4D]/80 rounded-full gap-2"
                onClick={() => handleSearch(query)}
            >
                <Camera className="w-5 h-5" />
                <span className="hidden sm:inline">Snap Leftovers</span>
            </Button>
            </div>

            {/* Suggestions Dropdown */}
            {showSuggestions && suggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white/80 backdrop-blur-md rounded-2xl shadow-xl overflow-hidden z-10 border border-white/50">
                    {suggestions.map((suggestion, index) => (
                        <div
                            key={index}
                            className="px-6 py-3 hover:bg-white/50 cursor-pointer text-[#3D4A3E] font-medium transition-colors"
                            onClick={() => handleSuggestionClick(suggestion)}
                        >
                            {suggestion}
                        </div>
                    ))}
                </div>
            )}
        </div>

        {/* Tagline */}
        <p className="text-lg text-black/90 text-center font-medium animate-fade-in">
          Our AI chef turns what you have into meals you'll love.
        </p>

      </div>
    </section>
  );
};

export default HeroSection;
