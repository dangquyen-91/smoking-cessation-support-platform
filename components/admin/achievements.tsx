"use client";

import React, { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
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
    Edit,
    Trash2,
    ChevronLeft,
    ChevronRight,
    Trophy,
    Award,
    Star,
    Medal,
    Target,
    Diamond,
} from "lucide-react";
import {
    useCreateAchievement,
    useDeleteAchievement,
    useGetAllAchievements,
} from "@/queries/achievements.query";
import { useToast } from "../ui/use-toast";

interface Achievement {
    id: number;
    name: string;
    description: string;
    badgeIcon: string;
    type:
        | "DAYS_SMOKE_FREE"
        | "MONEY_SAVED"
        | "STREAK"
        | "TIME_SAVING"
        | "CIGARETTES_AVOIDED";
    targetValue: number;
    targetMoney: number;
    level: "BRONZE" | "SILVER" | "GOLD" | "PLATINUM" | "DIAMOND";
    pointsAwarded: number;
    isShareable: boolean;
    createdAt: string;
}

interface CreateAchievementPayload {
    name: string;
    description: string;
    badgeIcon: string;
    type:
        | "DAYS_SMOKE_FREE"
        | "MONEY_SAVED"
        | "STREAK"
        | "TIME_SAVING"
        | "CIGARETTES_AVOIDED";
    targetValue: number;
    targetMoney: number;
    level: "BRONZE" | "SILVER" | "GOLD" | "PLATINUM" | "DIAMOND";
    pointsAwarded: number;
    isShareable: boolean;
}

export function AchievementsManagement() {
    const { data: listAchievements } = useGetAllAchievements();
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [typeFilter, setTypeFilter] = useState("ALL");
    const [levelFilter, setLevelFilter] = useState("ALL");
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
    const [newAchievement, setNewAchievement] =
        useState<CreateAchievementPayload>({
            name: "",
            description: "",
            badgeIcon: "",
            type: "DAYS_SMOKE_FREE",
            targetValue: 0,
            targetMoney: 0,
            level: "BRONZE",
            pointsAwarded: 0,
            isShareable: true,
        });
    const { toast } = useToast();
    const ITEMS_PER_PAGE = 10;

    const filteredAchievements = useMemo(() => {
        if (!listAchievements) return [];

        return listAchievements.filter((achievement: Achievement) => {
            const matchesSearch =
                achievement.name
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                achievement.description
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase());

            const matchesType =
                typeFilter === "ALL" || achievement.type === typeFilter;
            const matchesLevel =
                levelFilter === "ALL" || achievement.level === levelFilter;

            return matchesSearch && matchesType && matchesLevel;
        });
    }, [listAchievements, searchTerm, typeFilter, levelFilter]);

    const paginatedAchievements = useMemo(() => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        const endIndex = startIndex + ITEMS_PER_PAGE;
        return filteredAchievements.slice(startIndex, endIndex);
    }, [filteredAchievements, currentPage]);

    const totalPages = Math.ceil(filteredAchievements.length / ITEMS_PER_PAGE);

    React.useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, typeFilter, levelFilter]);

    const getTypeBadge = (type: string) => {
        switch (type) {
            case "MONEY_SAVED":
                return (
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
                        Tiết kiệm tiền
                    </Badge>
                );
            case "STREAK":
                return (
                    <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">
                        Chuỗi ngày
                    </Badge>
                );
            case "CIGARETTES_AVOIDED":
                return (
                    <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-200">
                        Tránh thuốc lá
                    </Badge>
                );
            case "DAYS_SMOKE_FREE":
                return (
                    <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200">
                        Ngày không hút
                    </Badge>
                );
            case "TIME_SAVING":
                return (
                    <Badge className="bg-cyan-100 text-cyan-800 hover:bg-cyan-200">
                        Tiết kiệm thời gian
                    </Badge>
                );
            default:
                return <Badge variant="outline">{type}</Badge>;
        }
    };

    const getLevelBadge = (level: string) => {
        switch (level) {
            case "BRONZE":
                return (
                    <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200">
                        <Medal className="w-3 h-3 mr-1" />
                        Đồng
                    </Badge>
                );
            case "SILVER":
                return (
                    <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200">
                        <Award className="w-3 h-3 mr-1" />
                        Bạc
                    </Badge>
                );
            case "GOLD":
                return (
                    <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">
                        <Trophy className="w-3 h-3 mr-1" />
                        Vàng
                    </Badge>
                );
            case "PLATINUM":
                return (
                    <Badge className="bg-indigo-100 text-indigo-800 hover:bg-indigo-200">
                        <Star className="w-3 h-3 mr-1" />
                        Bạch kim
                    </Badge>
                );
            case "DIAMOND":
                return (
                    <Badge className="bg-pink-100 text-pink-800 hover:bg-pink-200">
                        <Diamond className="w-3 h-3 mr-1" />
                        Kim cương
                    </Badge>
                );
            default:
                return <Badge variant="outline">{level}</Badge>;
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

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
        }).format(amount);
    };

    const { mutateAsync: createAchievements } = useCreateAchievement();

    const handleCreateAchievement = async () => {
        try {
            await createAchievements(
                newAchievement as CreateAchievementPayload
            );

            toast({
                title: "Thành công",
                description: "Tạo danh hiệu mới thành công",
            });

            setNewAchievement({
                name: "",
                description: "",
                badgeIcon: "",
                type: "DAYS_SMOKE_FREE",
                targetValue: 0,
                targetMoney: 0,
                level: "BRONZE",
                pointsAwarded: 0,
                isShareable: true,
            });
            setIsCreateDialogOpen(false);
        } catch (error) {
            console.error("Error creating achievement:", error);
            toast({
                title: "Lỗi",
                description: "Có lỗi xảy ra khi tạo danh hiệu",
                variant: "destructive",
            });
        }
    };

    const { mutateAsync: deleteAchievement } = useDeleteAchievement();
    const handleDeleteAchievement = async (achievementId: number) => {
        try {
            await deleteAchievement(achievementId);
            toast({
                title: "Thành công",
                description: "Xóa danh hiệu thành công",
                variant: "success",
            });
        } catch (error) {
            console.error("Error deleting achievement:", error);
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

    const levelCounts =
        listAchievements?.reduce((acc: any, achievement: Achievement) => {
            acc[achievement.level] = (acc[achievement.level] || 0) + 1;
            return acc;
        }, {}) || {};

    const shareableCount =
        listAchievements?.filter(
            (achievement: Achievement) => achievement.isShareable
        ).length || 0;

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">
                        Quản lý danh hiệu
                    </h1>
                    <p className="text-gray-600 mt-1">
                        Quản lý và tạo các danh hiệu cho người dùng
                    </p>
                </div>

                <Dialog
                    open={isCreateDialogOpen}
                    onOpenChange={setIsCreateDialogOpen}
                >
                    <DialogTrigger asChild>
                        <Button className="flex items-center gap-2">
                            <Plus className="h-4 w-4" />
                            Tạo danh hiệu mới
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                            <DialogTitle>Tạo danh hiệu mới</DialogTitle>
                            <DialogDescription>
                                Tạo danh hiệu mới cho người dùng đạt được mục
                                tiêu
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="name">
                                        Tên danh hiệu *
                                    </Label>
                                    <Input
                                        id="name"
                                        value={newAchievement.name}
                                        onChange={(e) =>
                                            setNewAchievement({
                                                ...newAchievement,
                                                name: e.target.value,
                                            })
                                        }
                                        placeholder="Nhập tên danh hiệu..."
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="badgeIcon">
                                        URL icon *
                                    </Label>
                                    <Input
                                        id="badgeIcon"
                                        value={newAchievement.badgeIcon}
                                        onChange={(e) =>
                                            setNewAchievement({
                                                ...newAchievement,
                                                badgeIcon: e.target.value,
                                            })
                                        }
                                        placeholder="https://example.com/icon.png"
                                    />
                                </div>
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="description">Mô tả *</Label>
                                <Textarea
                                    id="description"
                                    value={newAchievement.description}
                                    onChange={(e) =>
                                        setNewAchievement({
                                            ...newAchievement,
                                            description: e.target.value,
                                        })
                                    }
                                    placeholder="Nhập mô tả danh hiệu..."
                                    rows={3}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="type">
                                        Loại danh hiệu *
                                    </Label>
                                    <Select
                                        value={newAchievement.type}
                                        onValueChange={(value) =>
                                            setNewAchievement({
                                                ...newAchievement,
                                                type: value as any,
                                            })
                                        }
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Chọn loại danh hiệu" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="DAYS_SMOKE_FREE">
                                                Ngày không hút thuốc
                                            </SelectItem>
                                            <SelectItem value="MONEY_SAVED">
                                                Tiết kiệm tiền
                                            </SelectItem>
                                            <SelectItem value="STREAK">
                                                Chuỗi ngày
                                            </SelectItem>
                                            <SelectItem value="TIME_SAVING">
                                                Tiết kiệm thời gian
                                            </SelectItem>
                                            <SelectItem value="CIGARETTES_AVOIDED">
                                                Tránh thuốc lá
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="level">Cấp độ *</Label>
                                    <Select
                                        value={newAchievement.level}
                                        onValueChange={(value) =>
                                            setNewAchievement({
                                                ...newAchievement,
                                                level: value as any,
                                            })
                                        }
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Chọn cấp độ" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="BRONZE">
                                                Đồng
                                            </SelectItem>
                                            <SelectItem value="SILVER">
                                                Bạc
                                            </SelectItem>
                                            <SelectItem value="GOLD">
                                                Vàng
                                            </SelectItem>
                                            <SelectItem value="PLATINUM">
                                                Bạch kim
                                            </SelectItem>
                                            <SelectItem value="DIAMOND">
                                                Kim cương
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="targetValue">
                                        Giá trị mục tiêu *
                                    </Label>
                                    <Input
                                        id="targetValue"
                                        type="number"
                                        value={newAchievement.targetValue}
                                        onChange={(e) =>
                                            setNewAchievement({
                                                ...newAchievement,
                                                targetValue:
                                                    parseInt(e.target.value) ||
                                                    0,
                                            })
                                        }
                                        placeholder="0"
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="targetMoney">
                                        Mục tiêu tiền (VND)
                                    </Label>
                                    <Input
                                        id="targetMoney"
                                        type="number"
                                        value={newAchievement.targetMoney}
                                        onChange={(e) =>
                                            setNewAchievement({
                                                ...newAchievement,
                                                targetMoney:
                                                    parseInt(e.target.value) ||
                                                    0,
                                            })
                                        }
                                        placeholder="0"
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="pointsAwarded">
                                        Điểm thưởng
                                    </Label>
                                    <Input
                                        id="pointsAwarded"
                                        type="number"
                                        value={newAchievement.pointsAwarded}
                                        onChange={(e) =>
                                            setNewAchievement({
                                                ...newAchievement,
                                                pointsAwarded:
                                                    parseInt(e.target.value) ||
                                                    0,
                                            })
                                        }
                                        placeholder="0"
                                    />
                                </div>
                            </div>

                            <div className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    id="isShareable"
                                    checked={newAchievement.isShareable}
                                    onChange={(e) =>
                                        setNewAchievement({
                                            ...newAchievement,
                                            isShareable: e.target.checked,
                                        })
                                    }
                                    className="rounded border-gray-300"
                                />
                                <Label htmlFor="isShareable">
                                    Có thể chia sẻ
                                </Label>
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
                                onClick={handleCreateAchievement}
                                disabled={
                                    !newAchievement.name.trim() ||
                                    !newAchievement.description.trim() ||
                                    !newAchievement.badgeIcon.trim()
                                }
                            >
                                Tạo danh hiệu
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
                                <Trophy className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                                <div className="text-2xl font-bold">
                                    {listAchievements?.length || 0}
                                </div>
                                <p className="text-sm text-gray-600">
                                    Tổng danh hiệu
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-green-100 rounded-lg">
                                <Award className="h-5 w-5 text-green-600" />
                            </div>
                            <div>
                                <div className="text-2xl font-bold">
                                    {shareableCount}
                                </div>
                                <p className="text-sm text-gray-600">
                                    Có thể chia sẻ
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-yellow-100 rounded-lg">
                                <Star className="h-5 w-5 text-yellow-600" />
                            </div>
                            <div>
                                <div className="text-2xl font-bold">
                                    {levelCounts.GOLD +
                                        levelCounts.PLATINUM +
                                        levelCounts.DIAMOND || 0}
                                </div>
                                <p className="text-sm text-gray-600">
                                    Cấp độ cao
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-purple-100 rounded-lg">
                                <Target className="h-5 w-5 text-purple-600" />
                            </div>
                            <div>
                                <div className="text-2xl font-bold">
                                    {listAchievements?.filter(
                                        (a: Achievement) =>
                                            a.type === "DAYS_SMOKE_FREE"
                                    ).length || 0}
                                </div>
                                <p className="text-sm text-gray-600">
                                    Ngày không hút
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
                                value={typeFilter}
                                onValueChange={setTypeFilter}
                            >
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Loại danh hiệu" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="ALL">Tất cả</SelectItem>
                                    <SelectItem value="DAYS_SMOKE_FREE">
                                        Ngày không hút
                                    </SelectItem>
                                    <SelectItem value="MONEY_SAVED">
                                        Tiết kiệm tiền
                                    </SelectItem>
                                    <SelectItem value="STREAK">
                                        Chuỗi ngày
                                    </SelectItem>
                                    <SelectItem value="TIME_SAVING">
                                        Tiết kiệm thời gian
                                    </SelectItem>
                                    <SelectItem value="CIGARETTES_AVOIDED">
                                        Tránh thuốc lá
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                            <Select
                                value={levelFilter}
                                onValueChange={setLevelFilter}
                            >
                                <SelectTrigger className="w-[130px]">
                                    <SelectValue placeholder="Cấp độ" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="ALL">Tất cả</SelectItem>
                                    <SelectItem value="BRONZE">Đồng</SelectItem>
                                    <SelectItem value="SILVER">Bạc</SelectItem>
                                    <SelectItem value="GOLD">Vàng</SelectItem>
                                    <SelectItem value="PLATINUM">
                                        Bạch kim
                                    </SelectItem>
                                    <SelectItem value="DIAMOND">
                                        Kim cương
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Achievements Table */}
            <Card>
                <CardHeader>
                    <CardTitle>Danh sách danh hiệu</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="border rounded-lg">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-gray-50">
                                    <TableHead className="font-semibold">
                                        Danh hiệu
                                    </TableHead>
                                    <TableHead className="font-semibold">
                                        Loại & Cấp độ
                                    </TableHead>
                                    <TableHead className="font-semibold">
                                        Mục tiêu
                                    </TableHead>
                                    <TableHead className="font-semibold">
                                        Điểm thưởng
                                    </TableHead>
                                    <TableHead className="font-semibold">
                                        Có thể chia sẻ
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
                                {paginatedAchievements.length > 0 ? (
                                    paginatedAchievements.map(
                                        (achievement: Achievement) => (
                                            <TableRow
                                                key={achievement.id}
                                                className="hover:bg-gray-50"
                                            >
                                                <TableCell>
                                                    <div className="flex items-center gap-3">
                                                        <img
                                                            src={
                                                                achievement.badgeIcon
                                                            }
                                                            alt={
                                                                achievement.name
                                                            }
                                                            className="w-10 h-10 object-cover rounded-lg"
                                                            onError={(e) => {
                                                                (
                                                                    e.target as HTMLImageElement
                                                                ).src =
                                                                    "/placeholder-badge.png";
                                                            }}
                                                        />
                                                        <div>
                                                            <div className="font-medium">
                                                                {
                                                                    achievement.name
                                                                }
                                                            </div>
                                                            <div className="text-sm text-gray-500 max-w-xs truncate">
                                                                {
                                                                    achievement.description
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="space-y-1">
                                                        {getTypeBadge(
                                                            achievement.type
                                                        )}
                                                        {getLevelBadge(
                                                            achievement.level
                                                        )}
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="text-sm">
                                                        <div>
                                                            Giá trị:{" "}
                                                            {achievement.targetValue.toLocaleString()}
                                                        </div>
                                                        {achievement.targetMoney >
                                                            0 && (
                                                            <div className="text-gray-500">
                                                                {formatCurrency(
                                                                    achievement.targetMoney
                                                                )}
                                                            </div>
                                                        )}
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <Badge variant="outline">
                                                        {
                                                            achievement.pointsAwarded
                                                        }{" "}
                                                        điểm
                                                    </Badge>
                                                </TableCell>
                                                <TableCell>
                                                    {achievement.isShareable ? (
                                                        <Badge className="bg-green-100 text-green-800">
                                                            Có
                                                        </Badge>
                                                    ) : (
                                                        <Badge variant="outline">
                                                            Không
                                                        </Badge>
                                                    )}
                                                </TableCell>
                                                <TableCell>
                                                    <div className="text-sm">
                                                        {formatDate(
                                                            achievement.createdAt
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
                                                                <Edit className="mr-2 h-4 w-4" />
                                                                Chỉnh sửa
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
                                                                        Xóa danh
                                                                        hiệu
                                                                    </DropdownMenuItem>
                                                                </AlertDialogTrigger>
                                                                <AlertDialogContent>
                                                                    <AlertDialogHeader>
                                                                        <AlertDialogTitle>
                                                                            Xác
                                                                            nhận
                                                                            xóa
                                                                            danh
                                                                            hiệu
                                                                        </AlertDialogTitle>
                                                                        <AlertDialogDescription>
                                                                            Bạn
                                                                            có
                                                                            chắc
                                                                            chắn
                                                                            muốn
                                                                            xóa
                                                                            danh
                                                                            hiệu
                                                                            "
                                                                            {
                                                                                achievement.name
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
                                                                                handleDeleteAchievement(
                                                                                    achievement.id
                                                                                )
                                                                            }
                                                                            className="bg-red-600 hover:bg-red-700"
                                                                        >
                                                                            Xóa
                                                                            danh
                                                                            hiệu
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
                                                <Trophy className="h-8 w-8 text-gray-400" />
                                                <p className="text-gray-500">
                                                    {searchTerm ||
                                                    typeFilter !== "ALL" ||
                                                    levelFilter !== "ALL"
                                                        ? "Không tìm thấy danh hiệu nào"
                                                        : "Chưa có danh hiệu nào"}
                                                </p>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>

                    {/* Pagination */}
                    {filteredAchievements.length > 0 && (
                        <div className="flex items-center justify-between mt-6">
                            <div className="text-sm text-gray-600">
                                Hiển thị{" "}
                                {(currentPage - 1) * ITEMS_PER_PAGE + 1} đến{" "}
                                {Math.min(
                                    currentPage * ITEMS_PER_PAGE,
                                    filteredAchievements.length
                                )}{" "}
                                trong tổng số {filteredAchievements.length} danh
                                hiệu
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
