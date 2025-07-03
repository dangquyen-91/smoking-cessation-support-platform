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
    Search,
    MoreHorizontal,
    Plus,
    Eye,
    Edit,
    Trash2,
    Check,
    EyeOff,
    ChevronLeft,
    ChevronRight,
    FileText,
} from "lucide-react";
import {
    useCreateBlog,
    useDeleteBlog,
    useGetAllBlog,
    usePublishBlog,
} from "@/queries/blog.query";
import { useToast } from "../ui/use-toast";

interface BlogPost {
    id: number;
    author: {
        id: number;
        username: string;
        fullName: string;
    };
    title: string;
    excerpt: string;
    content: string;
    featuredImage: string;
    tags: string;
    viewsCount: number;
    likesCount: number;
    status: string;
    publishedAt: string | null;
    createdAt: string;
    updatedAt: string;
}

interface CreatePostPayload {
    authorId: number;
    title: string;
    content: string;
    excerpt: string;
    featuredImage: string;
    tags: string;
}

export function ContentManagement() {
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
    const [newPost, setNewPost] = useState<CreatePostPayload>({
        authorId: 3,
        title: "",
        content: "",
        excerpt: "",
        featuredImage: "",
        tags: "",
    });
    const [status, setStatus] = useState("PUBLISHED");
    const { data: listBlog } = useGetAllBlog(status);
    const { mutateAsync: createBlog } = useCreateBlog();
    const { mutateAsync: publishBlog } = usePublishBlog();
    const { mutateAsync: deleteBlog } = useDeleteBlog();
    const POSTS_PER_PAGE = 10;

    const filteredArticles = useMemo(() => {
        if (!listBlog) return [];

        return listBlog.filter(
            (article: BlogPost) =>
                article.title
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                article.author.fullName
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                article.tags.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [listBlog, searchTerm]);

    const paginatedArticles = useMemo(() => {
        const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
        const endIndex = startIndex + POSTS_PER_PAGE;
        return filteredArticles.slice(startIndex, endIndex);
    }, [filteredArticles, currentPage]);

    const totalPages = Math.ceil(filteredArticles.length / POSTS_PER_PAGE);

    React.useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm]);

    const getStatusBadge = (status: string) => {
        switch (status.toUpperCase()) {
            case "PUBLISHED":
                return (
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
                        Đã xuất bản
                    </Badge>
                );
            case "DRAFT":
                return (
                    <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">
                        Bản nháp
                    </Badge>
                );
            case "ARCHIVED":
                return (
                    <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">
                        Đã ẩn
                    </Badge>
                );
            case "HIDDEN":
                return (
                    <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200">
                        Đã ẩn
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
    const handleCreatePost = async () => {
        try {
            const [err] = await createBlog(newPost as CreatePostPayload);

            setNewPost({
                authorId: 3,
                title: "",
                content: "",
                excerpt: "",
                featuredImage: "",
                tags: "",
            });
            setIsCreateDialogOpen(false);
        } catch (error) {
            console.error("Error creating post:", error);
        }
    };

    const handleApprovePost = async (postId: number) => {
        try {
            const [err] = await publishBlog(postId);
            if (err) {
                return;
            }
        } catch (error) {
            console.error("Error approving post:", error);
        }
    };

    const handleHidePost = async (postId: number) => {
        try {
            // TODO: Implement API call to hide post
            console.log("Hiding post:", postId);
        } catch (error) {
            console.error("Error hiding post:", error);
        }
    };

    const handleDeletePost = async (postId: number) => {
        try {
            const [err] = await deleteBlog(postId);
            console.log("Deleting post:", postId);
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

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">
                        Quản lý bài viết
                    </h1>
                    <p className="text-gray-600 mt-1">
                        Quản lý và kiểm duyệt các bài viết trên hệ thống
                    </p>
                </div>

                <Dialog
                    open={isCreateDialogOpen}
                    onOpenChange={setIsCreateDialogOpen}
                >
                    <DialogTrigger asChild>
                        <Button className="flex items-center gap-2">
                            <Plus className="h-4 w-4" />
                            Tạo bài viết mới
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                            <DialogTitle>Tạo bài viết mới</DialogTitle>
                            <DialogDescription>
                                Điền thông tin để tạo bài viết mới
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                                <Label htmlFor="title">Tiêu đề *</Label>
                                <Input
                                    id="title"
                                    value={newPost.title}
                                    onChange={(e) =>
                                        setNewPost({
                                            ...newPost,
                                            title: e.target.value,
                                        })
                                    }
                                    placeholder="Nhập tiêu đề bài viết"
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="excerpt">Tóm tắt *</Label>
                                <Textarea
                                    id="excerpt"
                                    value={newPost.excerpt}
                                    onChange={(e) =>
                                        setNewPost({
                                            ...newPost,
                                            excerpt: e.target.value,
                                        })
                                    }
                                    placeholder="Nhập tóm tắt ngắn gọn về bài viết"
                                    rows={3}
                                />
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
                                    placeholder="Nhập nội dung chi tiết của bài viết"
                                    rows={8}
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="featuredImage">
                                    Ảnh đại diện (URL)
                                </Label>
                                <Input
                                    id="featuredImage"
                                    value={newPost.featuredImage}
                                    onChange={(e) =>
                                        setNewPost({
                                            ...newPost,
                                            featuredImage: e.target.value,
                                        })
                                    }
                                    placeholder="https://example.com/image.jpg"
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="tags">Tags</Label>
                                <Input
                                    id="tags"
                                    value={newPost.tags}
                                    onChange={(e) =>
                                        setNewPost({
                                            ...newPost,
                                            tags: e.target.value,
                                        })
                                    }
                                    placeholder="cai thuốc lá, sức khỏe, hướng dẫn"
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
                                disabled={
                                    !newPost.title ||
                                    !newPost.excerpt ||
                                    !newPost.content
                                }
                            >
                                Tạo bài viết
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
                                <FileText className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                                <div className="text-2xl font-bold">
                                    {listBlog?.length || 0}
                                </div>
                                <p className="text-sm text-gray-600">
                                    Tổng bài viết
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-green-100 rounded-lg">
                                <Check className="h-5 w-5 text-green-600" />
                            </div>
                            <div>
                                <div className="text-2xl font-bold">
                                    {listBlog?.filter(
                                        (post: BlogPost) =>
                                            post.status === "PUBLISHED"
                                    ).length || 0}
                                </div>
                                <p className="text-sm text-gray-600">
                                    Đã xuất bản
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-yellow-100 rounded-lg">
                                <Eye className="h-5 w-5 text-yellow-600" />
                            </div>
                            <div>
                                <div className="text-2xl font-bold">
                                    {listBlog?.filter(
                                        (post: BlogPost) =>
                                            post.status === "PENDING"
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
                        <div>
                            <div className="text-2xl font-bold">
                                {listBlog?.reduce(
                                    (total: number, post: BlogPost) =>
                                        total + post.viewsCount,
                                    0
                                ) || 0}
                            </div>
                            <p className="text-sm text-gray-600">
                                Tổng lượt xem
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Search */}
            {/* <Card>
                <CardContent className="pt-6">
                    <div className="relative max-w-md">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                            placeholder="Tìm kiếm theo tiêu đề, tác giả, tags..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10"
                        />
                    </div>
                </CardContent>
            </Card> */}

            {/* Articles Table */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                        <div className="flex flex-col gap-2">
                            <div className="flex justify-between w-full items-center gap-2">
                                <span>Danh sách bài viết</span>
                            </div>
                            <div className="flex items-center gap-2 mt-1">
                                <Badge
                                    className={`${
                                        status === "PUBLISHED"
                                            ? "bg-green-100 text-green-800"
                                            : "bg-gray-100 text-gray-800"
                                    } cursor-pointer`}
                                    variant="outline"
                                    onClick={() => setStatus("PUBLISHED")}
                                >
                                    Đã duyệt
                                </Badge>
                                <Badge
                                    className={`${
                                        status === "DRAFT"
                                            ? "bg-green-100 text-green-800"
                                            : "bg-gray-100 text-gray-800"
                                    } cursor-pointer`}
                                    variant="outline"
                                    onClick={() => setStatus("DRAFT")}
                                >
                                    Chờ duyệt
                                </Badge>
                                <Badge
                                    className={`${
                                        status === "ARCHIVED"
                                            ? "bg-green-100 text-green-800"
                                            : "bg-gray-100 text-gray-800"
                                    } cursor-pointer`}
                                    variant="outline"
                                    onClick={() => setStatus("ARCHIVED")}
                                >
                                    Đã ẩn
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
                                        Bài viết
                                    </TableHead>
                                    <TableHead className="font-semibold">
                                        Tác giả
                                    </TableHead>
                                    <TableHead className="font-semibold">
                                        Tags
                                    </TableHead>
                                    <TableHead className="font-semibold">
                                        Trạng thái
                                    </TableHead>
                                    <TableHead className="font-semibold">
                                        Lượt xem
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
                                {paginatedArticles.length > 0 ? (
                                    paginatedArticles.map(
                                        (article: BlogPost) => (
                                            <TableRow
                                                key={article.id}
                                                className="hover:bg-gray-50"
                                            >
                                                <TableCell>
                                                    <div className="max-w-xs">
                                                        <div
                                                            className="font-medium truncate"
                                                            title={
                                                                article.title
                                                            }
                                                        >
                                                            {article.title}
                                                        </div>
                                                        <div
                                                            className="text-sm text-gray-500 truncate mt-1"
                                                            title={
                                                                article.excerpt
                                                            }
                                                        >
                                                            {article.excerpt}
                                                        </div>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="font-medium">
                                                        {
                                                            article.author
                                                                .fullName
                                                        }
                                                    </div>
                                                    <div className="text-sm text-gray-500">
                                                        @
                                                        {
                                                            article.author
                                                                .username
                                                        }
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <div
                                                        className="max-w-xs truncate text-sm"
                                                        title={article.tags}
                                                    >
                                                        {article.tags ||
                                                            "Không có tags"}
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    {getStatusBadge(
                                                        article.status
                                                    )}
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex items-center gap-1">
                                                        <Eye className="h-4 w-4 text-gray-400" />
                                                        {article.viewsCount}
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="text-sm">
                                                        {formatDate(
                                                            article.createdAt
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
                                                            <DropdownMenuItem>
                                                                <Edit className="mr-2 h-4 w-4" />
                                                                Chỉnh sửa
                                                            </DropdownMenuItem>
                                                            {article.status !==
                                                                "PUBLISHED" && (
                                                                <DropdownMenuItem
                                                                    onClick={() =>
                                                                        handleApprovePost(
                                                                            article.id
                                                                        )
                                                                    }
                                                                    className="text-green-600 focus:text-green-600"
                                                                >
                                                                    <Check className="mr-2 h-4 w-4" />
                                                                    Duyệt bài
                                                                    viết
                                                                </DropdownMenuItem>
                                                            )}
                                                            {article.status ===
                                                                "PUBLISHED" && (
                                                                <DropdownMenuItem
                                                                    onClick={() =>
                                                                        handleHidePost(
                                                                            article.id
                                                                        )
                                                                    }
                                                                    className="text-orange-600 focus:text-orange-600"
                                                                >
                                                                    <EyeOff className="mr-2 h-4 w-4" />
                                                                    Ẩn bài viết
                                                                </DropdownMenuItem>
                                                            )}
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
                                                                        Xóa bài
                                                                        viết
                                                                    </DropdownMenuItem>
                                                                </AlertDialogTrigger>
                                                                <AlertDialogContent>
                                                                    <AlertDialogHeader>
                                                                        <AlertDialogTitle>
                                                                            Xác
                                                                            nhận
                                                                            xóa
                                                                            bài
                                                                            viết
                                                                        </AlertDialogTitle>
                                                                        <AlertDialogDescription>
                                                                            Bạn
                                                                            có
                                                                            chắc
                                                                            chắn
                                                                            muốn
                                                                            xóa
                                                                            bài
                                                                            viết
                                                                            "
                                                                            {
                                                                                article.title
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
                                                                                handleDeletePost(
                                                                                    article.id
                                                                                )
                                                                            }
                                                                            className="bg-red-600 hover:bg-red-700"
                                                                        >
                                                                            Xóa
                                                                            bài
                                                                            viết
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
                                                <FileText className="h-8 w-8 text-gray-400" />
                                                <p className="text-gray-500">
                                                    {searchTerm
                                                        ? "Không tìm thấy bài viết nào"
                                                        : "Chưa có bài viết nào"}
                                                </p>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>

                    {/* Pagination - Always show if there's data */}
                    {filteredArticles.length > 0 && (
                        <div className="flex items-center justify-between mt-6">
                            <div className="text-sm text-gray-600">
                                Hiển thị{" "}
                                {(currentPage - 1) * POSTS_PER_PAGE + 1} đến{" "}
                                {Math.min(
                                    currentPage * POSTS_PER_PAGE,
                                    filteredArticles.length
                                )}{" "}
                                trong tổng số {filteredArticles.length} bài viết
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
