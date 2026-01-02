"use client";

import HeroSection  from "@/components/Hero"
import { RecentSearches } from "@/components/RecentSearches"
import { Footer } from "@/components/Footer"
import { useEffect, useState } from "react"
import api from "@/lib/axios"

// Landing Page Sections
import { ProblemStatement } from "@/components/landing/ProblemStatement"
import { Solution } from "@/components/landing/Solution"
import { LandingFeatures } from "@/components/landing/LandingFeatures"
import { HowItWorks } from "@/components/landing/HowItWorks"
import { Benefits } from "@/components/landing/Benefits"
import { FAQ } from "@/components/landing/FAQ"
import { FinalCTA } from "@/components/landing/FinalCTA"

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    api.get("/auth/curruser")
      .then(res => setIsAuthenticated(!!res.data.authenticated))
      .catch(() => setIsAuthenticated(false));
  }, []);

  return (
    <main className="min-h-screen">
      <HeroSection />
      
      {isAuthenticated === true && (
        <RecentSearches />
      )}

      {isAuthenticated === false && (
        <>
        
          <ProblemStatement />
          <Solution />
          <LandingFeatures />
          <HowItWorks />
          <Benefits />
          <FAQ />
          <FinalCTA />
        </>
      )}

      <Footer />
    </main>
  )
}
