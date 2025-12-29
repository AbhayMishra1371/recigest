"use client"


import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Leaf } from "lucide-react";
import { useEffect, useState } from "react";
import api from "@/lib/axios";

import { User } from "@/types";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User as UserIcon, LogOut, Menu } from "lucide-react";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";

export function Navbar() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    api.get("/auth/curruser")
      .then(res => {
        if (res.data.authenticated) {
          setUser(res.data.user);
        }
      })
      .catch(() => {});
  }, []);

  const handleLogout = async () => {
    await api.post("/auth/logout");
    setUser(null);      
    window.location.href = "/";
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-6 py-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between bg-[#F5F3EE]/50 backdrop-blur-md rounded-full px-8 py-4 shadow-sm">

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
            <Leaf className="w-5 h-5 text-[#5A7C5E]" />
          </div>
          <span className="text-2xl font-semibold text-[#3D4A3E]">
            Recigest
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          <Link href="/">Home</Link>
          <Link href="/features">Features</Link>
          <Link href="/community">Community</Link>
        </nav>

        <div className="flex items-center gap-4 md:gap-6">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex items-center gap-3 cursor-pointer outline-none">
                  <span className="font-bold text-[#3D4A3E] hidden lg:inline">
                    {user.name}
                  </span>
                  <Avatar className="h-9 w-9 border-2 border-[#5A7C5E]/20">
                    <AvatarImage src={""} alt={user.name} />
                    <AvatarFallback className="bg-[#5A7C5E] text-white">
                      {user.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 mt-2">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <Link href="/profile">
                  <DropdownMenuItem className="cursor-pointer">
                    <UserIcon className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuItem 
                  className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50"
                  onClick={handleLogout}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="hidden md:flex items-center gap-6">
              <Link href="/signin" className="text-[#3D4A3E] font-bold">
                Sign In
              </Link>
              <Link href="/signup" className="text-[#3D4A3E] font-bold">
                Sign Up
              </Link>
              <Link href="/signup">
                <Button className="bg-[#AA4D4D] text-white rounded-full px-6 py-2.5">
                  Get Started
                </Button>
              </Link>
            </div>
          )}

          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-[#3D4A3E]">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-[#F5F3EE]">
                <SheetHeader>
                  <SheetTitle className="flex items-center gap-2">
                    <Leaf className="w-5 h-5 text-[#5A7C5E]" />
                    Recigest
                  </SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col gap-6 mt-10">
                  <Link href="/" className="text-xl font-medium text-[#3D4A3E]">Home</Link>
                  <Link href="/features" className="text-xl font-medium text-[#3D4A3E]">Features</Link>
                  <Link href="/community" className="text-xl font-medium text-[#3D4A3E]">Community</Link>
                  {!user && (
                    <div className="flex flex-col gap-4 pt-6 border-t border-[#5A7C5E]/10">
                      <Link href="/signin" className="text-xl font-medium text-[#3D4A3E]">Sign In</Link>
                      <Link href="/signup" className="text-xl font-medium text-[#3D4A3E]">Sign Up</Link>
                      <Link href="/signup">
                        <Button className="bg-[#AA4D4D] text-white rounded-full w-full py-6 text-lg">
                          Get Started
                        </Button>
                      </Link>
                    </div>
                  )}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}