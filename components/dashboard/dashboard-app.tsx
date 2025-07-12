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

import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

import { ReactNode } from "react";

export function DashboardApp({ children }: { children: ReactNode }) {
    const [activeTab, setActiveTab] = useState("dashboard");

    const renderContent = () => {
        switch (activeTab) {
            case "dashboard":
                return <Dashboard />;
            case "profile":
                return <Profile />;
            case "smoking-status":
                return <SmokingStatus />;
            case "quit-plan":
                return <QuitPlan />;
            case "progress":
                return <Progress />;
            case "community":
                return <Community />;
            case "blog":
                return <Blog />;
            case "forum":
                return <Forum />;
            case "coach-chat":
                return <CoachChat />;
            default:
                return <Dashboard />;
        }
    };

    return (
        <SidebarProvider>
            <div className="flex min-h-screen w-full">
                <AppSidebar />
                <main className="flex-1 p-6 bg-gray-50">
                    <div className="mb-6 flex items-center justify-between">
                        <SidebarTrigger />
                        <Button
                            variant="outline"
                            className="flex items-center gap-2"
                        >
                            <LogOut className="h-4 w-4" />
                            Đăng xuất
                        </Button>
                    </div>
                    {children}
                </main>
            </div>
        </SidebarProvider>
    );
}
