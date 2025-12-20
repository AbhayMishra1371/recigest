"use client"


import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Leaf } from "lucide-react";
import { useEffect, useState } from "react";
import api from "@/lib/axios";

import { User } from "@/types";

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

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-6 py-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between bg-[#F5F3EE]/90 backdrop-blur-md rounded-full px-8 py-4 shadow-sm">

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

        <div className="flex items-center gap-6">
          {user ? (
              <>
    <span className="font-bold text-[#3D4A3E]">
      {user.name}
    </span>

    <button
      className="bg-[#AA4D4D] text-white px-4 py-2 rounded-full hover:bg-[#823131]"
      onClick={async () => {
        await api.post("/auth/logout");
        setUser(null);      
        window.location.href = "/"; 
      }}
    >
      Logout
    </button>
            </>
          ) : (
            <>
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
            </>
          )}
        </div>
      </div>
    </header>
  );
}