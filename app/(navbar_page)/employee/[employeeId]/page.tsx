"use client"
import { useEffect, useState } from 'react';
import React from "react";
import DetailEmployee from "@/components/privates/sidebar/detailEmployee/DetailEmployee";
import { apiBase } from "@/api";
import { useAuth } from "@/contexts";
import { usePathname } from "next/navigation";
import { IUserPersonalData } from '@/types/user';

const page = ()=>{
    const [employee,setEmployee] = useState<IUserPersonalData|null>(
        {
            email: '',
            full_name:'',
            phone_number: '',
            emergency_number: '',
            place_of_birth: '',
            date_of_birth: new Date(),
            gender: '',
            marital_status: '',
            blood_type: '',
            identity_number: '',
            address: '',
            last_education: '',
            status: 0
        }
    )
    const pathname = usePathname().split("/")
    const {user} = useAuth()
    useEffect(()=>{
        async function getEmployeeById(){
            const res = user && await apiBase().user().personalData(Number(pathname[2]));
            
            setEmployee(res && res.data);
        }   
        getEmployeeById()
    },[])
    return (
        <DetailEmployee page={pathname[1]} employee={employee} user={undefined}></DetailEmployee>
    )
}
export default page;