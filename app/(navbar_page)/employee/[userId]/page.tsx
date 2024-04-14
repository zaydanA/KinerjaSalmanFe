"use client"
import React from "react";
import DetailEmployee from "@/components/privates/sidebar/detailEmployee/DetailEmployee";

import ProtectedRoute from '@/app/Rbac';
const page = ()=>{

    return (
        <DetailEmployee user={undefined}></DetailEmployee>
    )
}

export default page;