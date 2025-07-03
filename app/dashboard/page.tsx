"use client";

import { DashboardApp } from "@/components/dashboard/dashboard-app";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Dashboard() {
    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const handleLogout = () => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("userData");
        router.push("/login");
    };

    return isLoggedIn ? <DashboardApp onLogout={handleLogout} /> : null;
}
