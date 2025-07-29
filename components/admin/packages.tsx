"use client";
import { useState, useMemo, useEffect, useCallback } from "react";
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
    Loader2,
} from "lucide-react";
import { useCreatePackage, useGetAllPackages } from "./package.query";
import utils from "@/utils/utils";

interface PackageInterface {
    id: number;
    name: string;
    description: string;
    totalDays: number;
    featured: string;
    imageUrl: string;
    price: number;
    salePrice: number;
    packageType: "BEGINNER" | "INTERMEDIATE" | "ADVANCED" | "PREMIUM";
    userId?: number;
    active: boolean;
    rating?: number | null;
    totalRating?: number;
}

interface CreatePackagePayload {
    name: string;
    description: string;
    totalDays: number;
    featured: string[];
    imageUrl: string;
    price: number;
    salePrice: number;
    packageType: "BEGINNER" | "INTERMEDIATE" | "ADVANCED" | "PREMIUM";
    userId: number;
    active: boolean;
}

// Available features for packages
const PACKAGE_TYPES = [
    {
        value: "BEGINNER",
        label: "Gói bắt đầu",
        color: "bg-green-100 text-green-800",
    },
    {
        value: "INTERMEDIATE",
        label: "Gói Trung cấp",
        color: "bg-blue-100 text-blue-800",
    },
    {
        value: "ADVANCED",
        label: "Gói Cao cấp",
        color: "bg-purple-100 text-purple-800",
    },
];

export function PackagesManagement() {
    const [packages, setPackages] = useState<PackageInterface[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [statusFilter, setStatusFilter] = useState("ALL");
    const [typeFilter, setTypeFilter] = useState("ALL");
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

    const { mutateAsync: createPackage } = useCreatePackage();
    const { data: listPackages, isLoading, error } = useGetAllPackages();

    const [newPackage, setNewPackage] = useState<CreatePackagePayload>({
        name: "",
        description: "",
        totalDays: 0,
        featured: [],
        imageUrl: "",
        price: 0,
        salePrice: 0,
        packageType: "BEGINNER",
        userId: 1,
        active: true,
    });

    // Sync data from API to local state
    useEffect(() => {
        if (
            listPackages &&
            Array.isArray(listPackages) &&
            listPackages.length !== packages.length
        ) {
            setPackages(listPackages);
        }
    }, [listPackages]);

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
                    typeFilter === "ALL" || pkg.packageType === typeFilter;
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

    const getPackageTypeBadge = (packageType: string) => {
        const type = PACKAGE_TYPES.find((t) => t.value === packageType);
        return (
            <Badge className={type?.color || "bg-gray-100 text-gray-800"}>
                {type?.label || packageType}
            </Badge>
        );
    };

    const formatPrice = (price: number) =>
        new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
        }).format(price);

    const handleCreatePackage = useCallback(async () => {
        try {
            // Filter out empty features before stringify
            const filteredFeatures = newPackage.featured.filter(
                (feature) => feature.trim() !== ""
            );
            // Simulate API call - stringify the featured array before sending
            const payload = {
                ...newPackage,
                id: 0,
                featured: JSON.stringify(filteredFeatures),
            };
            console.log("Creating package with payload:", payload);
            await createPackage(payload);
            const newId = Math.max(...packages.map((p) => p.id), 0) + 1;
            const created: PackageInterface = {
                ...payload,
                id: newId,
                rating: null,
                totalRating: 0,
            };
            setPackages((prev) => [created, ...prev]);
            setNewPackage({
                name: "",
                description: "",
                totalDays: 0,
                featured: [],
                imageUrl: "",
                price: 0,
                salePrice: 0,
                packageType: "BEGINNER",
                userId: utils.getUserId(),
                active: true,
            });
            setIsCreateDialogOpen(false);
        } catch (error) {
            console.error("Error creating package:", error);
        }
    }, [newPackage, packages, createPackage]);

    const handleDeletePackage = useCallback(async (packageId: number) => {
        try {
            setPackages((prev) => prev.filter((p) => p.id !== packageId));
        } catch (error) {
            console.error("Error deleting package:", error);
        }
    }, []);

    const handleToggleStatus = useCallback(async (packageId: number) => {
        try {
            setPackages((prev) =>
                prev.map((p) =>
                    p.id === packageId ? { ...p, active: !p.active } : p
                )
            );
        } catch (error) {
            console.error("Error toggling package status:", error);
        }
    }, []);

    const handlePageChange = useCallback(
        (page: number) => {
            if (page >= 1 && page <= totalPages) {
                setCurrentPage(page);
            }
        },
        [totalPages]
    );

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

    const parseFeatures = (featuredString: string): string[] => {
        try {
            return JSON.parse(featuredString);
        } catch {
            return [];
        }
    };

    // Loading state
    if (isLoading) {
        return (
            <div className="p-6 space-y-6">
                <div className="flex items-center justify-center h-64">
                    <div className="flex items-center gap-2">
                        <Loader2 className="h-6 w-6 animate-spin" />
                        <span>Đang tải dữ liệu...</span>
                    </div>
                </div>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="p-6 space-y-6">
                <div className="flex items-center justify-center h-64">
                    <div className="text-center">
                        <div className="text-red-600 mb-2">
                            Có lỗi xảy ra khi tải dữ liệu
                        </div>
                        <Button onClick={() => window.location.reload()}>
                            Thử lại
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">
                        Quản lý gói thành viên
                    </h1>
                    {/* <p className="text-gray-600 mt-1">
                        Quản lý các gói tập luyện và dịch vụ của phòng gym
                    </p> */}
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
                    <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                            <DialogTitle>Tạo gói tập mới</DialogTitle>
                            <DialogDescription>
                                Tạo gói tập mới cho hệ thống
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-6 py-4">
                            {/* Basic Information */}
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
                            {/* Pricing */}
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
                            {/* Package Type */}
                            <div className="grid gap-2">
                                <Label htmlFor="packageType">Loại gói *</Label>
                                <Select
                                    value={newPackage.packageType}
                                    onValueChange={(value) => {
                                        setNewPackage((prev) => ({
                                            ...prev,
                                            packageType: value as
                                                | "BEGINNER"
                                                | "INTERMEDIATE"
                                                | "ADVANCED"
                                                | "PREMIUM",
                                        }));
                                    }}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Chọn loại gói" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {PACKAGE_TYPES.map((type) => (
                                            <SelectItem
                                                key={type.value}
                                                value={type.value}
                                            >
                                                {type.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            {/* Features - Dynamic Input */}
                            <div className="grid gap-3">
                                <div className="flex items-center justify-between">
                                    <Label>Tính năng gói</Label>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={() =>
                                            setNewPackage((prev) => ({
                                                ...prev,
                                                featured: [
                                                    ...prev.featured,
                                                    "",
                                                ],
                                            }))
                                        }
                                        className="flex items-center gap-1"
                                    >
                                        <Plus className="h-4 w-4" />
                                        Thêm tính năng
                                    </Button>
                                </div>
                                <div className="space-y-2 max-h-48 overflow-y-auto">
                                    {newPackage.featured.length === 0 ? (
                                        <div className="text-sm text-gray-500 text-center py-4 border-2 border-dashed border-gray-200 rounded-lg">
                                            Chưa có tính năng nào. Nhấn "Thêm
                                            tính năng" để bắt đầu.
                                        </div>
                                    ) : (
                                        newPackage.featured.map(
                                            (feature, index) => (
                                                <div
                                                    key={index}
                                                    className="flex items-center gap-2"
                                                >
                                                    <div className="flex-1">
                                                        <Input
                                                            value={feature}
                                                            onChange={(e) => {
                                                                const updatedFeatures =
                                                                    [
                                                                        ...newPackage.featured,
                                                                    ];
                                                                updatedFeatures[
                                                                    index
                                                                ] =
                                                                    e.target.value;
                                                                setNewPackage(
                                                                    (prev) => ({
                                                                        ...prev,
                                                                        featured:
                                                                            updatedFeatures,
                                                                    })
                                                                );
                                                            }}
                                                            placeholder={`Tính năng ${
                                                                index + 1
                                                            }...`}
                                                            className="w-full"
                                                        />
                                                    </div>
                                                    <Button
                                                        type="button"
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => {
                                                            const updatedFeatures =
                                                                newPackage.featured.filter(
                                                                    (_, i) =>
                                                                        i !==
                                                                        index
                                                                );
                                                            setNewPackage(
                                                                (prev) => ({
                                                                    ...prev,
                                                                    featured:
                                                                        updatedFeatures,
                                                                })
                                                            );
                                                        }}
                                                        className="flex-shrink-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            )
                                        )
                                    )}
                                </div>
                                {newPackage.featured.length > 0 && (
                                    <div className="text-sm text-gray-600">
                                        Tổng cộng:{" "}
                                        {
                                            newPackage.featured.filter((f) =>
                                                f.trim()
                                            ).length
                                        }{" "}
                                        tính năng
                                    </div>
                                )}
                            </div>
                            {/* Status */}
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
                                <Label htmlFor="active">Kích hoạt gói</Label>
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
                                    !newPackage.description.trim() ||
                                    newPackage.totalDays <= 0 ||
                                    newPackage.price <= 0 ||
                                    newPackage.salePrice <= 0 ||
                                    newPackage.featured.filter((f) => f.trim())
                                        .length === 0
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
                                <div className="h-5 w-5 text-blue-600">📦</div>
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
                                onValueChange={(value) =>
                                    setStatusFilter(value)
                                }
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
                                onValueChange={(value) => setTypeFilter(value)}
                            >
                                <SelectTrigger className="w-[150px]">
                                    <SelectValue placeholder="Loại gói" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="ALL">Tất cả</SelectItem>
                                    {PACKAGE_TYPES.map((type) => (
                                        <SelectItem
                                            key={type.value}
                                            value={type.value}
                                        >
                                            {type.label}
                                        </SelectItem>
                                    ))}
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
                                        Loại gói
                                    </TableHead>
                                    <TableHead className="font-semibold">
                                        Tính năng
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
                                                                    "/placeholder.svg?height=40&width=40" ||
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
                                                    {getPackageTypeBadge(
                                                        pkg.packageType
                                                    )}
                                                </TableCell>
                                                <TableCell>
                                                    <div className="max-w-xs">
                                                        {parseFeatures(
                                                            pkg.featured
                                                        ).length > 0 ? (
                                                            <div className="text-sm">
                                                                <span className="font-medium">
                                                                    {
                                                                        parseFeatures(
                                                                            pkg.featured
                                                                        ).length
                                                                    }{" "}
                                                                    tính năng
                                                                </span>
                                                                <div className="text-gray-500 truncate">
                                                                    {parseFeatures(
                                                                        pkg.featured
                                                                    )
                                                                        .slice(
                                                                            0,
                                                                            2
                                                                        )
                                                                        .join(
                                                                            ", "
                                                                        )}
                                                                    {parseFeatures(
                                                                        pkg.featured
                                                                    ).length >
                                                                        2 &&
                                                                        "..."}
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            <span className="text-gray-400 text-sm">
                                                                Không có tính
                                                                năng
                                                            </span>
                                                        )}
                                                    </div>
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
                                                    📦
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
