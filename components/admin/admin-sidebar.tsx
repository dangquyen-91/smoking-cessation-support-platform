"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
    LayoutDashboard,
    Users,
    UserCheck,
    FileText,
    Settings,
    LogOut,
    Globe,
    ChevronLeft,
    ChevronRight,
    Archive,
    ArchiveIcon,
    Award,
    PackagePlus,
    DollarSign,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

const sidebarItems = [
    {
        title: "Tổng quan",
        href: "/admin",
        icon: LayoutDashboard,
    },
    {
        title: "Người dùng",
        href: "/admin/users",
        icon: Users,
    },
    {
        title: "Huấn luyện viên",
        href: "/admin/coaches",
        icon: Users,
    },
    {
        title: "Danh sách Blog",
        href: "/admin/content",
        icon: FileText,
    },
    {
        title: "Bài đăng mạng xã hội",
        href: "/admin/social-posts",
        icon: Globe,
    },
    {
        title: "Danh hiệu",
        href: "/admin/achievements",
        icon: Award,
    },
    {
        title: "Gói",
        href: "/admin/packages",
        icon: PackagePlus,
    },
    {
        title: "Rút tiền",
        href: "/admin/withdraw",
        icon: DollarSign,
    },
    {
        title: "Cài đặt",
        href: "/admin/settings",
        icon: Settings,
    },
];

interface AdminSidebarProps {
    onToggle?: (collapsed: boolean) => void;
}

export function AdminSidebar({ onToggle }: AdminSidebarProps) {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const pathname = usePathname();

    const toggleSidebar = () => {
        const newCollapsed = !isCollapsed;
        setIsCollapsed(newCollapsed);
        onToggle?.(newCollapsed);
    };

    const SidebarLink = ({
        item,
        isActive,
    }: {
        item: any;
        isActive: boolean;
    }) => {
        const Icon = item.icon;

        const linkContent = (
            <Link
                href={item.href}
                className={cn(
                    "flex items-center px-3 py-3 rounded-xl text-sm font-medium transition-all duration-200 group relative overflow-hidden",
                    isCollapsed ? "justify-center" : "space-x-3",
                    isActive
                        ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg shadow-green-500/25"
                        : "text-gray-700 hover:bg-gray-100 hover:shadow-md"
                )}
            >
                <div
                    className={cn(
                        "relative z-10 transition-all duration-200 flex-shrink-0",
                        isActive && "text-white"
                    )}
                >
                    <Icon className="h-5 w-5" />
                </div>
                {!isCollapsed && (
                    <span
                        className={cn(
                            "relative z-10 transition-all duration-200 whitespace-nowrap ml-3",
                            isActive && "text-white"
                        )}
                    >
                        {item.title}
                    </span>
                )}
                {isActive && (
                    <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-600 opacity-90"></div>
                )}
            </Link>
        );

        if (isCollapsed) {
            return (
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>{linkContent}</TooltipTrigger>
                        <TooltipContent side="right" className="ml-2">
                            <p>{item.title}</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            );
        }

        return linkContent;
    };

    return (
        <div
            className={cn(
                "fixed left-0 top-16 h-[calc(100vh-4rem)] bg-white border-r border-gray-200/50 shadow-lg transition-all duration-300 ease-in-out z-40",
                isCollapsed ? "w-16" : "w-64"
            )}
        >
            {/* Toggle Button */}
            <div className="absolute -right-3 top-6 z-50">
                <Button
                    variant="outline"
                    size="icon"
                    onClick={toggleSidebar}
                    className="h-6 w-6 rounded-full bg-white shadow-md border-green-200 hover:bg-green-50 hover:border-green-300 transition-all duration-200"
                >
                    {isCollapsed ? (
                        <ChevronRight className="h-3 w-3 text-green-600" />
                    ) : (
                        <ChevronLeft className="h-3 w-3 text-green-600" />
                    )}
                </Button>
            </div>

            <div className="p-4">
                {/* Navigation */}
                <nav className="space-y-2">
                    {sidebarItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <SidebarLink
                                key={item.href}
                                item={item}
                                isActive={isActive}
                            />
                        );
                    })}
                </nav>
            </div>

            {/* Logout Button */}
            <div
                className={cn(
                    "absolute bottom-4 transition-all duration-300",
                    isCollapsed ? "left-2 right-2" : "left-4 right-4"
                )}
            >
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <button
                                className={cn(
                                    "flex items-center px-3 py-3 w-full text-left text-sm font-medium text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-xl transition-all duration-200 group",
                                    isCollapsed ? "justify-center" : "space-x-3"
                                )}
                            >
                                <LogOut className="h-5 w-5 transition-transform duration-200 group-hover:scale-110 flex-shrink-0" />
                                {!isCollapsed && (
                                    <span className="whitespace-nowrap ml-3">
                                        Đăng xuất
                                    </span>
                                )}
                            </button>
                        </TooltipTrigger>
                        {isCollapsed && (
                            <TooltipContent side="right" className="ml-2">
                                <p>Đăng xuất</p>
                            </TooltipContent>
                        )}
                    </Tooltip>
                </TooltipProvider>
            </div>

            {/* Gradient Border */}
            <div className="absolute right-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-green-200 to-transparent"></div>
        </div>
    );
}
