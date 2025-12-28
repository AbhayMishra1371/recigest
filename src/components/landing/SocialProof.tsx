"use client";

import { Star } from "lucide-react";
import Image from "next/image";

export const SocialProof = () => {
  return (
    <section className="py-24 bg-[#FDFBF7]">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-around items-center mb-20 gap-12 bg-white p-12 rounded-[3.5rem] shadow-sm border border-gray-100">
          <div className="text-center">
            <h3 className="text-5xl font-bold text-[#3D4A3E] mb-2">10k+</h3>
            <p className="text-gray-500 font-medium tracking-wide uppercase text-xs">Active Users</p>
          </div>
          <div className="h-16 w-px bg-gray-100 hidden md:block"></div>
          <div className="text-center">
            <h3 className="text-5xl font-bold text-[#3D4A3E] mb-2">50k+</h3>
            <p className="text-gray-500 font-medium tracking-wide uppercase text-xs">Recipes Generated</p>
          </div>
          <div className="h-16 w-px bg-gray-100 hidden md:block"></div>
          <div className="text-center">
            <h3 className="text-5xl font-bold text-[#3D4A3E] mb-2">4.9/5</h3>
            <div className="flex items-center justify-center text-yellow-500 gap-1 mb-2">
              <Star className="w-4 h-4 fill-current" />
              <Star className="w-4 h-4 fill-current" />
              <Star className="w-4 h-4 fill-current" />
              <Star className="w-4 h-4 fill-current" />
              <Star className="w-4 h-4 fill-current" />
            </div>
            <p className="text-gray-500 font-medium tracking-wide uppercase text-xs">User Rating</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="bg-white p-10 rounded-[2.5rem] relative">
            <p className="text-xl text-[#3D4A3E] mb-8 font-medium leading-relaxed italic">
              "Recigest changed how I shop for groceries. I don't feel guilty about buying a lot because I know my AI chef will help me use every bit of it!"
            </p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#AA4D4D] rounded-full overflow-hidden relative">
                 <Image 
                  src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100" 
                  alt="User" 
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h4 className="font-bold text-[#3D4A3E]">Sarah J.</h4>
                <p className="text-sm text-gray-400">Home Chef</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-10 rounded-[2.5rem] relative">
            <p className="text-xl text-[#3D4A3E] mb-8 font-medium leading-relaxed italic">
              "The search is so smart. It understands what I'm looking for even if I'm not sure of the name. Highly recommend!"
            </p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#5A7C5E] rounded-full overflow-hidden relative">
                 <Image 
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100" 
                  alt="User" 
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h4 className="font-bold text-[#3D4A3E]">Mark T.</h4>
                <p className="text-sm text-gray-400">Cooking Enthusiast</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
