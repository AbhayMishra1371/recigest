"use client"

import { Calendar, Home, Inbox, Search, Settings, ChefHat, Heart, RotateCcw } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar"

// Menu items.
const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Search",
    url: "/",
    icon: Search,
  },
  {
    title: "Saved Recipes",
    url: "#",
    icon: Heart,
  },
  {
    title: "History",
    url: "#",
    icon: RotateCcw,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
]

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="p-4 border-b border-sidebar-border">
         <div className="flex items-center gap-2 font-bold text-[#AA4D4D] text-xl">
            <ChefHat className="w-8 h-8" />
            <span>Recigest</span>
         </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-sidebar-border">
         <div className="text-xs text-gray-500 text-center">
            &copy; 2024 Recigest AI
         </div>
      </SidebarFooter>
    </Sidebar>
  )
}
