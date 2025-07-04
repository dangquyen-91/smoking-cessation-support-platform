"use client";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress as ProgressBar } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
    TrendingUp,
    Calendar,
    DollarSign,
    Heart,
    Cigarette,
    Trophy,
    Plus,
} from "lucide-react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
} from "recharts";

export default function ProgressPage() {
    // Sample data for charts
    const dailyProgress = [
        { date: "1/1", cigarettes: 15, mood: 3 },
        { date: "1/2", cigarettes: 12, mood: 4 },
        { date: "1/3", cigarettes: 10, mood: 4 },
        { date: "1/4", cigarettes: 8, mood: 5 },
        { date: "1/5", cigarettes: 6, mood: 6 },
        { date: "1/6", cigarettes: 4, mood: 7 },
        { date: "1/7", cigarettes: 2, mood: 8 },
        { date: "1/8", cigarettes: 0, mood: 9 },
        { date: "1/9", cigarettes: 0, mood: 8 },
        { date: "1/10", cigarettes: 0, mood: 9 },
    ];

    const weeklyStats = [
        { week: "Tuần 1", saved: 210000, health: 20 },
        { week: "Tuần 2", saved: 420000, health: 35 },
        { week: "Tuần 3", saved: 630000, health: 50 },
        { week: "Tuần 4", saved: 840000, health: 65 },
        { week: "Tuần 5", saved: 1050000, health: 75 },
        { week: "Tuần 6", saved: 1260000, health: 85 },
    ];

    const currentStats = {
        daysSmokeFree: 45,
        moneySaved: 1350000,
        cigarettesAvoided: 675,
        healthImprovement: 85,
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">
                        Theo dõi tiến trình
                    </h1>
                    <p className="text-gray-600">
                        Ghi nhận và theo dõi hành trình cai thuốc của bạn
                    </p>
                </div>
                <Button className="bg-green-600 hover:bg-green-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Ghi nhận hôm nay
                </Button>
            </div>

            {/* Current Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Ngày không hút
                        </CardTitle>
                        <Calendar className="h-4 w-4 text-green-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-green-600">
                            {currentStats.daysSmokeFree}
                        </div>
                        <p className="text-xs text-gray-600">Kỷ lục cá nhân!</p>
                        <ProgressBar value={75} className="mt-2" />
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Tiền tiết kiệm
                        </CardTitle>
                        <DollarSign className="h-4 w-4 text-blue-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-blue-600">
                            {currentStats.moneySaved.toLocaleString()}đ
                        </div>
                        <p className="text-xs text-gray-600">
                            +30,000đ hôm nay
                        </p>
                        <ProgressBar value={85} className="mt-2" />
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Điếu thuốc tránh được
                        </CardTitle>
                        <Cigarette className="h-4 w-4 text-red-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-red-600">
                            {currentStats.cigarettesAvoided}
                        </div>
                        <p className="text-xs text-gray-600">
                            15 điếu/ngày trước đây
                        </p>
                        <ProgressBar value={90} className="mt-2" />
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Cải thiện sức khỏe
                        </CardTitle>
                        <Heart className="h-4 w-4 text-pink-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-pink-600">
                            {currentStats.healthImprovement}%
                        </div>
                        <p className="text-xs text-gray-600">
                            Dựa trên triệu chứng
                        </p>
                        <ProgressBar
                            value={currentStats.healthImprovement}
                            className="mt-2"
                        />
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Daily Progress Chart */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <TrendingUp className="h-5 w-5 text-blue-600" />
                            Tiến trình hàng ngày
                        </CardTitle>
                        <CardDescription>
                            Số điếu thuốc theo ngày
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={dailyProgress}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date" />
                                <YAxis />
                                <Tooltip />
                                <Line
                                    type="monotone"
                                    dataKey="cigarettes"
                                    stroke="#ef4444"
                                    strokeWidth={2}
                                    name="Số điếu thuốc"
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                {/* Weekly Stats */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <DollarSign className="h-5 w-5 text-green-600" />
                            Thống kê hàng tuần
                        </CardTitle>
                        <CardDescription>
                            Tiền tiết kiệm và cải thiện sức khỏe
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={weeklyStats}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="week" />
                                <YAxis />
                                <Tooltip />
                                <Bar
                                    dataKey="saved"
                                    fill="#3b82f6"
                                    name="Tiền tiết kiệm (VNĐ)"
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>

            {/* Health Improvements Timeline */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Heart className="h-5 w-5 text-red-600" />
                        Cải thiện sức khỏe theo thời gian
                    </CardTitle>
                    <CardDescription>
                        Những thay đổi tích cực trong cơ thể bạn
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="flex items-center gap-4 p-4 bg-green-50 rounded-lg">
                            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                                <Trophy className="h-6 w-6 text-green-600" />
                            </div>
                            <div className="flex-1">
                                <div className="font-medium text-green-800">
                                    20 phút đầu tiên
                                </div>
                                <div className="text-sm text-green-700">
                                    Nhịp tim và huyết áp trở về bình thường
                                </div>
                            </div>
                            <Badge className="bg-green-100 text-green-800">
                                Hoàn thành
                            </Badge>
                        </div>

                        <div className="flex items-center gap-4 p-4 bg-green-50 rounded-lg">
                            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                                <Trophy className="h-6 w-6 text-green-600" />
                            </div>
                            <div className="flex-1">
                                <div className="font-medium text-green-800">
                                    12 giờ
                                </div>
                                <div className="text-sm text-green-700">
                                    Lượng CO trong máu giảm xuống mức bình
                                    thường
                                </div>
                            </div>
                            <Badge className="bg-green-100 text-green-800">
                                Hoàn thành
                            </Badge>
                        </div>

                        <div className="flex items-center gap-4 p-4 bg-green-50 rounded-lg">
                            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                                <Trophy className="h-6 w-6 text-green-600" />
                            </div>
                            <div className="flex-1">
                                <div className="font-medium text-green-800">
                                    2-3 tuần
                                </div>
                                <div className="text-sm text-green-700">
                                    Tuần hoàn máu cải thiện, chức năng phổi tăng
                                    30%
                                </div>
                            </div>
                            <Badge className="bg-green-100 text-green-800">
                                Hoàn thành
                            </Badge>
                        </div>

                        <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-lg">
                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                <Heart className="h-6 w-6 text-blue-600" />
                            </div>
                            <div className="flex-1">
                                <div className="font-medium text-blue-800">
                                    1-9 tháng
                                </div>
                                <div className="text-sm text-blue-700">
                                    Giảm ho và khó thở, phổi bắt đầu tự làm sạch
                                </div>
                            </div>
                            <Badge className="bg-blue-100 text-blue-800">
                                Đang tiến hành
                            </Badge>
                        </div>

                        <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                                <Heart className="h-6 w-6 text-gray-600" />
                            </div>
                            <div className="flex-1">
                                <div className="font-medium text-gray-800">
                                    1 năm
                                </div>
                                <div className="text-sm text-gray-700">
                                    Nguy cơ bệnh tim giảm 50%
                                </div>
                            </div>
                            <Badge variant="secondary">Sắp tới</Badge>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
                <CardHeader>
                    <CardTitle>Hành động nhanh</CardTitle>
                    <CardDescription>
                        Ghi nhận tiến trình và cập nhật trạng thái
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Button className="h-20 flex flex-col items-center justify-center gap-2">
                            <Plus className="h-6 w-6" />
                            <span>Ghi nhận hôm nay</span>
                        </Button>
                        <Button
                            variant="outline"
                            className="h-20 flex flex-col items-center justify-center gap-2"
                        >
                            <Heart className="h-6 w-6" />
                            <span>Cập nhật sức khỏe</span>
                        </Button>
                        <Button
                            variant="outline"
                            className="h-20 flex flex-col items-center justify-center gap-2"
                        >
                            <TrendingUp className="h-6 w-6" />
                            <span>Xem báo cáo</span>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
