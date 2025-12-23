import { Navbar } from "@/components/Navbar"
import HeroSection  from "@/components/Hero"
import { TrendingDishes } from "@/components/TrendingDishes"
import { Footer } from "@/components/Footer"

export default function Home() {
  return (
    <main className="min-h-screen">
       <Navbar />
      <HeroSection />
      <TrendingDishes />
      <Footer />
    </main>
  )
}
