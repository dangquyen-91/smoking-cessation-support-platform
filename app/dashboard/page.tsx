"use client";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    TrendingUp,
    Target,
    Heart,
    DollarSign,
    Clock,
    Award,
    Users,
    MessageSquare,
    BookOpen,
    CigaretteOff,
    TrendingDown,
    Gift,
    Sparkles,
    Share,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useGetUserProgress, useGetUserSavingData } from "@/queries/user.query";
import SmokingProgressChart from "@/components/dashboard/smoking-progress-chart";
import {
    useCreateUserAchievement,
    useGetAllAchievements,
    useGetUserAchievements,
} from "@/queries/achievements.query";
import confetti from "canvas-confetti";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
    const [userData, setUserData] = useState<any>(null);
    const { data: savingData } = useGetUserSavingData();
    const { data: userProgress } = useGetUserProgress();
    const { data: listAchievements } = useGetAllAchievements();
    const { data: listUserAchievements } = useGetUserAchievements();

    const [stats, setStats] = useState({
        smokeFreedays: 0,
        moneySaved: 0,
        cigarettesAvoided: 0,
        healthImprovement: 0,
    });

    const [newAchievements, setNewAchievements] = useState<any[]>([]);
    const [showAchievementModal, setShowAchievementModal] = useState(false);
    const [currentAchievement, setCurrentAchievement] = useState<any>(null);
    const [isClaimingAchievement, setIsClaimingAchievement] = useState(false);

    useEffect(() => {
        const savedUserData = localStorage.getItem("userData");
        if (savedUserData) {
            setUserData(JSON.parse(savedUserData));
        }
    }, []);

    useEffect(() => {
        if (savingData) {
            setStats({
                smokeFreedays: savingData.hoursSaved || 0,
                moneySaved: savingData.moneySaved || 0,
                cigarettesAvoided: savingData.cigarettesReduced || 0, // Assuming this should be cigarettesReduced
                healthImprovement: savingData.minutesSaved || 0,
            });
        }
    }, [savingData]);

    // Check for new achievements
    useEffect(() => {
        if (listAchievements && listUserAchievements && savingData) {
            checkForNewAchievements();
        }
    }, [listAchievements, listUserAchievements, savingData]);

    const checkForNewAchievements = () => {
        if (!listAchievements || !savingData) return;

        const earnedAchievementIds =
            listUserAchievements?.map((ua) => ua.achievement.id) || [];
        const eligibleAchievements: any[] = [];

        listAchievements.forEach((achievement: any) => {
            // Skip if already earned
            if (earnedAchievementIds.includes(achievement.id)) return;

            let isEligible = false;

            switch (achievement.type) {
                case "MONEY_SAVED":
                    isEligible =
                        savingData.moneySaved >= achievement.targetValue;
                    break;
                case "STREAK":
                    isEligible =
                        savingData.cigarettesReduced >= achievement.targetValue;
                    break;
                case "CIGARETTES_AVOIDED":
                    isEligible =
                        savingData.cigarettesReduced >= achievement.targetValue;
                    break;
                default:
                    break;
            }

            if (isEligible) {
                eligibleAchievements.push(achievement);
            }
        });

        if (eligibleAchievements.length > 0) {
            setNewAchievements(eligibleAchievements);
            setCurrentAchievement(eligibleAchievements[0]);
            setShowAchievementModal(true);
        }
    };

    const triggerConfetti = () => {
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
        });
    };

    const { mutateAsync: createUserAchievement } = useCreateUserAchievement();

    const claimAchievement = async (achievementId: number) => {
        setIsClaimingAchievement(true);

        try {
            // Replace with your actual API call
            // const response = await fetch("/api/achievements/claim", {
            //     method: "POST",
            //     headers: {
            //         "Content-Type": "application/json",
            //     },
            //     body: JSON.stringify({ achievementId }),
            // });

            await createUserAchievement({
                userId: userData?.id,
                achievementId: achievementId,
            });
            triggerConfetti();

            // Remove claimed achievement from new achievements
            const remainingAchievements = newAchievements.filter(
                (a) => a.id !== achievementId
            );
            setNewAchievements(remainingAchievements);

            if (remainingAchievements.length > 0) {
                setCurrentAchievement(remainingAchievements[0]);
            } else {
                setShowAchievementModal(false);
                setCurrentAchievement(null);
            }
        } catch (error) {
            console.error("Error claiming achievement:", error);
        } finally {
            setIsClaimingAchievement(false);
        }
    };

    const skipAchievement = () => {
        const remainingAchievements = newAchievements.filter(
            (a) => a.id !== currentAchievement?.id
        );
        setNewAchievements(remainingAchievements);

        if (remainingAchievements.length > 0) {
            setCurrentAchievement(remainingAchievements[0]);
        } else {
            setShowAchievementModal(false);
            setCurrentAchievement(null);
        }
    };

    const quickActions = [
        {
            title: "Cập nhật tình trạng",
            icon: Heart,
            action: "/dashboard/smoking-status",
            color: "bg-red-500",
        },
        {
            title: "Xem kế hoạch",
            icon: Target,
            action: "/dashboard/plan-calendar",
            color: "bg-blue-500",
        },

        {
            title: "Tham gia cộng đồng",
            icon: Users,
            action: "/dashboard/community",
            color: "bg-purple-500",
        },
    ];

    const getLevelColor = (level: string) => {
        switch (level) {
            case "BRONZE":
                return "text-amber-600";
            case "SILVER":
                return "text-gray-500";
            case "GOLD":
                return "text-yellow-500";
            default:
                return "text-gray-600";
        }
    };

    const getLevelBadgeColor = (level: string) => {
        switch (level) {
            case "BRONZE":
                return "bg-amber-100 text-amber-800";
            case "SILVER":
                return "bg-gray-100 text-gray-800";
            case "GOLD":
                return "bg-yellow-100 text-yellow-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    const router = useRouter();

    return (
        <div className="space-y-6">
            {/* Achievement Notification Modal */}
            <Dialog
                open={showAchievementModal}
                onOpenChange={setShowAchievementModal}
            >
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2 text-center">
                            <Gift className="h-6 w-6 text-yellow-500" />
                            Chúc mừng! Bạn có huy hiệu mới!
                        </DialogTitle>
                        <DialogDescription className="text-center">
                            Bạn đã đạt được một thành tích mới trong hành trình
                            cai thuốc
                        </DialogDescription>
                    </DialogHeader>

                    {currentAchievement && (
                        <div className="space-y-4">
                            <div className="text-center">
                                <div className="mx-auto w-20 h-20 mb-4 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
                                    <img
                                        src={
                                            currentAchievement.badgeIcon ||
                                            "/placeholder.svg"
                                        }
                                        alt={currentAchievement.name}
                                        className="w-12 h-12 rounded-full object-cover"
                                    />
                                </div>
                                <h3 className="text-xl font-bold mb-2">
                                    {currentAchievement.name}
                                </h3>
                                <p className="text-gray-600 mb-2">
                                    {currentAchievement.description}
                                </p>
                                <Badge
                                    className={getLevelBadgeColor(
                                        currentAchievement.level
                                    )}
                                >
                                    {currentAchievement.level}
                                </Badge>
                            </div>

                            <div className="flex gap-2">
                                <Button
                                    onClick={() =>
                                        claimAchievement(currentAchievement.id)
                                    }
                                    disabled={isClaimingAchievement}
                                    className="flex-1 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600"
                                >
                                    {isClaimingAchievement ? (
                                        <>
                                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                            Đang nhận...
                                        </>
                                    ) : (
                                        <>
                                            <Sparkles className="h-4 w-4 mr-2" />
                                            Nhận ngay
                                        </>
                                    )}
                                </Button>
                                <Button
                                    variant="outline"
                                    onClick={skipAchievement}
                                    disabled={isClaimingAchievement}
                                >
                                    Để sau
                                </Button>
                            </div>

                            {newAchievements.length > 1 && (
                                <p className="text-sm text-center text-gray-500">
                                    Còn {newAchievements.length - 1} huy hiệu
                                    khác đang chờ bạn!
                                </p>
                            )}
                        </div>
                    )}
                </DialogContent>
            </Dialog>

            {/* Welcome Section */}
            <div className="bg-gradient-to-r from-green-500 to-blue-600 text-white p-6 rounded-lg">
                <h1 className="text-3xl font-bold mb-2">
                    Chào mừng trở lại, {userData?.fullName || "Bạn"}!
                </h1>
                <p className="text-green-100">
                    Hôm nay là ngày thứ {stats.smokeFreedays} bạn không hút
                    thuốc. Tuyệt vời!
                </p>
                {newAchievements.length > 0 && (
                    <div className="mt-4 p-3 bg-white/20 rounded-lg">
                        <p className="flex items-center gap-2 text-yellow-200">
                            <Gift className="h-5 w-5" />
                            Bạn có {newAchievements.length} huy hiệu mới chưa
                            nhận!
                        </p>
                    </div>
                )}
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">
                                    Số điếu thuốc đã tránh
                                </p>
                                <p className="text-3xl font-bold text-green-600">
                                    {stats.cigarettesAvoided}
                                </p>
                            </div>
                            <CigaretteOff className="h-8 w-8 text-green-600" />
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">
                                    Tiền tiết kiệm
                                </p>
                                <p className="text-3xl font-bold text-blue-600">
                                    {stats.moneySaved.toLocaleString()}đ
                                </p>
                            </div>
                            <DollarSign className="h-8 w-8 text-blue-600" />
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">
                                    Số giờ tiết kiệm
                                </p>
                                <p className="text-3xl font-bold text-purple-600">
                                    {stats.smokeFreedays} ngày
                                </p>
                            </div>
                            <Clock className="h-8 w-8 text-purple-600" />
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">
                                    Số phút tiết kiệm
                                </p>
                                <p className="text-3xl font-bold text-red-600">
                                    {stats.healthImprovement} phút
                                </p>
                            </div>
                            <Clock className="h-8 w-8 text-red-600" />
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Progress Chart */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <TrendingDown className="h-5 w-5 text-blue-600" />
                            Tiến trình hàng ngày
                        </CardTitle>
                        <CardDescription>
                            Số điếu thuốc theo ngày
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <SmokingProgressChart data={userProgress || []} />
                    </CardContent>
                </Card>

                {/* Daily Progress Section */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle className="flex items-center gap-2">
                                    <Award className="h-5 w-5" />
                                    Thành tích
                                </CardTitle>
                                <CardDescription>
                                    Những cột mốc bạn đã đạt được
                                </CardDescription>
                            </div>
                            <div>
                                <Button
                                    variant="outline"
                                    onClick={() =>
                                        router.push("/dashboard/achievements")
                                    }
                                >
                                    <Share className="h-4 w-4 mr-2" />
                                    Chia sẻ ngay
                                </Button>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {listUserAchievements?.map(
                                (userAchievement: any, index: number) => (
                                    <div
                                        key={index}
                                        className="flex items-center gap-3 p-3 bg-green-50 rounded-lg"
                                    >
                                        <img
                                            src={
                                                userAchievement.achievement
                                                    .badgeIcon ||
                                                "/placeholder.svg"
                                            }
                                            alt={
                                                userAchievement.achievement.name
                                            }
                                            className="w-10 h-10 rounded-full object-cover"
                                        />
                                        <div className="flex-1">
                                            <p className="font-medium text-green-700">
                                                {
                                                    userAchievement.achievement
                                                        .name
                                                }
                                            </p>
                                            <p className="text-sm text-gray-600">
                                                {
                                                    userAchievement.achievement
                                                        .description
                                                }
                                            </p>
                                        </div>
                                        <Badge
                                            className={getLevelBadgeColor(
                                                userAchievement.achievement
                                                    .level
                                            )}
                                        >
                                            {userAchievement.achievement.level}
                                        </Badge>
                                    </div>
                                )
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Quick Actions */}
                <Card>
                    <CardHeader>
                        <CardTitle>Hành động nhanh</CardTitle>
                        <CardDescription>
                            Các tính năng thường dùng
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 gap-4">
                            {quickActions.map((action, index) => {
                                const Icon = action.icon;
                                return (
                                    <Button
                                        key={index}
                                        variant="outline"
                                        className="h-20 flex-col gap-2 bg-transparent"
                                        onClick={() =>
                                            router.push(action.action)
                                        }
                                    >
                                        <div
                                            className={`w-8 h-8 rounded-full ${action.color} flex items-center justify-center`}
                                        >
                                            <Icon className="h-4 w-4 text-white" />
                                        </div>
                                        <span className="text-sm">
                                            {action.title}
                                        </span>
                                    </Button>
                                );
                            })}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Clock className="h-5 w-5" />
                            Hoạt động gần đây
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                                <Heart className="h-5 w-5 text-green-600" />
                                <div>
                                    <p className="font-medium">
                                        Cập nhật tình trạng sức khỏe
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        2 giờ trước
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                                <MessageSquare className="h-5 w-5 text-blue-600" />
                                <div>
                                    <p className="font-medium">
                                        Tham gia thảo luận cộng đồng
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        5 giờ trước
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                                <BookOpen className="h-5 w-5 text-purple-600" />
                                <div>
                                    <p className="font-medium">
                                        Đọc bài viết về cai thuốc
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        1 ngày trước
                                    </p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Recent Activity */}
        </div>
    );
}
