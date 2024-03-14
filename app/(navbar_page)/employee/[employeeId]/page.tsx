"use client"
import React from "react";
import DetailEmployee from "@/components/privates/sidebar/detailEmployee/DetailEmployee";

import { useSearchParams } from "next/navigation";

import ProtectedRoute from '@/app/Rbac';
const page = ()=>{

    const dept_id : string|null = useSearchParams().get("query");


    return (
        <ProtectedRoute>
            <DetailEmployee user={undefined}></DetailEmployee>
        </ProtectedRoute>
    )
}

export default page;