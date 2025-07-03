"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Search, MoreHorizontal, UserPlus, Star, Calendar } from "lucide-react";

// Mock data
const coaches = [
    {
        id: 1,
        name: "Dr. Nguyễn Thị Lan",
        email: "dr.lan@email.com",
        phone: "0123456789",
        specialization: "Tâm lý học",
        experience: "5 năm",
        rating: 4.8,
        totalSessions: 120,
        activeClients: 15,
        status: "active",
        joinDate: "2023-01-15",
        avatar: "/placeholder-user.jpg",
    },
    {
        id: 2,
        name: "Dr. Trần Văn Minh",
        email: "dr.minh@email.com",
        phone: "0987654321",
        specialization: "Y học",
        experience: "8 năm",
        rating: 4.9,
        totalSessions: 200,
        activeClients: 20,
        status: "active",
        joinDate: "2022-08-20",
        avatar: "/placeholder-user.jpg",
    },
    {
        id: 3,
        name: "Dr. Lê Thị Hương",
        email: "dr.huong@email.com",
        phone: "0369852147",
        specialization: "Dinh dưỡng",
        experience: "3 năm",
        rating: 4.6,
        totalSessions: 80,
        activeClients: 12,
        status: "inactive",
        joinDate: "2023-06-01",
        avatar: "/placeholder-user.jpg",
    },
    {
        id: 4,
        name: "Dr. Phạm Văn Đức",
        email: "dr.duc@email.com",
        phone: "0741852963",
        specialization: "Tâm lý học",
        experience: "6 năm",
        rating: 4.7,
        totalSessions: 150,
        activeClients: 18,
        status: "pending",
        joinDate: "2024-01-10",
        avatar: "/placeholder-user.jpg",
    },
];

export function CoachManagement() {
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState("all");

    const filteredCoaches = coaches.filter((coach) => {
        const matchesSearch =
            coach.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            coach.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            coach.specialization
                .toLowerCase()
                .includes(searchTerm.toLowerCase());
        const matchesFilter =
            filterStatus === "all" || coach.status === filterStatus;
        return matchesSearch && matchesFilter;
    });

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "active":
                return (
                    <Badge className="bg-green-100 text-green-800">
                        Hoạt động
                    </Badge>
                );
            case "inactive":
                return (
                    <Badge className="bg-red-100 text-red-800">Tạm dừng</Badge>
                );
            case "pending":
                return (
                    <Badge className="bg-yellow-100 text-yellow-800">
                        Chờ duyệt
                    </Badge>
                );
            default:
                return <Badge variant="secondary">{status}</Badge>;
        }
    };

    const renderStars = (rating: number) => {
        return (
            <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                    <Star
                        key={i}
                        className={`h-4 w-4 ${
                            i < Math.floor(rating)
                                ? "text-yellow-400 fill-current"
                                : "text-gray-300"
                        }`}
                    />
                ))}
                <span className="text-sm text-gray-600 ml-1">{rating}</span>
            </div>
        );
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                        Quản lý Coach
                    </h1>
                    <p className="text-gray-600">
                        Quản lý thông tin và hoạt động của các coach
                    </p>
                </div>
                <Button className="flex items-center space-x-2">
                    <UserPlus className="h-4 w-4" />
                    <span>Thêm coach</span>
                </Button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                    <CardContent className="pt-6">
                        <div className="text-2xl font-bold">45</div>
                        <p className="text-xs text-muted-foreground">
                            Tổng số coach
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <div className="text-2xl font-bold">38</div>
                        <p className="text-xs text-muted-foreground">
                            Đang hoạt động
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <div className="text-2xl font-bold">4.7</div>
                        <p className="text-xs text-muted-foreground">
                            Đánh giá trung bình
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <div className="text-2xl font-bold">550</div>
                        <p className="text-xs text-muted-foreground">
                            Phiên tư vấn tháng này
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Filters and Search */}
            <Card>
                <CardContent className="pt-6">
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex-1">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                <Input
                                    placeholder="Tìm kiếm theo tên, email hoặc chuyên môn..."
                                    value={searchTerm}
                                    onChange={(e) =>
                                        setSearchTerm(e.target.value)
                                    }
                                    className="pl-10"
                                />
                            </div>
                        </div>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline">
                                    Lọc trạng thái
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem
                                    onClick={() => setFilterStatus("all")}
                                >
                                    Tất cả
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    onClick={() => setFilterStatus("active")}
                                >
                                    Hoạt động
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    onClick={() => setFilterStatus("inactive")}
                                >
                                    Tạm dừng
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    onClick={() => setFilterStatus("pending")}
                                >
                                    Chờ duyệt
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </CardContent>
            </Card>

            {/* Coaches Table */}
            <Card>
                <CardHeader>
                    <CardTitle>
                        Danh sách coach ({filteredCoaches.length})
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Coach</TableHead>
                                <TableHead>Chuyên môn</TableHead>
                                <TableHead>Kinh nghiệm</TableHead>
                                <TableHead>Đánh giá</TableHead>
                                <TableHead>Phiên tư vấn</TableHead>
                                <TableHead>Khách hàng</TableHead>
                                <TableHead>Trạng thái</TableHead>
                                <TableHead className="text-right">
                                    Hành động
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredCoaches.map((coach) => (
                                <TableRow key={coach.id}>
                                    <TableCell>
                                        <div className="flex items-center space-x-3">
                                            <Avatar className="h-8 w-8">
                                                <AvatarImage
                                                    src={coach.avatar}
                                                    alt={coach.name}
                                                />
                                                <AvatarFallback>
                                                    {coach.name
                                                        .split(" ")
                                                        .map((n) => n[0])
                                                        .join("")}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <div className="font-medium">
                                                    {coach.name}
                                                </div>
                                                <div className="text-sm text-gray-500">
                                                    {coach.email}
                                                </div>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        {coach.specialization}
                                    </TableCell>
                                    <TableCell>{coach.experience}</TableCell>
                                    <TableCell>
                                        {renderStars(coach.rating)}
                                    </TableCell>
                                    <TableCell>{coach.totalSessions}</TableCell>
                                    <TableCell>{coach.activeClients}</TableCell>
                                    <TableCell>
                                        {getStatusBadge(coach.status)}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button
                                                    variant="ghost"
                                                    className="h-8 w-8 p-0"
                                                >
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem>
                                                    Xem hồ sơ
                                                </DropdownMenuItem>
                                                <DropdownMenuItem>
                                                    Xem lịch làm việc
                                                </DropdownMenuItem>
                                                <DropdownMenuItem>
                                                    Chỉnh sửa thông tin
                                                </DropdownMenuItem>
                                                <DropdownMenuItem>
                                                    Gửi thông báo
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className="text-red-600">
                                                    Tạm dừng hoạt động
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
