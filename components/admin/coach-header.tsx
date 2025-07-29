"use client";

import React, { useState } from "react";
import {
    Bell,
    Heart,
    Search,
    User,
    Settings,
    LogOut,
    Menu,
    X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export function CoachHeader() {
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const [notificationCount] = useState(5);

    return (
        <header className="fixed top-0 left-0 right-0 h-16 bg-white/95 backdrop-blur-md border-b border-gray-200/50 shadow-sm z-50">
            <div className="flex items-center justify-between h-full px-6">
                {/* Logo and Title */}
                <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-3">
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 rounded-lg blur opacity-75"></div>
                            <div className="relative bg-gradient-to-r from-green-400 to-emerald-500 p-2 rounded-lg">
                                <Heart className="h-5 w-5 text-white" />
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <h1 className="text-lg font-bold text-gray-900 leading-tight">
                                Quản trị viên
                            </h1>
                            <p className="text-xs text-gray-500 font-medium">
                                Hệ thống cai thuốc lá
                            </p>
                        </div>
                    </div>
                </div>

                {/* Right Side Actions */}
                <div className="flex items-center space-x-3">
                    {/* Enhanced Search */}
                    <div className="relative hidden md:block">
                        <div
                            className={`absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-lg blur transition-opacity duration-300 ${
                                isSearchFocused ? "opacity-100" : "opacity-0"
                            }`}
                        ></div>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 transition-colors duration-200" />
                            <Input
                                placeholder="Tìm kiếm..."
                                className={`pl-10 w-64 transition-all duration-300 ${
                                    isSearchFocused
                                        ? "ring-2 ring-blue-500/50 border-blue-300 shadow-lg"
                                        : "border-gray-200 hover:border-gray-300"
                                }`}
                                onFocus={() => setIsSearchFocused(true)}
                                onBlur={() => setIsSearchFocused(false)}
                            />
                        </div>
                    </div>

                    {/* Mobile Search Toggle */}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="md:hidden hover:bg-gray-100 transition-colors duration-200"
                    >
                        <Search className="h-5 w-5" />
                    </Button>

                    {/* Enhanced Notifications */}
                    <div className="relative">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="relative hover:bg-gray-100 transition-all duration-200 hover:scale-105"
                        >
                            <Bell className="h-5 w-5" />
                            {notificationCount > 0 && (
                                <div className="absolute -top-1 -right-1 flex items-center justify-center">
                                    <div className="absolute h-4 w-4 bg-red-500 rounded-full animate-ping opacity-75"></div>
                                    <Badge
                                        variant="destructive"
                                        className="h-4 w-4 flex items-center justify-center p-0 text-[10px] font-bold relative"
                                    >
                                        {notificationCount > 9
                                            ? "9+"
                                            : notificationCount}
                                    </Badge>
                                </div>
                            )}
                        </Button>
                    </div>

                    {/* Enhanced User Menu */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="ghost"
                                className="relative h-10 w-10 rounded-full hover:ring-2 hover:ring-gray-200 transition-all duration-200 hover:scale-105"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full blur opacity-0 hover:opacity-20 transition-opacity duration-300"></div>
                                <Avatar className="h-9 w-9 border-2 border-white shadow-md">
                                    <AvatarImage
                                        src="/placeholder-user.jpg"
                                        alt="Admin"
                                    />
                                    <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold">
                                        AD
                                    </AvatarFallback>
                                </Avatar>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            className="w-64 p-2 shadow-xl border-0 bg-white/95 backdrop-blur-md"
                            align="end"
                            forceMount
                        >
                            <DropdownMenuLabel className="font-normal p-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg mb-2">
                                <div className="flex items-center space-x-3">
                                    <Avatar className="h-10 w-10 border-2 border-white shadow-sm">
                                        <AvatarImage
                                            src="/placeholder-user.jpg"
                                            alt="Admin"
                                        />
                                        <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold">
                                            AD
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="flex flex-col">
                                        <p className="text-sm font-semibold leading-none text-gray-900">
                                            Quản trị viên
                                        </p>
                                        <p className="text-xs leading-none text-gray-500 mt-1">
                                            admin@caithuocla.com
                                        </p>
                                    </div>
                                </div>
                            </DropdownMenuLabel>

                            <DropdownMenuSeparator className="my-2" />

                            <DropdownMenuItem className="p-3 rounded-lg hover:bg-blue-50 transition-colors duration-200 cursor-pointer">
                                <User className="mr-3 h-4 w-4 text-blue-600" />
                                <span className="font-medium">
                                    Hồ sơ cá nhân
                                </span>
                            </DropdownMenuItem>

                            <DropdownMenuItem className="p-3 rounded-lg hover:bg-purple-50 transition-colors duration-200 cursor-pointer">
                                <Settings className="mr-3 h-4 w-4 text-purple-600" />
                                <span className="font-medium">
                                    Cài đặt hệ thống
                                </span>
                            </DropdownMenuItem>

                            <DropdownMenuSeparator className="my-2" />

                            <DropdownMenuItem className="p-3 rounded-lg hover:bg-red-50 transition-colors duration-200 cursor-pointer text-red-600">
                                <LogOut className="mr-3 h-4 w-4" />
                                <span className="font-medium">Đăng xuất</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </header>
    );
}
