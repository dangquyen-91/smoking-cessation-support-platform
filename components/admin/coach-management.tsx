"use client";
import React, { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
    Search,
    MoreHorizontal,
    Eye,
    Trash2,
    Check,
    ChevronLeft,
    ChevronRight,
    Users,
    UserCheck,
    Clock,
    X,
} from "lucide-react";
import {
    useAcceptTrainerRequest,
    useTrainerRequestGetByPaging,
} from "@/queries/request-trainer.query";

interface Role {
    id: number;
    name: string;
    description: string;
}

interface User {
    id: number;
    username: string;
    email: string;
    fullName: string;
    phone: string;
    gender: string;
    age: number;
    profileImage: string;
    status: string;
    roles: Role[];
    bio: string;
    yoe: number;
    createdAt: string;
    updatedAt: string;
}

interface TrainerRequest {
    id: number;
    certification: string;
    status: "PENDING" | "ACCEPTED" | "REJECTED";
    height: number;
    weight: number;
    bio: string;
    yoe: number;
    avatarUrl: string | null;
    user: User;
    createdAt: string;
    updatedAt: string;
}

export function CoachManagement() {
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [status, setStatus] = useState<"PENDING" | "ACCEPTED" | "REJECTED">(
        "PENDING"
    );

    const { data: trainerRequests } = useTrainerRequestGetByPaging(status);

    const REQUESTS_PER_PAGE = 10;

    const filteredRequests = useMemo(() => {
        if (!trainerRequests) return [];
        return trainerRequests.filter(
            (request: TrainerRequest) =>
                request.user.fullName
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                request.user.email
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                request.user.phone.includes(searchTerm) ||
                request.bio.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [trainerRequests, searchTerm]);

    const paginatedRequests = useMemo(() => {
        const startIndex = (currentPage - 1) * REQUESTS_PER_PAGE;
        const endIndex = startIndex + REQUESTS_PER_PAGE;
        return filteredRequests.slice(startIndex, endIndex);
    }, [filteredRequests, currentPage]);

    const totalPages = Math.ceil(filteredRequests.length / REQUESTS_PER_PAGE);

    React.useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, status]);

    const getStatusBadge = (status: string) => {
        switch (status.toUpperCase()) {
            case "ACCEPTED":
                return (
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
                        Đã duyệt
                    </Badge>
                );
            case "PENDING":
                return (
                    <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">
                        Chờ duyệt
                    </Badge>
                );
            case "REJECTED":
                return (
                    <Badge className="bg-red-100 text-red-800 hover:bg-red-200">
                        Đã từ chối
                    </Badge>
                );
            default:
                return <Badge variant="secondary">{status}</Badge>;
        }
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
    const { mutateAsync: acceptTrainerRequest } = useAcceptTrainerRequest();
    const handleApproveRequest = async (requestId: number) => {
        try {
            const payload = {
                requestId,
                status: "ACCEPTED",
            };
            await acceptTrainerRequest(payload);
            console.log("Approving request:", requestId);
        } catch (error) {
            console.error("Error approving request:", error);
        }
    };

    const handleRejectRequest = async (requestId: number) => {
        try {
            const payload = {
                requestId,
                status: "REJECTED",
            };
            await acceptTrainerRequest(payload);
        } catch (error) {
            console.error("Error rejecting request:", error);
        }
    };

    const handleDeleteRequest = async (requestId: number) => {
        try {
            // TODO: Implement API call to delete trainer request
            console.log("Deleting request:", requestId);
        } catch (error) {
            console.error("Error deleting request:", error);
        }
    };

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const renderPaginationNumbers = () => {
        const pages = [];
        const maxVisiblePages = 5;
        if (totalPages <= maxVisiblePages) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            if (currentPage <= 3) {
                pages.push(1, 2, 3, 4, "...", totalPages);
            } else if (currentPage >= totalPages - 2) {
                pages.push(
                    1,
                    "...",
                    totalPages - 3,
                    totalPages - 2,
                    totalPages - 1,
                    totalPages
                );
            } else {
                pages.push(
                    1,
                    "...",
                    currentPage - 1,
                    currentPage,
                    currentPage + 1,
                    "...",
                    totalPages
                );
            }
        }

        return pages.map((page, index) => (
            <React.Fragment key={index}>
                {page === "..." ? (
                    <span className="px-3 py-2 text-gray-400">...</span>
                ) : (
                    <Button
                        variant={currentPage === page ? "default" : "outline"}
                        size="sm"
                        onClick={() => handlePageChange(page as number)}
                        className="min-w-[40px] h-9"
                    >
                        {page}
                    </Button>
                )}
            </React.Fragment>
        ));
    };

    const parseCertification = (certificationString: string) => {
        try {
            const certifications = JSON.parse(certificationString);
            return Array.isArray(certifications) ? certifications : [];
        } catch {
            return [];
        }
    };

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">
                        Quản lý huấn luyện viên
                    </h1>
                    <p className="text-gray-600 mt-1">
                        Quản lý và kiểm duyệt các yêu cầu trở thành huấn luyện
                        viên
                    </p>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-100 rounded-lg">
                                <Users className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                                <div className="text-2xl font-bold">
                                    {trainerRequests?.length || 0}
                                </div>
                                <p className="text-sm text-gray-600">
                                    Tổng yêu cầu
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-green-100 rounded-lg">
                                <UserCheck className="h-5 w-5 text-green-600" />
                            </div>
                            <div>
                                <div className="text-2xl font-bold">
                                    {trainerRequests?.filter(
                                        (request: TrainerRequest) =>
                                            request.status === "ACCEPTED"
                                    ).length || 0}
                                </div>
                                <p className="text-sm text-gray-600">
                                    Đã duyệt
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-yellow-100 rounded-lg">
                                <Clock className="h-5 w-5 text-yellow-600" />
                            </div>
                            <div>
                                <div className="text-2xl font-bold">
                                    {trainerRequests?.filter(
                                        (request: TrainerRequest) =>
                                            request.status === "PENDING"
                                    ).length || 0}
                                </div>
                                <p className="text-sm text-gray-600">
                                    Chờ duyệt
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-red-100 rounded-lg">
                                <X className="h-5 w-5 text-red-600" />
                            </div>
                            <div>
                                <div className="text-2xl font-bold">
                                    {trainerRequests?.filter(
                                        (request: TrainerRequest) =>
                                            request.status === "REJECTED"
                                    ).length || 0}
                                </div>
                                <p className="text-sm text-gray-600">
                                    Đã từ chối
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Search */}
            <Card>
                <CardContent className="pt-6">
                    <div className="relative max-w-md">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                            placeholder="Tìm kiếm theo tên, email, số điện thoại..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10"
                        />
                    </div>
                </CardContent>
            </Card>

            {/* Trainer Requests Table */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                        <div className="flex flex-col gap-2">
                            <div className="flex justify-between w-full items-center gap-2">
                                <span>Danh sách yêu cầu huấn luyện viên</span>
                            </div>
                            <div className="flex items-center gap-2 mt-1">
                                <Badge
                                    className={`${
                                        status === "ACCEPTED"
                                            ? "bg-green-100 text-green-800"
                                            : "bg-gray-100 text-gray-800"
                                    } cursor-pointer`}
                                    variant="outline"
                                    onClick={() => setStatus("ACCEPTED")}
                                >
                                    Đã duyệt
                                </Badge>
                                <Badge
                                    className={`${
                                        status === "PENDING"
                                            ? "bg-green-100 text-green-800"
                                            : "bg-gray-100 text-gray-800"
                                    } cursor-pointer`}
                                    variant="outline"
                                    onClick={() => setStatus("PENDING")}
                                >
                                    Chờ duyệt
                                </Badge>
                                <Badge
                                    className={`${
                                        status === "REJECTED"
                                            ? "bg-green-100 text-green-800"
                                            : "bg-gray-100 text-gray-800"
                                    } cursor-pointer`}
                                    variant="outline"
                                    onClick={() => setStatus("REJECTED")}
                                >
                                    Đã từ chối
                                </Badge>
                            </div>
                        </div>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="border rounded-lg">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-gray-50">
                                    <TableHead className="font-semibold">
                                        Thông tin cá nhân
                                    </TableHead>
                                    <TableHead className="font-semibold">
                                        Liên hệ
                                    </TableHead>
                                    <TableHead className="font-semibold">
                                        Kinh nghiệm
                                    </TableHead>
                                    <TableHead className="font-semibold">
                                        Chứng chỉ
                                    </TableHead>
                                    <TableHead className="font-semibold">
                                        Trạng thái
                                    </TableHead>
                                    <TableHead className="font-semibold">
                                        Ngày tạo
                                    </TableHead>
                                    <TableHead className="font-semibold text-right">
                                        Hành động
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {paginatedRequests.length > 0 ? (
                                    paginatedRequests.map(
                                        (request: TrainerRequest) => (
                                            <TableRow
                                                key={request.id}
                                                className="hover:bg-gray-50"
                                            >
                                                <TableCell>
                                                    <div className="flex items-center gap-3">
                                                        <img
                                                            src={
                                                                request.user
                                                                    .profileImage ||
                                                                "/placeholder.svg?height=40&width=40"
                                                            }
                                                            alt={
                                                                request.user
                                                                    .fullName
                                                            }
                                                            className="w-10 h-10 rounded-full object-cover"
                                                        />
                                                        <div>
                                                            <div className="font-medium">
                                                                {
                                                                    request.user
                                                                        .fullName
                                                                }
                                                            </div>
                                                            <div className="text-sm text-gray-500">
                                                                {
                                                                    request.user
                                                                        .age
                                                                }{" "}
                                                                tuổi •{" "}
                                                                {
                                                                    request.user
                                                                        .gender
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <div>
                                                        <div className="text-sm">
                                                            {request.user.email}
                                                        </div>
                                                        <div className="text-sm text-gray-500">
                                                            {request.user.phone}
                                                        </div>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <div>
                                                        <div className="font-medium">
                                                            {request.yoe} năm
                                                        </div>
                                                        <div className="text-sm text-gray-500 max-w-xs truncate">
                                                            {request.bio ||
                                                                "Chưa có mô tả"}
                                                        </div>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="max-w-xs">
                                                        {(() => {
                                                            const certifications =
                                                                parseCertification(
                                                                    request.certification
                                                                );
                                                            return certifications.length >
                                                                0 ? (
                                                                <div className="space-y-1">
                                                                    {certifications
                                                                        .slice(
                                                                            0,
                                                                            2
                                                                        )
                                                                        .map(
                                                                            (
                                                                                cert: any,
                                                                                index: number
                                                                            ) => (
                                                                                <div
                                                                                    key={
                                                                                        index
                                                                                    }
                                                                                    className="flex items-center gap-2"
                                                                                >
                                                                                    <a
                                                                                        href={
                                                                                            cert.url
                                                                                        }
                                                                                        target="_blank"
                                                                                        rel="noopener noreferrer"
                                                                                        className="text-blue-600 hover:text-blue-800 text-sm truncate max-w-[150px]"
                                                                                        title={
                                                                                            cert.fileName
                                                                                        }
                                                                                    >
                                                                                        {
                                                                                            cert.fileName
                                                                                        }
                                                                                    </a>
                                                                                </div>
                                                                            )
                                                                        )}
                                                                    {certifications.length >
                                                                        2 && (
                                                                        <div className="text-xs text-gray-500">
                                                                            +
                                                                            {certifications.length -
                                                                                2}{" "}
                                                                            chứng
                                                                            chỉ
                                                                            khác
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            ) : (
                                                                <span className="text-sm text-gray-500">
                                                                    Chưa có
                                                                    chứng chỉ
                                                                </span>
                                                            );
                                                        })()}
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    {getStatusBadge(
                                                        request.status
                                                    )}
                                                </TableCell>
                                                <TableCell>
                                                    <div className="text-sm">
                                                        {formatDate(
                                                            request.createdAt
                                                        )}
                                                    </div>
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger
                                                            asChild
                                                        >
                                                            <Button
                                                                variant="ghost"
                                                                className="h-8 w-8 p-0"
                                                            >
                                                                <MoreHorizontal className="h-4 w-4" />
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent
                                                            align="end"
                                                            className="w-48"
                                                        >
                                                            <DropdownMenuItem>
                                                                <Eye className="mr-2 h-4 w-4" />
                                                                Xem chi tiết
                                                            </DropdownMenuItem>
                                                            {request.status ===
                                                                "PENDING" && (
                                                                <>
                                                                    <DropdownMenuItem
                                                                        onClick={() =>
                                                                            handleApproveRequest(
                                                                                request.id
                                                                            )
                                                                        }
                                                                        className="text-green-600 focus:text-green-600"
                                                                    >
                                                                        <Check className="mr-2 h-4 w-4" />
                                                                        Duyệt
                                                                        yêu cầu
                                                                    </DropdownMenuItem>
                                                                    <DropdownMenuItem
                                                                        onClick={() =>
                                                                            handleRejectRequest(
                                                                                request.id
                                                                            )
                                                                        }
                                                                        className="text-red-600 focus:text-red-600"
                                                                    >
                                                                        <X className="mr-2 h-4 w-4" />
                                                                        Từ chối
                                                                        yêu cầu
                                                                    </DropdownMenuItem>
                                                                </>
                                                            )}
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </TableCell>
                                            </TableRow>
                                        )
                                    )
                                ) : (
                                    <TableRow>
                                        <TableCell
                                            colSpan={7}
                                            className="text-center py-8"
                                        >
                                            <div className="flex flex-col items-center gap-2">
                                                <Users className="h-8 w-8 text-gray-400" />
                                                <p className="text-gray-500">
                                                    {searchTerm
                                                        ? "Không tìm thấy yêu cầu nào"
                                                        : "Chưa có yêu cầu nào"}
                                                </p>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                    {/* Pagination */}
                    {filteredRequests.length > 0 && (
                        <div className="flex items-center justify-between mt-6">
                            <div className="text-sm text-gray-600">
                                Hiển thị{" "}
                                {(currentPage - 1) * REQUESTS_PER_PAGE + 1} đến{" "}
                                {Math.min(
                                    currentPage * REQUESTS_PER_PAGE,
                                    filteredRequests.length
                                )}{" "}
                                trong tổng số {filteredRequests.length} yêu cầu
                            </div>
                            {totalPages > 1 && (
                                <div className="flex items-center gap-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() =>
                                            handlePageChange(currentPage - 1)
                                        }
                                        disabled={currentPage === 1}
                                        className="flex items-center gap-1"
                                    >
                                        <ChevronLeft className="h-4 w-4" />
                                        Trước
                                    </Button>
                                    <div className="flex items-center gap-1">
                                        {renderPaginationNumbers()}
                                    </div>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() =>
                                            handlePageChange(currentPage + 1)
                                        }
                                        disabled={currentPage === totalPages}
                                        className="flex items-center gap-1"
                                    >
                                        Sau
                                        <ChevronRight className="h-4 w-4" />
                                    </Button>
                                </div>
                            )}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
