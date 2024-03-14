"use client"
import { useEffect, useState } from 'react';
import React from "react";
import DetailEmployee from "@/components/privates/sidebar/detailEmployee/DetailEmployee";
import { apiBase } from "@/api";
import { useAuth } from "@/contexts";
import { usePathname, useSearchParams } from "next/navigation";
import { IUserEmploymentData, IUserPersonalData } from '@/types/user';
import { withRoles } from '@/middleware/RBAC';
import ProtectedRoute from '@/app/Rbac';
import CryptoJS from "crypto-js";
const page = ()=>{

    // const pathname = usePathname().split("/")
    // console.log(pathname[2]);
    // const dept_id : any = useSearchParams().get("query");
    // const [employee,setEmployee] = useState<IUserEmploymentData>()
    // useEffect(()=>{
    //     async function getEmployee(){
    //         const response = await apiBase().user().employmentData(Number(pathname[2]))
    //         console.log(response)
    //         setEmployee(response.data);
    //     }
    //     getEmployee()
        
    // },[])
    return (
        <ProtectedRoute>
            <DetailEmployee user={undefined}></DetailEmployee>
        </ProtectedRoute>
    )
}

export default page;