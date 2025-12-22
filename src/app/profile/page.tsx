"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import api from "@/lib/axios"
import { User } from "@/types"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  User as UserIcon, 
  Mail, 
  Settings, 
  LogOut, 
  ChevronLeft,
  Calendar,
  ShieldCheck
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { toast } from "sonner"

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/auth/curruser")
        if (res.data.authenticated) {
          setUser(res.data.user)
        } else {
          router.push("/signin")
        }
      } catch (error) {
        console.error("Failed to fetch user:", error)
        toast.error("Failed to load profile. Please try signing in again.")
        router.push("/signin")
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [router])

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout")
      toast.success("Successfully logged out")
      router.push("/")
      // Force a refresh to update the navbar state if not using a global state manager
      window.location.reload()
    } catch (error) {
      toast.error("Logout failed")
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FDFCFB]">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="w-24 h-24 bg-gray-200 rounded-full"></div>
          <div className="h-4 w-48 bg-gray-200 rounded"></div>
        </div>
      </div>
    )
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-[#FDFCFB] pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Link 
          href="/" 
          className="inline-flex items-center text-[#5A7C5E] hover:text-[#3D4A3E] transition-colors mb-8 group"
        >
          <ChevronLeft className="w-5 h-5 mr-1 group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">Back to Home</span>
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Profile Sidebar */}
          <div className="md:col-span-1 space-y-6">
            <Card className="border-none shadow-xl bg-white/80 backdrop-blur-sm overflow-hidden">
              <div className="h-24 bg-gradient-to-r from-[#5A7C5E] to-[#8BA88E]"></div>
              <CardContent className="pt-0 -mt-12 flex flex-col items-center">
                <Avatar className="h-24 w-24 border-4 border-white shadow-lg">
                  <AvatarImage src="" />
                  <AvatarFallback className="bg-[#5A7C5E] text-white text-2xl">
                    {user.name?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="mt-4 text-center">
                  <h2 className="text-xl font-bold text-[#3D4A3E]">{user.name}</h2>
                  <p className="text-[#5A7C5E] text-sm font-medium">Chef Enthusiast</p>
                </div>
                
                <Separator className="my-6" />
                
                <div className="w-full space-y-2">
                  <Button variant="ghost" className="w-full justify-start text-[#3D4A3E] hover:bg-[#F5F3EE] hover:text-[#5A7C5E]">
                    <UserIcon className="w-4 h-4 mr-3" />
                    Overview
                  </Button>
                  <Button variant="ghost" className="w-full justify-start text-[#3D4A3E] hover:bg-[#F5F3EE] hover:text-[#5A7C5E]">
                    <Settings className="w-4 h-4 mr-3" />
                    Settings
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start text-red-500 hover:bg-red-50 hover:text-red-600"
                    onClick={handleLogout}
                  >
                    <LogOut className="w-4 h-4 mr-3" />
                    Logout
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg bg-[#5A7C5E] text-white">
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-2">Need Help?</h3>
                <p className="text-sm text-white/80 mb-4 text-pretty">
                  Check our community forums or reach out to support if you have any questions.
                </p>
                <Button variant="secondary" className="w-full bg-white text-[#5A7C5E] hover:bg-white/90">
                  Contact Support
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="md:col-span-2 space-y-6">
            <Card className="border-none shadow-xl bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-[#3D4A3E]">Personal Information</CardTitle>
                <CardDescription>Update your profile details and management.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Full Name</p>
                    <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg border border-gray-100">
                      <UserIcon className="w-4 h-4 text-[#5A7C5E]" />
                      <span className="text-[#3D4A3E] font-medium">{user.name}</span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Email Address</p>
                    <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg border border-gray-100">
                      <Mail className="w-4 h-4 text-[#5A7C5E]" />
                      <span className="text-[#3D4A3E] font-medium">{user.email}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 pt-4">
                  <div className="flex items-center justify-between p-4 bg-[#F5F3EE]/50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-white rounded-lg shadow-sm">
                        <ShieldCheck className="w-5 h-5 text-[#5A7C5E]" />
                      </div>
                      <div>
                        <p className="font-bold text-[#3D4A3E]">Account Security</p>
                        <p className="text-sm text-gray-500">Your account is secured with two-factor authentication.</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="border-[#5A7C5E] text-[#5A7C5E] hover:bg-[#5A7C5E] hover:text-white">
                      Manage
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-[#F5F3EE]/50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-white rounded-lg shadow-sm">
                        <Calendar className="w-5 h-5 text-[#5A7C5E]" />
                      </div>
                      <div>
                        <p className="font-bold text-[#3D4A3E]">Member Since</p>
                        <p className="text-sm text-gray-500">Joined December 2024</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end gap-4">
              <Button variant="outline" className="border-gray-200 text-gray-600">Cancel</Button>
              <Button className="bg-[#AA4D4D] text-white hover:bg-[#913D3D] px-8">Save Changes</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
