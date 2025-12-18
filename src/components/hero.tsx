import { Search, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const HeroSection = () => {
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
        <div className="w-full flex items-center gap-3 
            bg-white/20 backdrop-blur-xl 
            rounded-full shadow-2xl 
            p-2 pl-5 border border-white/30
            animate-slide-up">

          <Search className="w-5 h-5 text-black/80 flex-shrink-0" />

          <input
            type="text"
            placeholder="What's in your pantry? (e.g., Chicken, Rice...)"
            className="flex-1 bg-transparent border-none outline-none 
              text-black placeholder:text-black/70 py-3"
          />

          <Button variant="snap" size="lg" className="rounded-full gap-2">
            <Camera className="w-5 h-5" />
            <span className="hidden sm:inline">Snap Leftovers</span>
          </Button>
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
