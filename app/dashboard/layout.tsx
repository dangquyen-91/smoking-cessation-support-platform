"use client";

import { useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Dashboard } from "@/components/dashboard";
import { Profile } from "@/components/profile";
import { SmokingStatus } from "@/components/smoking-status";
import { QuitPlan } from "@/components/quit-plan";
import { Progress } from "@/components/progress";
import { Community } from "@/components/community";
import { Blog } from "@/components/blog";
import { Forum } from "@/components/forum";
import { CoachChat } from "@/components/coach-chat";
import Providers from "@/lib/react-query/providers";

import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { Toaster } from "@/components/ui/toaster";

import { ReactNode } from "react";

interface LayoutProps {
    children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    return (
        <Providers>
            <SidebarProvider>
                <div className="flex min-h-screen w-full">
                    <Toaster />
                    <AppSidebar />
                    <main className="flex-1 p-6 bg-gray-50">
                        <div className="mb-6 flex items-center justify-between">
                            <SidebarTrigger />
                            <Button
                                variant="outline"
                                className="flex items-center gap-2"
                                onClick={() => {
                                    localStorage.removeItem("authToken");
                                    localStorage.removeItem("userData");
                                    window.location.href = "/login";
                                }}
                            >
                                <LogOut className="h-4 w-4" />
                                Đăng xuất
                            </Button>
                        </div>
                        <Toaster />

                        {children}
                    </main>
                </div>
            </SidebarProvider>
        </Providers>
    );
}
