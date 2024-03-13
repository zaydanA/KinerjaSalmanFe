"use client"
import { useEffect, useState } from 'react';
import React from "react";
import DetailEmployee from "@/components/privates/sidebar/detailEmployee/DetailEmployee";
import { apiBase } from "@/api";
import { useAuth } from "@/contexts";
import { usePathname } from "next/navigation";
import { IUserPersonalData } from '@/types/user';
import { withRoles } from '@/middleware/RBAC';
import ProtectedRoute from '@/app/Rbac';

const page = ()=>{

    return (
        <ProtectedRoute allowedDept={[1,2]} allowedPos={[1,2]}>
            <DetailEmployee user={undefined}></DetailEmployee>
        </ProtectedRoute>
    )
}

export default page;