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
    Eye,
    Edit,
    Trash2,
    Pin,
    PinOff,
    ChevronLeft,
    ChevronRight,
    MessageCircle,
    Heart,
    Share2,
    Users,
    TrendingUp,
    Activity,
} from "lucide-react";
import {
    useCreateSocialPost,
    useDeleteSocialPost,
    useGetAllSocialPost,
} from "@/queries/scoial-post.query";
import { useToast } from "../ui/use-toast";

interface SocialPost {
    id: number;
    user: {
        id: number;
        username: string;
        email: string;
        fullName: string;
        phone: string;
        gender: string;
        age: number;
        profileImage: string | null;
        status: string;
        roles: Array<{
            id: number;
            name: string;
            description: string;
        }>;
        membershipPackage: string | null;
        membershipExpiry: string | null;
        createdAt: string;
        updatedAt: string;
    };
    content: string;
    type: string;
    sharedAchievement: any;
    likesCount: number;
    commentsCount: number;
    isPinned: boolean;
    status: string;
    createdAt: string;
    updatedAt: string;
}

interface CreateSocialPostPayload {
    content: string;
    type:
        | "ACHIEVEMENT_SHARE"
        | "MOTIVATION"
        | "EXPERIENCE_SHARE"
        | "QUESTION"
        | "ADVICE";
}

export function SocialPostManagement() {
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [statusFilter, setStatusFilter] = useState("ALL");
    const [typeFilter, setTypeFilter] = useState("ALL");
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
    const [newPost, setNewPost] = useState<CreateSocialPostPayload>({
        content: "",
        type: "ACHIEVEMENT_SHARE",
    });
    const { mutateAsync: createSocialPost } = useCreateSocialPost();
    const { data: listSocialPost } = useGetAllSocialPost();
    const { mutateAsync: deletePost } = useDeleteSocialPost();
    const { toast } = useToast();
    const POSTS_PER_PAGE = 10;

    const filteredPosts = useMemo(() => {
        if (!listSocialPost) return [];

        return listSocialPost.filter((post: SocialPost) => {
            const matchesSearch =
                post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                post.user.fullName
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                post.user.username
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase());

            const matchesStatus =
                statusFilter === "ALL" || post.status === statusFilter;
            const matchesType =
                typeFilter === "ALL" || post.type === typeFilter;

            return matchesSearch && matchesStatus && matchesType;
        });
    }, [listSocialPost, searchTerm, statusFilter, typeFilter]);

    const paginatedPosts = useMemo(() => {
        const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
        const endIndex = startIndex + POSTS_PER_PAGE;
        return filteredPosts.slice(startIndex, endIndex);
    }, [filteredPosts, currentPage]);

    const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);

    React.useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, statusFilter, typeFilter]);

    const getStatusBadge = (status: string) => {
        switch (status.toUpperCase()) {
            case "ACTIVE":
                return (
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
                        Hoạt động
                    </Badge>
                );
            case "INACTIVE":
                return (
                    <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200">
                        Không hoạt động
                    </Badge>
                );
            case "PENDING":
                return (
                    <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">
                        Chờ duyệt
                    </Badge>
                );
            case "HIDDEN":
                return (
                    <Badge className="bg-red-100 text-red-800 hover:bg-red-200">
                        Đã ẩn
                    </Badge>
                );
            default:
                return <Badge variant="secondary">{status}</Badge>;
        }
    };

    const getTypeBadge = (type: string) => {
        switch (type) {
            case "ACHIEVEMENT_SHARE":
                return (
                    <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">
                        Chia sẻ huy hiệu
                    </Badge>
                );
            case "MOTIVATION":
                return (
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
                        Động viên
                    </Badge>
                );
            case "EXPERIENCE_SHARE":
                return (
                    <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200">
                        Chia sẻ kinh nghiệm
                    </Badge>
                );
            case "QUESTION":
                return (
                    <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-200">
                        Đặt câu hỏi
                    </Badge>
                );
            case "ADVICE":
                return (
                    <Badge className="bg-indigo-100 text-indigo-800 hover:bg-indigo-200">
                        Lời khuyên
                    </Badge>
                );
            default:
                return <Badge variant="outline">{type}</Badge>;
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

    const handleCreatePost = async () => {
        try {
            // TODO: Implement API call to create social post
            const payload = {
                id: 3,
                content: newPost.content,
                type: newPost.type,
            };

            await createSocialPost(payload);

            toast({
                title: "Thành công",
                description: "Tạo bài đăng mới thành công",
            });

            setNewPost({
                content: "",
                type: "ACHIEVEMENT_SHARE",
            });
            setIsCreateDialogOpen(false);
        } catch (error) {
            console.error("Error creating post:", error);
            toast({
                title: "Lỗi",
                description: "Có lỗi xảy ra khi tạo bài đăng",
                variant: "destructive",
            });
        }
    };

    const handleDeletePost = async (postId: number) => {
        try {
            await deletePost(postId);

            toast({
                title: "Thành công",
                description: "Xóa bài đăng thành công",
            });
        } catch (error) {
            console.error("Error deleting post:", error);
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

    const totalLikes =
        listSocialPost?.reduce(
            (sum: number, post: SocialPost) => sum + post.likesCount,
            0
        ) || 0;
    const totalComments =
        listSocialPost?.reduce(
            (sum: number, post: SocialPost) => sum + post.commentsCount,
            0
        ) || 0;
    const pinnedPostsCount =
        listSocialPost?.filter((post: SocialPost) => post.isPinned).length || 0;

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">
                        Quản lý bài đăng mạng xã hội
                    </h1>
                    <p className="text-gray-600 mt-1">
                        Quản lý và kiểm duyệt các bài đăng trên mạng xã hội
                    </p>
                </div>

                <Dialog
                    open={isCreateDialogOpen}
                    onOpenChange={setIsCreateDialogOpen}
                >
                    <DialogTrigger asChild>
                        <Button className="flex items-center gap-2">
                            <Plus className="h-4 w-4" />
                            Tạo bài đăng mới
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-lg">
                        <DialogHeader>
                            <DialogTitle>Tạo bài đăng mới</DialogTitle>
                            <DialogDescription>
                                Tạo bài đăng mới cho cộng đồng
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                                <Label htmlFor="type">Loại bài đăng *</Label>
                                <Select
                                    value={newPost.type}
                                    onValueChange={(value) =>
                                        setNewPost({
                                            ...newPost,
                                            type: value as
                                                | "ACHIEVEMENT_SHARE"
                                                | "MOTIVATION"
                                                | "EXPERIENCE_SHARE"
                                                | "QUESTION"
                                                | "ADVICE",
                                        })
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Chọn loại bài đăng" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="ACHIEVEMENT_SHARE">
                                            Chia sẻ huy hiệu
                                        </SelectItem>
                                        <SelectItem value="MOTIVATION">
                                            Động viên
                                        </SelectItem>
                                        <SelectItem value="EXPERIENCE_SHARE">
                                            Chia sẻ kinh nghiệm
                                        </SelectItem>
                                        <SelectItem value="QUESTION">
                                            Đặt câu hỏi
                                        </SelectItem>
                                        <SelectItem value="ADVICE">
                                            Lời khuyên
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="content">Nội dung *</Label>
                                <Textarea
                                    id="content"
                                    value={newPost.content}
                                    onChange={(e) =>
                                        setNewPost({
                                            ...newPost,
                                            content: e.target.value,
                                        })
                                    }
                                    placeholder="Nhập nội dung bài đăng..."
                                    rows={6}
                                />
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
                                onClick={handleCreatePost}
                                disabled={!newPost.content.trim()}
                            >
                                Tạo bài đăng
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
                                <Share2 className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                                <div className="text-2xl font-bold">
                                    {listSocialPost?.length || 0}
                                </div>
                                <p className="text-sm text-gray-600">
                                    Tổng bài đăng
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-green-100 rounded-lg">
                                <Heart className="h-5 w-5 text-green-600" />
                            </div>
                            <div>
                                <div className="text-2xl font-bold">
                                    {totalLikes}
                                </div>
                                <p className="text-sm text-gray-600">
                                    Tổng lượt thích
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-yellow-100 rounded-lg">
                                <MessageCircle className="h-5 w-5 text-yellow-600" />
                            </div>
                            <div>
                                <div className="text-2xl font-bold">
                                    {totalComments}
                                </div>
                                <p className="text-sm text-gray-600">
                                    Tổng bình luận
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-purple-100 rounded-lg">
                                <Pin className="h-5 w-5 text-purple-600" />
                            </div>
                            <div>
                                <div className="text-2xl font-bold">
                                    {pinnedPostsCount}
                                </div>
                                <p className="text-sm text-gray-600">
                                    Bài đăng đã ghim
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
                                placeholder="Tìm kiếm theo nội dung, tác giả..."
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
                                    <SelectItem value="PENDING">
                                        Chờ duyệt
                                    </SelectItem>
                                    <SelectItem value="HIDDEN">
                                        Đã ẩn
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                            <Select
                                value={typeFilter}
                                onValueChange={setTypeFilter}
                            >
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Loại bài đăng" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="ALL">Tất cả</SelectItem>
                                    <SelectItem value="ACHIEVEMENT_SHARE">
                                        Chia sẻ huy hiệu
                                    </SelectItem>
                                    <SelectItem value="MOTIVATION">
                                        Động viên
                                    </SelectItem>
                                    <SelectItem value="EXPERIENCE_SHARE">
                                        Chia sẻ kinh nghiệm
                                    </SelectItem>
                                    <SelectItem value="QUESTION">
                                        Đặt câu hỏi
                                    </SelectItem>
                                    <SelectItem value="ADVICE">
                                        Lời khuyên
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Posts Table */}
            <Card>
                <CardHeader>
                    <CardTitle>Danh sách bài đăng</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="border rounded-lg">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-gray-50">
                                    <TableHead className="font-semibold">
                                        Nội dung
                                    </TableHead>
                                    <TableHead className="font-semibold">
                                        Tác giả
                                    </TableHead>
                                    <TableHead className="font-semibold">
                                        Loại
                                    </TableHead>
                                    <TableHead className="font-semibold">
                                        Tương tác
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
                                {paginatedPosts.length > 0 ? (
                                    paginatedPosts.map((post: SocialPost) => (
                                        <TableRow
                                            key={post.id}
                                            className="hover:bg-gray-50"
                                        >
                                            <TableCell>
                                                <div className="max-w-xs">
                                                    <div className="flex items-center gap-2">
                                                        {post.isPinned && (
                                                            <Pin className="h-3 w-3 text-blue-500" />
                                                        )}
                                                        <div
                                                            className="font-medium truncate"
                                                            title={post.content}
                                                        >
                                                            {post.content}
                                                        </div>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="font-medium">
                                                    {post.user.fullName}
                                                </div>
                                                <div className="text-sm text-gray-500">
                                                    @{post.user.username}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                {getTypeBadge(post.type)}
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-4 text-sm">
                                                    <div className="flex items-center gap-1">
                                                        <Heart className="h-4 w-4 text-red-500" />
                                                        <span>
                                                            {post.likesCount}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <MessageCircle className="h-4 w-4 text-blue-500" />
                                                        <span>
                                                            {post.commentsCount}
                                                        </span>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                {getStatusBadge(post.status)}
                                            </TableCell>
                                            <TableCell>
                                                <div className="text-sm">
                                                    {formatDate(post.createdAt)}
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
                                                        {/* <DropdownMenuItem>
                                                            <Eye className="mr-2 h-4 w-4" />
                                                            Xem chi tiết
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem>
                                                            <Edit className="mr-2 h-4 w-4" />
                                                            Chỉnh sửa
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem
                                                            onClick={() =>
                                                                handlePinPost(
                                                                    post.id,
                                                                    post.isPinned
                                                                )
                                                            }
                                                            className="text-blue-600 focus:text-blue-600"
                                                        >
                                                            {post.isPinned ? (
                                                                <>
                                                                    <PinOff className="mr-2 h-4 w-4" />
                                                                    Bỏ ghim
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <Pin className="mr-2 h-4 w-4" />
                                                                    Ghim bài
                                                                    đăng
                                                                </>
                                                            )}
                                                        </DropdownMenuItem> */}
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
                                                                    Xóa bài đăng
                                                                </DropdownMenuItem>
                                                            </AlertDialogTrigger>
                                                            <AlertDialogContent>
                                                                <AlertDialogHeader>
                                                                    <AlertDialogTitle>
                                                                        Xác nhận
                                                                        xóa bài
                                                                        đăng
                                                                    </AlertDialogTitle>
                                                                    <AlertDialogDescription>
                                                                        Bạn có
                                                                        chắc
                                                                        chắn
                                                                        muốn xóa
                                                                        bài đăng
                                                                        này?
                                                                        Hành
                                                                        động này
                                                                        không
                                                                        thể hoàn
                                                                        tác.
                                                                    </AlertDialogDescription>
                                                                </AlertDialogHeader>
                                                                <AlertDialogFooter>
                                                                    <AlertDialogCancel>
                                                                        Hủy
                                                                    </AlertDialogCancel>
                                                                    <AlertDialogAction
                                                                        onClick={() =>
                                                                            handleDeletePost(
                                                                                post.id
                                                                            )
                                                                        }
                                                                        className="bg-red-600 hover:bg-red-700"
                                                                    >
                                                                        Xóa bài
                                                                        đăng
                                                                    </AlertDialogAction>
                                                                </AlertDialogFooter>
                                                            </AlertDialogContent>
                                                        </AlertDialog>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell
                                            colSpan={7}
                                            className="text-center py-8"
                                        >
                                            <div className="flex flex-col items-center gap-2">
                                                <Share2 className="h-8 w-8 text-gray-400" />
                                                <p className="text-gray-500">
                                                    {searchTerm ||
                                                    statusFilter !== "ALL" ||
                                                    typeFilter !== "ALL"
                                                        ? "Không tìm thấy bài đăng nào"
                                                        : "Chưa có bài đăng nào"}
                                                </p>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>

                    {/* Pagination */}
                    {filteredPosts.length > 0 && (
                        <div className="flex items-center justify-between mt-6">
                            <div className="text-sm text-gray-600">
                                Hiển thị{" "}
                                {(currentPage - 1) * POSTS_PER_PAGE + 1} đến{" "}
                                {Math.min(
                                    currentPage * POSTS_PER_PAGE,
                                    filteredPosts.length
                                )}{" "}
                                trong tổng số {filteredPosts.length} bài đăng
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
