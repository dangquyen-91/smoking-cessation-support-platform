"use client";

import type React from "react";

import { useState } from "react";
import { useGetRevenue } from "@/queries/coach.query";
import { useRequestWithdraw } from "@/queries/coach.query"; // Import useRequestWithdraw
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    DollarSign,
    MessageCircle,
    Users,
    Wallet,
    TrendingUp,
    Download,
    CreditCard,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface WithdrawFormData {
    bankName: string;
    bankAccount: string;
    bankAccountName: string;
}

export default function CoachIncomePage() {
    const { data, isPending } = useGetRevenue();
    const { mutateAsync: requestWithdraw } = useRequestWithdraw();
    const { toast } = useToast();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState<WithdrawFormData>({
        bankName: "",
        bankAccount: "",
        bankAccountName: "",
    });

    console.log("Revenue Data:", data);

    if (isPending) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                    <p className="text-muted-foreground">Đang tải dữ liệu...</p>
                </div>
            </div>
        );
    }

    const handleWithdraw = () => {
        setIsModalOpen(true);
    };

    const handleSubmitWithdraw = async (e: React.FormEvent) => {
        e.preventDefault();

        if (
            !formData.bankName ||
            !formData.bankAccount ||
            !formData.bankAccountName
        ) {
            toast({
                title: "Lỗi",
                description: "Vui lòng điền đầy đủ thông tin ngân hàng",
                variant: "destructive",
            });
            return;
        }

        setIsSubmitting(true);

        try {
            const payload = {
                id: 0,
                amount: data?.rewardAmount || 0,
                bankName: formData.bankName,
                bankAccount: formData.bankAccount,
                bankAccountName: formData.bankAccountName,
            };

            await requestWithdraw(payload);

            toast({
                title: "Thành công",
                description:
                    "Yêu cầu rút tiền đã được gửi. Chúng tôi sẽ xử lý trong vòng 1-3 ngày làm việc.",
            });

            setIsModalOpen(false);
            setFormData({
                bankName: "",
                bankAccount: "",
                bankAccountName: "",
            });
        } catch (error) {
            toast({
                title: "Lỗi",
                description:
                    "Có lỗi xảy ra khi gửi yêu cầu rút tiền. Vui lòng thử lại.",
                variant: "destructive",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
        }).format(amount);
    };

    const popularBanks = [
        "Vietcombank",
        "BIDV",
        "VietinBank",
        "Agribank",
        "Techcombank",
        "MB Bank",
        "ACB",
        "VPBank",
        "TPBank",
        "Sacombank",
        "HDBank",
        "OCB",
    ];

    return (
        <div className="container mx-auto p-6 max-w-4xl">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-foreground mb-2">
                    Thu nhập của huấn luyện viên
                </h1>
                <p className="text-muted-foreground">
                    Theo dõi thu nhập và hoạt động hỗ trợ người dùng cai thuốc
                    của bạn
                </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {/* Total Revenue */}
                <Card className="relative overflow-hidden">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Tổng thu nhập
                        </CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-green-600">
                            {data ? formatCurrency(data.rewardAmount) : "0 ₫"}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                            Từ hoạt động hỗ trợ người dùng
                        </p>
                    </CardContent>
                </Card>

                {/* Total Messages */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Tin nhắn tư vấn
                        </CardTitle>
                        <MessageCircle className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {data?.totalMessages || 0}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                            Tin nhắn đã gửi
                        </p>
                    </CardContent>
                </Card>

                {/* Supported Users */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Người dùng hỗ trợ
                        </CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {data?.supportedUsers || 0}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                            Người dùng đang hỗ trợ
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Revenue Summary Card */}
            <Card className="mb-8">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <TrendingUp className="h-5 w-5" />
                        Tổng quan thu nhập
                    </CardTitle>
                    <CardDescription>
                        Chi tiết về hoạt động và thu nhập của bạn
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">
                            ID Huấn luyện viên:
                        </span>
                        <Badge variant="secondary">#{data?.userId}</Badge>
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">
                            Số tin nhắn tư vấn:
                        </span>
                        <span className="font-semibold">
                            {data?.totalMessages || 0} tin nhắn
                        </span>
                    </div>

                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">
                            Người dùng đang hỗ trợ:
                        </span>
                        <span className="font-semibold">
                            {data?.supportedUsers || 0} người
                        </span>
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between text-lg">
                        <span className="font-semibold">Tổng thu nhập:</span>
                        <span className="font-bold text-green-600">
                            {data ? formatCurrency(data.rewardAmount) : "0 ₫"}
                        </span>
                    </div>
                </CardContent>
            </Card>

            {/* Withdrawal Section */}
            <Card className="border-2 border-primary/20">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Wallet className="h-5 w-5" />
                        Rút tiền
                    </CardTitle>
                    <CardDescription>
                        Rút thu nhập của bạn về tài khoản ngân hàng
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div>
                            <p className="text-sm text-muted-foreground mb-1">
                                Số tiền có thể rút:
                            </p>
                            <p className="text-2xl font-bold text-green-600">
                                {data
                                    ? formatCurrency(data.rewardAmount)
                                    : "0 ₫"}
                            </p>
                        </div>

                        <Dialog
                            open={isModalOpen}
                            onOpenChange={setIsModalOpen}
                        >
                            <DialogTrigger asChild>
                                <Button
                                    onClick={handleWithdraw}
                                    size="lg"
                                    className="w-full sm:w-auto"
                                    disabled={
                                        !data?.rewardAmount ||
                                        data.rewardAmount <= 0
                                    }
                                >
                                    <Download className="h-4 w-4 mr-2" />
                                    Rút tiền ngay
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[500px]">
                                <DialogHeader>
                                    <DialogTitle className="flex items-center gap-2">
                                        <CreditCard className="h-5 w-5" />
                                        Thông tin rút tiền
                                    </DialogTitle>
                                    <DialogDescription>
                                        Nhập thông tin tài khoản ngân hàng để
                                        rút{" "}
                                        {data
                                            ? formatCurrency(data.rewardAmount)
                                            : "0 ₫"}
                                    </DialogDescription>
                                </DialogHeader>

                                <form
                                    onSubmit={handleSubmitWithdraw}
                                    className="space-y-4"
                                >
                                    <div className="space-y-2">
                                        <Label htmlFor="bankName">
                                            Ngân hàng
                                        </Label>
                                        <Select
                                            value={formData.bankName}
                                            onValueChange={(value) =>
                                                setFormData((prev) => ({
                                                    ...prev,
                                                    bankName: value,
                                                }))
                                            }
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Chọn ngân hàng" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {popularBanks.map((bank) => (
                                                    <SelectItem
                                                        key={bank}
                                                        value={bank}
                                                    >
                                                        {bank}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="bankAccount">
                                            Số tài khoản
                                        </Label>
                                        <Input
                                            id="bankAccount"
                                            type="text"
                                            placeholder="Nhập số tài khoản"
                                            value={formData.bankAccount}
                                            onChange={(e) =>
                                                setFormData((prev) => ({
                                                    ...prev,
                                                    bankAccount: e.target.value,
                                                }))
                                            }
                                            required
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="bankAccountName">
                                            Tên chủ tài khoản
                                        </Label>
                                        <Input
                                            id="bankAccountName"
                                            type="text"
                                            placeholder="Nhập tên chủ tài khoản"
                                            value={formData.bankAccountName}
                                            onChange={(e) =>
                                                setFormData((prev) => ({
                                                    ...prev,
                                                    bankAccountName:
                                                        e.target.value,
                                                }))
                                            }
                                            required
                                        />
                                    </div>

                                    <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-sm font-medium">
                                                Số tiền rút:
                                            </span>
                                            <span className="font-bold text-blue-600">
                                                {data
                                                    ? formatCurrency(
                                                          data.rewardAmount
                                                      )
                                                    : "0 ₫"}
                                            </span>
                                        </div>
                                        <p className="text-xs text-blue-700 dark:text-blue-300">
                                            Tiền sẽ được chuyển vào tài khoản
                                            trong vòng 1-3 ngày làm việc
                                        </p>
                                    </div>

                                    <div className="flex gap-3 pt-4">
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={() =>
                                                setIsModalOpen(false)
                                            }
                                            className="flex-1"
                                            disabled={isSubmitting}
                                        >
                                            Hủy
                                        </Button>
                                        <Button
                                            type="submit"
                                            className="flex-1"
                                            disabled={isSubmitting}
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                                    Đang xử lý...
                                                </>
                                            ) : (
                                                <>
                                                    <Download className="h-4 w-4 mr-2" />
                                                    Xác nhận rút tiền
                                                </>
                                            )}
                                        </Button>
                                    </div>
                                </form>
                            </DialogContent>
                        </Dialog>
                    </div>

                    {data?.rewardAmount && data.rewardAmount > 0 && (
                        <div className="mt-4 p-3 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
                            <p className="text-sm ">
                                💡 Tiền sẽ được chuyển vào tài khoản ngân hàng
                                đã đăng ký trong vòng 1-3 ngày làm việc.
                            </p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
