"use client"
import React from "react";
import DetailEmployee from "@/components/privates/sidebar/detailEmployee/DetailEmployee";

import { useSearchParams } from "next/navigation";

import ProtectedRoute from '@/app/Rbac';
const page = ()=>{

    const dept_id : string|null = useSearchParams().get("query");

    return (
        <ProtectedRoute allowedDept={[1,2,Number(dept_id)]} allowedPos={[1,2]}>
            <DetailEmployee user={undefined}></DetailEmployee>
        </ProtectedRoute>
    )
}

export default page;