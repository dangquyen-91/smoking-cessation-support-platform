"use client";

import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import { Users, UserCheck, FileText, TrendingUp } from "lucide-react";
import { useGetAllBlog } from "@/queries/blog.query";
import { useGetUserByRole } from "@/queries/user.query";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    PieChart,
    Pie,
    Cell,
    BarChart,
    Bar,
    AreaChart,
    Area,
} from "recharts";

interface Role {
    id: number;
    name: string;
    description: string;
}

interface User {
    id: number;
    username: string;
    email: string;
    fullName: string;
    phone: string;
    gender: string;
    age: number;
    profileImage: string | null;
    status: "ACTIVE" | "INACTIVE";
    roles: Role[];
    membershipPackage: string | null;
    membershipExpiry: string | null;
    createdAt: string;
    updatedAt: string;
}

interface Blog {
    id: number;
    author: User;
    title: string;
    excerpt: string;
    content: string;
    featuredImage: string;
    tags: string;
    viewsCount: number;
    likesCount: number;
    status: "PUBLISHED" | "DRAFT";
    publishedAt: string;
    createdAt: string;
    updatedAt: string;
}

export function AdminOverview() {
    const { data: listBlog = [] } = useGetAllBlog("PUBLISHED") as {
        data: Blog[];
    };
    const { data: listUser = [] } = useGetUserByRole("all") as { data: User[] };

    const todayIso = useMemo(() => {
        const now = new Date();
        const yyyy = now.getFullYear();
        const mm = String(now.getMonth() + 1).padStart(2, "0");
        const dd = String(now.getDate()).padStart(2, "0");
        return `${yyyy}-${mm}-${dd}`;
    }, []);

    // Existing stats calculations
    const totalUsers = listUser.length;
    const activeCoaches = listUser.filter(
        (u: User) =>
            u.roles.some((r: Role) => r.name === "COACH") &&
            u.status === "ACTIVE"
    ).length;
    const activePosts = listBlog.length;
    const newUsersToday = listUser.filter((u: User) =>
        u.createdAt.startsWith(todayIso)
    ).length;

    // Chart data calculations
    const userRegistrationTrend = useMemo(() => {
        const last7Days = [];
        for (let i = 6; i >= 0; i--) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            const dateStr = date.toISOString().split("T")[0];
            const count = listUser.filter((u) =>
                u.createdAt.startsWith(dateStr)
            ).length;
            last7Days.push({
                date: date.toLocaleDateString("vi-VN", {
                    month: "short",
                    day: "numeric",
                }),
                users: count,
            });
        }
        return last7Days;
    }, [listUser]);

    const userRoleDistribution = useMemo(() => {
        const roleCount = listUser.reduce((acc, user) => {
            user.roles.forEach((role) => {
                acc[role.name] = (acc[role.name] || 0) + 1;
            });
            return acc;
        }, {} as Record<string, number>);

        return Object.entries(roleCount).map(([role, count]) => ({
            role:
                role === "MEMBER"
                    ? "Thành viên"
                    : role === "COACH"
                    ? "Huấn luyện viên"
                    : role,
            count,
            percentage: Math.round((count / totalUsers) * 100),
        }));
    }, [listUser, totalUsers]);

    const userStatusData = useMemo(() => {
        const activeUsers = listUser.filter(
            (u) => u.status === "ACTIVE"
        ).length;
        const inactiveUsers = listUser.filter(
            (u) => u.status === "INACTIVE"
        ).length;

        return [
            {
                status: "Hoạt động",
                count: activeUsers,
                percentage: Math.round((activeUsers / totalUsers) * 100),
            },
            {
                status: "Không hoạt động",
                count: inactiveUsers,
                percentage: Math.round((inactiveUsers / totalUsers) * 100),
            },
        ];
    }, [listUser, totalUsers]);

    const blogEngagementData = useMemo(() => {
        return listBlog.slice(0, 5).map((blog) => ({
            title:
                blog.title.length > 20
                    ? blog.title.substring(0, 20) + "..."
                    : blog.title,
            views: blog.viewsCount,
            likes: blog.likesCount,
        }));
    }, [listBlog]);

    const blogPublishingTrend = useMemo(() => {
        const last7Days = [];
        for (let i = 6; i >= 0; i--) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            const dateStr = date.toISOString().split("T")[0];
            const count = listBlog.filter(
                (blog) =>
                    blog.publishedAt && blog.publishedAt.startsWith(dateStr)
            ).length;
            last7Days.push({
                date: date.toLocaleDateString("vi-VN", {
                    month: "short",
                    day: "numeric",
                }),
                posts: count,
            });
        }
        return last7Days;
    }, [listBlog]);

    const statsCards = [
        {
            title: "Tổng số người dùng",
            value: totalUsers.toLocaleString(),
            changeType: "positive" as const,
            icon: Users,
            gradient: "bg-gradient-to-r from-pink-400 to-purple-500",
        },
        {
            title: "Coach",
            value: activeCoaches.toString(),
            changeType: "positive" as const,
            icon: UserCheck,
            gradient: "bg-gradient-to-r from-blue-500 to-cyan-500",
        },
        {
            title: "Nội dung",
            value: activePosts.toString(),
            changeType: "positive" as const,
            icon: FileText,
            gradient: "bg-gradient-to-r from-emerald-400 to-emerald-500",
        },
        {
            title: "Người dùng mới hôm nay",
            value: newUsersToday.toString(),
            changeType: "positive" as const,
            icon: TrendingUp,
            gradient: "bg-gradient-to-r from-orange-400 to-red-500",
        },
    ];

    const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7300", "#00ff00"];

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">
                        Trang tổng quan
                    </h1>
                    <p className="text-gray-600">
                        Quản lý thông tin và hoạt động của các coach
                    </p>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {statsCards.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                        <Card
                            key={index}
                            className={`shadow-lg border-0 ${stat.gradient} text-white hover:shadow-xl transition-shadow duration-300`}
                        >
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium text-white/90">
                                    {stat.title}
                                </CardTitle>
                                <Icon className="h-5 w-5 text-white/80" />
                            </CardHeader>
                            <CardContent className="pt-2">
                                <div className="text-3xl font-bold text-white mb-1">
                                    {stat.value}
                                </div>
                                <p className="text-xs text-white/70">
                                    {stat.changeType === "positive" ? "↗" : "↘"}{" "}
                                    Đang hoạt động
                                </p>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* User Registration Trend */}
                <Card>
                    <CardHeader>
                        <CardTitle>
                            Xu hướng đăng ký người dùng (7 ngày qua)
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer
                            config={{
                                users: {
                                    label: "Người dùng",
                                    color: "hsl(var(--chart-1))",
                                },
                            }}
                            className="h-[300px]"
                        >
                            <LineChart data={userRegistrationTrend}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date" />
                                <YAxis />
                                <ChartTooltip
                                    content={<ChartTooltipContent />}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="users"
                                    stroke="var(--color-users)"
                                    strokeWidth={2}
                                    dot={{ fill: "var(--color-users)" }}
                                />
                            </LineChart>
                        </ChartContainer>
                    </CardContent>
                </Card>

                {/* User Role Distribution */}
                <Card>
                    <CardHeader>
                        <CardTitle>Phân bố vai trò người dùng</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer
                            config={{
                                role: {
                                    label: "Vai trò",
                                    color: "hsl(var(--chart-2))",
                                },
                            }}
                            className="h-[300px]"
                        >
                            <PieChart>
                                <Pie
                                    data={userRoleDistribution}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={({ role, percentage }) =>
                                        `${role}: ${percentage}%`
                                    }
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="count"
                                >
                                    {userRoleDistribution.map(
                                        (entry, index) => (
                                            <Cell
                                                key={`cell-${index}`}
                                                fill={
                                                    COLORS[
                                                        index % COLORS.length
                                                    ]
                                                }
                                            />
                                        )
                                    )}
                                </Pie>
                                <ChartTooltip
                                    content={<ChartTooltipContent />}
                                />
                            </PieChart>
                        </ChartContainer>
                    </CardContent>
                </Card>

                {/* Blog Publishing Trend */}
                <Card>
                    <CardHeader>
                        <CardTitle>
                            Xu hướng xuất bản bài viết (7 ngày qua)
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer
                            config={{
                                posts: {
                                    label: "Bài viết",
                                    color: "hsl(var(--chart-3))",
                                },
                            }}
                            className="h-[300px]"
                        >
                            <AreaChart data={blogPublishingTrend}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date" />
                                <YAxis />
                                <ChartTooltip
                                    content={<ChartTooltipContent />}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="posts"
                                    stroke="var(--color-posts)"
                                    fill="var(--color-posts)"
                                    fillOpacity={0.3}
                                />
                            </AreaChart>
                        </ChartContainer>
                    </CardContent>
                </Card>

                {/* User Status Distribution */}
                <Card>
                    <CardHeader>
                        <CardTitle>Trạng thái người dùng</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer
                            config={{
                                status: {
                                    label: "Trạng thái",
                                    color: "hsl(var(--chart-4))",
                                },
                            }}
                            className="h-[300px]"
                        >
                            <BarChart data={userStatusData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="status" />
                                <YAxis />
                                <ChartTooltip
                                    content={<ChartTooltipContent />}
                                />
                                <Bar
                                    dataKey="count"
                                    fill="var(--color-status)"
                                />
                            </BarChart>
                        </ChartContainer>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
