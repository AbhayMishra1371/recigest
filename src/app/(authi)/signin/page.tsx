"use client"

import type React from "react"
import api from "@/lib/axios";
import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Leaf } from "lucide-react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { signinSchema } from "@/lib/validations/auth";
import { useAuth } from "@/context/AuthContext";

export default function SignInPage() {
 const router = useRouter()
 const { refreshUser } = useAuth()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const validation = signinSchema.safeParse({ email, password });
      if (!validation.success) {
        toast.error(validation.error.issues[0].message);
        setLoading(false);
        return;
      }

      const res = await api.post("/auth/signin", { email, password })

      if (res.data.success) {
        toast.success("Signed in successfully")
        await refreshUser()
        router.push("/")
        router.refresh()
      } else {
        toast.error(res.data.error || "Invalid credentials")
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error((err as { response?: { data?: { message?: string } } }).response?.data?.message || "Login failed");
      } else {
        toast.error("Login failed");
      }
    } finally {
      setLoading(false)
    }
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
        <Button
  type="button"
  onClick={() => window.location.href = "/api/auth/google"}
  className="w-full h-12 bg-white text-[#3D4A3E] rounded-xl border border-[#D4CFC0] hover:bg-[#F5F5F5] flex items-center justify-center gap-3 shadow-sm mb-6"
>
  {/* Google Icon */}
  <svg
    className="w-5 h-5"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 48 48"
  >
    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.23 9.22 3.25l6.91-6.91C35.58 2.38 30.15 0 24 0 14.63 0 6.36 5.38 2.69 13.22l7.99 6.21C12.49 13.44 17.76 9.5 24 9.5z"/>
    <path fill="#4285F4" d="M46.1 24.5c0-1.57-.15-3.08-.39-4.5H24v9h12.85c-.56 2.85-2.23 5.27-4.73 6.93l7.38 5.72C43.82 37.25 46.1 31.21 46.1 24.5z"/>
    <path fill="#FBBC05" d="M10.68 28.43c-.53-1.58-.83-3.28-.83-5.03s.3-3.45.83-5.03l-7.99-6.21C1.01 15.93 0 19.85 0 24c0 4.15 1.01 8.07 2.69 11.32l7.99-6.21z"/>
    <path fill="#34A853" d="M24 48c6.15 0 11.58-2.03 15.59-5.5l-7.38-5.72c-2.05 1.38-4.63 2.2-8.21 2.2-6.24 0-11.51-3.94-13.32-9.43l-7.99 6.21C6.36 42.62 14.63 48 24 48z"/>
  </svg>

  <span className="font-medium">Sign in with Google</span>
</Button>



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
              disabled={loading}
              className="w-full h-12 bg-[#009933] hover:bg-[#33cc33] text-black rounded-xl font-medium text-lg"
            >
              Sign In
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-[#6B7C6D]">
              Don&apos;t have an account?{" "}
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
