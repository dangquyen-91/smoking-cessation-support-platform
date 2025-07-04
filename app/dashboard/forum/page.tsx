"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
    MessageSquare,
    Plus,
    Pin,
    ThumbsUp,
    MessageCircle,
    Clock,
    Users,
} from "lucide-react";
import { useGetAllSocialPost } from "@/queries/scoial-post.query";

export default function Forum() {
    const forumTopics = [
        {
            id: 1,
            title: "Làm sao để vượt qua tuần đầu tiên cai thuốc?",
            author: "Minh Anh",
            authorAvatar: "/placeholder.svg?height=32&width=32",
            category: "Hỏi đáp",
            replies: 23,
            views: 156,
            lastReply: "2 giờ trước",
            isPinned: true,
            isHot: true,
        },
        {
            id: 2,
            title: "Chia sẻ: 6 tháng không hút thuốc, cảm giác tuyệt vời!",
            author: "Thanh Hoa",
            authorAvatar: "/placeholder.svg?height=32&width=32",
            category: "Chia sẻ",
            replies: 45,
            views: 289,
            lastReply: "4 giờ trước",
            isPinned: false,
            isHot: true,
        },
        {
            id: 3,
            title: "Có ai thử phương pháp thay thế nicotine chưa?",
            author: "Văn Đức",
            authorAvatar: "/placeholder.svg?height=32&width=32",
            category: "Thảo luận",
            replies: 12,
            views: 78,
            lastReply: "6 giờ trước",
            isPinned: false,
            isHot: false,
        },
        {
            id: 4,
            title: "Tập thể dục có giúp giảm cơn thèm thuốc không?",
            author: "Thu Hương",
            authorAvatar: "/placeholder.svg?height=32&width=32",
            category: "Hỏi đáp",
            replies: 18,
            views: 134,
            lastReply: "8 giờ trước",
            isPinned: false,
            isHot: false,
        },
        {
            id: 5,
            title: "Nhóm hỗ trợ cai thuốc tại Hà Nội",
            author: "Quang Minh",
            authorAvatar: "/placeholder.svg?height=32&width=32",
            category: "Gặp gỡ",
            replies: 7,
            views: 45,
            lastReply: "1 ngày trước",
            isPinned: false,
            isHot: false,
        },
    ];

    const categories = [
        { name: "Tất cả", count: 234, color: "bg-blue-100 text-blue-800" },
        { name: "Hỏi đáp", count: 89, color: "bg-green-100 text-green-800" },
        { name: "Chia sẻ", count: 67, color: "bg-purple-100 text-purple-800" },
        {
            name: "Thảo luận",
            count: 45,
            color: "bg-orange-100 text-orange-800",
        },
        { name: "Gặp gỡ", count: 23, color: "bg-pink-100 text-pink-800" },
        { name: "Hỗ trợ", count: 10, color: "bg-red-100 text-red-800" },
    ];

    const onlineUsers = [
        { name: "Minh Anh", status: "online" },
        { name: "Thanh Hoa", status: "online" },
        { name: "Văn Đức", status: "away" },
        { name: "Thu Hương", status: "online" },
    ];

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Forum</h1>
                    <p className="text-gray-600">
                        Thảo luận và hỗ trợ lẫn nhau trong hành trình cai thuốc
                    </p>
                </div>
                <Button className="bg-green-600 hover:bg-green-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Tạo chủ đề mới
                </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Main Forum Content */}
                <div className="lg:col-span-3 space-y-4">
                    {/* Categories */}
                    <Card>
                        <CardContent className="p-4">
                            <div className="flex flex-wrap gap-2">
                                {categories.map((category, index) => (
                                    <Badge
                                        key={index}
                                        className={`cursor-pointer ${category.color}`}
                                        variant="secondary"
                                    >
                                        {category.name} ({category.count})
                                    </Badge>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Forum Topics */}
                    <div className="space-y-2">
                        {forumTopics.map((topic) => (
                            <Card
                                key={topic.id}
                                className="hover:shadow-md transition-shadow cursor-pointer"
                            >
                                <CardContent className="p-4">
                                    <div className="flex items-start gap-3">
                                        <Avatar className="h-10 w-10">
                                            <AvatarImage
                                                src={
                                                    topic.authorAvatar ||
                                                    "/placeholder.svg"
                                                }
                                            />
                                            <AvatarFallback>
                                                {topic.author[0]}
                                            </AvatarFallback>
                                        </Avatar>

                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-1">
                                                {topic.isPinned && (
                                                    <Pin className="h-4 w-4 text-blue-600" />
                                                )}
                                                {topic.isHot && (
                                                    <Badge
                                                        variant="destructive"
                                                        className="text-xs"
                                                    >
                                                        Hot
                                                    </Badge>
                                                )}
                                                <Badge
                                                    variant="secondary"
                                                    className="text-xs"
                                                >
                                                    {topic.category}
                                                </Badge>
                                            </div>

                                            <h3 className="font-medium text-gray-900 hover:text-blue-600 mb-1">
                                                {topic.title}
                                            </h3>

                                            <div className="flex items-center gap-4 text-sm text-gray-600">
                                                <span>bởi {topic.author}</span>
                                                <span className="flex items-center gap-1">
                                                    <MessageCircle className="h-3 w-3" />
                                                    {topic.replies}
                                                </span>
                                                <span>
                                                    {topic.views} lượt xem
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <Clock className="h-3 w-3" />
                                                    {topic.lastReply}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="text-right">
                                            <Button variant="ghost" size="sm">
                                                <ThumbsUp className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {/* Pagination */}
                    <div className="flex justify-center">
                        <Button variant="outline">Xem thêm chủ đề</Button>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-4">
                    {/* Forum Stats */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <MessageSquare className="h-5 w-5 text-blue-600" />
                                Thống kê Forum
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div className="flex justify-between">
                                <span className="text-gray-600">
                                    Tổng chủ đề:
                                </span>
                                <span className="font-medium">234</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">
                                    Tổng bài viết:
                                </span>
                                <span className="font-medium">1,567</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">
                                    Thành viên:
                                </span>
                                <span className="font-medium">892</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">
                                    Đang online:
                                </span>
                                <span className="font-medium text-green-600">
                                    24
                                </span>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Online Users */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Users className="h-5 w-5 text-green-600" />
                                Đang online
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                {onlineUsers.map((user, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center gap-2"
                                    >
                                        <div
                                            className={`w-2 h-2 rounded-full ${
                                                user.status === "online"
                                                    ? "bg-green-500"
                                                    : "bg-yellow-500"
                                            }`}
                                        />
                                        <span className="text-sm">
                                            {user.name}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Forum Rules */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Quy tắc Forum</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2 text-sm text-gray-600">
                                <p>• Tôn trọng và hỗ trợ lẫn nhau</p>
                                <p>• Không spam hoặc quảng cáo</p>
                                <p>• Chia sẻ kinh nghiệm tích cực</p>
                                <p>• Bảo vệ thông tin cá nhân</p>
                                <p>• Báo cáo nội dung không phù hợp</p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Quick Actions */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Hành động nhanh</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <Button className="w-full" variant="outline">
                                <Plus className="h-4 w-4 mr-2" />
                                Tạo chủ đề
                            </Button>
                            <Button className="w-full" variant="outline">
                                Tìm kiếm
                            </Button>
                            <Button className="w-full" variant="outline">
                                Chủ đề của tôi
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
