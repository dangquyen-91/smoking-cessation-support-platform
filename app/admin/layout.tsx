import React from "react";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { AdminHeader } from "@/components/admin/admin-header";
import { Toaster } from "@/components/ui/toaster";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
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
