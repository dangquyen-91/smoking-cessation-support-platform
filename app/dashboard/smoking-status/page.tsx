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
    Cigarette,
    Heart,
    AlertTriangle,
    Save,
    TrendingDown,
    Loader2,
} from "lucide-react";
import { useState, useEffect } from "react";
import utils from "@/utils/utils";
import {
    useCreateUpdateSmokingStatus,
    useGetMockSmokingStatus,
} from "@/queries/smoking.query";
import { useToast } from "@/hooks/use-toast";

export default function SmokingStatus() {
    const [cigarettesPerDay, setCigarettesPerDay] = useState("");
    const [smokingFrequency, setSmokingFrequency] = useState("");
    const [cigarettePrice, setCigarettePrice] = useState("");
    const [brandName, setBrandName] = useState("");
    const [yearsSmoking, setYearsSmoking] = useState("");
    const [attemptsToQuit, setAttemptsToQuit] = useState("");
    const [triggers, setTriggers] = useState("");
    const [motivationLevel, setMotivationLevel] = useState("");

    const [symptoms, setSymptoms] = useState("");
    const [healthStatus, setHealthStatus] = useState("");
    const [firstCigaretteTime, setFirstCigaretteTime] = useState("");
    const [fitnessLevel, setFitnessLevel] = useState("");
    const [medicalConditions, setMedicalConditions] = useState("");
    const [medications, setMedications] = useState("");

    const userId = utils.getUserId();
    const { data: userSmoking, isLoading } = useGetMockSmokingStatus(userId);
    const { mutateAsync: createUpdateSmokingStatus, isPending } =
        useCreateUpdateSmokingStatus();

    useEffect(() => {
        if (userSmoking) {
            setCigarettesPerDay(userSmoking.cigarettesPerDay?.toString() || "");
            setSmokingFrequency(userSmoking.smokingFrequency || "");
            setCigarettePrice(userSmoking.cigarettePrice?.toString() || "");
            setBrandName(userSmoking.brandName || "");
            setYearsSmoking(userSmoking.yearsSmoking?.toString() || "");
            setAttemptsToQuit(userSmoking.attemptsToQuit?.toString() || "0");
            setTriggers(userSmoking.triggers || "");
            setMotivationLevel(userSmoking.motivationLevel || "");
        }
    }, [userSmoking]);
    const { toast } = useToast();
    const handleSave = async () => {
        try {
            const payload = {
                userId: userId,
                cigarettesPerDay: cigarettesPerDay
                    ? Number.parseInt(cigarettesPerDay)
                    : null,
                smokingFrequency: smokingFrequency || null,
                cigarettePrice: cigarettePrice
                    ? Number.parseFloat(cigarettePrice)
                    : null,
                brandName: brandName || null,
                yearsSmoking: yearsSmoking
                    ? Number.parseInt(yearsSmoking)
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
                description:
                    "Tình trạng hút thuốc của bạn đã được cập nhật thành công.",
                variant: "success",
            });
        } catch (error) {
            console.error("Error saving smoking status:", error);
            toast({
                title: "Lỗi khi lưu thông tin",
                description:
                    "Đã xảy ra lỗi khi lưu tình trạng hút thuốc của bạn. Vui lòng thử lại sau.",
                variant: "destructive",
            });
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="h-8 w-8 animate-spin" />
                <span className="ml-2">Đang tải dữ liệu...</span>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">
                    Ghi nhận tình trạng hút thuốc hiện tại
                </h1>
                <p className="text-gray-600">
                    Nhập thông tin chi tiết để hệ thống có thể đưa ra gợi ý phù
                    hợp
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Current Smoking Status */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Cigarette className="h-5 w-5 text-red-600" />
                            Thói quen hút thuốc
                        </CardTitle>
                        <CardDescription>
                            Thông tin về thói quen hút thuốc hiện tại
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <Label htmlFor="cigarettes-per-day">
                                Số điếu thuốc/ngày *
                            </Label>
                            <Input
                                id="cigarettes-per-day"
                                type="number"
                                value={cigarettesPerDay}
                                onChange={(e) =>
                                    setCigarettesPerDay(e.target.value)
                                }
                                placeholder="Ví dụ: 15"
                            />
                            <p className="text-sm text-gray-600 mt-1">
                                Số điếu thuốc bạn hút trung bình mỗi ngày
                            </p>
                        </div>

                        <div>
                            <Label htmlFor="smoking-years">
                                Số năm hút thuốc *
                            </Label>
                            <Input
                                id="smoking-years"
                                type="number"
                                value={yearsSmoking}
                                onChange={(e) =>
                                    setYearsSmoking(e.target.value)
                                }
                                placeholder="Ví dụ: 10"
                            />
                        </div>

                        <div>
                            <Label htmlFor="brand">Thương hiệu thuốc lá</Label>
                            <Input
                                id="brand"
                                value={brandName}
                                onChange={(e) => setBrandName(e.target.value)}
                                placeholder="Ví dụ: Marlboro"
                            />
                        </div>

                        <div>
                            <Label htmlFor="smoking-frequency">
                                Tần suất hút thuốc
                            </Label>
                            <Select
                                value={smokingFrequency}
                                onValueChange={setSmokingFrequency}
                            >
                                <SelectTrigger>
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
                            <Label htmlFor="first-cigarette">
                                Thời gian hút điếu đầu tiên
                            </Label>
                            <Select
                                value={firstCigaretteTime}
                                onValueChange={setFirstCigaretteTime}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Chọn thời gian" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="immediately">
                                        Ngay khi thức dậy
                                    </SelectItem>
                                    <SelectItem value="morning">
                                        Trong vòng 30 phút
                                    </SelectItem>
                                    <SelectItem value="hour">
                                        Sau 1 giờ
                                    </SelectItem>
                                    <SelectItem value="later">
                                        Muộn hơn
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div>
                            <Label htmlFor="triggers">
                                Tình huống thường hút thuốc
                            </Label>
                            <Textarea
                                id="triggers"
                                value={triggers}
                                onChange={(e) => setTriggers(e.target.value)}
                                placeholder="Ví dụ: Khi căng thẳng, sau bữa ăn, khi uống cà phê..."
                            />
                        </div>

                        <div>
                            <Label htmlFor="cost-per-pack">
                                Giá tiền một gói (VNĐ)
                            </Label>
                            <Input
                                id="cost-per-pack"
                                type="number"
                                value={cigarettePrice}
                                onChange={(e) =>
                                    setCigarettePrice(e.target.value)
                                }
                                placeholder="30000"
                            />
                        </div>

                        <div>
                            <Label htmlFor="attempts-to-quit">
                                Số lần đã cố gắng bỏ thuốc
                            </Label>
                            <Input
                                id="attempts-to-quit"
                                type="number"
                                value={attemptsToQuit}
                                onChange={(e) =>
                                    setAttemptsToQuit(e.target.value)
                                }
                                placeholder="0"
                            />
                        </div>

                        <div>
                            <Label htmlFor="motivation-level">
                                Mức độ động lực bỏ thuốc
                            </Label>
                            <Select
                                value={motivationLevel}
                                onValueChange={setMotivationLevel}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Chọn mức độ" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="LOW">Thấp</SelectItem>
                                    <SelectItem value="MEDIUM">
                                        Trung bình
                                    </SelectItem>
                                    <SelectItem value="HIGH">Cao</SelectItem>
                                    <SelectItem value="VERY_HIGH">
                                        Rất cao
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </CardContent>
                </Card>

                {/* Health Status & Symptoms */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Heart className="h-5 w-5 text-red-600" />
                            Tình trạng sức khỏe
                        </CardTitle>
                        <CardDescription>
                            Ghi nhận các triệu chứng và tình trạng sức khỏe hiện
                            tại
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <Label htmlFor="symptoms">
                                Triệu chứng hiện tại
                            </Label>
                            <Textarea
                                id="symptoms"
                                value={symptoms}
                                onChange={(e) => setSymptoms(e.target.value)}
                                placeholder="Ví dụ: Ho khan, khó thở, mệt mỏi..."
                                className="min-h-[100px]"
                            />
                        </div>

                        <div>
                            <Label htmlFor="health-concerns">
                                Mối quan tâm về sức khỏe
                            </Label>
                            <Textarea
                                id="health-concerns"
                                value={healthStatus}
                                onChange={(e) =>
                                    setHealthStatus(e.target.value)
                                }
                                placeholder="Ví dụ: Lo lắng về ung thư phổi, bệnh tim..."
                                className="min-h-[100px]"
                            />
                        </div>

                        <div>
                            <Label htmlFor="fitness-level">
                                Mức độ thể lực
                            </Label>
                            <Select
                                value={fitnessLevel}
                                onValueChange={setFitnessLevel}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Chọn mức độ" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="excellent">
                                        Xuất sắc
                                    </SelectItem>
                                    <SelectItem value="good">Tốt</SelectItem>
                                    <SelectItem value="average">
                                        Trung bình
                                    </SelectItem>
                                    <SelectItem value="poor">Kém</SelectItem>
                                    <SelectItem value="very-poor">
                                        Rất kém
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div>
                            <Label htmlFor="medical-conditions">
                                Bệnh lý hiện tại
                            </Label>
                            <Textarea
                                id="medical-conditions"
                                value={medicalConditions}
                                onChange={(e) =>
                                    setMedicalConditions(e.target.value)
                                }
                                placeholder="Ví dụ: Cao huyết áp, tiểu đường, hen suyễn..."
                            />
                        </div>

                        <div>
                            <Label htmlFor="medications">
                                Thuốc đang sử dụng
                            </Label>
                            <Textarea
                                id="medications"
                                value={medications}
                                onChange={(e) => setMedications(e.target.value)}
                                placeholder="Liệt kê các loại thuốc bạn đang sử dụng..."
                            />
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Quick Stats */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <TrendingDown className="h-5 w-5 text-blue-600" />
                        Thống kê nhanh
                    </CardTitle>
                    <CardDescription>
                        Tác động của thói quen hút thuốc hiện tại
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="p-4 bg-red-50 rounded-lg">
                            <div className="flex items-center gap-2 mb-2">
                                <AlertTriangle className="h-5 w-5 text-red-600" />
                                <span className="font-medium text-red-800">
                                    Chi phí hàng tháng
                                </span>
                            </div>
                            <div className="text-2xl font-bold text-red-600">
                                {cigarettesPerDay && cigarettePrice
                                    ? (
                                          ((Number.parseInt(cigarettesPerDay) *
                                              Number.parseFloat(
                                                  cigarettePrice
                                              )) /
                                              20) *
                                          30
                                      ).toLocaleString()
                                    : "0"}
                                đ
                            </div>
                            <p className="text-sm text-red-700">
                                Dựa trên {cigarettesPerDay || 0} điếu/ngày
                            </p>
                        </div>

                        <div className="p-4 bg-orange-50 rounded-lg">
                            <div className="flex items-center gap-2 mb-2">
                                <Cigarette className="h-5 w-5 text-orange-600" />
                                <span className="font-medium text-orange-800">
                                    Điếu thuốc/năm
                                </span>
                            </div>
                            <div className="text-2xl font-bold text-orange-600">
                                {cigarettesPerDay
                                    ? (
                                          Number.parseInt(cigarettesPerDay) *
                                          365
                                      ).toLocaleString()
                                    : "0"}
                            </div>
                            <p className="text-sm text-orange-700">
                                Tổng số điếu trong năm
                            </p>
                        </div>

                        <div className="p-4 bg-yellow-50 rounded-lg">
                            <div className="flex items-center gap-2 mb-2">
                                <Heart className="h-5 w-5 text-yellow-600" />
                                <span className="font-medium text-yellow-800">
                                    Thời gian "mất"
                                </span>
                            </div>
                            <div className="text-2xl font-bold text-yellow-600">
                                {cigarettesPerDay
                                    ? Math.round(
                                          ((Number.parseInt(cigarettesPerDay) *
                                              5) /
                                              60) *
                                              10
                                      ) / 10
                                    : 0}
                                h
                            </div>
                            <p className="text-sm text-yellow-700">
                                Mỗi ngày (5 phút/điếu)
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Save Button */}
            <div className="flex justify-end">
                <Button
                    onClick={handleSave}
                    disabled={isPending}
                    className="bg-green-600 hover:bg-green-700"
                >
                    {isPending ? (
                        <>
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            Đang lưu...
                        </>
                    ) : (
                        <>
                            <Save className="h-4 w-4 mr-2" />
                            Lưu thông tin
                        </>
                    )}
                </Button>
            </div>
        </div>
    );
}
