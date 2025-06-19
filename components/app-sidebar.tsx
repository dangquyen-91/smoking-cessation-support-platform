"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import {
  LayoutDashboard,
  User,
  Cigarette,
  Target,
  TrendingUp,
  Users,
  BookOpen,
  MessageSquare,
  Video,
  Package,
  Heart,
} from "lucide-react"

interface AppSidebarProps {
  activeTab: string
  setActiveTab: (tab: string) => void
  onLogout: () => void
}

const menuItems = [
  {
    title: "Dashboard cá nhân",
    icon: LayoutDashboard,
    key: "dashboard",
  },
  {
    title: "Quản lý hồ sơ",
    icon: User,
    key: "profile",
  },
  {
    title: "Tình trạng hút thuốc",
    icon: Cigarette,
    key: "smoking-status",
  },
  {
    title: "Kế hoạch cai thuốc",
    icon: Target,
    key: "quit-plan",
  },
  {
    title: "Theo dõi tiến trình",
    icon: TrendingUp,
    key: "progress",
  },
]

const communityItems = [
  {
    title: "Cộng đồng",
    icon: Users,
    key: "community",
  },
  {
    title: "Blog",
    icon: BookOpen,
    key: "blog",
  },
  {
    title: "Forum",
    icon: MessageSquare,
    key: "forum",
  },
]

const supportItems = [
  {
    title: "Chat với Coach",
    icon: Video,
    key: "coach-chat",
  },

]

export function AppSidebar({ activeTab, setActiveTab, onLogout }: AppSidebarProps) {
  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-2">
          <Heart className="h-8 w-8 text-green-600" />
          <div>
            <h2 className="text-lg font-semibold">Cai thuốc lá</h2>
            <p className="text-sm text-gray-600">Sức khỏe là vàng</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Quản lý cá nhân</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.key}>
                  <SidebarMenuButton onClick={() => setActiveTab(item.key)} isActive={activeTab === item.key}>
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Cộng đồng</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {communityItems.map((item) => (
                <SidebarMenuItem key={item.key}>
                  <SidebarMenuButton onClick={() => setActiveTab(item.key)} isActive={activeTab === item.key}>
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Hỗ trợ</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {supportItems.map((item) => (
                <SidebarMenuItem key={item.key}>
                  <SidebarMenuButton onClick={() => setActiveTab(item.key)} isActive={activeTab === item.key}>
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
