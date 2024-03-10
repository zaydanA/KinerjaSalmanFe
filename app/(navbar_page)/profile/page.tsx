"use client"
import Sidebar from "@/components/privates/sidebar/Sidebar";
import { Avatar } from "@nextui-org/react";
import { RiArrowDropDownLine, RiArrowDropUpLine } from 'react-icons/ri';
import { CiUser } from "react-icons/ci";
import { useEffect, useState } from 'react';
import { PiCalculatorThin } from "react-icons/pi";
import React from "react";
import {Breadcrumbs, BreadcrumbItem} from "@nextui-org/react";
import { IoMenuOutline,IoCloseOutline } from "react-icons/io5";
import Personal from "@/components/privates/sidebar/Personal";
import Employment from "@/components/privates/sidebar/Employment";
import DetailEmployee from "@/components/privates/sidebar/detailEmployee/DetailEmployee";
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