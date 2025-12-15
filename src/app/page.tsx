import Navbar  from "@/components/ui/Navbar"
import HeroSearch  from "@/components/ui/hero-search"
// import { TrendingDishes } from "@/components/trending-dishes"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSearch />
      {/* <TrendingDishes /> */} 
    </main>
  )
}
