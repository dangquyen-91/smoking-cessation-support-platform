"use client";

import React, { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function SettingManagment() {
    return (
        <div className="p-6 space-y-6">
            {" "}
            <div>
                <h1 className="text-3xl font-bold text-gray-900">
                    Cài đặt quản trị viên
                </h1>
                <p className="text-gray-600 mt-1">
                    Quản lý cài đặt hệ thống và cấu hình ứng dụng.
                </p>
            </div>
        </div>
    );
}
