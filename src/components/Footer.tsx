import Link from "next/link"
import { Leaf, Instagram, Twitter, Facebook, Mail } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-[#F5F3EE] pt-20 pb-10 border-t border-[#E8E6DF]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                <Leaf className="w-5 h-5 text-[#5A7C5E]" />
              </div>
              <span className="text-2xl font-semibold text-[#3D4A3E]">
                Recigest
              </span>
            </div>
            <p className="text-[#3D4A3E]/70 leading-relaxed">
              Transforming your kitchen experience with AI-powered recipe discovery. Turn your leftovers into gourmet meals today.
            </p>
            <div className="flex items-center gap-4">
              <Link href="#" className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#3D4A3E] hover:bg-[#AA4D4D] hover:text-white transition-all shadow-sm">
                <Instagram className="w-5 h-5" />
              </Link>
              <Link href="#" className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#3D4A3E] hover:bg-[#AA4D4D] hover:text-white transition-all shadow-sm">
                <Twitter className="w-5 h-5" />
              </Link>
              <Link href="#" className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#3D4A3E] hover:bg-[#AA4D4D] hover:text-white transition-all shadow-sm">
                <Facebook className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-[#3D4A3E] font-bold text-lg mb-6">Explore</h4>
            <ul className="space-y-4">
              <li><Link href="/" className="text-[#3D4A3E]/70 hover:text-[#AA4D4D] transition-colors">Home</Link></li>
              <li><Link href="/features" className="text-[#3D4A3E]/70 hover:text-[#AA4D4D] transition-colors">Features</Link></li>
              <li><Link href="/community" className="text-[#3D4A3E]/70 hover:text-[#AA4D4D] transition-colors">Community</Link></li>
              <li><Link href="/trending" className="text-[#3D4A3E]/70 hover:text-[#AA4D4D] transition-colors">Trending Dishes</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-[#3D4A3E] font-bold text-lg mb-6">Resources</h4>
            <ul className="space-y-4">
              <li><Link href="#" className="text-[#3D4A3E]/70 hover:text-[#AA4D4D] transition-colors">Cooking Tips</Link></li>
              <li><Link href="#" className="text-[#3D4A3E]/70 hover:text-[#AA4D4D] transition-colors">AI Guide</Link></li>
              <li><Link href="#" className="text-[#3D4A3E]/70 hover:text-[#AA4D4D] transition-colors">Recipe Archive</Link></li>
              <li><Link href="#" className="text-[#3D4A3E]/70 hover:text-[#AA4D4D] transition-colors">Help Center</Link></li>
            </ul>
          </div>

          {/* Newsletter Section */}
          <div>
            <h4 className="text-[#3D4A3E] font-bold text-lg mb-6">Stay Inspired</h4>
            <p className="text-[#3D4A3E]/70 mb-6">Join our newsletter for weekly recipe ideas and kitchen hacks.</p>
            <div className="relative">
              <input 
                type="email" 
                placeholder="email@example.com"
                className="w-full bg-white rounded-full px-6 py-4 outline-none border border-[#E8E6DF] focus:border-[#AA4D4D]/50 text-[#3D4A3E]"
              />
              <button className="absolute right-2 top-2 bottom-2 bg-[#AA4D4D] text-white px-6 rounded-full hover:bg-[#823131] transition-colors flex items-center justify-center">
                <Mail className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="pt-10 border-t border-[#E8E6DF] flex flex-col md:flex-row items-center justify-between gap-6 text-[#3D4A3E]/50 text-sm">
          <p>© 2025 Recigest. All rights reserved.</p>
          <div className="flex items-center gap-8">
            <Link href="#" className="hover:text-[#3D4A3E]">Privacy Policy</Link>
            <Link href="#" className="hover:text-[#3D4A3E]">Terms of Service</Link>
            <Link href="#" className="hover:text-[#3D4A3E]">Cookie Settings</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
