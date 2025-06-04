"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Eye, EyeOff, Mail, Lock, ArrowRight } from "lucide-react";
import { FaGoogle } from "react-icons/fa";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [loginMethod, setLoginMethod] = useState<"email" | "phone">("email");
  const [formData, setFormData] = useState({
    emailOrPhone: "",
    password: "",
    rememberMe: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    console.log("Login attempt:", formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Đăng Nhập</h1>
            <p className="text-gray-600">
              Chào mừng bạn trở lại hành trình cai thuốc lá
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Đăng nhập tài khoản</CardTitle>
              <CardDescription>
                Nhập thông tin đăng nhập để truy cập vào tài khoản của bạn
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Login Method Toggle */}
                <div className="flex rounded-lg border p-1">
                  <button
                    type="button"
                    className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                      loginMethod === "email"
                        ? "bg-green-600 text-white"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                    onClick={() => setLoginMethod("email")}
                  >
                    <Mail className="h-4 w-4 inline mr-2" />
                    Email
                  </button>
                  <button
                    type="button"
                    className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                      loginMethod === "phone"
                        ? "bg-green-600 text-white"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                    onClick={() => setLoginMethod("phone")}
                  >
                    Số điện thoại
                  </button>
                </div>

                {/* Email/Phone Input */}
                <div className="space-y-2">
                  <Label htmlFor="emailOrPhone">
                    {loginMethod === "email"
                      ? "Địa chỉ email"
                      : "Số điện thoại"}
                  </Label>
                  <Input
                    id="emailOrPhone"
                    type={loginMethod === "email" ? "email" : "tel"}
                    placeholder={
                      loginMethod === "email"
                        ? "example@email.com"
                        : "0123456789"
                    }
                    value={formData.emailOrPhone}
                    onChange={(e) =>
                      setFormData({ ...formData, emailOrPhone: e.target.value })
                    }
                    required
                  />
                </div>

                {/* Password Input */}
                <div className="space-y-2">
                  <Label htmlFor="password">Mật khẩu</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Nhập mật khẩu"
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                      required
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="rememberMe"
                      checked={formData.rememberMe}
                      onCheckedChange={(checked) =>
                        setFormData({
                          ...formData,
                          rememberMe: checked as boolean,
                        })
                      }
                    />
                    <Label htmlFor="rememberMe" className="text-sm">
                      Ghi nhớ đăng nhập
                    </Label>
                  </div>
                  <Link
                    href="/forgot-password"
                    className="text-sm text-green-600 hover:text-green-700 hover:underline"
                  >
                    Quên mật khẩu?
                  </Link>
                </div>

                {/* Login Button */}
                <Button
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  <Lock className="h-4 w-4 mr-2" />
                  Đăng Nhập
                </Button>

                {/* Divider */}
                <div className="relative">
                  <Separator />
                  <span className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-sm text-gray-500">
                    hoặc
                  </span>
                </div>

                {/* Social Login */}
                <div className="space-y-3">
                  <button
                    type="button"
                    className="w-full flex items-center justify-center gap-2 border border-gray-300 py-2 rounded hover:bg-gray-100 cursor-pointer"
                  >
                    <FaGoogle className="w-4 h-4" />
                    Đăng nhập với Google
                  </button>

                  <Button variant="outline" className="w-full" type="button">
                    <svg
                      className="h-4 w-4 mr-2"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                    Đăng nhập với Facebook
                  </Button>
                </div>

                {/* Register Link */}
                <div className="text-center pt-4">
                  <p className="text-sm text-gray-600">
                    Chưa có tài khoản?{" "}
                    <Link
                      href="/register"
                      className="text-green-600 hover:text-green-700 font-medium hover:underline"
                    >
                      Đăng ký ngay
                      <ArrowRight className="h-3 w-3 inline ml-1" />
                    </Link>
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
