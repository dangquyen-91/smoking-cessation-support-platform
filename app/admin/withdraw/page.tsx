"use client";

import { useState } from "react";
import { useGetWithdrawByPaging } from "@/queries/coach.query";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Eye, FileText, Calendar, CreditCard, Loader2 } from "lucide-react";
import { useUpdateWithdraw } from "@/queries/withdraw.query";

interface WithdrawRequest {
    id: number;
    amount: number;
    bankName: string;
    bankAccount: string;
    bankAccountName: string;
    status: "PENDING" | "APPROVED" | "REJECTED";
    adminNote: string | null;
    imageUrl: string;
    createdAt: string;
    updatedAt: string;
}

interface UpdateWithdrawPayload {
    id: number;
    status: string;
    imageUrl: string;
    note: string;
}

export default function WithdrawPage() {
    const { data, isLoading } = useGetWithdrawByPaging();
    const { mutateAsync: updateWithdraw, isPending: isUpdating } =
        useUpdateWithdraw();

    const [selectedRequest, setSelectedRequest] =
        useState<WithdrawRequest | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [updateForm, setUpdateForm] = useState({
        status: "",
        imageUrl: "",
        note: "",
    });

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
        }).format(amount);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("vi-VN", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    const getStatusBadge = (status: string) => {
        const statusConfig = {
            PENDING: { variant: "secondary" as const, label: "Đang chờ" },
            APPROVED: { variant: "default" as const, label: "Đã duyệt" },
            REJECTED: { variant: "destructive" as const, label: "Từ chối" },
        };
        const config =
            statusConfig[status as keyof typeof statusConfig] ||
            statusConfig.PENDING;
        return <Badge variant={config.variant}>{config.label}</Badge>;
    };

    const handleOpenDialog = (request: WithdrawRequest) => {
        setSelectedRequest(request);
        setUpdateForm({
            status: request.status,
            imageUrl: request.imageUrl || "",
            note: request.adminNote || "",
        });
        setIsDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
        setSelectedRequest(null);
        setUpdateForm({
            status: "",
            imageUrl: "",
            note: "",
        });
    };

    const handleUpdateSubmit = async () => {
        if (!selectedRequest) return;

        try {
            const payload: UpdateWithdrawPayload = {
                id: selectedRequest.id,
                status: updateForm.status,
                imageUrl: updateForm.imageUrl,
                note: updateForm.note,
            };

            await updateWithdraw(payload);
            handleCloseDialog();
            // You might want to show a success toast here
        } catch (error) {
            console.error("Error updating withdraw request:", error);
            // You might want to show an error toast here
        }
    };

    if (isLoading) {
        return (
            <div className="container mx-auto p-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <CreditCard className="h-5 w-5" />
                            Quản lý yêu cầu rút tiền
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {[...Array(5)].map((_, i) => (
                                <div
                                    key={i}
                                    className="flex items-center space-x-4"
                                >
                                    <Skeleton className="h-12 w-12 rounded-full" />
                                    <div className="space-y-2">
                                        <Skeleton className="h-4 w-[250px]" />
                                        <Skeleton className="h-4 w-[200px]" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }

    const withdrawRequests: WithdrawRequest[] = data || [];

    return (
        <div className="container mx-auto p-6">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <CreditCard className="h-5 w-5" />
                        Quản lý yêu cầu rút tiền
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                        Tổng cộng {withdrawRequests.length} yêu cầu rút tiền
                    </p>
                </CardHeader>
                <CardContent>
                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[100px]">
                                        ID
                                    </TableHead>
                                    <TableHead>Số tiền</TableHead>
                                    <TableHead>Thông tin ngân hàng</TableHead>
                                    <TableHead>Trạng thái</TableHead>
                                    <TableHead>Ngày tạo</TableHead>
                                    <TableHead>Ghi chú</TableHead>
                                    <TableHead className="text-right">
                                        Thao tác
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {withdrawRequests.length === 0 ? (
                                    <TableRow>
                                        <TableCell
                                            colSpan={7}
                                            className="h-24 text-center"
                                        >
                                            <div className="flex flex-col items-center gap-2">
                                                <FileText className="h-8 w-8 text-muted-foreground" />
                                                <p className="text-muted-foreground">
                                                    Không có yêu cầu rút tiền
                                                    nào
                                                </p>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    withdrawRequests.map((request) => (
                                        <TableRow key={request.id}>
                                            <TableCell className="font-medium">
                                                #{request.id}
                                            </TableCell>
                                            <TableCell>
                                                <div className="font-semibold text-green-600">
                                                    {formatCurrency(
                                                        request.amount
                                                    )}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="space-y-1">
                                                    <div className="font-medium">
                                                        {request.bankName}
                                                    </div>
                                                    <div className="text-sm text-muted-foreground">
                                                        {request.bankAccount}
                                                    </div>
                                                    <div className="text-sm text-muted-foreground">
                                                        {
                                                            request.bankAccountName
                                                        }
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                {getStatusBadge(request.status)}
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-1 text-sm">
                                                    <Calendar className="h-3 w-3" />
                                                    {formatDate(
                                                        request.createdAt
                                                    )}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                {request.adminNote ? (
                                                    <div className="max-w-[200px] truncate text-sm">
                                                        {request.adminNote}
                                                    </div>
                                                ) : (
                                                    <span className="text-muted-foreground text-sm">
                                                        Chưa có ghi chú
                                                    </span>
                                                )}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() =>
                                                        handleOpenDialog(
                                                            request
                                                        )
                                                    }
                                                    disabled={
                                                        request.status ===
                                                            "APPROVED" ||
                                                        request.status ===
                                                            "REJECTED"
                                                    }
                                                >
                                                    <Eye className="h-4 w-4 mr-1" />
                                                    Chi tiết
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>

            {/* Update Dialog */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                        <DialogTitle>Cập nhật yêu cầu rút tiền</DialogTitle>
                        <DialogDescription>
                            Cập nhật thông tin cho yêu cầu rút tiền #
                            {selectedRequest?.id}
                        </DialogDescription>
                    </DialogHeader>

                    {selectedRequest && (
                        <div className="space-y-4">
                            {/* Request Info */}
                            <div className="bg-muted/50 p-4 rounded-lg space-y-2">
                                <div className="flex justify-between">
                                    <span className="text-sm font-medium">
                                        Số tiền:
                                    </span>
                                    <span className="text-sm font-semibold text-green-600">
                                        {formatCurrency(selectedRequest.amount)}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-sm font-medium">
                                        Ngân hàng:
                                    </span>
                                    <span className="text-sm">
                                        {selectedRequest.bankName}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-sm font-medium">
                                        Số tài khoản:
                                    </span>
                                    <span className="text-sm">
                                        {selectedRequest.bankAccount}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-sm font-medium">
                                        Tên tài khoản:
                                    </span>
                                    <span className="text-sm">
                                        {selectedRequest.bankAccountName}
                                    </span>
                                </div>
                            </div>

                            {/* Update Form */}
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="status">Trạng thái</Label>
                                    <Select
                                        value={updateForm.status}
                                        onValueChange={(value) =>
                                            setUpdateForm((prev) => ({
                                                ...prev,
                                                status: value,
                                            }))
                                        }
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Chọn trạng thái" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="PENDING">
                                                Đang chờ
                                            </SelectItem>
                                            <SelectItem value="APPROVED">
                                                Đã duyệt
                                            </SelectItem>
                                            <SelectItem value="REJECTED">
                                                Từ chối
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="imageUrl">
                                        URL hình ảnh
                                    </Label>
                                    <Input
                                        id="imageUrl"
                                        placeholder="Nhập URL hình ảnh"
                                        value={updateForm.imageUrl}
                                        onChange={(e) =>
                                            setUpdateForm((prev) => ({
                                                ...prev,
                                                imageUrl: e.target.value,
                                            }))
                                        }
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="note">Ghi chú</Label>
                                    <Textarea
                                        id="note"
                                        placeholder="Nhập ghi chú..."
                                        value={updateForm.note}
                                        onChange={(e) =>
                                            setUpdateForm((prev) => ({
                                                ...prev,
                                                note: e.target.value,
                                            }))
                                        }
                                        rows={3}
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={handleCloseDialog}
                            disabled={isUpdating}
                        >
                            Hủy
                        </Button>
                        <Button
                            onClick={handleUpdateSubmit}
                            disabled={isUpdating}
                        >
                            {isUpdating && (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            )}
                            Cập nhật
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
