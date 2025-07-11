"use client";

import { useState, useMemo, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
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
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Search,
    MoreHorizontal,
    Plus,
    Eye,
    Edit,
    Trash2,
    Lock,
    Unlock,
    ChevronLeft,
    ChevronRight,
    DollarSign,
    Star,
    Calendar,
    TrendingUp,
} from "lucide-react";

interface PackageInterface {
    id: number;
    name: string;
    description: string;
    totalDays: number;
    imageUrl: string;
    price: number;
    salePrice: number;
    rating: number | null;
    totalRating: number;
    active: boolean;
    fixed: boolean;
}

interface CreatePackagePayload {
    name: string;
    description: string;
    totalDays: number;
    imageUrl: string;
    price: number;
    salePrice: number;
    userId: number;
    active: boolean;
    fixed: boolean;
}

// Mock data for demonstration

export function PackagesManagement() {
    const [packages, setPackages] = useState<PackageInterface[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [statusFilter, setStatusFilter] = useState("ALL");
    const [typeFilter, setTypeFilter] = useState("ALL");
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
    const [newPackage, setNewPackage] = useState<CreatePackagePayload>({
        name: "",
        description: "",
        totalDays: 0,
        imageUrl: "",
        price: 0,
        salePrice: 0,
        userId: 1,
        active: true,
        fixed: false,
    });

    const PACKAGES_PER_PAGE = 10;

    const filteredPackages = useMemo(
        () =>
            packages.filter((pkg) => {
                const matchesSearch =
                    pkg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    pkg.description
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase());
                const matchesStatus =
                    statusFilter === "ALL" ||
                    (statusFilter === "ACTIVE" && pkg.active) ||
                    (statusFilter === "INACTIVE" && !pkg.active);
                const matchesType =
                    typeFilter === "ALL" ||
                    (typeFilter === "FIXED" && pkg.fixed) ||
                    (typeFilter === "REGULAR" && !pkg.fixed);

                return matchesSearch && matchesStatus && matchesType;
            }),
        [packages, searchTerm, statusFilter, typeFilter]
    );

    const totalPages = Math.ceil(filteredPackages.length / PACKAGES_PER_PAGE);

    const paginatedPackages = useMemo(() => {
        const startIndex = (currentPage - 1) * PACKAGES_PER_PAGE;
        return filteredPackages.slice(
            startIndex,
            startIndex + PACKAGES_PER_PAGE
        );
    }, [filteredPackages, currentPage]);

    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, statusFilter, typeFilter]);

    const getStatusBadge = (active: boolean) =>
        active ? (
            <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
                Hoạt động
            </Badge>
        ) : (
            <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200">
                Không hoạt động
            </Badge>
        );

    const getTypeBadge = (fixed: boolean) =>
        fixed ? (
            <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">
                <Lock className="h-3 w-3 mr-1" />
                Cố định
            </Badge>
        ) : (
            <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200">
                <Unlock className="h-3 w-3 mr-1" />
                Thường
            </Badge>
        );

    const formatPrice = (price: number) =>
        new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
        }).format(price);

    const handleCreatePackage = async () => {
        try {
            // Simulate API call
            const newId = Math.max(...packages.map((p) => p.id)) + 1;
            const created: PackageInterface = {
                ...newPackage,
                id: newId,
                rating: null,
                totalRating: 0,
            };

            setPackages((prev) => [created, ...prev]);
            setNewPackage({
                name: "",
                description: "",
                totalDays: 0,
                imageUrl: "",
                price: 0,
                salePrice: 0,
                userId: 1,
                active: true,
                fixed: false,
            });
            setIsCreateDialogOpen(false);
        } catch (error) {
            console.error("Error creating package:", error);
        }
    };

    const handleDeletePackage = async (packageId: number) => {
        try {
            setPackages((prev) => prev.filter((p) => p.id !== packageId));
        } catch (error) {
            console.error("Error deleting package:", error);
        }
    };

    const handleToggleStatus = async (packageId: number) => {
        try {
            setPackages((prev) =>
                prev.map((p) =>
                    p.id === packageId ? { ...p, active: !p.active } : p
                )
            );
        } catch (error) {
            console.error("Error toggling package status:", error);
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
        let startPage = Math.max(
            1,
            currentPage - Math.floor(maxVisiblePages / 2)
        );
        const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

        if (endPage - startPage + 1 < maxVisiblePages) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(
                <Button
                    key={i}
                    variant={currentPage === i ? "default" : "outline"}
                    size="sm"
                    onClick={() => handlePageChange(i)}
                    className="w-8 h-8 p-0"
                >
                    {i}
                </Button>
            );
        }

        return pages;
    };

    // Statistics
    const totalRevenue = packages.reduce((sum, pkg) => sum + pkg.salePrice, 0);
    const averageRating =
        packages.reduce((sum, pkg) => sum + (pkg.rating || 0), 0) /
            packages.filter((pkg) => pkg.rating).length || 0;
    const activePackagesCount = packages.filter((pkg) => pkg.active).length;

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">
                        Quản lý gói tập
                    </h1>
                    <p className="text-gray-600 mt-1">
                        Quản lý các gói tập luyện và dịch vụ của phòng gym
                    </p>
                </div>
                <Dialog
                    open={isCreateDialogOpen}
                    onOpenChange={setIsCreateDialogOpen}
                >
                    <DialogTrigger asChild>
                        <Button className="flex items-center gap-2">
                            <Plus className="h-4 w-4" />
                            Tạo gói mới
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                            <DialogTitle>Tạo gói tập mới</DialogTitle>
                            <DialogDescription>
                                Tạo gói tập mới cho hệ thống
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="name">Tên gói *</Label>
                                    <Input
                                        id="name"
                                        value={newPackage.name}
                                        onChange={(e) =>
                                            setNewPackage({
                                                ...newPackage,
                                                name: e.target.value,
                                            })
                                        }
                                        placeholder="Nhập tên gói..."
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="totalDays">Số ngày *</Label>
                                    <Input
                                        id="totalDays"
                                        type="number"
                                        value={newPackage.totalDays}
                                        onChange={(e) =>
                                            setNewPackage({
                                                ...newPackage,
                                                totalDays:
                                                    Number.parseInt(
                                                        e.target.value
                                                    ) || 0,
                                            })
                                        }
                                        placeholder="Nhập số ngày..."
                                    />
                                </div>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="description">Mô tả *</Label>
                                <Textarea
                                    id="description"
                                    value={newPackage.description}
                                    onChange={(e) =>
                                        setNewPackage({
                                            ...newPackage,
                                            description: e.target.value,
                                        })
                                    }
                                    placeholder="Nhập mô tả gói..."
                                    rows={3}
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="imageUrl">URL hình ảnh</Label>
                                <Input
                                    id="imageUrl"
                                    value={newPackage.imageUrl}
                                    onChange={(e) =>
                                        setNewPackage({
                                            ...newPackage,
                                            imageUrl: e.target.value,
                                        })
                                    }
                                    placeholder="Nhập URL hình ảnh..."
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="price">
                                        Giá gốc (VNĐ) *
                                    </Label>
                                    <Input
                                        id="price"
                                        type="number"
                                        value={newPackage.price}
                                        onChange={(e) =>
                                            setNewPackage({
                                                ...newPackage,
                                                price:
                                                    Number.parseInt(
                                                        e.target.value
                                                    ) || 0,
                                            })
                                        }
                                        placeholder="Nhập giá gốc..."
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="salePrice">
                                        Giá bán (VNĐ) *
                                    </Label>
                                    <Input
                                        id="salePrice"
                                        type="number"
                                        value={newPackage.salePrice}
                                        onChange={(e) =>
                                            setNewPackage({
                                                ...newPackage,
                                                salePrice:
                                                    Number.parseInt(
                                                        e.target.value
                                                    ) || 0,
                                            })
                                        }
                                        placeholder="Nhập giá bán..."
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex items-center space-x-2">
                                    <Switch
                                        id="active"
                                        checked={newPackage.active}
                                        onCheckedChange={(checked) =>
                                            setNewPackage({
                                                ...newPackage,
                                                active: checked,
                                            })
                                        }
                                    />
                                    <Label htmlFor="active">Kích hoạt</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Switch
                                        id="fixed"
                                        checked={newPackage.fixed}
                                        onCheckedChange={(checked) =>
                                            setNewPackage({
                                                ...newPackage,
                                                fixed: checked,
                                            })
                                        }
                                    />
                                    <Label htmlFor="fixed">Gói cố định</Label>
                                </div>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button
                                variant="outline"
                                onClick={() => setIsCreateDialogOpen(false)}
                            >
                                Hủy
                            </Button>
                            <Button
                                onClick={handleCreatePackage}
                                disabled={
                                    !newPackage.name.trim() ||
                                    !newPackage.description.trim()
                                }
                            >
                                Tạo gói
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-100 rounded-lg">
                                <div className="h-5 w-5 text-blue-600">
                                    Package
                                </div>
                            </div>
                            <div>
                                <div className="text-2xl font-bold">
                                    {packages.length}
                                </div>
                                <p className="text-sm text-gray-600">
                                    Tổng số gói
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-green-100 rounded-lg">
                                <TrendingUp className="h-5 w-5 text-green-600" />
                            </div>
                            <div>
                                <div className="text-2xl font-bold">
                                    {activePackagesCount}
                                </div>
                                <p className="text-sm text-gray-600">
                                    Gói đang hoạt động
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-yellow-100 rounded-lg">
                                <DollarSign className="h-5 w-5 text-yellow-600" />
                            </div>
                            <div>
                                <div className="text-2xl font-bold">
                                    {formatPrice(totalRevenue)}
                                </div>
                                <p className="text-sm text-gray-600">
                                    Tổng giá trị gói
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-purple-100 rounded-lg">
                                <Star className="h-5 w-5 text-purple-600" />
                            </div>
                            <div>
                                <div className="text-2xl font-bold">
                                    {averageRating.toFixed(1)}
                                </div>
                                <p className="text-sm text-gray-600">
                                    Đánh giá trung bình
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Filters */}
            <Card>
                <CardContent className="pt-6">
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="relative flex-1 max-w-md">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <Input
                                placeholder="Tìm kiếm theo tên, mô tả..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                        <div className="flex gap-2">
                            <Select
                                value={statusFilter}
                                onValueChange={setStatusFilter}
                            >
                                <SelectTrigger className="w-[150px]">
                                    <SelectValue placeholder="Trạng thái" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="ALL">Tất cả</SelectItem>
                                    <SelectItem value="ACTIVE">
                                        Hoạt động
                                    </SelectItem>
                                    <SelectItem value="INACTIVE">
                                        Không hoạt động
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                            <Select
                                value={typeFilter}
                                onValueChange={setTypeFilter}
                            >
                                <SelectTrigger className="w-[150px]">
                                    <SelectValue placeholder="Loại gói" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="ALL">Tất cả</SelectItem>
                                    <SelectItem value="FIXED">
                                        Cố định
                                    </SelectItem>
                                    <SelectItem value="REGULAR">
                                        Thường
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Packages Table */}
            <Card>
                <CardHeader>
                    <CardTitle>Danh sách gói tập</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="border rounded-lg">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-gray-50">
                                    <TableHead className="font-semibold">
                                        Gói tập
                                    </TableHead>
                                    <TableHead className="font-semibold">
                                        Thời hạn
                                    </TableHead>
                                    <TableHead className="font-semibold">
                                        Giá
                                    </TableHead>
                                    <TableHead className="font-semibold">
                                        Đánh giá
                                    </TableHead>
                                    <TableHead className="font-semibold">
                                        Loại
                                    </TableHead>
                                    <TableHead className="font-semibold">
                                        Trạng thái
                                    </TableHead>
                                    <TableHead className="font-semibold text-right">
                                        Hành động
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {paginatedPackages.length > 0 ? (
                                    paginatedPackages.map(
                                        (pkg: PackageInterface) => (
                                            <TableRow
                                                key={pkg.id}
                                                className="hover:bg-gray-50"
                                            >
                                                <TableCell>
                                                    <div className="flex items-center gap-3">
                                                        {pkg.imageUrl && (
                                                            <img
                                                                src={
                                                                    pkg.imageUrl ||
                                                                    "/placeholder.svg"
                                                                }
                                                                alt={pkg.name}
                                                                className="h-10 w-10 rounded-lg object-cover"
                                                            />
                                                        )}
                                                        <div>
                                                            <div className="font-medium">
                                                                {pkg.name}
                                                            </div>
                                                            <div className="text-sm text-gray-500 max-w-xs truncate">
                                                                {
                                                                    pkg.description
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex items-center gap-1">
                                                        <Calendar className="h-4 w-4 text-gray-400" />
                                                        <span>
                                                            {pkg.totalDays} ngày
                                                        </span>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <div>
                                                        <div className="font-medium">
                                                            {formatPrice(
                                                                pkg.salePrice
                                                            )}
                                                        </div>
                                                        {pkg.price !==
                                                            pkg.salePrice && (
                                                            <div className="text-sm text-gray-500 line-through">
                                                                {formatPrice(
                                                                    pkg.price
                                                                )}
                                                            </div>
                                                        )}
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    {pkg.rating ? (
                                                        <div className="flex items-center gap-1">
                                                            <Star className="h-4 w-4 text-yellow-400 fill-current" />
                                                            <span className="font-medium">
                                                                {pkg.rating.toFixed(
                                                                    1
                                                                )}
                                                            </span>
                                                            <span className="text-sm text-gray-500">
                                                                (
                                                                {
                                                                    pkg.totalRating
                                                                }
                                                                )
                                                            </span>
                                                        </div>
                                                    ) : (
                                                        <span className="text-gray-400">
                                                            Chưa có đánh giá
                                                        </span>
                                                    )}
                                                </TableCell>
                                                <TableCell>
                                                    {getTypeBadge(pkg.fixed)}
                                                </TableCell>
                                                <TableCell>
                                                    {getStatusBadge(pkg.active)}
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
                                                            <DropdownMenuItem>
                                                                <Edit className="mr-2 h-4 w-4" />
                                                                Chỉnh sửa
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem
                                                                onClick={() =>
                                                                    handleToggleStatus(
                                                                        pkg.id
                                                                    )
                                                                }
                                                                className="text-blue-600 focus:text-blue-600"
                                                            >
                                                                {pkg.active ? (
                                                                    <>
                                                                        <Unlock className="mr-2 h-4 w-4" />
                                                                        Vô hiệu
                                                                        hóa
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        <Lock className="mr-2 h-4 w-4" />
                                                                        Kích
                                                                        hoạt
                                                                    </>
                                                                )}
                                                            </DropdownMenuItem>
                                                            <AlertDialog>
                                                                <AlertDialogTrigger
                                                                    asChild
                                                                >
                                                                    <DropdownMenuItem
                                                                        onSelect={(
                                                                            e
                                                                        ) =>
                                                                            e.preventDefault()
                                                                        }
                                                                        className="text-red-600 focus:text-red-600"
                                                                    >
                                                                        <Trash2 className="mr-2 h-4 w-4" />
                                                                        Xóa gói
                                                                    </DropdownMenuItem>
                                                                </AlertDialogTrigger>
                                                                <AlertDialogContent>
                                                                    <AlertDialogHeader>
                                                                        <AlertDialogTitle>
                                                                            Xác
                                                                            nhận
                                                                            xóa
                                                                            gói
                                                                        </AlertDialogTitle>
                                                                        <AlertDialogDescription>
                                                                            Bạn
                                                                            có
                                                                            chắc
                                                                            chắn
                                                                            muốn
                                                                            xóa
                                                                            gói
                                                                            "
                                                                            {
                                                                                pkg.name
                                                                            }
                                                                            "?
                                                                            Hành
                                                                            động
                                                                            này
                                                                            không
                                                                            thể
                                                                            hoàn
                                                                            tác.
                                                                        </AlertDialogDescription>
                                                                    </AlertDialogHeader>
                                                                    <AlertDialogFooter>
                                                                        <AlertDialogCancel>
                                                                            Hủy
                                                                        </AlertDialogCancel>
                                                                        <AlertDialogAction
                                                                            onClick={() =>
                                                                                handleDeletePackage(
                                                                                    pkg.id
                                                                                )
                                                                            }
                                                                            className="bg-red-600 hover:bg-red-700"
                                                                        >
                                                                            Xóa
                                                                            gói
                                                                        </AlertDialogAction>
                                                                    </AlertDialogFooter>
                                                                </AlertDialogContent>
                                                            </AlertDialog>
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
                                                <div className="h-8 w-8 text-gray-400">
                                                    Package
                                                </div>
                                                <p className="text-gray-500">
                                                    {searchTerm ||
                                                    statusFilter !== "ALL" ||
                                                    typeFilter !== "ALL"
                                                        ? "Không tìm thấy gói nào"
                                                        : "Chưa có gói nào"}
                                                </p>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                    {/* Pagination */}
                    {filteredPackages.length > 0 && (
                        <div className="flex items-center justify-between mt-6">
                            <div className="text-sm text-gray-600">
                                Hiển thị{" "}
                                {(currentPage - 1) * PACKAGES_PER_PAGE + 1} đến{" "}
                                {Math.min(
                                    currentPage * PACKAGES_PER_PAGE,
                                    filteredPackages.length
                                )}{" "}
                                trong tổng số {filteredPackages.length} gói
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

export default PackagesManagement;
