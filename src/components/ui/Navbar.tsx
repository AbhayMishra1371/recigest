import Link from "next/link";
import { Button } from "./button";
import { Sprout } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-transparent backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 lg:px-8">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 text-white">
          <Sprout className="h-6 w-6" />
          <span className="text-xl font-semibold">Recigest</span>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {["Home", "Features", "Community"].map((item) => (
            <Link
              key={item}
              href={`/${item.toLowerCase() === "home" ? "" : item.toLowerCase()}`}
              className="text-sm font-medium text-white/90 hover:text-white transition-colors"
            >
              {item}
            </Link>
          ))}
        </nav>

        {/* Auth Buttons */}
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            className="text-white hover:bg-white/10"
          >
            Sign In
          </Button>
          <Button className="bg-white text-black hover:bg-white/90 font-medium">
            Get Started
          </Button>
        </div>
      </div>
    </header>
  );
}
