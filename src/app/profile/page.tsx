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
  const [isPrivate, setIsPrivate] = useState(false)
  const [saving, setSaving] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/auth/curruser")
        if (res.data.authenticated) {
          setUser(res.data.user)
          setIsPrivate(res.data.user.isPrivate || false)
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
     
      window.location.reload()
    } catch {
      toast.error("Logout failed")
    }
  }

  const handleSaveChanges = async () => {
    setSaving(true)
    try {
      const res = await api.post("/profile/update", { isPrivate })
      if (res.data.success) {
        toast.success("Profile updated successfully")
        setUser({ ...user!, isPrivate: res.data.user.isPrivate })
      } else {
        toast.error(res.data.error || "Failed to update profile")
      }
    } catch (error) {
      console.error("Save changes failed:", error)
      toast.error("An error occurred while saving changes")
    } finally {
      setSaving(false)
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
    <div className="min-h-screen bg-[#FDFCFB] pt-24 md:pt-32 pb-12 md:pb-20 px-4 md:px-6">
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
              <CardContent className="pt-0 -mt-10 md:-mt-12 flex flex-col items-center">
                <Avatar className="h-20 w-20 md:h-24 md:w-24 border-4 border-white shadow-lg">
                  <AvatarImage src="" />
                  <AvatarFallback className="bg-[#5A7C5E] text-white text-xl md:text-2xl">
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
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-[#F5F3EE]/50 rounded-xl gap-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-white rounded-lg shadow-sm">
                        <ShieldCheck className="w-5 h-5 text-[#5A7C5E]" />
                      </div>
                      <div>
                        <p className="font-bold text-[#3D4A3E]">Account Privacy</p>
                        <p className="text-sm text-gray-500">
                          {isPrivate ? "Your account is currently private." : "Your account is currently public."}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between sm:justify-start gap-4 border-t sm:border-t-0 pt-3 sm:pt-0">
                      <span className={`text-xs font-bold uppercase tracking-wider ${isPrivate ? "text-[#AA4D4D]" : "text-[#5A7C5E]"}`}>
                        {isPrivate ? "Private" : "Public"}
                      </span>
                      <button
                        onClick={() => setIsPrivate(!isPrivate)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
                          isPrivate ? "bg-[#AA4D4D]" : "bg-gray-200"
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            isPrivate ? "translate-x-6" : "translate-x-1"
                          }`}
                        />
                      </button>
                    </div>
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

            <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 sm:gap-4">
              <Button variant="outline" className="border-gray-200 text-gray-600 w-full sm:w-auto" disabled={saving}>Cancel</Button>
              <Button 
                className="bg-[#AA4D4D] text-white hover:bg-[#913D3D] px-8 w-full sm:w-auto" 
                onClick={handleSaveChanges}
                disabled={saving}
              >
                {saving ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
