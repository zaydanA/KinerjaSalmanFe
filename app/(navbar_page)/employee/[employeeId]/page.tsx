"use client"
import React from "react";
import DetailEmployee from "@/components/privates/sidebar/detailEmployee/DetailEmployee";

import ProtectedRoute from '@/app/Rbac';
const page = ()=>{

    return (
        <ProtectedRoute>
            <DetailEmployee user={undefined}></DetailEmployee>
        </ProtectedRoute>
    )
}

export default page;