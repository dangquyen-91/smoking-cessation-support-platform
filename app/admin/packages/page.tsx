"use client";

import { useGetAllPackages } from "@/components/admin/package.query";
import { PackagesManagement } from "@/components/admin/packages";
import React from "react";

export default function Packages() {
    const { data: listPackages } = useGetAllPackages();
    console.log("List Packages:", listPackages);
    return <PackagesManagement />;
}
