"use client";

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
} from "@/components/ui/sidebar";
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
    Heart,
    Calculator,
    PackagePlus,
    Package2,
} from "lucide-react";
import { useRouter, usePathname } from "next/navigation";

const menuItems = [
    {
        title: "Dashboard cá nhân",
        icon: LayoutDashboard,
        key: "/dashboard",
    },
    {
        title: "Quản lý hồ sơ",
        icon: User,
        key: "/dashboard/profile",
    },
    {
        title: "Tình trạng hút thuốc",
        icon: Cigarette,
        key: "/dashboard/smoking-status",
    },

    {
        title: "Lịch trình cai thuốc",
        icon: LayoutDashboard,
        key: "/dashboard/plan-calendar",
    },

    {
        title: "Tính chi phí hút thuốc",
        icon: Calculator,
        key: "/dashboard/cost-calculator",
    },
];

const communityItems = [
    {
        title: "Cộng đồng",
        icon: Users,
        key: "/dashboard/community",
    },
    {
        title: "Blog",
        icon: BookOpen,
        key: "/dashboard/blog",
    },
    // {
    //     title: "Forum",
    //     icon: MessageSquare,
    //     key: "/dashboard/forum",
    // },
];

const supportItems = [
    {
        title: "Chat với Coach",
        icon: Video,
        key: "/dashboard/coach-chat",
    },
    {
        title: "Gói của bạn",
        icon: Package2,
        key: "/dashboard/packages",
    },
];

export function AppSidebar() {
    const router = useRouter();
    const pathname = usePathname();

    const handleNavigation = (tab: string) => {
        router.push(tab);
    };

    return (
        <Sidebar>
            <SidebarHeader className="p-4">
                <div className="flex items-center gap-2">
                    <Heart className="h-8 w-8 text-green-600" />
                    <div>
                        <h2 className="text-lg font-semibold">Cai thuốc lá</h2>
                        <p className="text-sm text-gray-600">
                            Sức khỏe là vàng
                        </p>
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
                                    <SidebarMenuButton
                                        onClick={() => {
                                            handleNavigation(item.key);
                                        }}
                                        className={`${
                                            pathname === item.key
                                                ? "bg-green-100 text-gray-900"
                                                : ""
                                        }`}
                                    >
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
                                    <SidebarMenuButton
                                        onClick={() =>
                                            handleNavigation(item.key)
                                        }
                                        className={`${
                                            pathname === item.key
                                                ? "bg-green-100 text-gray-900"
                                                : ""
                                        }`}
                                    >
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
                                    <SidebarMenuButton
                                        onClick={() =>
                                            handleNavigation(item.key)
                                        }
                                        className={`${
                                            pathname === item.key
                                                ? "bg-green-100 text-gray-900"
                                                : ""
                                        }`}
                                    >
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
    );
}
