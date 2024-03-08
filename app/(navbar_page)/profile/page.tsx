"use client"
import Sidebar from "@/components/shares/sidebar/Sidebar";
import { Avatar } from "@nextui-org/react";
import { RiArrowDropDownLine, RiArrowDropUpLine } from 'react-icons/ri';
import { CiUser } from "react-icons/ci";
import { useEffect, useState } from 'react';
import { PiCalculatorThin } from "react-icons/pi";
import React from "react";
import {Breadcrumbs, BreadcrumbItem} from "@nextui-org/react";
import { IoMenuOutline,IoCloseOutline } from "react-icons/io5";
import Personal from "@/components/shares/sidebar/Personal";
import Employment from "@/components/shares/sidebar/Employment";
import DetailEmployee from "@/components/shares/detailEmployee/DetailEmployee";
import { apiBase } from "@/api";

const page = ()=>{
    const [employee,setEmployee] = useState<any>({})

    // useEffect(()=>{
    //     async function getEmployeeById(){
    //         const employee = await apiBase().employee().getEmployeeById(1);
            
    //         setEmployee(employee.data);
    //     }   
    //     getEmployeeById()
    // },[])
    return (
        <DetailEmployee employee={employee}></DetailEmployee>
    )
}
export default page;