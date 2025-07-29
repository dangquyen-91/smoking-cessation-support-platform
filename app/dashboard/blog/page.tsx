"use client";

import { useState, useMemo } from "react";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
    BookOpen,
    Heart,
    MessageCircle,
    Share2,
    Clock,
    ChevronLeft,
    ChevronRight,
    Plus,
    Eye,
} from "lucide-react";
import {
    useCreateBlog,
    useGetAllBlog,
    useLikeBlogs,
} from "@/queries/blog.query";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

interface CreatePostPayload {
    authorId: number;
    title: string;
    content: string;
    excerpt: string;
    featuredImage: string;
    tags: string;
}

export default function BlogPage() {
    const { data: allBlogPosts = [] } = useGetAllBlog("PUBLISHED");
    const { mutateAsync: createBlog } = useCreateBlog();
    const { toast } = useToast();
    const router = useRouter();
    const [selectedCategory, setSelectedCategory] = useState("Tất cả");
    const [currentPage, setCurrentPage] = useState(1);
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
    const { mutateAsync: likePost } = useLikeBlogs();
    const [newPost, setNewPost] = useState<CreatePostPayload>({
        authorId: 3,
        title: "",
        content: "",
        excerpt: "",
        featuredImage: "",
        tags: "",
    });
    const postsPerPage = 5;

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffTime = Math.abs(now.getTime() - date.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 1) return "1 ngày trước";
        if (diffDays < 7) return `${diffDays} ngày trước`;
        if (diffDays < 30) return `${Math.ceil(diffDays / 7)} tuần trước`;
        return `${Math.ceil(diffDays / 30)} tháng trước`;
    };

    const estimateReadTime = (content: string) => {
        const wordsPerMinute = 200;
        const wordCount = content.split(" ").length;
        const readTime = Math.ceil(wordCount / wordsPerMinute);
        return `${readTime} phút`;
    };

    const categories = useMemo(() => {
        const tagCounts = new Map<string, number>();

        interface BlogPost {
            id: number;
            title: string;
            content: string;
            excerpt: string;
            featuredImage: string;
            tags: string;
            author: {
                id: number;
                fullName?: string;
                username: string;
                profileImage?: string;
            };
            publishedAt: string;
            viewsCount?: number;
            likesCount?: number;
        }

        allBlogPosts.forEach((post: BlogPost) => {
            if (post.tags && post.tags !== "string") {
                const tags: string[] = post.tags
                    .split(",")
                    .map((tag: string) => tag.trim().toLowerCase());
                tags.forEach((tag: string) => {
                    if (tag) {
                        tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1);
                    }
                });
            }
        });

        const sortedTags = Array.from(tagCounts.entries())
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5);

        const cats = [
            {
                name: "Tất cả",
                count: allBlogPosts.length,
                active: selectedCategory === "Tất cả",
            },
        ];

        sortedTags.forEach(([tag, count]) => {
            cats.push({
                name: tag.charAt(0).toUpperCase() + tag.slice(1),
                count,
                active:
                    selectedCategory ===
                    tag.charAt(0).toUpperCase() + tag.slice(1),
            });
        });

        return cats;
    }, [allBlogPosts, selectedCategory]);

    // Filter posts based on selected category
    const filteredPosts = useMemo(() => {
        if (selectedCategory === "Tất cả") {
            return allBlogPosts;
        }

        return allBlogPosts.filter((post: any) => {
            if (!post.tags || post.tags === "string") return false;
            const tags = post.tags
                .split(",")
                .map((tag: any) => tag.trim().toLowerCase());
            return tags.includes(selectedCategory.toLowerCase());
        });
    }, [allBlogPosts, selectedCategory]);

    const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
    const startIndex = (currentPage - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;
    const currentPosts = filteredPosts.slice(startIndex, endIndex);

    const handleCategoryChange = (categoryName: string) => {
        setSelectedCategory(categoryName);
        setCurrentPage(1);
    };

    const goToPage = (page: number) => {
        setCurrentPage(page);
    };

    const goToPrevious = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const goToNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const getCategory = (tags: string) => {
        if (!tags || tags === "string") return "Chung";
        const tagArray = tags.split(",").map((tag) => tag.trim());
        return tagArray[0] || "Chung";
    };

    const handleCreatePost = async () => {
        if (!newPost.title || !newPost.excerpt || !newPost.content) {
            toast({
                title: "Lỗi",
                description: "Vui lòng điền đầy đủ thông tin bắt buộc",
                variant: "destructive",
            });
            return;
        }

        try {
            const savedUserData = localStorage.getItem("userData");
            const userData = savedUserData ? JSON.parse(savedUserData) : null;
            const userId = userData ? userData.id : 3;
            console.log("userData:", userId);
            const payload = {
                ...newPost,
                authorId: userId,
            };
            await createBlog(payload as CreatePostPayload);
            setNewPost({
                authorId: userId,
                title: "",
                content: "",
                excerpt: "",
                featuredImage: "",
                tags: "",
            });
            setIsCreateDialogOpen(false);
            toast({
                title: "Thành công",
                description: "Bài viết đã được tạo và đang chờ admin duyệt",
                variant: "warning",
            });
        } catch (error) {
            console.error("Error creating post:", error);
            toast({
                title: "Lỗi",
                description: "Không thể tạo bài viết. Vui lòng thử lại sau",
                variant: "destructive",
            });
        }
    };

    const handleLikePost = async (postId: any) => {
        await likePost(postId);
        toast({
            title: "Đã thích bài viết",
            description: `Bạn đã thích bài viết`,
            variant: "success",
        });
    };

    const handleSharePost = (postTitle: string) => {
        // Copy URL to clipboard
        navigator.clipboard.writeText(window.location.href);
        toast({
            title: "Đã sao chép liên kết",
            description: `Liên kết bài viết "${postTitle}" đã được sao chép vào clipboard`,
            variant: "success",
        });
    };

    const handleFollowAuthor = (authorName: string) => {
        toast({
            title: "Đã theo dõi",
            description: `Bạn đã theo dõi ${authorName}`,
            variant: "success",
        });
    };

    const handleSubscribeNewsletter = () => {
        toast({
            title: "Đăng ký thành công",
            description: "Bạn sẽ nhận được thông báo về các bài viết mới nhất",
            variant: "success",
        });
    };

    const popularPosts = [...allBlogPosts]
        .sort((a, b) => (b.viewsCount || 0) - (a.viewsCount || 0))
        .slice(0, 3)
        .map((post) => ({
            title: post.title,
            views: post.viewsCount || 0,
        }));

    interface FeaturedAuthor {
        id: number;
        name: string;
        avatar?: string;
        specialty: string;
        postsCount: number;
    }

    interface BlogPostAuthor {
        id: number;
        fullName?: string;
        username: string;
        profileImage?: string;
    }

    interface BlogPost {
        id: number;
        title: string;
        content: string;
        excerpt: string;
        featuredImage: string;
        tags: string;
        author: BlogPostAuthor;
        publishedAt: string;
        viewsCount?: number;
        likesCount?: number;
    }

    const featuredAuthors: FeaturedAuthor[] = allBlogPosts
        .reduce((acc: FeaturedAuthor[], post: BlogPost) => {
            const authorId: number = post.author.id;
            if (!acc.find((author: FeaturedAuthor) => author.id === authorId)) {
                acc.push({
                    id: post.author.id,
                    name: post.author.fullName || post.author.username,
                    avatar: post.author.profileImage,
                    specialty: "Thành viên cộng đồng",
                    postsCount: allBlogPosts.filter(
                        (p: BlogPost) => p.author.id === authorId
                    ).length,
                });
            }
            return acc;
        }, [])
        .sort((a: FeaturedAuthor, b: FeaturedAuthor) => b.postsCount - a.postsCount)
        .slice(0, 2);

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Blog</h1>
                <p className="text-gray-600">
                    Đọc, chia sẻ và học hỏi từ cộng đồng
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Main Content */}
                <div className="lg:col-span-3 space-y-6">
                    {/* Categories */}
                    <Card>
                        <CardContent className="p-4">
                            <div className="flex flex-wrap gap-2">
                                {categories.map((category, index) => (
                                    <Badge
                                        key={index}
                                        variant={
                                            category.active
                                                ? "default"
                                                : "secondary"
                                        }
                                        className="cursor-pointer hover:opacity-80 transition-opacity"
                                        onClick={() =>
                                            handleCategoryChange(category.name)
                                        }
                                    >
                                        {category.name} ({category.count})
                                    </Badge>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Blog Posts */}
                    <div className="space-y-6">
                        {currentPosts.length === 0 ? (
                            <Card>
                                <CardContent className="p-8 text-center">
                                    <p className="text-gray-500">
                                        {selectedCategory === "Tất cả"
                                            ? "Chưa có bài viết nào được xuất bản."
                                            : `Không có bài viết nào trong danh mục "${selectedCategory}".`}
                                    </p>
                                </CardContent>
                            </Card>
                        ) : (
                            currentPosts.map((post: any) => (
                                <Card
                                    key={post.id}
                                    className="overflow-hidden hover:shadow-lg transition-shadow"
                                >
                                    <div className="md:flex">
                                        <div
                                            className="md:w-1/3 cursor-pointer"
                                            onClick={() =>
                                                router.push(
                                                    `/dashboard/blog/${post.id}`
                                                )
                                            }
                                        >
                                            <img
                                                src={
                                                    post.featuredImage &&
                                                    post.featuredImage !==
                                                        "string"
                                                        ? post.featuredImage
                                                        : "https://www.postplanner.com/hubfs/what-to-post-on-instagram.png"
                                                }
                                                alt={post.title}
                                                className="w-full h-48 md:h-full object-cover"
                                            />
                                        </div>
                                        <div className="md:w-2/3 p-6">
                                            <div className="flex items-center gap-2 mb-2">
                                                <Badge variant="secondary">
                                                    {getCategory(post.tags)}
                                                </Badge>
                                                <span className="text-sm text-gray-500 flex items-center gap-1">
                                                    <Clock className="h-3 w-3" />
                                                    {estimateReadTime(
                                                        post.content
                                                    )}
                                                </span>
                                            </div>
                                            <h3
                                                className="text-xl font-bold mb-2 hover:text-blue-600 cursor-pointer"
                                                onClick={() =>
                                                    router.push(
                                                        `/dashboard/blog/${post.id}`
                                                    )
                                                }
                                            >
                                                {post.title}
                                            </h3>
                                            <p className="text-gray-600 mb-4 line-clamp-2">
                                                {post.excerpt}
                                            </p>
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <Avatar className="h-8 w-8">
                                                        <AvatarImage
                                                            src={
                                                                post.author
                                                                    .profileImage ||
                                                                "https://static.vecteezy.com/system/resources/thumbnails/004/607/791/small_2x/man-face-emotive-icon-smiling-male-character-in-blue-shirt-flat-illustration-isolated-on-white-happy-human-psychological-portrait-positive-emotions-user-avatar-for-app-web-design-vector.jpg"
                                                            }
                                                        />
                                                        <AvatarFallback>
                                                            {
                                                                (post.author
                                                                    .fullName ||
                                                                    post.author
                                                                        .username)[0]
                                                            }
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <div>
                                                        <div className="text-sm font-medium">
                                                            {post.author
                                                                .fullName ||
                                                                post.author
                                                                    .username}
                                                        </div>
                                                        <div className="text-xs text-gray-500">
                                                            {formatDate(
                                                                post.publishedAt
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-4 text-sm text-gray-600">
                                                    <button
                                                        className="flex items-center gap-1 hover:text-red-600"
                                                        onClick={() =>
                                                            handleLikePost(
                                                                post.id
                                                            )
                                                        }
                                                    >
                                                        <Heart className="h-4 w-4" />
                                                        {post.likesCount || 0}
                                                    </button>
                                                    <button className="flex items-center gap-1 hover:text-blue-600">
                                                        <Eye className="h-4 w-4" />
                                                        {post.viewsCount || 0}
                                                    </button>
                                                    <button
                                                        className="flex items-center gap-1 hover:text-green-600"
                                                        onClick={() =>
                                                            handleSharePost(
                                                                post.title
                                                            )
                                                        }
                                                    >
                                                        <Share2 className="h-4 w-4" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            ))
                        )}
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <Card>
                            <CardContent className="p-4">
                                <div className="flex items-center justify-between">
                                    <div className="text-sm text-gray-600">
                                        Hiển thị {startIndex + 1}-
                                        {Math.min(
                                            endIndex,
                                            filteredPosts.length
                                        )}{" "}
                                        trong tổng số {filteredPosts.length} bài
                                        viết
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={goToPrevious}
                                            disabled={currentPage === 1}
                                        >
                                            <ChevronLeft className="h-4 w-4" />
                                            Trước
                                        </Button>

                                        <div className="flex items-center gap-1">
                                            {Array.from(
                                                { length: totalPages },
                                                (_, i) => i + 1
                                            ).map((page) => (
                                                <Button
                                                    key={page}
                                                    variant={
                                                        currentPage === page
                                                            ? "default"
                                                            : "outline"
                                                    }
                                                    size="sm"
                                                    onClick={() =>
                                                        goToPage(page)
                                                    }
                                                    className="w-8 h-8 p-0"
                                                >
                                                    {page}
                                                </Button>
                                            ))}
                                        </div>

                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={goToNext}
                                            disabled={
                                                currentPage === totalPages
                                            }
                                        >
                                            Sau
                                            <ChevronRight className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Write Post */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <BookOpen className="h-5 w-5 text-blue-600" />
                                Viết bài
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Dialog
                                open={isCreateDialogOpen}
                                onOpenChange={setIsCreateDialogOpen}
                            >
                                <DialogTrigger asChild>
                                    <Button className="w-full flex items-center gap-2">
                                        <Plus className="h-4 w-4" />
                                        Chia sẻ câu chuyện
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                                    <DialogHeader>
                                        <DialogTitle>
                                            Tạo bài viết mới
                                        </DialogTitle>
                                        <DialogDescription>
                                            Chia sẻ câu chuyện và kinh nghiệm
                                            của bạn với cộng đồng
                                        </DialogDescription>
                                    </DialogHeader>
                                    <div className="grid gap-4 py-4">
                                        <div className="grid gap-2">
                                            <Label htmlFor="title">
                                                Tiêu đề *
                                            </Label>
                                            <Input
                                                id="title"
                                                value={newPost.title}
                                                onChange={(e) =>
                                                    setNewPost({
                                                        ...newPost,
                                                        title: e.target.value,
                                                    })
                                                }
                                                placeholder="Nhập tiêu đề hấp dẫn cho bài viết của bạn"
                                                className="text-base"
                                            />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="excerpt">
                                                Tóm tắt *
                                            </Label>
                                            <Textarea
                                                id="excerpt"
                                                value={newPost.excerpt}
                                                onChange={(e) =>
                                                    setNewPost({
                                                        ...newPost,
                                                        excerpt: e.target.value,
                                                    })
                                                }
                                                placeholder="Viết một đoạn tóm tắt ngắn gọn để thu hút người đọc"
                                                rows={3}
                                                className="text-base resize-none"
                                            />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="content">
                                                Nội dung *
                                            </Label>
                                            <Textarea
                                                id="content"
                                                value={newPost.content}
                                                onChange={(e) =>
                                                    setNewPost({
                                                        ...newPost,
                                                        content: e.target.value,
                                                    })
                                                }
                                                placeholder="Chia sẻ câu chuyện, kinh nghiệm hoặc kiến thức của bạn..."
                                                rows={10}
                                                className="text-base resize-none"
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
                                                        featuredImage:
                                                            e.target.value,
                                                    })
                                                }
                                                placeholder="https://example.com/image.jpg"
                                                className="text-base"
                                            />
                                            <p className="text-xs text-gray-500">
                                                Thêm ảnh để bài viết của bạn trở
                                                nên sinh động hơn
                                            </p>
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
                                                className="text-base"
                                            />
                                            <p className="text-xs text-gray-500">
                                                Thêm tags để giúp người đọc tìm
                                                thấy bài viết dễ dàng hơn
                                            </p>
                                        </div>
                                    </div>
                                    <DialogFooter>
                                        <Button
                                            variant="outline"
                                            onClick={() =>
                                                setIsCreateDialogOpen(false)
                                            }
                                        >
                                            Hủy bỏ
                                        </Button>
                                        <Button
                                            onClick={handleCreatePost}
                                            disabled={
                                                !newPost.title ||
                                                !newPost.excerpt ||
                                                !newPost.content
                                            }
                                            className="min-w-[120px]"
                                        >
                                            Xuất bản
                                        </Button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        </CardContent>
                    </Card>

                    {/* Popular Posts */}
                    {popularPosts.length > 0 && (
                        <Card>
                            <CardHeader>
                                <CardTitle>Bài viết phổ biến</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    {popularPosts.map((post, index) => (
                                        <div
                                            key={index}
                                            className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                                        >
                                            <h4 className="font-medium text-sm mb-1 line-clamp-2">
                                                {post.title}
                                            </h4>
                                            <p className="text-xs text-gray-600">
                                                {post.views} lượt xem
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Authors to Follow */}
                    {featuredAuthors.length > 0 && (
                        <Card>
                            <CardHeader>
                                <CardTitle>Tác giả nổi bật</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    {featuredAuthors.map((author) => (
                                        <div
                                            key={author.id}
                                            className="flex items-center gap-3"
                                        >
                                            <Avatar>
                                                <AvatarImage
                                                    src={
                                                        author.avatar ||
                                                        "/placeholder.svg?height=40&width=40"
                                                    }
                                                />
                                                <AvatarFallback>
                                                    {author.name[0]}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className="flex-1">
                                                <div className="font-medium text-sm">
                                                    {author.name}
                                                </div>
                                                <div className="text-xs text-gray-600">
                                                    {author.postsCount} bài viết
                                                </div>
                                            </div>
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                onClick={() =>
                                                    handleFollowAuthor(
                                                        author.name
                                                    )
                                                }
                                            >
                                                Theo dõi
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Newsletter */}
                    {/* <Card>
                        <CardHeader>
                            <CardTitle>Đăng ký nhận tin</CardTitle>
                            <CardDescription>
                                Nhận bài viết mới nhất qua email
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button
                                className="w-full"
                                variant="outline"
                                onClick={handleSubscribeNewsletter}
                            >
                                Đăng ký
                            </Button>
                        </CardContent>
                    </Card> */}
                </div>
            </div>
        </div>
    );
}
