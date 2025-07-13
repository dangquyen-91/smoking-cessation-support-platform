"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";
import { Check, Star, Sparkles, Crown, Shield } from "lucide-react";
import { useGetAllPackages } from "@/queries/package.query";
import { useCreateOrder } from "@/queries/order.query";
import utils from "@/utils/utils";
import { useToast } from "@/hooks/use-toast";

const PackagesList = () => {
    const [isLoading, setIsLoading] = useState(null);
    const { data: listPackages } = useGetAllPackages();

    const formatPrice = (price) => {
        return new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
        }).format(price);
    };

    const getPackageIcon = (type) => {
        switch (type) {
            case "BEGINNER":
                return <Shield className="h-5 w-5" />;
            case "INTERMEDIATE":
                return <Star className="h-5 w-5" />;
            case "ADVANCED":
                return <Crown className="h-5 w-5" />;
            default:
                return <Sparkles className="h-5 w-5" />;
        }
    };

    const getPackageColor = (type) => {
        switch (type) {
            case "BEGINNER":
                return "from-green-500 to-emerald-600";
            case "INTERMEDIATE":
                return "from-blue-500 to-cyan-600";
            case "ADVANCED":
                return "from-purple-500 to-pink-600";
            default:
                return "from-gray-500 to-gray-600";
        }
    };

    const getBadgeColor = (type) => {
        switch (type) {
            case "BEGINNER":
                return "bg-green-100 text-green-800 border-green-200";
            case "INTERMEDIATE":
                return "bg-blue-100 text-blue-800 border-blue-200";
            case "ADVANCED":
                return "bg-purple-100 text-purple-800 border-purple-200";
            default:
                return "bg-gray-100 text-gray-800 border-gray-200";
        }
    };

    const parseFeatures = (featuredString) => {
        try {
            return JSON.parse(featuredString);
        } catch (error) {
            return [];
        }
    };

    const { mutateAsync: createOrder } = useCreateOrder();
    const { toast } = useToast();
    const handleSubscribe = async (packageItem) => {
        setIsLoading(packageItem.id);

        const userId = utils.getUserId();
        const payload = {
            returnUrl: window.location.href + "/success",
            cancelUrl: window.location.href,
            amount: packageItem.salePrice,
            userId: userId,
            packageId: packageItem.id,
        };

        try {
            const [err, data] = await createOrder(payload);
            if (err) {
                toast({
                    title: "Lỗi đăng ký",
                    description: "Không thể tạo đơn hàng. Vui lòng thử lại.",
                    variant: "destructive",
                });
            }
            console.log("Order created successfully:", data);
            window.open(data.checkoutUrl, "_blank");
        } catch (error) {
            console.error("Subscription error:", error);
        } finally {
            setIsLoading(null);
        }
    };

    const isPopular = (type) => type === "INTERMEDIATE";

    return (
        <div className="max-w-7xl mx-auto p-6">
            {/* Header */}
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent mb-4">
                    Chọn Gói Cai Thuốc Phù Hợp
                </h1>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                    Bắt đầu hành trình khỏe mạnh của bạn với các gói hỗ trợ
                    chuyên nghiệp
                </p>
            </div>

            {/* Packages Grid */}
            <div className="grid md:grid-cols-3 gap-8 mb-8">
                {listPackages?.map((pkg) => (
                    <div key={pkg.id} className="relative">
                        {/* Popular Badge */}
                        {isPopular(pkg.packageType) && (
                            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
                                <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-1 text-sm font-semibold shadow-lg whitespace-nowrap">
                                    🔥 PHỔ BIẾN NHẤT
                                </Badge>
                            </div>
                        )}

                        <Card
                            className={`relative overflow-visible transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 ${
                                isPopular(pkg.packageType)
                                    ? "ring-2 ring-blue-500 shadow-lg scale-105 mt-4"
                                    : "hover:shadow-xl mt-4"
                            }`}
                        >
                            <CardHeader className="pb-4">
                                {/* Package Type Badge */}
                                <div className="flex justify-between items-start mb-4">
                                    <Badge
                                        className={`${getBadgeColor(
                                            pkg.packageType
                                        )} px-3 py-1 flex items-center gap-2`}
                                    >
                                        {getPackageIcon(pkg.packageType)}
                                        {pkg.packageType}
                                    </Badge>
                                    <div className="text-right">
                                        <div className="text-sm text-gray-500 line-through">
                                            {formatPrice(pkg.price)}
                                        </div>
                                    </div>
                                </div>

                                {/* Package Name & Description */}
                                <div className="space-y-2">
                                    <h3 className="text-2xl font-bold text-gray-900">
                                        {pkg.name}
                                    </h3>
                                    <p className="text-gray-600">
                                        {pkg.description}
                                    </p>
                                </div>

                                {/* Pricing */}
                                <div className="flex items-baseline gap-2 mt-4">
                                    <span
                                        className={`text-4xl font-bold bg-gradient-to-r ${getPackageColor(
                                            pkg.packageType
                                        )} bg-clip-text text-transparent`}
                                    >
                                        {formatPrice(pkg.salePrice)}
                                    </span>
                                    <span className="text-gray-500">
                                        /{pkg.totalDays} ngày
                                    </span>
                                </div>
                            </CardHeader>

                            <CardContent className="pb-6">
                                {/* Features List */}
                                <div className="space-y-3">
                                    <h4 className="font-semibold text-gray-900 mb-3">
                                        Tính năng bao gồm:
                                    </h4>
                                    {parseFeatures(pkg.featured).map(
                                        (feature, index) => (
                                            <div
                                                key={index}
                                                className="flex items-center gap-3"
                                            >
                                                <div
                                                    className={`rounded-full p-1 bg-gradient-to-r ${getPackageColor(
                                                        pkg.packageType
                                                    )}`}
                                                >
                                                    <Check className="h-3 w-3 text-white" />
                                                </div>
                                                <span className="text-gray-700">
                                                    {feature}
                                                </span>
                                            </div>
                                        )
                                    )}
                                </div>

                                {/* Duration Info */}
                                <div className="mt-6 p-3 bg-gray-50 rounded-lg">
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-gray-600">
                                            Thời gian hỗ trợ:
                                        </span>
                                        <span className="font-semibold text-gray-900">
                                            {pkg.totalDays} ngày
                                        </span>
                                    </div>
                                </div>
                            </CardContent>

                            <CardFooter className="pt-0">
                                <Button
                                    onClick={() => handleSubscribe(pkg)}
                                    disabled={isLoading === pkg.id}
                                    className={`w-full py-3 text-lg font-semibold transition-all duration-300 bg-gradient-to-r ${getPackageColor(
                                        pkg.packageType
                                    )} hover:shadow-lg hover:scale-105 disabled:opacity-50 disabled:scale-100`}
                                >
                                    {isLoading === pkg.id ? (
                                        <div className="flex items-center gap-2">
                                            <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                                            Đang xử lý...
                                        </div>
                                    ) : (
                                        "Đăng Ký Ngay"
                                    )}
                                </Button>
                            </CardFooter>
                        </Card>
                    </div>
                ))}
            </div>

            {/* Additional Info */}
            <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl p-8 text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    💯 Cam Kết Chất Lượng
                </h3>
                <div className="grid md:grid-cols-3 gap-6 text-center">
                    <div className="space-y-2">
                        <div className="text-3xl">🏆</div>
                        <h4 className="font-semibold">Hiệu Quả Cao</h4>
                        <p className="text-sm text-gray-600">
                            Phương pháp được chứng minh khoa học
                        </p>
                    </div>
                    <div className="space-y-2">
                        <div className="text-3xl">🔒</div>
                        <h4 className="font-semibold">Bảo Mật Tuyệt Đối</h4>
                        <p className="text-sm text-gray-600">
                            Thông tin cá nhân được bảo vệ 100%
                        </p>
                    </div>
                    <div className="space-y-2">
                        <div className="text-3xl">💬</div>
                        <h4 className="font-semibold">Hỗ Trợ 24/7</h4>
                        <p className="text-sm text-gray-600">
                            Đội ngũ chuyên gia luôn sẵn sàng hỗ trợ
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PackagesList;
