"use client";

import type React from "react";

import { useState } from "react";
import ImageUpload from "@/components/resource-upload";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { User, FileText, Award } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import {
    useCreateTrainerRequest,
    useGetMyTrainerRequest,
} from "@/queries/request-trainer.query";
import utils from "@/utils/utils";

interface UploadItem {
    url: string;
    fileName: string;
}

interface FormData {
    height: string;
    weight: string;
    bio: string;
    yoe: string;
}

export const TrainerPage = () => {
    const [certificationUploads, setCertificationUploads] = useState<
        UploadItem[]
    >([]);
    const [avatarUpload, setAvatarUpload] = useState<UploadItem | null>(null);
    const [formData, setFormData] = useState<FormData>({
        height: "",
        weight: "",
        bio: "",
        yoe: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { data: myRequest } = useGetMyTrainerRequest();
    const { mutateAsync: createTrainerRequest } = useCreateTrainerRequest();
    console.log("certificationUploads", certificationUploads);
    const handleInputChange = (field: keyof FormData, value: string) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (certificationUploads.length === 0) {
            toast({
                title: "Chứng chỉ chưa được upload",
                description:
                    "Vui lòng upload ít nhất một chứng chỉ hoặc bằng cấp.",
                variant: "destructive",
            });
            return;
        }

        setIsSubmitting(true);

        try {
            const payload = {
                certification: JSON.stringify(certificationUploads),
                bio: formData.bio,
                yoe: Number.parseFloat(formData.yoe),
                userId: utils.getUserId(),
            };

            console.log("payload", payload);

            const [err] = await createTrainerRequest(payload);

            if (err) {
                toast({
                    title: "Đăng ký thất bại",
                    description: err || "Có lỗi xảy ra khi gửi đơn đăng ký.",
                    variant: "destructive",
                });
                return;
            }

            toast({
                title: "Đăng ký thành công",
                description: "Đơn đăng ký của bạn đã được gửi đi.",
                variant: "success",
            });

            // Reset form
            setFormData({ height: "", weight: "", bio: "", yoe: "" });
            setCertificationUploads([]);
            setAvatarUpload(null);
        } catch (error) {
            console.error("Error creating trainer request:", error);
            alert("Có lỗi xảy ra khi đăng ký. Vui lòng thử lại.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (Array.isArray(myRequest) && myRequest.length > 0) {
        const trainerData = myRequest[0];
        const userData = trainerData?.user;

        return (
            <div className="mx-auto max-w-4xl space-y-6 p-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Award className="h-5 w-5" />
                            Thông tin đăng ký làm Huấn luyện viên cá nhân
                        </CardTitle>
                        <CardDescription>
                            Trạng thái đơn đăng ký của bạn
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="flex items-center justify-between">
                            <span className="font-medium">Trạng thái:</span>
                            <Badge
                                variant={
                                    trainerData.status === "ACCEPTED"
                                        ? "default"
                                        : "secondary"
                                }
                                className={
                                    trainerData.status === "ACCEPTED"
                                        ? "bg-green-500"
                                        : ""
                                }
                            >
                                {trainerData.status === "ACCEPTED"
                                    ? "Đã phê duyệt"
                                    : "Đang chờ phê duyệt"}
                            </Badge>
                        </div>

                        <Separator />

                        <div className="space-y-4">
                            <h3 className="font-semibold">
                                Giới thiệu bản thân
                            </h3>
                            <p className="rounded-lg bg-muted p-3 text-sm text-muted-foreground">
                                {trainerData.bio}
                            </p>
                        </div>

                        <div className="space-y-4">
                            <h3 className="flex items-center gap-2 font-semibold">
                                <FileText className="h-4 w-4" />
                                Chứng chỉ đã upload
                            </h3>
                            {trainerData.certification && (
                                <div className="space-y-2">
                                    {JSON.parse(trainerData.certification).map(
                                        (cert: UploadItem, idx: number) => (
                                            <div
                                                key={idx}
                                                className="flex items-center gap-2 rounded bg-muted p-2"
                                            >
                                                <FileText className="h-4 w-4" />
                                                <a
                                                    href={cert.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-sm text-blue-600 underline hover:text-blue-800"
                                                >
                                                    {cert.fileName}
                                                </a>
                                            </div>
                                        )
                                    )}
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-4xl space-y-6 p-6">
            <Card>
                <CardHeader>
                    <CardTitle>Đăng ký trở thành Coacher</CardTitle>
                    <CardDescription>
                        Điền thông tin để đăng ký trở thành huấn luyện viên cá
                        nhân
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid gap-6 md:grid-cols-2">
                            <div className="space-y-4">
                                <div>
                                    <Label htmlFor="yoe">
                                        Số năm kinh nghiệm *
                                    </Label>
                                    <Input
                                        id="yoe"
                                        type="number"
                                        step="0.1"
                                        placeholder="Ví dụ: 2.5"
                                        value={formData.yoe}
                                        onChange={(e) =>
                                            handleInputChange(
                                                "yoe",
                                                e.target.value
                                            )
                                        }
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-4"></div>
                        </div>

                        <div>
                            <Label htmlFor="bio">Giới thiệu bản thân *</Label>
                            <Textarea
                                id="bio"
                                placeholder="Hãy giới thiệu về bản thân, kinh nghiệm, chuyên môn của bạn..."
                                value={formData.bio}
                                onChange={(e) =>
                                    handleInputChange("bio", e.target.value)
                                }
                                rows={4}
                                required
                            />
                        </div>

                        <div>
                            <Label>Chứng chỉ, bằng cấp *</Label>
                            <ImageUpload
                                acceptedTypes=".pdf,.docx,.xlsx,.jpg,.jpeg,.png"
                                maxSize={20 * 1024 * 1024} // 20MB
                                placeholder="Kéo thả tài liệu chứng chỉ hoặc click để chọn"
                                onUploadSuccess={(url, result) => {
                                    setCertificationUploads((prev) => [
                                        ...prev,
                                        { url, fileName: result.fileName },
                                    ]);
                                }}
                            />

                            {certificationUploads.length > 0 && (
                                <div className="mt-4">
                                    <h4 className="mb-2 text-sm font-medium">
                                        Chứng chỉ đã upload:
                                    </h4>
                                    <div className="space-y-2">
                                        {certificationUploads.map(
                                            (item, idx) => (
                                                <div
                                                    key={idx}
                                                    className="flex items-center justify-between rounded bg-muted p-2"
                                                >
                                                    <div className="flex items-center gap-2">
                                                        <FileText className="h-4 w-4" />
                                                        <a
                                                            href={item.url}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-sm text-blue-600 underline hover:text-blue-800"
                                                        >
                                                            {item.fileName}
                                                        </a>
                                                    </div>
                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => {
                                                            setCertificationUploads(
                                                                (prev) =>
                                                                    prev.filter(
                                                                        (
                                                                            _,
                                                                            i
                                                                        ) =>
                                                                            i !==
                                                                            idx
                                                                    )
                                                            );
                                                        }}
                                                    >
                                                        Xóa
                                                    </Button>
                                                </div>
                                            )
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>

                        <Button
                            type="submit"
                            className="w-full"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Đang xử lý..." : "Gửi đăng ký"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};
