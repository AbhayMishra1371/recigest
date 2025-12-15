import { Navbar } from "@/components/Navbar"
import HeroSection  from "@/components/hero"
import { TrendingDishes } from "@/components/Trend"

export default function Home() {
  return (
    <main className="min-h-screen">
     
      <HeroSection />
      <TrendingDishes />
    </main>
  )
}
