"use client";
import { useState, useMemo } from "react";
import type React from "react";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Dialog,
    DialogContent,
    DialogDescription,
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
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
    Users,
    Trophy,
    Heart,
    MessageCircle,
    Share2,
    ThumbsUp,
    ChevronLeft,
    ChevronRight,
    Plus,
} from "lucide-react";
import {
    useCreateSocialPost,
    useGetAllSocialPost,
} from "@/queries/scoial-post.query";
import utils from "@/utils/utils";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";

// Define the PostType enum and mappings
const POST_TYPES = {
    ACHIEVEMENT_SHARE: "Chia sẻ huy hiệu",
    MOTIVATION: "Động viên",
    EXPERIENCE_SHARE: "Chia sẻ kinh nghiệm",
    QUESTION: "Đặt câu hỏi",
    ADVICE: "Lời khuyên",
} as const;

// Helper function to format time ago
const formatTimeAgo = (dateString: string) => {
    const now = new Date();
    const postDate = new Date(dateString);
    const diffInMinutes = Math.floor(
        (now.getTime() - postDate.getTime()) / (1000 * 60)
    );
    if (diffInMinutes < 60) {
        return `${diffInMinutes} phút trước`;
    } else if (diffInMinutes < 1440) {
        const hours = Math.floor(diffInMinutes / 60);
        return `${hours} giờ trước`;
    } else {
        const days = Math.floor(diffInMinutes / 1440);
        return `${days} ngày trước`;
    }
};

// Helper function to get badge emoji based on post type
const getTypeBadge = (type: string) => {
    const badges = {
        ACHIEVEMENT_SHARE: "🏆",
        MOTIVATION: "💪",
        EXPERIENCE_SHARE: "📖",
        QUESTION: "❓",
        ADVICE: "💡",
    };
    return badges[type as keyof typeof badges] || "📝";
};

// Helper function to get type display name
const getTypeDisplayName = (type: string) => {
    return POST_TYPES[type as keyof typeof POST_TYPES] || type;
};

const POSTS_PER_PAGE = 5;

// Create Post Modal Component
function CreatePostModal({
    isOpen,
    onOpenChange,
    defaultType,
}: {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    defaultType?: string;
}) {
    const [content, setContent] = useState("");
    const [postType, setPostType] = useState(
        defaultType || "ACHIEVEMENT_SHARE"
    );
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { mutateAsync: createPost } = useCreateSocialPost();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!content.trim()) return;

        setIsSubmitting(true);
        try {
            const payload = {
                id: utils.getUserId(), // Temporary ID, should be handled by backend
                content: content.trim(),
                type: postType,
            };

            await createPost(payload);

            // Reset form
            setContent("");
            setPostType(defaultType || "ACHIEVEMENT_SHARE");
            onOpenChange(false);
        } catch (error) {
            console.error("Error creating post:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Tạo bài viết mới</DialogTitle>
                    <DialogDescription>
                        Chia sẻ thành tích, kinh nghiệm hoặc động viên cộng đồng
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="post-type">Loại bài viết</Label>
                        <Select value={postType} onValueChange={setPostType}>
                            <SelectTrigger>
                                <SelectValue placeholder="Chọn loại bài viết" />
                            </SelectTrigger>
                            <SelectContent>
                                {Object.entries(POST_TYPES).map(
                                    ([key, value]) => (
                                        <SelectItem key={key} value={key}>
                                            <div className="flex items-center gap-2">
                                                <span>{getTypeBadge(key)}</span>
                                                <span>{value}</span>
                                            </div>
                                        </SelectItem>
                                    )
                                )}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="content">Nội dung</Label>
                        <Textarea
                            id="content"
                            placeholder="Chia sẻ suy nghĩ của bạn..."
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            rows={4}
                            className="resize-none"
                        />
                        <div className="text-sm text-gray-500 text-right">
                            {content.length}/500
                        </div>
                    </div>
                    <div className="flex justify-end gap-2">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => onOpenChange(false)}
                            disabled={isSubmitting}
                        >
                            Hủy
                        </Button>
                        <Button
                            type="submit"
                            disabled={!content.trim() || isSubmitting}
                        >
                            {isSubmitting ? "Đang đăng..." : "Đăng bài"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}

export default function Community() {
    const { data: getAllSocialPost, isLoading } = useGetAllSocialPost();
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedType, setSelectedType] = useState("ACHIEVEMENT_SHARE");
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [selectedPostType, setSelectedPostType] = useState<string>();

    // Use predefined post types instead of dynamic generation
    const postTypes = Object.keys(POST_TYPES);

    // Paginate filtered posts
    const paginatedPosts = useMemo(() => {
        const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
        const endIndex = startIndex + POSTS_PER_PAGE;
        return (
            getAllSocialPost
                ?.filter((post: any) => post.type == selectedType)
                .slice(startIndex, endIndex) || []
        );
    }, [getAllSocialPost, selectedType, currentPage]);

    const totalPages = Math.ceil(
        (getAllSocialPost?.filter((post: any) => post.type === selectedType)
            .length || 0) / POSTS_PER_PAGE
    );

    // Reset to first page when changing filter
    const handleTypeChange = (type: string) => {
        setSelectedType(type);
        setCurrentPage(1);
    };

    // Handle create post button click
    const handleCreatePost = (type: string) => {
        setSelectedPostType(type);
        setIsCreateModalOpen(true);
    };

    const topMembers = [
        { name: "Nguyễn Văn A", days: 365, badge: "🥇" },
        { name: "Trần Thị B", days: 280, badge: "🥈" },
        { name: "Lê Văn C", days: 195, badge: "🥉" },
        { name: "Phạm Thị D", days: 150, badge: "🏆" },
        { name: "Hoàng Văn E", days: 120, badge: "🎖️" },
    ];

    if (isLoading) {
        return (
            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">
                        Cộng đồng
                    </h1>
                    <p className="text-gray-600">Đang tải...</p>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                        <Card>
                            <CardContent className="p-6">
                                <div className="animate-pulse space-y-4">
                                    {[1, 2, 3].map((i) => (
                                        <div key={i} className="flex space-x-4">
                                            <div className="rounded-full bg-gray-200 h-10 w-10"></div>
                                            <div className="flex-1 space-y-2">
                                                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                                                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">
                        Cộng đồng
                    </h1>
                    <p className="text-gray-600">
                        Chia sẻ thành tích và tương tác với cộng đồng
                    </p>
                </div>
                <Button
                    onClick={() => handleCreatePost("ACHIEVEMENT_SHARE")}
                    className="flex items-center gap-2"
                >
                    <Plus className="h-4 w-4" />
                    Tạo bài viết
                </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recent Posts with Tabs */}
                <div className="lg:col-span-2 space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Trophy className="h-5 w-5 text-yellow-600" />
                                Bài viết cộng đồng
                            </CardTitle>
                            <CardDescription>
                                Những chia sẻ mới nhất từ cộng đồng
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Tabs
                                value={selectedType}
                                onValueChange={handleTypeChange}
                            >
                                <TabsList className="grid w-full grid-cols-5 mb-6">
                                    {postTypes.map((type) => (
                                        <TabsTrigger
                                            key={type}
                                            value={type}
                                            className="text-xs"
                                        >
                                            {getTypeDisplayName(type)}
                                        </TabsTrigger>
                                    ))}
                                </TabsList>
                                <div className="space-y-4">
                                    {paginatedPosts.length === 0 ? (
                                        <div className="text-center py-8 text-gray-500">
                                            {selectedType == "all"
                                                ? "Chưa có bài viết nào"
                                                : `Chưa có bài viết nào trong danh mục "${getTypeDisplayName(
                                                      selectedType
                                                  )}"`}
                                        </div>
                                    ) : (
                                        <>
                                            {paginatedPosts.map((post: any) => (
                                                <div
                                                    key={post.id}
                                                    className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                                                >
                                                    <div className="flex items-start gap-3">
                                                        <Avatar>
                                                            <AvatarImage
                                                                src={
                                                                    post.user
                                                                        .profileImage ||
                                                                    "/placeholder.svg?height=40&width=40" ||
                                                                    "/placeholder.svg"
                                                                }
                                                                alt={
                                                                    post.user
                                                                        .fullName
                                                                }
                                                            />
                                                            <AvatarFallback>
                                                                {post.user
                                                                    .fullName?.[0] ||
                                                                    post.user
                                                                        .username?.[0] ||
                                                                    "U"}
                                                            </AvatarFallback>
                                                        </Avatar>
                                                        <div className="flex-1">
                                                            <div className="flex items-center gap-2 mb-2">
                                                                <span className="font-medium">
                                                                    {post.user
                                                                        .fullName ||
                                                                        post
                                                                            .user
                                                                            .username}
                                                                </span>
                                                                <span className="text-2xl">
                                                                    {getTypeBadge(
                                                                        post.type
                                                                    )}
                                                                </span>
                                                                <Badge variant="secondary">
                                                                    {getTypeDisplayName(
                                                                        post.type
                                                                    )}
                                                                </Badge>
                                                                {post.user
                                                                    .achievements
                                                                    ?.length >
                                                                    0 && (
                                                                    <span className="text-yellow-500">
                                                                        {post.user.achievements.map(
                                                                            (
                                                                                achievement: any
                                                                            ) => (
                                                                                // 1. TooltipTrigger: thêm hover/active effect cho badge icon
                                                                                <Tooltip>
                                                                                    <TooltipTrigger
                                                                                        asChild
                                                                                    >
                                                                                        <img
                                                                                            src={
                                                                                                achievement
                                                                                                    .achievement
                                                                                                    .badgeIcon
                                                                                            }
                                                                                            alt={
                                                                                                achievement
                                                                                                    .achievement
                                                                                                    .name
                                                                                            }
                                                                                            className="
        h-6 w-6 inline-block ml-1 rounded-full
        transition-transform duration-200 ease-in-out
        hover:scale-110 active:rotate-12
      "
                                                                                        />
                                                                                    </TooltipTrigger>

                                                                                    {/* 2. TooltipContent: fade + slide animation khi mở */}
                                                                                    <TooltipContent
                                                                                        side="top" // có thể là top/bottom/left/right
                                                                                        align="center"
                                                                                        sideOffset={
                                                                                            6
                                                                                        }
                                                                                        className="
      rounded-md bg-gray-900 p-2 shadow-lg
      text-sm text-green-400
      will-change-[transform,opacity]
      data-[state=open]:animate-fade-in
      data-[state=open]:data-[side=top]:animate-slide-down
      data-[state=open]:data-[side=bottom]:animate-slide-up
      data-[state=open]:data-[side=left]:animate-slide-right
      data-[state=open]:data-[side=right]:animate-slide-left
    "
                                                                                    >
                                                                                        <p>
                                                                                            {
                                                                                                achievement
                                                                                                    .achievement
                                                                                                    .name
                                                                                            }
                                                                                        </p>
                                                                                    </TooltipContent>
                                                                                </Tooltip>
                                                                            )
                                                                        )}
                                                                    </span>
                                                                )}
                                                            </div>
                                                            <p className="text-gray-700 mb-3">
                                                                {post.content}
                                                            </p>
                                                            <div className="flex items-center gap-4 text-sm text-gray-600">
                                                                <button className="flex items-center gap-1 hover:text-blue-600 transition-colors">
                                                                    <ThumbsUp className="h-4 w-4" />
                                                                    {
                                                                        post.likesCount
                                                                    }
                                                                </button>
                                                                <button className="flex items-center gap-1 hover:text-blue-600 transition-colors">
                                                                    <MessageCircle className="h-4 w-4" />
                                                                    {
                                                                        post.commentsCount
                                                                    }
                                                                </button>
                                                                <button className="flex items-center gap-1 hover:text-blue-600 transition-colors">
                                                                    <Share2 className="h-4 w-4" />
                                                                    Chia sẻ
                                                                </button>
                                                                <span className="ml-auto">
                                                                    {formatTimeAgo(
                                                                        post.createdAt
                                                                    )}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                            {/* Pagination */}
                                            {totalPages > 1 && (
                                                <div className="flex items-center justify-between pt-4">
                                                    <div className="text-sm text-gray-600">
                                                        Trang {currentPage} /{" "}
                                                        {totalPages} (
                                                        {getAllSocialPost?.filter(
                                                            (post: any) =>
                                                                post.type ===
                                                                selectedType
                                                        ).length || 0}{" "}
                                                        bài viết)
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            onClick={() =>
                                                                setCurrentPage(
                                                                    (prev) =>
                                                                        Math.max(
                                                                            1,
                                                                            prev -
                                                                                1
                                                                        )
                                                                )
                                                            }
                                                            disabled={
                                                                currentPage ===
                                                                1
                                                            }
                                                        >
                                                            <ChevronLeft className="h-4 w-4" />
                                                            Trước
                                                        </Button>
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            onClick={() =>
                                                                setCurrentPage(
                                                                    (prev) =>
                                                                        Math.min(
                                                                            totalPages,
                                                                            prev +
                                                                                1
                                                                        )
                                                                )
                                                            }
                                                            disabled={
                                                                currentPage ===
                                                                totalPages
                                                            }
                                                        >
                                                            Sau
                                                            <ChevronRight className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                </div>
                                            )}
                                        </>
                                    )}
                                </div>
                            </Tabs>
                        </CardContent>
                    </Card>

                    {/* Share Achievement */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Chia sẻ thành tích của bạn</CardTitle>
                            <CardDescription>
                                Khuyến khích cộng đồng bằng cách chia sẻ tiến
                                trình
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                <Button
                                    variant="outline"
                                    className="h-20 flex flex-col items-center justify-center gap-2 bg-transparent"
                                    onClick={() =>
                                        handleCreatePost("ACHIEVEMENT_SHARE")
                                    }
                                >
                                    <Trophy className="h-6 w-6 text-yellow-600" />
                                    <span className="text-sm">
                                        Chia sẻ huy hiệu
                                    </span>
                                </Button>
                                <Button
                                    variant="outline"
                                    className="h-20 flex flex-col items-center justify-center gap-2 bg-transparent"
                                    onClick={() =>
                                        handleCreatePost("MOTIVATION")
                                    }
                                >
                                    <Heart className="h-6 w-6 text-red-600" />
                                    <span className="text-sm">Động viên</span>
                                </Button>
                                <Button
                                    variant="outline"
                                    className="h-20 flex flex-col items-center justify-center gap-2 bg-transparent"
                                    onClick={() =>
                                        handleCreatePost("EXPERIENCE_SHARE")
                                    }
                                >
                                    <Users className="h-6 w-6 text-blue-600" />
                                    <span className="text-sm">
                                        Chia sẻ kinh nghiệm
                                    </span>
                                </Button>
                                <Button
                                    variant="outline"
                                    className="h-20 flex flex-col items-center justify-center gap-2 bg-transparent"
                                    onClick={() => handleCreatePost("QUESTION")}
                                >
                                    <MessageCircle className="h-6 w-6 text-green-600" />
                                    <span className="text-sm">Đặt câu hỏi</span>
                                </Button>
                                <Button
                                    variant="outline"
                                    className="h-20 flex flex-col items-center justify-center gap-2 bg-transparent"
                                    onClick={() => handleCreatePost("ADVICE")}
                                >
                                    <MessageCircle className="h-6 w-6 text-purple-600" />
                                    <span className="text-sm">Lời khuyên</span>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Sidebar */}
                <div className="space-y-4">
                    {/* Top Members */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Users className="h-5 w-5 text-blue-600" />
                                Bảng xếp hạng
                            </CardTitle>
                            <CardDescription>
                                Thành viên xuất sắc nhất
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {topMembers.map((member, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50"
                                    >
                                        <span className="text-2xl">
                                            {member.badge}
                                        </span>
                                        <div className="flex-1">
                                            <div className="font-medium">
                                                {member.name}
                                            </div>
                                            <div className="text-sm text-gray-600">
                                                {member.days} ngày
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Community Stats */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Thống kê cộng đồng</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="text-center p-4 bg-green-50 rounded-lg">
                                <div className="text-2xl font-bold text-green-600">
                                    {getAllSocialPost?.length || 0}
                                </div>
                                <div className="text-sm text-green-700">
                                    Bài viết hoạt động
                                </div>
                            </div>
                            <div className="text-center p-4 bg-blue-50 rounded-lg">
                                <div className="text-2xl font-bold text-blue-600">
                                    {getAllSocialPost?.reduce(
                                        (sum: number, post: any) =>
                                            sum + post.likesCount,
                                        0
                                    ) || 0}
                                </div>
                                <div className="text-sm text-blue-700">
                                    Tổng lượt thích
                                </div>
                            </div>
                            <div className="text-center p-4 bg-yellow-50 rounded-lg">
                                <div className="text-2xl font-bold text-yellow-600">
                                    {getAllSocialPost?.reduce(
                                        (sum: number, post: any) =>
                                            sum + post.commentsCount,
                                        0
                                    ) || 0}
                                </div>
                                <div className="text-sm text-yellow-700">
                                    Tổng bình luận
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Quick Actions */}
                    
                </div>
            </div>

            {/* Create Post Modal */}
            <CreatePostModal
                isOpen={isCreateModalOpen}
                onOpenChange={setIsCreateModalOpen}
                defaultType={selectedPostType}
            />
        </div>
    );
}
