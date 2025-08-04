"use client";
import React from "react";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { AdminHeader } from "@/components/admin/admin-header";
import { Toaster } from "@/components/ui/toaster";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const userData = localStorage.getItem("userData");

    if (!userData) {
        if (typeof window !== "undefined") {
            window.location.href = "/login";
        }
        return null; // Trả về null để tránh render layout khi không có userData
    } else {
        const userDataParse = JSON.parse(userData);
        const hasAdminRole = userDataParse.roles.some(
            (role: any) => role.name === "ADMIN"
        );
        if (!hasAdminRole) {
            localStorage.removeItem("authToken");
            localStorage.removeItem("userData");
            if (typeof window !== "undefined") {
                window.location.href = "/login";
            }
            return null; // Trả về null để tránh render layout khi không có quyền ADMIN
        }
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <AdminHeader />
            <div className="flex">
                <AdminSidebar />
                <Toaster />
                <main className="flex-1 p-6 ml-64">
                    <div className="mt-[45px]">{children}</div>
                </main>
            </div>
        </div>
    );
}
