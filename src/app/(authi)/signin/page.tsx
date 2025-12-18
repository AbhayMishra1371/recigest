"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Leaf } from "lucide-react"

export default function SignInPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[v0] Sign in attempt:", { email })
    // Handle sign in logic here
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F3EE] via-[#E8E5DC] to-[#D4CFC0] flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Logo */}
        <Link href="/" className="flex items-center justify-center gap-3 mb-8">
          <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm">
            <Leaf className="w-6 h-6 text-[#5A7C5E]" />
          </div>
          <span className="text-3xl font-semibold text-[#3D4A3E]">Recigest</span>
        </Link>

        {/* Sign In Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-white/50">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-[#3D4A3E] mb-2">Welcome Back</h1>
            <p className="text-[#6B7C6D]">Sign in to continue to your account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-[#3D4A3E] font-medium">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-14 w-full p-3 rounded-xl border-[#D4CFC0] focus:border-[#5A7C5E] focus:ring-[#5A7C5E]"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-[#3D4A3E] font-medium">
                  Password
                </Label>
               
              </div>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="h-12 w-full p-3 m- rounded-xl border-[#D4CFC0] focus:border-[#5A7C5E] focus:ring-[#5A7C5E]"
              />
               <Link href="/forgot-password" className="text-sm text-[#5A7C5E] hover:underline">
                  Forgot password?
                </Link>
            </div>

            <Button
              type="submit"
              className="w-full h-12 bg-[#5A7C5E] hover:bg-[#4A6B4E] text-white rounded-xl font-medium text-lg"
            >
              Sign In
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-[#6B7C6D]">
              Don't have an account?{" "}
              <Link href="/signup" className="text-[#5A7C5E] font-medium hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center mt-8 text-sm text-[#6B7C6D]">
          By signing in, you agree to our{" "}
          <Link href="/terms" className="text-[#5A7C5E] hover:underline">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="text-[#5A7C5E] hover:underline">
            Privacy Policy
          </Link>
        </p>
      </div>
    </div>
  )
}
