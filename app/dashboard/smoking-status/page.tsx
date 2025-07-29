"use client";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Cigarette,
    Heart,
    AlertTriangle,
    Save,
    TrendingDown,
    Loader2,
    Calendar,
    History,
    Target,
    Plus,
} from "lucide-react";
import { useState, useEffect } from "react";
import utils from "@/utils/utils";
import {
    useCreateUpdateSmokingStatus,
    useGetMockSmokingStatus,
} from "@/queries/smoking.query";
import { useToast } from "@/hooks/use-toast";
import { useCreateQuitPlan } from "@/queries/plan.query";

export default function SmokingQuitPlan() {
    const userId = utils.getUserId();
    const { data: userSmokingHistory, isLoading } =
        useGetMockSmokingStatus(userId);
    const { mutateAsync: createUpdateSmokingStatus, isPending } =
        useCreateUpdateSmokingStatus();
    const { toast } = useToast();

    // --- SmokingStatus state ---
    const hasExistingData = !!userSmokingHistory?.length;
    const latestData = hasExistingData
        ? userSmokingHistory![userSmokingHistory!.length - 1]
        : null;

    const [cigarettesPerDay, setCigarettesPerDay] = useState("");
    const [smokingFrequency, setSmokingFrequency] = useState("");
    const [cigarettePrice, setCigarettePrice] = useState("");
    const [brandName, setBrandName] = useState("");
    const [yearsSmoking, setYearsSmoking] = useState("");
    const [attemptsToQuit, setAttemptsToQuit] = useState("");
    const [triggers, setTriggers] = useState("");
    const [motivationLevel, setMotivationLevel] = useState("");
    const [dialogOpen, setDialogOpen] = useState(false);

    useEffect(() => {
        if (latestData) {
            setCigarettesPerDay(latestData.cigarettesPerDay?.toString() || "");
            setSmokingFrequency(latestData.smokingFrequency || "");
            setCigarettePrice(latestData.cigarettePrice?.toString() || "");
            setBrandName(latestData.brandName || "");
            setYearsSmoking(latestData.yearsSmoking?.toString() || "");
            setAttemptsToQuit(latestData.attemptsToQuit?.toString() || "0");
            setTriggers(latestData.triggers || "");
            setMotivationLevel(latestData.motivationLevel || "");
        }
    }, [latestData]);

    const handleSaveSmoking = async () => {
        try {
            const payload = {
                userId,
                cigarettesPerDay: cigarettesPerDay
                    ? Number.parseInt(cigarettesPerDay)
                    : null,
                smokingFrequency: smokingFrequency || null,
                cigarettePrice: cigarettePrice
                    ? Number.parseFloat(cigarettePrice)
                    : null,
                brandName: brandName || null,
                yearsSmoking: yearsSmoking
                    ? Number.parseFloat(yearsSmoking)
                    : null,
                attemptsToQuit: attemptsToQuit
                    ? Number.parseInt(attemptsToQuit)
                    : 0,
                triggers: triggers || null,
                motivationLevel: motivationLevel || null,
            };

            await createUpdateSmokingStatus(payload);
            toast({
                title: "Thông tin đã được lưu",
                description: hasExistingData
                    ? "Cập nhật tình trạng hút thuốc thành công."
                    : "Ghi nhận tình trạng hút thuốc thành công.",
                variant: "success",
            });
        } catch (error) {
            console.error(error);
            toast({
                title: "Lỗi khi lưu",
                description:
                    "Đã xảy ra lỗi khi lưu tình trạng hút thuốc. Vui lòng thử lại.",
                variant: "destructive",
            });
        }
    };

    const formatDate = (dateString: string) =>
        new Date(dateString).toLocaleDateString("vi-VN", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });

    // --- QuitPlan nested component ---
    const QuitPlan = ({
        initialYearsSmoking,
        initialCigsPerDay,
    }: {
        initialYearsSmoking: number;
        initialCigsPerDay: number;
    }) => {
        const [yrs, setYrs] = useState(initialYearsSmoking.toString());
        const [cigs, setCigs] = useState(initialCigsPerDay.toString());
        const [recommendedMonths, setRecommendedMonths] = useState<
            number | null
        >(null);
        const [customQuitMonths, setCustomQuitMonths] = useState("");
        const [milestones, setMilestones] = useState<
            { dayOffset: number; target: number }[]
        >([]);
        const [error, setError] = useState("");
        const [isSubmitting, setIsSubmitting] = useState(false);
        const [submitSuccess, setSubmitSuccess] = useState(false);

        // Tạo các bước giảm thuốc
        const createMilestones = (quitMonths: number, N0: number) => {
            const totalDays = Math.round(quitMonths * 30);
            const S = N0;
            const D = totalDays / S;
            const ms: { dayOffset: number; target: number }[] = [];
            for (let k = 1; k <= S; k++) {
                ms.push({ dayOffset: Math.ceil(k * D), target: N0 - k });
            }
            setMilestones(ms);
        };

        // Tính recommended và khởi tạo
        const handleGenerate = () => {
            setError("");
            setSubmitSuccess(false);
            const T_smoke = Number.parseFloat(yrs);
            const N0 = Number.parseInt(cigs, 10);

            if (isNaN(T_smoke) || T_smoke <= 0) {
                setError("Vui lòng nhập Thời gian hút hợp lệ (> 0).");
                return;
            }
            if (isNaN(N0) || N0 <= 0) {
                setError("Vui lòng nhập Số điếu/ngày hợp lệ (> 0).");
                return;
            }

            const rec = Math.min(3 * T_smoke, 9);
            setRecommendedMonths(rec);
            setCustomQuitMonths(rec.toFixed(1));
            createMilestones(rec, N0);
        };

        // Khi user chỉnh number of months
        const handleUpdatePlan = () => {
            setError("");
            setSubmitSuccess(false);
            const quitM = Number.parseFloat(customQuitMonths);
            const N0 = Number.parseInt(cigs, 10);

            if (isNaN(quitM) || quitM <= 0) {
                setError("Vui lòng nhập Thời gian bỏ hợp lệ (> 0).");
                return;
            }
            createMilestones(quitM, N0);
        };

        const { mutateAsync: createQuitPlan } = useCreateQuitPlan();
        const { toast } = useToast();
        const handleStartPlan = async () => {
            setIsSubmitting(true);
            const payload = {
                userId: utils.getUserId(),
                quitMonths: Number.parseFloat(customQuitMonths),
                yearsSmoking: Number.parseFloat(yrs),
                cigsPerDay: Number.parseInt(cigs, 10),
            };
            const [err, data] = await createQuitPlan(payload);
            if (err) {
                setIsSubmitting(false);
                setSubmitSuccess(false);
                setError(err);
                toast({
                    title: "Lỗi khi tạo kế hoạch",
                    description:
                        "Đã xảy ra lỗi khi tạo kế hoạch bỏ thuốc. Vui lòng thử lại.",
                    variant: "destructive",
                });
                return;
            }

            toast({
                title: "Kế hoạch đã được tạo",
                description: "Bạn đã tạo kế hoạch bỏ thuốc thành công.",
                variant: "success",
                action: (
                    <Button
                        variant="link"
                        className="text-blue-600 hover:underline"
                        onClick={() => {
                            window.location.href = `/dashboard/plan-calendar/${data?.planId}`;
                        }}
                    >
                        Xem kế hoạch
                    </Button>
                ),
            });

            setIsSubmitting(false);
            setSubmitSuccess(true);
            setDialogOpen(false);
        };

        // Auto-generate khi props thay đổi
        useEffect(() => {
            if (initialYearsSmoking > 0 && initialCigsPerDay > 0) {
                handleGenerate();
            }
        }, [initialYearsSmoking, initialCigsPerDay]);

        return (
            <div className="space-y-6">
                {/* Input gốc */}
                <div className="grid md:grid-cols-2 gap-4">
                    <div>
                        <Label>Thời gian hút (năm)</Label>
                        <Input
                            type="number"
                            step="0.1"
                            value={yrs}
                            onChange={(e) => setYrs(e.target.value)}
                        />
                    </div>
                    <div>
                        <Label>Điếu/ngày</Label>
                        <Input
                            type="number"
                            value={cigs}
                            onChange={(e) => setCigs(e.target.value)}
                        />
                    </div>
                </div>

                {error && <p className="text-red-500 text-sm">{error}</p>}

                <div className="flex space-x-2">
                    <Button onClick={handleGenerate} variant="outline">
                        Tạo kế hoạch
                    </Button>
                </div>

                {/* Phần chỉnh sửa số tháng */}
                {recommendedMonths !== null && (
                    <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
                        <p className="mb-3 text-blue-800">
                            Thời gian khuyến nghị:{" "}
                            <strong className="text-lg">
                                {recommendedMonths.toFixed(1)} tháng
                            </strong>{" "}
                            (~
                            {Math.round(recommendedMonths * 30)} ngày)
                        </p>
                        <div className="flex items-center space-x-2">
                            <Input
                                type="number"
                                step="0.1"
                                min="0.1"
                                value={customQuitMonths}
                                onChange={(e) =>
                                    setCustomQuitMonths(e.target.value)
                                }
                                className="max-w-32"
                            />
                            <Button
                                variant="outline"
                                onClick={handleUpdatePlan}
                                size="sm"
                            >
                                Cập nhật
                            </Button>
                        </div>
                    </div>
                )}

                {/* Bảng milestones */}
                {milestones.length > 0 && (
                    <div className="space-y-4">
                        <div className="overflow-x-auto">
                            <table className="w-full table-auto border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
                                <thead>
                                    <tr className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">
                                        <th className="p-3 text-left font-semibold">
                                            Bước
                                        </th>
                                        <th className="p-3 text-left font-semibold">
                                            Ngày
                                        </th>
                                        <th className="p-3 text-left font-semibold">
                                            Mục tiêu (điếu/ngày)
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {milestones.map((m, i) => (
                                        <tr
                                            key={i}
                                            className={
                                                i % 2 === 0
                                                    ? "bg-gray-50"
                                                    : "bg-white"
                                            }
                                        >
                                            <td className="p-3 font-medium text-gray-700">
                                                Bước {i + 1}
                                            </td>
                                            <td className="p-3 text-gray-600">
                                                Ngày {m.dayOffset}
                                            </td>
                                            <td className="p-3">
                                                <span className="inline-flex items-center px-2 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                                                    {m.target} điếu
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="flex justify-center pt-4">
                            <Button
                                onClick={handleStartPlan}
                                disabled={isSubmitting || submitSuccess}
                                className="bg-green-600 hover:bg-green-700 px-8"
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="animate-spin mr-2 h-4 w-4" />
                                        Đang lưu...
                                    </>
                                ) : submitSuccess ? (
                                    "Đã lưu thành công"
                                ) : (
                                    <>
                                        <Target className="mr-2 h-4 w-4" />
                                        Bắt đầu kế hoạch
                                    </>
                                )}
                            </Button>
                        </div>

                        {submitSuccess && (
                            <div className="text-center">
                                <p className="text-green-600 font-medium">
                                    Kế hoạch đã được lưu thành công!
                                </p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        );
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                <span className="ml-2 text-gray-600">Đang tải dữ liệu...</span>
            </div>
        );
    }

    return (
        <div className="space-y-8  mx-auto">
            {/* Quick Statistics - Top Section */}
            <Card className="shadow-lg border-0 bg-gradient-to-r from-red-50 to-orange-50">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-xl">
                        <TrendingDown className="text-red-600" />
                        Thống kê tác động
                    </CardTitle>
                    <CardDescription>
                        Ảnh hưởng của thói quen hút thuốc hiện tại
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-3 gap-6">
                        <div className="text-center p-6 bg-white rounded-xl shadow-sm border border-red-100">
                            <div className="flex items-center justify-center gap-2 mb-3">
                                <AlertTriangle className="text-red-600 h-6 w-6" />
                                <span className="font-semibold text-red-800">
                                    Chi phí/tháng
                                </span>
                            </div>
                            <div className="text-3xl font-bold text-red-600">
                                {cigarettesPerDay && cigarettePrice
                                    ? (
                                          ((+cigarettesPerDay *
                                              +cigarettePrice) /
                                              20) *
                                          30
                                      ).toLocaleString()
                                    : "0"}{" "}
                                <span className="text-lg">đ</span>
                            </div>
                        </div>
                        <div className="text-center p-6 bg-white rounded-xl shadow-sm border border-orange-100">
                            <div className="flex items-center justify-center gap-2 mb-3">
                                <Cigarette className="text-orange-600 h-6 w-6" />
                                <span className="font-semibold text-orange-800">
                                    Điếu/năm
                                </span>
                            </div>
                            <div className="text-3xl font-bold text-orange-600">
                                {cigarettesPerDay
                                    ? (+cigarettesPerDay * 365).toLocaleString()
                                    : "0"}
                            </div>
                        </div>
                        <div className="text-center p-6 bg-white rounded-xl shadow-sm border border-yellow-100">
                            <div className="flex items-center justify-center gap-2 mb-3">
                                <Heart className="text-yellow-600 h-6 w-6" />
                                <span className="font-semibold text-yellow-800">
                                    Thời gian mất/ngày
                                </span>
                            </div>
                            <div className="text-3xl font-bold text-yellow-600">
                                {cigarettesPerDay
                                    ? Math.round(
                                          ((+cigarettesPerDay * 5) / 60) * 10
                                      ) / 10
                                    : 0}{" "}
                                <span className="text-lg">giờ</span>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Main Content */}
            <div className="grid lg:grid-cols-3 gap-8">
                {/* Left Column - Smoking Form */}
                <div className="lg:col-span-2 space-y-6">
                    <Card className="shadow-lg border-0">
                        <CardHeader className=" bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-lg">
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle className="flex items-center gap-2 text-xl">
                                        <Cigarette className="text-blue-600" />
                                        Thói quen hút thuốc
                                    </CardTitle>
                                    <CardDescription className="text-base">
                                        {hasExistingData
                                            ? "Cập nhật thông tin hiện tại"
                                            : "Nhập thông tin hiện tại"}
                                    </CardDescription>
                                </div>

                                <Dialog
                                    open={dialogOpen}
                                    onOpenChange={setDialogOpen}
                                >
                                    <DialogTrigger asChild>
                                        <Button
                                            className=" bg-green-500 text-white hover:bg-green-700"
                                            disabled={
                                                !cigarettesPerDay ||
                                                !yearsSmoking
                                            }
                                        >
                                            <Plus className="mr-2 h-4 w-4" />
                                            Tạo kế hoạch bỏ thuốc
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                                        <DialogHeader>
                                            <DialogTitle className="flex items-center gap-2 text-xl">
                                                <Target className="text-green-600" />
                                                Kế hoạch bỏ thuốc lá
                                            </DialogTitle>
                                            <DialogDescription>
                                                Dựa trên dữ liệu hút thuốc của
                                                bạn, chúng tôi sẽ tạo một kế
                                                hoạch từ từ giảm thuốc phù hợp.
                                            </DialogDescription>
                                        </DialogHeader>
                                        <QuitPlan
                                            initialYearsSmoking={
                                                +yearsSmoking || 0
                                            }
                                            initialCigsPerDay={
                                                +cigarettesPerDay || 0
                                            }
                                        />
                                    </DialogContent>
                                </Dialog>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-6 p-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <Label className="text-sm font-semibold text-gray-700">
                                        Số điếu/ngày *
                                    </Label>
                                    <Input
                                        type="number"
                                        min="0"
                                        value={cigarettesPerDay}
                                        onChange={(e) =>
                                            setCigarettesPerDay(e.target.value)
                                        }
                                        className="mt-1"
                                        placeholder="Ví dụ: 10"
                                    />
                                </div>
                                {!hasExistingData && (
                                    <div>
                                        <Label className="text-sm font-semibold text-gray-700">
                                            Số năm hút thuốc *
                                        </Label>
                                        <Input
                                            type="number"
                                            value={yearsSmoking}
                                            onChange={(e) =>
                                                setYearsSmoking(e.target.value)
                                            }
                                            className="mt-1"
                                            placeholder="Ví dụ: 5"
                                        />
                                    </div>
                                )}
                                <div>
                                    <Label className="text-sm font-semibold text-gray-700">
                                        Thương hiệu
                                    </Label>
                                    <Input
                                        value={brandName}
                                        onChange={(e) =>
                                            setBrandName(e.target.value)
                                        }
                                        className="mt-1"
                                        placeholder="Ví dụ: Marlboro"
                                    />
                                </div>
                                <div>
                                    <Label className="text-sm font-semibold text-gray-700">
                                        Giá gói (VNĐ)
                                    </Label>
                                    <Input
                                        type="number"
                                        min="0"
                                        value={cigarettePrice}
                                        onChange={(e) =>
                                            setCigarettePrice(e.target.value)
                                        }
                                        className="mt-1"
                                        placeholder="Ví dụ: 25000"
                                    />
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <Label className="text-sm font-semibold text-gray-700">
                                        Tần suất
                                    </Label>
                                    <Select
                                        value={smokingFrequency}
                                        onValueChange={setSmokingFrequency}
                                    >
                                        <SelectTrigger className="mt-1">
                                            <SelectValue placeholder="Chọn tần suất" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="DAILY">
                                                Hàng ngày
                                            </SelectItem>
                                            <SelectItem value="WEEKLY">
                                                Hàng tuần
                                            </SelectItem>
                                            <SelectItem value="OCCASIONALLY">
                                                Thỉnh thoảng
                                            </SelectItem>
                                            <SelectItem value="SOCIAL">
                                                Chỉ khi giao tiếp
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div>
                                    <Label className="text-sm font-semibold text-gray-700">
                                        Mức động lực
                                    </Label>
                                    <Select
                                        value={motivationLevel}
                                        onValueChange={setMotivationLevel}
                                    >
                                        <SelectTrigger className="mt-1">
                                            <SelectValue placeholder="Chọn mức độ" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="LOW">
                                                Thấp
                                            </SelectItem>
                                            <SelectItem value="MEDIUM">
                                                Trung bình
                                            </SelectItem>
                                            <SelectItem value="HIGH">
                                                Cao
                                            </SelectItem>
                                            <SelectItem value="VERY_HIGH">
                                                Rất cao
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            {!hasExistingData && (
                                <div>
                                    <Label className="text-sm font-semibold text-gray-700">
                                        Số lần cố gắng bỏ
                                    </Label>
                                    <Input
                                        type="number"
                                        min="0"
                                        value={attemptsToQuit}
                                        onChange={(e) =>
                                            setAttemptsToQuit(e.target.value)
                                        }
                                        className="mt-1"
                                        placeholder="Ví dụ: 2"
                                    />
                                </div>
                            )}

                            <div>
                                <Label className="text-sm font-semibold text-gray-700">
                                    Tình huống thường hút
                                </Label>
                                <Textarea
                                    value={triggers}
                                    onChange={(e) =>
                                        setTriggers(e.target.value)
                                    }
                                    className="mt-1"
                                    placeholder="Ví dụ: Sau bữa ăn, khi căng thẳng, uống cà phê..."
                                    rows={3}
                                />
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-end">
                            <div className="flex justify-between items-center">
                                <Button
                                    onClick={handleSaveSmoking}
                                    disabled={isPending}
                                    className="bg-blue-600 hover:bg-blue-700 px-8"
                                >
                                    {isPending ? (
                                        <Loader2 className="animate-spin mr-2 h-4 w-4" />
                                    ) : (
                                        <Save className="mr-2 h-4 w-4" />
                                    )}
                                    {isPending
                                        ? "Đang lưu..."
                                        : hasExistingData
                                        ? "Cập nhật"
                                        : "Lưu thông tin"}
                                </Button>
                            </div>
                        </CardFooter>
                    </Card>

                    {/* Action Buttons */}
                </div>

                {/* Right Column - History */}
                {hasExistingData && (
                    <div className="lg:col-span-1">
                        <Card className="shadow-lg border-0 h-fit">
                            <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-t-lg">
                                <CardTitle className="flex items-center gap-2">
                                    <History className="text-purple-600" />
                                    Lịch sử cập nhật
                                </CardTitle>
                                <CardDescription>
                                    Theo dõi tiến độ thay đổi
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="p-0">
                                <div className="space-y-0 max-h-96 overflow-y-auto">
                                    {userSmokingHistory!
                                        .slice()
                                        .reverse()
                                        .map((r, i) => (
                                            <div
                                                key={r.id}
                                                className={`p-4 border-b border-gray-100 ${
                                                    i === 0
                                                        ? "bg-gradient-to-r from-blue-50 to-indigo-50"
                                                        : "hover:bg-gray-50"
                                                } transition-colors`}
                                            >
                                                <div className="flex items-center justify-between mb-2">
                                                    <div className="flex items-center gap-2">
                                                        <Calendar className="text-gray-500 h-4 w-4" />
                                                        <span className="text-sm text-gray-600">
                                                            {formatDate(
                                                                r.updatedAt
                                                            )}
                                                        </span>
                                                    </div>
                                                    {i === 0 && (
                                                        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full font-medium">
                                                            Mới nhất
                                                        </span>
                                                    )}
                                                </div>
                                                <div className="flex items-center gap-2 mb-2">
                                                    <Cigarette className="text-red-500 h-4 w-4" />
                                                    <span className="font-semibold text-gray-800">
                                                        {r.cigarettesPerDay}{" "}
                                                        điếu/ngày
                                                    </span>
                                                </div>
                                                <div className="text-sm text-gray-600">
                                                    <strong>
                                                        Thương hiệu:
                                                    </strong>{" "}
                                                    {r.brandName || "Không rõ"}
                                                </div>
                                                {r.triggers && (
                                                    <div className="text-xs text-gray-500 mt-2 p-2 bg-gray-50 rounded">
                                                        <strong>
                                                            Tình huống:
                                                        </strong>{" "}
                                                        {r.triggers}
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                )}
            </div>
        </div>
    );
}
