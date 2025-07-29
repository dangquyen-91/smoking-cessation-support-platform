"use client";
import { useState, useEffect } from "react";
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
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
    User,
    Save,
    MessageSquare,
    Heart,
    Eye,
    FileText,
    Share2,
    Briefcase,
    Mail,
    Phone,
    Edit3,
    TrendingUp,
    BookOpen,
} from "lucide-react";
import {
    useGetMySocialPosts,
    useGetUserById,
    useUpdateUser,
} from "@/queries/user.query";
import utils from "@/utils/utils";
import { useGetMyBlogs } from "@/queries/blog.query";

export default function ProfessionalProfile() {
    const userId = utils.getUserId();
    const { data: user, isPending } = useGetUserById(userId);
    const { mutate: updateUser, isPending: isUpdating } = useUpdateUser();
    const { data: listsocialPost } = useGetMySocialPosts(userId);
    const { data: listBlogs } = useGetMyBlogs(userId);

    // Local state cho các input
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [age, setAge] = useState<number | "">("");
    const [occupation, setOccupation] = useState("");
    const [bio, setBio] = useState("");

    useEffect(() => {
        if (user) {
            setFullName(user.fullName);
            setEmail(user.email);
            setPhone(user.phone);
            setAge(user.age ?? "");
            setOccupation(user.occupation ?? "");
            setBio(user.bio ?? "");
        }
    }, [user]);

    if (isPending) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Đang tải thông tin...</p>
                </div>
            </div>
        );
    }

    const handleSave = () => {
        if (!user) return;
        updateUser(
            {
                id: user.id,
                fullName,
                email,
                phone,
                age: typeof age === "number" ? age : Number.parseInt(age, 10),
                occupation,
                bio,
            },
            {
                onSuccess: () => {
                    // Success notification
                },
            }
        );
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("vi-VN", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    const getPostTypeLabel = (type: string) => {
        switch (type) {
            case "ACHIEVEMENT_SHARE":
                return "Thành tích";
            default:
                return type;
        }
    };

    interface SocialPost {
        id: string;
        content: string;
        createdAt: string;
        likesCount: number;
        commentsCount: number;
        type: string;
        isPinned?: boolean;
    }

    interface Blog {
        id: string;
        title: string;
        excerpt: string;
        createdAt: string;
        publishedAt?: string;
        featuredImage?: string;
        tags?: string;
        status: string;
        viewsCount: number;
        likesCount: number;
    }

    const totalLikes: number =
        (listsocialPost?.reduce(
            (sum: number, post: SocialPost) => sum + post.likesCount,
            0
        ) || 0) +
        (listBlogs?.reduce(
            (sum: number, blog: Blog) => sum + blog.likesCount,
            0
        ) || 0);

    interface TotalViewsBlog {
        viewsCount: number;
    }

    const totalViews: number =
        listBlogs?.reduce(
            (sum: number, blog: TotalViewsBlog) => sum + blog.viewsCount,
            0
        ) || 0;

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Cover Photo & Profile Header */}
            <div className="relative">
                {/* Cover Photo */}
                <div className="h-48 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 relative">
                    <div className="absolute inset-0 bg-black/20"></div>
                </div>

                {/* Profile Info Overlay */}
                <div className="relative -mt-20 px-6">
                    <div className="max-w-6xl mx-auto">
                        <div className="flex flex-col md:flex-row items-start md:items-end gap-6">
                            {/* Avatar */}
                            <div className="relative">
                                <Avatar className="w-32 h-32 border-4 border-white shadow-xl">
                                    <AvatarImage
                                        src={user?.profileImage || ""}
                                        alt={user?.fullName}
                                    />
                                    <AvatarFallback className="text-2xl font-bold bg-blue-600 text-white">
                                        {user?.fullName?.charAt(0) || "U"}
                                    </AvatarFallback>
                                </Avatar>
                                <Button
                                    size="sm"
                                    className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0 bg-white text-gray-600 hover:bg-gray-100 border shadow-md"
                                >
                                    <Edit3 className="w-4 h-4" />
                                </Button>
                            </div>

                            {/* Profile Info */}
                            <div className="flex-1 pb-6">
                                <div className="bg-white rounded-lg p-6 shadow-lg">
                                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                        <div>
                                            <h1 className="text-3xl font-bold text-gray-900">
                                                {user?.fullName}
                                            </h1>
                                            <div className="flex flex-wrap items-center gap-4 mt-2 text-gray-600">
                                                {user?.occupation && (
                                                    <div className="flex items-center gap-1">
                                                        <Briefcase className="w-4 h-4" />
                                                        <span>
                                                            {user.occupation}
                                                        </span>
                                                    </div>
                                                )}
                                                {user?.email && (
                                                    <div className="flex items-center gap-1">
                                                        <Mail className="w-4 h-4" />
                                                        <span>
                                                            {user.email}
                                                        </span>
                                                    </div>
                                                )}
                                                {user?.phone && (
                                                    <div className="flex items-center gap-1">
                                                        <Phone className="w-4 h-4" />
                                                        <span>
                                                            {user.phone}
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                            {user?.bio && (
                                                <p className="mt-3 text-gray-700 max-w-2xl">
                                                    {user.bio}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Statistics Cards */}
            <div className="px-6 mt-6">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <Card>
                            <CardContent className="p-6">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-blue-100 rounded-lg">
                                        <Share2 className="w-6 h-6 text-blue-600" />
                                    </div>
                                    <div>
                                        <p className="text-2xl font-bold text-gray-900">
                                            {listsocialPost?.length || 0}
                                        </p>
                                        <p className="text-sm text-gray-600">
                                            Bài đăng
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent className="p-6">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-purple-100 rounded-lg">
                                        <BookOpen className="w-6 h-6 text-purple-600" />
                                    </div>
                                    <div>
                                        <p className="text-2xl font-bold text-gray-900">
                                            {listBlogs?.length || 0}
                                        </p>
                                        <p className="text-sm text-gray-600">
                                            Blog
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent className="p-6">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-green-100 rounded-lg">
                                        <Eye className="w-6 h-6 text-green-600" />
                                    </div>
                                    <div>
                                        <p className="text-2xl font-bold text-gray-900">
                                            {totalViews.toLocaleString()}
                                        </p>
                                        <p className="text-sm text-gray-600">
                                            Lượt xem
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent className="p-6">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-red-100 rounded-lg">
                                        <Heart className="w-6 h-6 text-red-600" />
                                    </div>
                                    <div>
                                        <p className="text-2xl font-bold text-gray-900">
                                            {totalLikes}
                                        </p>
                                        <p className="text-sm text-gray-600">
                                            Lượt thích
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="px-6 mt-8 pb-8">
                <div className="max-w-6xl mx-auto">
                    <Tabs defaultValue="overview" className="space-y-6">
                        <TabsList className="grid w-full grid-cols-4 lg:w-[400px]">
                            <TabsTrigger value="overview">
                                Tổng quan
                            </TabsTrigger>
                            <TabsTrigger value="posts">Bài đăng</TabsTrigger>
                            <TabsTrigger value="blogs">Blog</TabsTrigger>
                            <TabsTrigger value="settings">Cài đặt</TabsTrigger>
                        </TabsList>

                        {/* Overview Tab */}
                        <TabsContent value="overview" className="space-y-6">
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                {/* Recent Activity */}
                                <div className="lg:col-span-2">
                                    <Card>
                                        <CardHeader>
                                            <CardTitle className="flex items-center gap-2">
                                                <TrendingUp className="w-5 h-5 text-blue-600" />
                                                Hoạt động gần đây
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent className="space-y-4">
                                            {/* Recent Posts */}
                                            {listsocialPost
                                                ?.slice(0, 3)
                                                .map((post: any) => (
                                                    <div
                                                        key={post.id}
                                                        className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg"
                                                    >
                                                        <Share2 className="w-5 h-5 text-green-600 mt-1" />
                                                        <div className="flex-1">
                                                            <p className="text-sm text-gray-800 line-clamp-2">
                                                                {post.content}
                                                            </p>
                                                            <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                                                                <span>
                                                                    {formatDate(
                                                                        post.createdAt
                                                                    )}
                                                                </span>
                                                                <span>•</span>
                                                                <span>
                                                                    {
                                                                        post.likesCount
                                                                    }{" "}
                                                                    lượt thích
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}

                                            {/* Recent Blogs */}
                                            {listBlogs
                                                ?.slice(0, 2)
                                                .map((blog: any) => (
                                                    <div
                                                        key={blog.id}
                                                        className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg"
                                                    >
                                                        <FileText className="w-5 h-5 text-purple-600 mt-1" />
                                                        <div className="flex-1">
                                                            <h4 className="font-medium text-sm text-gray-900 line-clamp-1">
                                                                {blog.title}
                                                            </h4>
                                                            <p className="text-sm text-gray-600 line-clamp-1 mt-1">
                                                                {blog.excerpt}
                                                            </p>
                                                            <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                                                                <span>
                                                                    {formatDate(
                                                                        blog.createdAt
                                                                    )}
                                                                </span>
                                                                <span>•</span>
                                                                <span>
                                                                    {
                                                                        blog.viewsCount
                                                                    }{" "}
                                                                    lượt xem
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                        </CardContent>
                                    </Card>
                                </div>

                                {/* Profile Summary */}
                                <div>
                                    <Card>
                                        <CardHeader>
                                            <CardTitle className="flex items-center gap-2">
                                                <User className="w-5 h-5 text-blue-600" />
                                                Thông tin cá nhân
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent className="space-y-4">
                                            <div className="space-y-3">
                                                <div>
                                                    <Label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                                                        Họ tên
                                                    </Label>
                                                    <p className="text-sm font-medium text-gray-900">
                                                        {user?.fullName}
                                                    </p>
                                                </div>
                                                {user?.age && (
                                                    <div>
                                                        <Label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                                                            Tuổi
                                                        </Label>
                                                        <p className="text-sm font-medium text-gray-900">
                                                            {user.age} tuổi
                                                        </p>
                                                    </div>
                                                )}
                                                {user?.occupation && (
                                                    <div>
                                                        <Label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                                                            Nghề nghiệp
                                                        </Label>
                                                        <p className="text-sm font-medium text-gray-900">
                                                            {user.occupation}
                                                        </p>
                                                    </div>
                                                )}
                                                <div>
                                                    <Label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                                                        Tham gia
                                                    </Label>
                                                    <p className="text-sm font-medium text-gray-900">
                                                        {formatDate(
                                                            user?.createdAt ||
                                                                ""
                                                        )}
                                                    </p>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            </div>
                        </TabsContent>

                        {/* Posts Tab */}
                        <TabsContent value="posts">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Share2 className="w-5 h-5 text-green-600" />
                                        Bài đăng mạng xã hội
                                        <Badge variant="secondary">
                                            {listsocialPost?.length || 0}
                                        </Badge>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    {listsocialPost &&
                                    listsocialPost.length > 0 ? (
                                        <div className="space-y-4">
                                            {listsocialPost.map((post: any) => (
                                                <div
                                                    key={post.id}
                                                    className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                                                >
                                                    <div className="flex items-start justify-between mb-3">
                                                        <Badge
                                                            variant="outline"
                                                            className="text-xs"
                                                        >
                                                            {getPostTypeLabel(
                                                                post.type
                                                            )}
                                                        </Badge>
                                                        <span className="text-xs text-gray-500">
                                                            {formatDate(
                                                                post.createdAt
                                                            )}
                                                        </span>
                                                    </div>
                                                    <p className="text-gray-800 mb-4">
                                                        {post.content}
                                                    </p>
                                                    <div className="flex items-center gap-6 text-sm text-gray-600">
                                                        <div className="flex items-center gap-1">
                                                            <Heart className="w-4 h-4" />
                                                            <span>
                                                                {
                                                                    post.likesCount
                                                                }
                                                            </span>
                                                        </div>
                                                        <div className="flex items-center gap-1">
                                                            <MessageSquare className="w-4 h-4" />
                                                            <span>
                                                                {
                                                                    post.commentsCount
                                                                }
                                                            </span>
                                                        </div>
                                                        {post.isPinned && (
                                                            <Badge
                                                                variant="secondary"
                                                                className="text-xs"
                                                            >
                                                                Đã ghim
                                                            </Badge>
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="text-center py-12 text-gray-500">
                                            <Share2 className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                                            <h3 className="text-lg font-medium text-gray-900 mb-2">
                                                Chưa có bài đăng
                                            </h3>
                                            <p>
                                                Bắt đầu chia sẻ những khoảnh
                                                khắc của bạn
                                            </p>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </TabsContent>

                        {/* Blogs Tab */}
                        <TabsContent value="blogs">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <FileText className="w-5 h-5 text-purple-600" />
                                        Bài viết blog
                                        <Badge variant="secondary">
                                            {listBlogs?.length || 0}
                                        </Badge>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    {listBlogs && listBlogs.length > 0 ? (
                                        <div className="grid gap-6">
                                            {listBlogs.map((blog: any) => (
                                                <div
                                                    key={blog.id}
                                                    className="border rounded-lg p-6 hover:shadow-md transition-shadow"
                                                >
                                                    <div className="flex gap-4">
                                                        {blog.featuredImage && (
                                                            <div className="flex-shrink-0">
                                                                <img
                                                                    src={
                                                                        blog.featuredImage ||
                                                                        "/placeholder.svg"
                                                                    }
                                                                    alt={
                                                                        blog.title
                                                                    }
                                                                    className="w-32 h-24 object-cover rounded-lg"
                                                                />
                                                            </div>
                                                        )}
                                                        <div className="flex-1">
                                                            <div className="flex items-start justify-between mb-2">
                                                                <h3 className="text-xl font-semibold text-gray-900 line-clamp-2">
                                                                    {blog.title}
                                                                </h3>
                                                                <Badge
                                                                    variant={
                                                                        blog.status ===
                                                                        "PUBLISHED"
                                                                            ? "default"
                                                                            : "secondary"
                                                                    }
                                                                >
                                                                    {blog.status ===
                                                                    "PUBLISHED"
                                                                        ? "Đã xuất bản"
                                                                        : blog.status}
                                                                </Badge>
                                                            </div>
                                                            <p className="text-gray-600 mb-4 line-clamp-2">
                                                                {blog.excerpt}
                                                            </p>
                                                            {blog.tags && (
                                                                <div className="flex flex-wrap gap-2 mb-4">
                                                                    {blog.tags
                                                                        .split(
                                                                            ","
                                                                        )
                                                                        .map(
                                                                            (
                                                                                tag: any,
                                                                                index: number
                                                                            ) => (
                                                                                <Badge
                                                                                    key={
                                                                                        index
                                                                                    }
                                                                                    variant="outline"
                                                                                    className="text-xs"
                                                                                >
                                                                                    {tag.trim()}
                                                                                </Badge>
                                                                            )
                                                                        )}
                                                                </div>
                                                            )}
                                                            <div className="flex items-center justify-between text-sm text-gray-500">
                                                                <div className="flex items-center gap-4">
                                                                    <div className="flex items-center gap-1">
                                                                        <Eye className="w-4 h-4" />
                                                                        <span>
                                                                            {
                                                                                blog.viewsCount
                                                                            }
                                                                        </span>
                                                                    </div>
                                                                    <div className="flex items-center gap-1">
                                                                        <Heart className="w-4 h-4" />
                                                                        <span>
                                                                            {
                                                                                blog.likesCount
                                                                            }
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                                <span>
                                                                    {formatDate(
                                                                        blog.publishedAt ||
                                                                            blog.createdAt
                                                                    )}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="text-center py-12 text-gray-500">
                                            <FileText className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                                            <h3 className="text-lg font-medium text-gray-900 mb-2">
                                                Chưa có bài viết
                                            </h3>
                                            <p>
                                                Bắt đầu viết và chia sẻ kiến
                                                thức của bạn
                                            </p>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </TabsContent>

                        {/* Settings Tab */}
                        <TabsContent value="settings">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <User className="w-5 h-5 text-blue-600" />
                                        Cài đặt thông tin cá nhân
                                    </CardTitle>
                                    <CardDescription>
                                        Cập nhật thông tin cơ bản của bạn
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <Label htmlFor="fullName">
                                                Họ và tên
                                            </Label>
                                            <Input
                                                id="fullName"
                                                value={fullName}
                                                onChange={(e) =>
                                                    setFullName(e.target.value)
                                                }
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="email">Email</Label>
                                            <Input
                                                id="email"
                                                type="email"
                                                value={email}
                                                onChange={(e) =>
                                                    setEmail(e.target.value)
                                                }
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="phone">
                                                Số điện thoại
                                            </Label>
                                            <Input
                                                id="phone"
                                                value={phone}
                                                onChange={(e) =>
                                                    setPhone(e.target.value)
                                                }
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="age">Tuổi</Label>
                                            <Input
                                                id="age"
                                                type="number"
                                                value={age}
                                                onChange={(e) =>
                                                    setAge(
                                                        e.target.value === ""
                                                            ? ""
                                                            : Number(
                                                                  e.target.value
                                                              )
                                                    )
                                                }
                                            />
                                        </div>
                                        <div className="md:col-span-2">
                                            <Label htmlFor="occupation">
                                                Nghề nghiệp
                                            </Label>
                                            <Input
                                                id="occupation"
                                                value={occupation}
                                                onChange={(e) =>
                                                    setOccupation(
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <Label htmlFor="bio">
                                            Giới thiệu bản thân
                                        </Label>
                                        <Textarea
                                            id="bio"
                                            value={bio}
                                            onChange={(e) =>
                                                setBio(e.target.value)
                                            }
                                            placeholder="Chia sẻ về bản thân và mục tiêu của bạn..."
                                            rows={4}
                                        />
                                    </div>
                                    <Separator />
                                    <div className="flex justify-end">
                                        <Button
                                            onClick={handleSave}
                                            disabled={isUpdating}
                                            className="px-8"
                                        >
                                            <Save className="w-4 h-4 mr-2" />
                                            {isUpdating
                                                ? "Đang lưu..."
                                                : "Lưu thay đổi"}
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </div>
    );
}
