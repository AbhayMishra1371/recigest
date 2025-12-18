"use client"

import type React from "react"
import api from "@/lib/axios";
import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Leaf } from "lucide-react"

export default function SignUpPage() {
const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (form.password !== confirmPassword) {
        alert("Passwords do not match");
        setLoading(false);
        return;
      }
      const res = await api.post("/auth/signup", form);
      alert(res.data.message);

      if (res.data.success) {
        window.location.href = "/";
      }
    } catch (err: unknown) {
      if (typeof err === "object" && err !== null && "response" in err) {
         const apiError = err as { response: { data: { error: string } } };
         alert(apiError.response?.data?.error || "Signup failed");
      } else {
         alert("Signup failed");
      }
    }

    setLoading(false);
  };

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

        {/* Sign Up Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-white/50">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-[#3D4A3E] mb-2">Create Account</h1>
            <p className="text-[#6B7C6D]">Join Recigest and start cooking smarter</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-[#3D4A3E] font-medium">
                Full Name
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
                className="h-12 rounded-xl border-[#D4CFC0] focus:border-[#5A7C5E] focus:ring-[#5A7C5E]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-[#3D4A3E] font-medium">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
                className="h-12 rounded-xl border-[#D4CFC0] focus:border-[#5A7C5E] focus:ring-[#5A7C5E]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-[#3D4A3E] font-medium">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
                minLength={8}
                className="h-12 rounded-xl border-[#D4CFC0] focus:border-[#5A7C5E] focus:ring-[#5A7C5E]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-[#3D4A3E] font-medium">
                Confirm Password
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Enter your confirm password"
                value={confirmPassword}
               onChange={(e) => setConfirmPassword(e.target.value)}
                minLength={8}
                className="h-12 rounded-xl border-[#D4CFC0] focus:border-[#5A7C5E] focus:ring-[#5A7C5E]"
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
             className="w-full h-12 bg-[#7BA147] hover:bg-[#95AB7E] text-black rounded-xl font-medium text-lg"
            >
                Sign Up
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-[#6B7C6D]">
              Already have an account?{" "}
              <Link href="/signin" className="text-[#5A7C5E] font-medium hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center mt-8 text-sm text-[#6B7C6D]">
          By creating an account, you agree to our{" "}
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
