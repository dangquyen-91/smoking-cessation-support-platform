"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Dashboard } from "@/components/dashboard";
import { Profile } from "@/components/profile";
import { SmokingStatus } from "@/components/smoking-status";
import { QuitPlan } from "@/components/quit-plan";
import { Progress } from "@/components/progress";
import { Community } from "@/components/community";
import { Blog } from "@/components/blog";
import { Forum } from "@/components/forum";
import { CoachChat } from "@/components/coach-chat";
import Providers from "@/lib/react-query/providers";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator,
    DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    LogOut,
    Bell,
    Trophy,
    Gift,
    Target,
    DollarSign,
    Calendar,
    Loader2,
    ChevronDown,
} from "lucide-react";
import { Toaster } from "@/components/ui/toaster";

import { ReactNode } from "react";
import { useGetAllNotification } from "@/queries/notification.query";

interface LayoutProps {
    children: ReactNode;
}

// Mock notification data based on the JSON format provided
const mockNotifications = [
    {
        id: 9,
        title: "🏆 Chúc mừng! Bạn đã đạt được huy hiệu mới!",
        message:
            "Bạn vừa nhận được huy hiệu: Bước đầu cai thuốc. Tránh được 10 điếu thuốc",
        type: "ACHIEVEMENT",
        isRead: false,
        sentAt: "2025-07-11T00:44:14.114318",
    },
    {
        id: 8,
        title: "🏆 Chúc mừng! Bạn đã đạt được huy hiệu mới!",
        message:
            "Bạn vừa nhận được huy hiệu: Quyết tâm cai thuốc. Huy hiệu dành cho những người đã bắt đầu cai thuốc được 1 ngày",
        type: "ACHIEVEMENT",
        isRead: false,
        sentAt: "2025-07-11T00:44:10.157982",
    },
    {
        id: 7,
        title: "🏆 Chúc mừng! Bạn đã đạt được huy hiệu mới!",
        message:
            "Bạn vừa nhận được huy hiệu: Đại gia mới nổi. Huy hiệu dành cho những người đã tiết kiệm được hơn 100k từ thuốc",
        type: "ACHIEVEMENT",
        isRead: false,
        sentAt: "2025-07-11T00:44:04.978448",
    },
    // Add more mock data for demonstration
    ...Array.from({ length: 20 }, (_, index) => ({
        id: index + 10,
        title: `🎯 Thông báo số ${index + 4}`,
        message: `Đây là nội dung thông báo mẫu số ${
            index + 4
        } để test chức năng scroll và load more`,
        type: "REMINDER",
        isRead: Math.random() > 0.5,
        sentAt: new Date(
            Date.now() - Math.random() * 86400000 * 7
        ).toISOString(),
    })),
];

const NotificationIcon = ({ type }: { type: string }) => {
    switch (type) {
        case "ACHIEVEMENT":
            return <Trophy className="h-4 w-4 text-yellow-500" />;
        case "REMINDER":
            return <Calendar className="h-4 w-4 text-blue-500" />;
        case "REWARD":
            return <Gift className="h-4 w-4 text-green-500" />;
        case "MILESTONE":
            return <Target className="h-4 w-4 text-purple-500" />;
        case "SAVINGS":
            return <DollarSign className="h-4 w-4 text-emerald-500" />;
        default:
            return <Bell className="h-4 w-4 text-gray-500" />;
    }
};

const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor(
        (now.getTime() - date.getTime()) / (1000 * 60)
    );

    if (diffInMinutes < 1) return "Vừa xong";
    if (diffInMinutes < 60) return `${diffInMinutes} phút trước`;
    if (diffInMinutes < 1440)
        return `${Math.floor(diffInMinutes / 60)} giờ trước`;
    return `${Math.floor(diffInMinutes / 1440)} ngày trước`;
};

export default function Layout({ children }: LayoutProps) {
    const { data: listNotification } = useGetAllNotification();

    // Pagination states
    const [displayedNotifications, setDisplayedNotifications] = useState<any[]>(
        []
    );
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const scrollAreaRef = useRef<HTMLDivElement>(null);
    const observerRef = useRef<IntersectionObserver | null>(null);
    const loadMoreRef = useRef<HTMLDivElement>(null);

    const ITEMS_PER_PAGE = 10;

    // Use real data if available, otherwise use mock data
    const allNotifications = listNotification || mockNotifications;
    const unreadCount = allNotifications.filter(
        (notif: any) => !notif.isRead
    ).length;

    // Initialize displayed notifications
    useEffect(() => {
        if (allNotifications.length > 0) {
            const initialItems = allNotifications.slice(0, ITEMS_PER_PAGE);
            setDisplayedNotifications(initialItems);
            setHasMore(allNotifications.length > ITEMS_PER_PAGE);
            setPage(1);
        }
    }, [allNotifications]);

    // Load more notifications
    const loadMoreNotifications = useCallback(async () => {
        if (isLoading || !hasMore) return;

        setIsLoading(true);

        // Simulate API delay for better UX
        await new Promise((resolve) => setTimeout(resolve, 500));

        const nextPage = page + 1;
        const startIndex = (nextPage - 1) * ITEMS_PER_PAGE;
        const endIndex = startIndex + ITEMS_PER_PAGE;
        const newItems = allNotifications.slice(startIndex, endIndex);

        if (newItems.length > 0) {
            setDisplayedNotifications((prev) => [...prev, ...newItems]);
            setPage(nextPage);
            setHasMore(endIndex < allNotifications.length);
        } else {
            setHasMore(false);
        }

        setIsLoading(false);
    }, [page, isLoading, hasMore, allNotifications]);

    // Intersection Observer for infinite scroll
    useEffect(() => {
        if (!isDropdownOpen) return;

        const observer = new IntersectionObserver(
            (entries) => {
                const target = entries[0];
                if (target.isIntersecting && hasMore && !isLoading) {
                    loadMoreNotifications();
                }
            },
            {
                threshold: 0.1,
                rootMargin: "20px",
            }
        );

        observerRef.current = observer;

        if (loadMoreRef.current) {
            observer.observe(loadMoreRef.current);
        }

        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect();
            }
        };
    }, [loadMoreNotifications, hasMore, isLoading, isDropdownOpen]);

    const handleMarkAsRead = (notificationId: number) => {
        // Update displayed notifications
        setDisplayedNotifications((prev) =>
            prev.map((notif) =>
                notif.id === notificationId ? { ...notif, isRead: true } : notif
            )
        );
        console.log(`Marking notification ${notificationId} as read`);
    };

    const handleMarkAllAsRead = () => {
        setDisplayedNotifications((prev) =>
            prev.map((notif) => ({ ...notif, isRead: true }))
        );
        console.log("Marking all notifications as read");
    };

    const handleViewAllNotifications = () => {
        // Navigate to full notifications page or expand all
        setIsDropdownOpen(false);
    };
    const [title, setTitle] = useState<string>("Cai Thuốc Lá");

    return (
        <Providers>
            <SidebarProvider>
                <div className="flex min-h-screen w-full bg-gradient-to-br from-blue-50 via-white to-green-50">
                    <Toaster />
                    <AppSidebar />
                    <main className="flex-1 p-6">
                        {/* Header */}
                        <div className="mb-8 flex items-center justify-between bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-sm border border-white/20">
                            <div className="flex items-center gap-4">
                                <SidebarTrigger className="hover:bg-blue-50 transition-colors" />
                                <div className="hidden md:block">
                                    <h1 className="text-2xl font-bold bg-gradient-to-r ">
                                        {title}
                                    </h1>
                                    <p className="text-sm text-gray-600">
                                        Hành trình khỏe mạnh của bạn
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                {/* Notification Dropdown */}
                                <DropdownMenu onOpenChange={setIsDropdownOpen}>
                                    <DropdownMenuTrigger asChild>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="relative hover:bg-blue-50 transition-all duration-200 hover:scale-105"
                                        >
                                            <Bell className="h-4 w-4" />
                                            {unreadCount > 0 && (
                                                <Badge
                                                    variant="destructive"
                                                    className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs animate-pulse"
                                                >
                                                    {unreadCount > 9
                                                        ? "9+"
                                                        : unreadCount}
                                                </Badge>
                                            )}
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent
                                        align="end"
                                        className="w-80 p-0 bg-white/95 backdrop-blur-sm border-white/20"
                                    >
                                        <DropdownMenuLabel className="p-4 border-b bg-gradient-to-r from-blue-50 to-green-50">
                                            <div className="flex items-center justify-between">
                                                <span className="font-semibold text-gray-800">
                                                    Thông báo
                                                </span>
                                                {unreadCount > 0 && (
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={
                                                            handleMarkAllAsRead
                                                        }
                                                        className="text-xs text-blue-600 hover:text-blue-800"
                                                    >
                                                        Đánh dấu tất cả đã đọc
                                                    </Button>
                                                )}
                                            </div>
                                        </DropdownMenuLabel>

                                        <ScrollArea
                                            className="max-h-96"
                                            ref={scrollAreaRef}
                                        >
                                            {displayedNotifications.length ===
                                            0 ? (
                                                <div className="p-8 text-center text-gray-500">
                                                    <Bell className="h-12 w-12 mx-auto mb-2 opacity-50" />
                                                    <p>
                                                        Không có thông báo nào
                                                    </p>
                                                </div>
                                            ) : (
                                                <>
                                                    {displayedNotifications.map(
                                                        (
                                                            notification: any,
                                                            index: number
                                                        ) => (
                                                            <DropdownMenuItem
                                                                key={
                                                                    notification.id
                                                                }
                                                                className="p-0 focus:bg-blue-50/50"
                                                                onClick={() =>
                                                                    handleMarkAsRead(
                                                                        notification.id
                                                                    )
                                                                }
                                                            >
                                                                <div
                                                                    className={`w-full p-4 border-l-4 transition-all duration-200 ${
                                                                        !notification.isRead
                                                                            ? "border-l-blue-500 bg-blue-50/30"
                                                                            : "border-l-transparent"
                                                                    } ${
                                                                        index ===
                                                                            displayedNotifications.length -
                                                                                1 &&
                                                                        isLoading
                                                                            ? "animate-pulse"
                                                                            : ""
                                                                    }`}
                                                                >
                                                                    <div className="flex items-start gap-3">
                                                                        <div className="flex-shrink-0 mt-1">
                                                                            <NotificationIcon
                                                                                type={
                                                                                    notification.type
                                                                                }
                                                                            />
                                                                        </div>
                                                                        <div className="flex-1 min-w-0">
                                                                            <p className="text-sm font-medium text-gray-900 mb-1">
                                                                                {notification.title.replace(
                                                                                    /🏆|💰|🎯|🎁/,
                                                                                    ""
                                                                                )}
                                                                            </p>
                                                                            <p className="text-xs text-gray-600 mb-2 line-clamp-2">
                                                                                {
                                                                                    notification.message
                                                                                }
                                                                            </p>
                                                                            <p className="text-xs text-gray-400">
                                                                                {formatTimeAgo(
                                                                                    notification.sentAt
                                                                                )}
                                                                            </p>
                                                                        </div>
                                                                        {!notification.isRead && (
                                                                            <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-2"></div>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            </DropdownMenuItem>
                                                        )
                                                    )}

                                                    {/* Loading indicator */}
                                                    {isLoading && (
                                                        <div className="flex items-center justify-center p-4">
                                                            <Loader2 className="h-4 w-4 animate-spin text-blue-500 mr-2" />
                                                            <span className="text-xs text-gray-500">
                                                                Đang tải thêm...
                                                            </span>
                                                        </div>
                                                    )}

                                                    {/* Load more trigger (invisible) */}
                                                    {hasMore && !isLoading && (
                                                        <div
                                                            ref={loadMoreRef}
                                                            className="h-4 w-full"
                                                        />
                                                    )}

                                                    {/* End of list indicator */}
                                                    {!hasMore &&
                                                        displayedNotifications.length >
                                                            ITEMS_PER_PAGE && (
                                                            <div className="p-4 text-center border-t bg-gray-50/50">
                                                                <p className="text-xs text-gray-500">
                                                                    Đã hiển thị
                                                                    tất cả thông
                                                                    báo
                                                                </p>
                                                            </div>
                                                        )}
                                                </>
                                            )}
                                        </ScrollArea>

                                        {displayedNotifications.length > 0 && (
                                            <>
                                                <DropdownMenuSeparator />
                                                <div className="p-2">
                                                    <Button
                                                        variant="ghost"
                                                        className="w-full text-sm text-blue-600 hover:text-blue-800 hover:bg-blue-50 flex items-center justify-center gap-2"
                                                        onClick={
                                                            handleViewAllNotifications
                                                        }
                                                    >
                                                        Xem tất cả thông báo
                                                        <ChevronDown className="h-3 w-3" />
                                                    </Button>
                                                </div>
                                            </>
                                        )}
                                    </DropdownMenuContent>
                                </DropdownMenu>

                                {/* Logout Button */}
                                <Button
                                    variant="outline"
                                    className="flex items-center gap-2 hover:bg-red-50 hover:border-red-200 hover:text-red-600 transition-all duration-200"
                                    onClick={() => {
                                        localStorage.removeItem("authToken");
                                        localStorage.removeItem("userData");
                                        window.location.href = "/login";
                                    }}
                                >
                                    <LogOut className="h-4 w-4" />
                                    <span className="hidden sm:inline">
                                        Đăng xuất
                                    </span>
                                </Button>
                            </div>
                        </div>

                        {/* Main Content */}
                        <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-white/20 min-h-[calc(100vh-140px)]">
                            {children}
                        </div>
                    </main>
                </div>
            </SidebarProvider>
        </Providers>
    );
}
