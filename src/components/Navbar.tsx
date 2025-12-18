import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Leaf } from "lucide-react"

export function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-6 py-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between bg-[#F5F3EE]/90 backdrop-blur-md rounded-full px-8 py-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
            <Leaf className="w-5 h-5 text-[#5A7C5E]" />
          </div>
          <span className="text-2xl font-semibold text-[#3D4A3E]">Recigest</span>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-[#3D4A3E] font-medium hover:text-[#5A7C5E] transition-colors">
            Home
          </Link>
          <Link href="/features" className="text-[#3D4A3E] font-medium hover:text-[#5A7C5E] transition-colors">
            Features
          </Link>
          <Link href="/community" className="text-[#3D4A3E] font-medium hover:text-[#5A7C5E] transition-colors">
            Community
          </Link>
        </nav>

        <div className="flex items-center gap-6">
          <Link href="/signin" className="text-[#3D4A3E] font-bold font-large hover:text-[#5A7C5E] transition-colors">Sign In</Link>
           <Link href="/signup" className="text-[#3D4A3E] font-bold font-large  hover:text-[#5A7C5E] transition-colors">Sign up</Link>
          <Button className="bg-[#AA4D4D] hover:bg-[#823131] text-white rounded-full px-6 py-2.5 font-medium">
            Get Started
          </Button>
        </div>
      </div>
    </header>
  )
}
