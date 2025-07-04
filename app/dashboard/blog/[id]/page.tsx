"use client";

import React, { useState } from "react";
import {
    Heart,
    Eye,
    Share2,
    Calendar,
    User,
    ArrowLeft,
    Bookmark,
    MessageCircle,
} from "lucide-react";
import {
    useGetAllBlog,
    useGetBlogById,
    useLikeBlogs,
} from "@/queries/blog.query";
import { useRouter } from "next/navigation";

interface BlogDetailPageProps {
    params: Promise<{ id: string }>;
}

export default function BlogDetailPage({ params }: BlogDetailPageProps) {
    const { id } = React.use(params);
    const { data: blogData } = useGetBlogById(id);
    const { data: allBlogPosts = [] } = useGetAllBlog("PUBLISHED");
    const router = useRouter();
    const [isLiked, setIsLiked] = useState(false);
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [likeCount, setLikeCount] = useState(blogData?.likesCount || 0);
    const { mutateAsync: likePost } = useLikeBlogs();

    const handleLike = async () => {
        setIsLiked(!isLiked);
        await likePost(id);
        setLikeCount((prev: any) => (isLiked ? prev - 1 : prev + 1));
    };

    const handleBookmark = () => {
        setIsBookmarked(!isBookmarked);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("vi-VN", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    // Loading state
    if (!blogData) {
        return (
            <div className="min-h-screen bg-gradient-to-br flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Đang tải bài viết...</p>
                </div>
            </div>
        );
    }

    const tags = blogData.tags?.split(",").map((tag) => tag.trim()) || [];

    return (
        <div className="min-h-screen bg-gradient-to-br ">
            {/* Header Navigation */}
            <div className="sticky top-0 z-50 ">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <button
                            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
                            onClick={() => router.back()}
                            aria-label="Quay lại"
                        >
                            <ArrowLeft className="w-5 h-5" />
                            <span className="font-medium">Quay lại</span>
                        </button>

                        <div className="flex items-center space-x-3">
                            <button
                                onClick={handleBookmark}
                                className={`p-2 rounded-full transition-all duration-200 ${
                                    isBookmarked
                                        ? "bg-yellow-100 text-yellow-600 shadow-md"
                                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                }`}
                            >
                                <Bookmark
                                    className={`w-5 h-5 ${
                                        isBookmarked ? "fill-current" : ""
                                    }`}
                                />
                            </button>

                            <button className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors">
                                <Share2 className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Article Header */}
                <header className="mb-8">
                    <div className="mb-6">
                        {tags.map((tag: any, index: number) => (
                            <span
                                key={index}
                                className="inline-block bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full mr-2 mb-2"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>

                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6">
                        {blogData.title}
                    </h1>

                    <p className="text-xl text-gray-600 leading-relaxed mb-8">
                        {blogData.excerpt}
                    </p>

                    {/* Author & Meta Info */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                        <div className="flex items-center space-x-4 mb-4 sm:mb-0">
                            <div className="relative">
                                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                                    <User className="w-6 h-6 text-white" />
                                </div>
                                {blogData.author?.roles?.[0]?.name ===
                                    "COACH" && (
                                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                                        <div className="w-2 h-2 bg-white rounded-full"></div>
                                    </div>
                                )}
                            </div>

                            <div>
                                <div className="flex items-center space-x-2">
                                    <h3 className="font-semibold text-gray-900">
                                        {blogData.author?.fullName || "Tác giả"}
                                    </h3>
                                    {blogData.author?.roles?.[0]?.name ===
                                        "COACH" && (
                                        <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full">
                                            {blogData.author.roles[0]
                                                ?.description ||
                                                "Huấn luyện viên"}
                                        </span>
                                    )}
                                </div>
                                <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                                    <span className="flex items-center space-x-1">
                                        <Calendar className="w-4 h-4" />
                                        <span>
                                            {formatDate(blogData.publishedAt)}
                                        </span>
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center space-x-6 text-sm text-gray-500">
                            <span className="flex items-center space-x-1">
                                <Eye className="w-4 h-4" />
                                <span>
                                    {(
                                        blogData.viewsCount || 0
                                    ).toLocaleString()}{" "}
                                    lượt xem
                                </span>
                            </span>
                            <span className="flex items-center space-x-1">
                                <Heart className="w-4 h-4" />
                                <span>{blogData.likesCount} lượt thích</span>
                            </span>
                        </div>
                    </div>
                </header>

                {/* Featured Image */}
                {blogData.featuredImage && (
                    <div className="mb-8 rounded-2xl overflow-hidden shadow-xl">
                        <img
                            src={blogData.featuredImage}
                            alt={blogData.title}
                            className="w-full h-64 md:h-80 lg:h-96 object-cover"
                        />
                    </div>
                )}

                {/* Article Content */}
                <div className="prose prose-lg max-w-none mb-8">
                    <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                        <div
                            className="text-gray-800 leading-relaxed"
                            dangerouslySetInnerHTML={{
                                __html: blogData.content || "",
                            }}
                        />
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-center space-x-4 py-8 border-t border-gray-200">
                    <button
                        onClick={handleLike}
                        className={`flex items-center space-x-2 px-6 py-3 rounded-full font-medium transition-all duration-200 ${
                            isLiked
                                ? "bg-red-500 text-white shadow-lg transform scale-105"
                                : "bg-white border-2 border-gray-200 text-gray-700 hover:border-red-300 hover:text-red-600"
                        }`}
                    >
                        <Heart
                            className={`w-5 h-5 ${
                                isLiked ? "fill-current" : ""
                            }`}
                        />
                        <span>{blogData.likesCount}</span>
                    </button>

                    <button className="flex items-center space-x-2 px-6 py-3 rounded-full font-medium bg-white border-2 border-gray-200 text-gray-700 hover:border-blue-300 hover:text-blue-600 transition-all duration-200">
                        <MessageCircle className="w-5 h-5" />
                        <span>Bình luận</span>
                    </button>

                    <button className="flex items-center space-x-2 px-6 py-3 rounded-full font-medium bg-white border-2 border-gray-200 text-gray-700 hover:border-green-300 hover:text-green-600 transition-all duration-200">
                        <Share2 className="w-5 h-5" />
                        <span>Chia sẻ</span>
                    </button>
                </div>

                {/* Related Articles Section */}
                <div className="mt-16 pt-8 border-t border-gray-200">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">
                        Bài viết liên quan
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {allBlogPosts.length > 0 &&
                            allBlogPosts.slice(0, 2).map((item) => (
                                <div
                                    key={item.id}
                                    className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer"
                                    onClick={() =>
                                        router.push(
                                            `/dashboard/blog/${item.id}`
                                        )
                                    }
                                >
                                    <div className="flex space-x-4">
                                        <div className="w-20 h-20 bg-gray-200 rounded-lg flex-shrink-0">
                                            {item.featuredImage && (
                                                <img
                                                    src={item.featuredImage}
                                                    alt={item.title}
                                                    className="w-full h-full object-cover rounded-lg"
                                                />
                                            )}
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                                                {item.title}
                                            </h3>
                                            <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                                                {item.excerpt}
                                            </p>
                                            <span className="text-xs text-gray-500">
                                                {new Date(
                                                    item.publishedAt
                                                ).toLocaleDateString("vi-VN", {
                                                    year: "numeric",
                                                    month: "long",
                                                    day: "numeric",
                                                })}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            </article>
        </div>
    );
}
