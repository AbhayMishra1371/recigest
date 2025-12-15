import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChefHat } from "lucide-react"

export function Navbar() {
  return (
    <header className="absolute top-0 left-0 right-0 z-50 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 border border-white/40 shadow-lg">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-[#5BA89D] rounded-lg flex items-center justify-center">
            <ChefHat className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold text-[#2C3E3D]">Recigest</span>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-[#2C3E3D] font-medium hover:text-[#5BA89D] transition-colors">
            Home
          </Link>
          <Link href="/features" className="text-[#2C3E3D] font-medium hover:text-[#5BA89D] transition-colors">
            Features
          </Link>
          <Link href="/community" className="text-[#2C3E3D] font-medium hover:text-[#5BA89D] transition-colors">
            Community
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          {/* Sign In and Get Started buttons */}
          <Button variant="ghost" className="text-[#2C3E3D] hover:text-[#5BA89D] hover:bg-transparent">
            Sign In
          </Button>
          <Button className="bg-[#5BA89D] hover:bg-[#4A9388] text-white">Get Started</Button>
        </div>
      </div>
    </header>
  )
}
