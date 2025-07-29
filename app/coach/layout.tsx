import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { CoachHeader } from "@/components/admin/coach-header";
import { CoachSidebar } from "@/components/admin/coach-sidebar";

export default function CoachLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-gray-50">
            <CoachHeader />
            <div className="flex">
                <CoachSidebar />
                <Toaster />
                <main className="flex-1 p-6 ml-64">
                    <div className="mt-[45px]">{children}</div>
                </main>
            </div>
        </div>
    );
}
