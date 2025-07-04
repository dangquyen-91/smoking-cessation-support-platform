"use client";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
    Video,
    Phone,
    Send,
    Star,
    Calendar,
    MessageCircle,
} from "lucide-react";
import { useState } from "react";

export default function CoachChat() {
    const [message, setMessage] = useState("");

    const coaches = [
        {
            id: 1,
            name: "Coach Minh",
            avatar: "/placeholder.svg?height=40&width=40",
            specialty: "Tâm lý học",
            rating: 4.9,
            experience: "8 năm",
            status: "online",
            lastSeen: "Đang hoạt động",
            price: "200,000đ/buổi",
        },
        {
            id: 2,
            name: "Coach Lan",
            avatar: "/placeholder.svg?height=40&width=40",
            specialty: "Y học",
            rating: 4.8,
            experience: "12 năm",
            status: "away",
            lastSeen: "5 phút trước",
            price: "250,000đ/buổi",
        },
        {
            id: 3,
            name: "Coach Hùng",
            avatar: "/placeholder.svg?height=40&width=40",
            specialty: "Dinh dưỡng",
            rating: 4.7,
            experience: "6 năm",
            status: "offline",
            lastSeen: "2 giờ trước",
            price: "180,000đ/buổi",
        },
    ];

    const chatHistory = [
        {
            id: 1,
            sender: "Coach Minh",
            message:
                "Chào bạn! Tôi thấy bạn đã cai thuốc được 45 ngày rồi, thật tuyệt vời!",
            time: "10:30",
            isCoach: true,
        },
        {
            id: 2,
            sender: "Bạn",
            message: "Cảm ơn coach! Nhưng hôm nay tôi cảm thấy rất thèm thuốc.",
            time: "10:32",
            isCoach: false,
        },
        {
            id: 3,
            sender: "Coach Minh",
            message:
                "Điều đó hoàn toàn bình thường. Hãy thử kỹ thuật thở sâu mà chúng ta đã luyện tập nhé. Bạn có thể làm theo không?",
            time: "10:33",
            isCoach: true,
        },
        {
            id: 4,
            sender: "Bạn",
            message: "Vâng, tôi sẽ thử ngay. Cảm ơn coach rất nhiều!",
            time: "10:35",
            isCoach: false,
        },
    ];

    const upcomingSessions = [
        {
            coach: "Coach Minh",
            date: "Hôm nay",
            time: "14:00 - 15:00",
            type: "Video Call",
            status: "confirmed",
        },
        {
            coach: "Coach Lan",
            date: "Ngày mai",
            time: "10:00 - 11:00",
            type: "Chat",
            status: "pending",
        },
    ];

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">
                    Chat & Video Call với Coach
                </h1>
                <p className="text-gray-600">
                    Tương tác trực tiếp với huấn luyện viên chuyên nghiệp
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Coach List */}
                <div className="lg:col-span-1 space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Danh sách Coach</CardTitle>
                            <CardDescription>
                                Chọn coach phù hợp với bạn
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {coaches.map((coach) => (
                                <div
                                    key={coach.id}
                                    className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
                                >
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="relative">
                                            <Avatar>
                                                <AvatarImage
                                                    src={
                                                        coach.avatar ||
                                                        "/placeholder.svg"
                                                    }
                                                />
                                                <AvatarFallback>
                                                    {coach.name[0]}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div
                                                className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${
                                                    coach.status === "online"
                                                        ? "bg-green-500"
                                                        : coach.status ===
                                                          "away"
                                                        ? "bg-yellow-500"
                                                        : "bg-gray-400"
                                                }`}
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <div className="font-medium">
                                                {coach.name}
                                            </div>
                                            <div className="text-xs text-gray-600">
                                                {coach.specialty}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-1 text-xs text-gray-600">
                                        <div className="flex items-center gap-1">
                                            <Star className="h-3 w-3 text-yellow-500" />
                                            {coach.rating} • {coach.experience}
                                        </div>
                                        <div>{coach.lastSeen}</div>
                                        <div className="font-medium text-green-600">
                                            {coach.price}
                                        </div>
                                    </div>

                                    <div className="flex gap-1 mt-2">
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            className="flex-1"
                                        >
                                            <MessageCircle className="h-3 w-3" />
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            className="flex-1"
                                        >
                                            <Video className="h-3 w-3" />
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    {/* Upcoming Sessions */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Calendar className="h-5 w-5 text-blue-600" />
                                Lịch hẹn
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {upcomingSessions.map((session, index) => (
                                <div
                                    key={index}
                                    className="p-3 bg-blue-50 rounded-lg"
                                >
                                    <div className="font-medium text-blue-800">
                                        {session.coach}
                                    </div>
                                    <div className="text-sm text-blue-700">
                                        {session.date}
                                    </div>
                                    <div className="text-sm text-blue-700">
                                        {session.time}
                                    </div>
                                    <div className="flex items-center justify-between mt-2">
                                        <Badge variant="secondary">
                                            {session.type}
                                        </Badge>
                                        <Badge
                                            variant={
                                                session.status === "confirmed"
                                                    ? "default"
                                                    : "secondary"
                                            }
                                        >
                                            {session.status === "confirmed"
                                                ? "Đã xác nhận"
                                                : "Chờ xác nhận"}
                                        </Badge>
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>

                {/* Chat Interface */}
                <div className="lg:col-span-3">
                    <Card className="h-[600px] flex flex-col">
                        <CardHeader className="flex-shrink-0">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <Avatar>
                                        <AvatarImage src="/placeholder.svg?height=40&width=40" />
                                        <AvatarFallback>CM</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <CardTitle>Coach Minh</CardTitle>
                                        <CardDescription>
                                            Đang hoạt động
                                        </CardDescription>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <Button variant="outline" size="sm">
                                        <Phone className="h-4 w-4" />
                                    </Button>
                                    <Button variant="outline" size="sm">
                                        <Video className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </CardHeader>

                        <CardContent className="flex-1 flex flex-col p-0">
                            {/* Chat Messages */}
                            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                                {chatHistory.map((chat) => (
                                    <div
                                        key={chat.id}
                                        className={`flex ${
                                            chat.isCoach
                                                ? "justify-start"
                                                : "justify-end"
                                        }`}
                                    >
                                        <div
                                            className={`max-w-[70%] p-3 rounded-lg ${
                                                chat.isCoach
                                                    ? "bg-gray-100 text-gray-800"
                                                    : "bg-blue-600 text-white"
                                            }`}
                                        >
                                            <div className="text-sm">
                                                {chat.message}
                                            </div>
                                            <div
                                                className={`text-xs mt-1 ${
                                                    chat.isCoach
                                                        ? "text-gray-500"
                                                        : "text-blue-100"
                                                }`}
                                            >
                                                {chat.time}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Message Input */}
                            <div className="border-t p-4">
                                <div className="flex gap-2">
                                    <Input
                                        placeholder="Nhập tin nhắn..."
                                        value={message}
                                        onChange={(e) =>
                                            setMessage(e.target.value)
                                        }
                                        onKeyPress={(e) => {
                                            if (e.key === "Enter") {
                                                // Send message logic
                                                setMessage("");
                                            }
                                        }}
                                    />
                                    <Button>
                                        <Send className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Coach Rating */}
            <Card>
                <CardHeader>
                    <CardTitle>Đánh giá Coach</CardTitle>
                    <CardDescription>
                        Chia sẻ trải nghiệm của bạn để giúp cải thiện dịch vụ
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h4 className="font-medium mb-3">
                                Đánh giá gần đây
                            </h4>
                            <div className="space-y-3">
                                <div className="p-3 bg-green-50 rounded-lg">
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="flex">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <Star
                                                    key={star}
                                                    className="h-4 w-4 text-yellow-500 fill-current"
                                                />
                                            ))}
                                        </div>
                                        <span className="text-sm text-gray-600">
                                            Coach Minh
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-700">
                                        "Coach Minh rất tận tâm và hiểu biết.
                                        Những lời khuyên rất hữu ích!"
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h4 className="font-medium mb-3">Đánh giá mới</h4>
                            <div className="space-y-3">
                                <div className="flex items-center gap-2">
                                    <span className="text-sm">
                                        Chất lượng tư vấn:
                                    </span>
                                    <div className="flex">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <Star
                                                key={star}
                                                className="h-4 w-4 text-gray-300 hover:text-yellow-500 cursor-pointer"
                                            />
                                        ))}
                                    </div>
                                </div>
                                <Button className="w-full">Gửi đánh giá</Button>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
