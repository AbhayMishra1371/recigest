"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export const FinalCTA = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="bg-[#AA4D4D] rounded-[4rem] p-16 text-center text-white relative overflow-hidden shadow-2xl">
          {/* Decorative shapes */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full -ml-32 -mt-32"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-black/5 rounded-full -mr-48 -mb-48"></div>

          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-5xl font-bold mb-8 leading-tight">Ready to stop wasting & start cooking?</h2>
            <p className="text-xl text-white/80 mb-12">
              Join 10,000+ happy chefs who have transformed their kitchens with Recigest.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link href="/signup">
                <Button size="lg" className="bg-white text-[#AA4D4D] hover:bg-white/90 rounded-full px-12 py-8 text-2xl font-bold shadow-xl">
                  🚀 Get Started for Free
                </Button>
              </Link>
              <Link href="/signin">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 rounded-full px-12 py-8 text-2xl font-bold">
                   Sign In Now
                </Button>
              </Link>
            </div>
            <p className="mt-8 text-sm text-white/60">No credit card required. Cancel anytime.</p>
          </div>
        </div>
      </div>
    </section>
  );
};
