"use client";

import { AuthForms } from "@/components/auth-forms";
import { useRouter } from "next/navigation";

export default function Register() {
    const router = useRouter();

    const handleSuccess = (userData?: any) => {
        router.push("/login");
    };

    return (
        <AuthForms
            mode="register"
            onBack={() => router.push("/")}
            onSuccess={handleSuccess}
            onSwitchMode={() => router.push("/login")}
        />
    );
}
