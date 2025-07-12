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
    Crown,
    Users,
} from "lucide-react";
import { useState } from "react";
import { useGetUserById } from "@/queries/user.query";
import utils from "@/utils/utils";
import { useGetCoach } from "@/queries/coach.query";
import { useCreateChatroom } from "@/queries/chatroom.query";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

export default function CoachChat() {
    const userId = utils.getUserId();
    const { data: userData } = useGetUserById(userId);
    const { data: listCoachs } = useGetCoach();
    const { mutateAsync: createChatRoom } = useCreateChatroom();
    // Kiểm tra user có gói INTERMEDIATE active không
    const hasIntermediatePackage = userData?.userPackages?.some(
        (pkg) =>
            pkg.packageModel.packageType === "INTERMEDIATE" &&
            pkg.active === true
    );
    const { toast } = useToast();
    const router = useRouter();
    const handleChatWithCoach = async (coachId) => {
        const payload = {
            name: "Phòng tư vấn với huấn luyện viên",
            description: "Phòng chat để trao đổi với huấn luyện viên",
            createdById: userId,
            participantId: coachId,
        };

        const [err, data] = await createChatRoom(payload);
        if (err) {
            console.error("Error creating chat room:", err);
            toast({
                title: "Lỗi tạo phòng chat",
                description: "Không thể tạo phòng chat. Vui lòng thử lại.",
                variant: "destructive",
            });
            return;
        }
        router.push(`/dashboard/chat-room/${data.id}`);
    };

    const handleUpgradePackage = () => {
        // Logic để nâng cấp gói
        console.log("Redirecting to upgrade package");
        // Có thể navigate đến trang upgrade package
    };

    if (!listCoachs || !userData) {
        return (
            <div className="flex items-center justify-center p-8">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Đang tải thông tin coach...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-6 space-y-6">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    Đội ngũ huấn luyện viên
                </h1>
                <p className="text-gray-600">
                    Kết nối với các chuyên gia để được hỗ trợ cai thuốc lá hiệu
                    quả
                </p>
            </div>

            {/* Hiển thị trạng thái gói của user */}
            <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
                <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                        <Crown className="h-5 w-5 text-blue-600" />
                        <div>
                            <p className="font-medium text-gray-900">
                                Trạng thái gói của bạn:
                                <Badge
                                    variant={
                                        hasIntermediatePackage
                                            ? "default"
                                            : "secondary"
                                    }
                                    className="ml-2"
                                >
                                    {hasIntermediatePackage
                                        ? "INTERMEDIATE"
                                        : "BEGINNER"}
                                </Badge>
                            </p>
                            <p className="text-sm text-gray-600">
                                {hasIntermediatePackage
                                    ? "Bạn có thể chat trực tiếp với coach"
                                    : "Nâng cấp lên gói INTERMEDIATE để chat với coach"}
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Danh sách coach */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {listCoachs.map((coach) => (
                    <Card
                        key={coach.id}
                        className="hover:shadow-lg transition-shadow duration-300"
                    >
                        <CardHeader className="text-center">
                            <Avatar className="w-20 h-20 mx-auto mb-4">
                                <AvatarImage
                                    src={
                                        coach.profileImage ||
                                        "https://static.vecteezy.com/system/resources/previews/000/439/863/non_2x/vector-users-icon.jpg"
                                    }
                                    alt={coach.fullName}
                                />
                                <AvatarFallback>
                                    {coach.fullName?.charAt(0) ||
                                        coach.username?.charAt(0)}
                                </AvatarFallback>
                            </Avatar>
                            <CardTitle className="text-xl">
                                {coach.fullName}
                            </CardTitle>
                            <CardDescription className="flex items-center justify-center space-x-1">
                                <Badge
                                    variant="outline"
                                    className="text-green-600 border-green-600"
                                >
                                    <Users className="w-3 h-3 mr-1" />
                                    Huấn luyện viên
                                </Badge>
                            </CardDescription>
                        </CardHeader>

                        <CardContent className="space-y-4">
                            <div className="space-y-2 text-sm text-gray-600">
                                <div className="flex items-center space-x-2">
                                    <Phone className="w-4 h-4" />
                                    <span>{coach.phone}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Calendar className="w-4 h-4" />
                                    <span>Tuổi: {coach.age}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Star className="w-4 h-4 text-yellow-500" />
                                    <span>Chuyên gia cai thuốc lá</span>
                                </div>
                            </div>

                            <div className="pt-4 space-y-2">
                                {hasIntermediatePackage ? (
                                    <>
                                        <Button
                                            onClick={() =>
                                                handleChatWithCoach(coach.id)
                                            }
                                            className="w-full bg-blue-600 hover:bg-blue-700"
                                        >
                                            <MessageCircle className="w-4 h-4 mr-2" />
                                            Chat ngay
                                        </Button>
                                        <div className="flex space-x-2">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="flex-1"
                                            >
                                                <Video className="w-4 h-4 mr-1" />
                                                Video call
                                            </Button>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="flex-1"
                                            >
                                                <Phone className="w-4 h-4 mr-1" />
                                                Gọi điện
                                            </Button>
                                        </div>
                                    </>
                                ) : (
                                    <Button
                                        onClick={handleUpgradePackage}
                                        variant="outline"
                                        className="w-full border-orange-500 text-orange-600 hover:bg-orange-50"
                                    >
                                        <Crown className="w-4 h-4 mr-2" />
                                        Nâng cấp gói để chat
                                    </Button>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {listCoachs.length === 0 && (
                <Card className="text-center p-8">
                    <CardContent>
                        <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                            Chưa có huấn luyện viên
                        </h3>
                        <p className="text-gray-600">
                            Hiện tại chưa có huấn luyện viên nào trong hệ thống.
                        </p>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
