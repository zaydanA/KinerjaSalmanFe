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
import { apiBase } from "@/api";
import { usePathname } from "next/navigation";
const SidebarData = [
    {
        title:"General",
        icon:<CiUser />,
        iconOpened:<RiArrowDropUpLine className="h-full text-3xl text-[--kinerja-gold]"/>,
        iconClosed:<RiArrowDropDownLine className="h-full text-3xl text-[--kinerja-gold]"/>,
        subNav:[
            {
            title:"Personal"
            },
            {
            title:"Employment"
            },
            {
            title:"Education & Experience"
            },
            {
            title:"Additional Info"
            },
        ]
    
    },
    {
        title:"Payroll",
        icon:<PiCalculatorThin />,
        iconOpened:<RiArrowDropUpLine className="h-full text-3xl text-[--kinerja-gold]"/>,
        iconClosed:<RiArrowDropDownLine className="h-full text-3xl text-[--kinerja-gold]"/>,
        subNav:[
            {
            title:"Payroll Info"
            },
        ]
    
    },
    ]

const NavbarComponentData = [
    {
        title:"Basic Info",
    },{
        title: "Family",
    },{
        title:"Emergency Contact",
    }
    ]

const Role = (role_id:number)=>{
    role_id === 1? "CEO" : role_id === 2? "Role 2" : ""
}


const DetailEmployee = (props:any)=>{
    
    const [activeComponent, setActiveComponent] = useState(SidebarData[0].subNav[0].title)
    const [activeComponentNavbar, setActiveComponentNavbar] = useState(NavbarComponentData[0].title)
    const [isSidebarOpen,setIsSidebarOpen] = useState(false)

    console.log(props.employee)

    return (
        <div className="md:w-full h-fit min-h-[95%] bg-white shadow-md rounded-lg flex border-1 mt-[-1px] md:m-0">
            <div className={`max-w-[240px] rounded-l-lg z-10 h-fit w-fit pt-3 bg-white flex flex-col ${isSidebarOpen?"absolute min-w-[240px] h-full md:border-r-0 border-r-1 md:relative" : "h-full"}`}>
                <div className="flex flex-row w-full px-1 bg-white">
                    {isSidebarOpen ? <IoCloseOutline className="text-3xl" onClick={()=>{setIsSidebarOpen(false)}}></IoCloseOutline> : <IoMenuOutline className="text-3xl" onClick={()=>{setIsSidebarOpen(true)}}></IoMenuOutline>}
                </div>
                <div className={`flex-col h-full flex-col items-center p-2 ease-in-out duration-300 ${isSidebarOpen?"min-w-[236px] bg-white rounded-l-lg":"hidden"}`}>
                    <div className={`flex flex-col items-center h-[197px] m-3 border-b-1 pb-4 `}>
                        <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026708c" className="w-[80px] h-[80px] mb-2"/>
                        <h1 className="text-center font-semibold my-2 text-lg">
                            {props.employee.full_name}
                        </h1>
                        <p className="text-center text-xs font-extralight">
                            {props.employee.position_id === 1? "CEO" : props.employee.position_id === 2? "Role 2" : ""}
                        </p>
                    </div>
                    <div className="flex flex-col h-fit w-full">
                        <Sidebar SidebarData={SidebarData} activeComponent={activeComponent} setActiveComponent={setActiveComponent}></Sidebar>
                    </div>
                </div>
            </div>
            <div className={`py-[14px] pr-2 pl-2 md:px-[24px] flex flex-col w-5/6 md:w-full border-l-1 ${isSidebarOpen?"md:ml-0 ml-[38px]":""}`}>
                <div className="flex flex-col min-h-[52px] mb-[14px] z-[1]">
                    <Breadcrumbs isDisabled>
                        <BreadcrumbItem>Profile</BreadcrumbItem>
                        <BreadcrumbItem>Muhammad Zaydan Athallah</BreadcrumbItem>
                        <BreadcrumbItem>{activeComponent}</BreadcrumbItem>
                        <BreadcrumbItem>{activeComponentNavbar}</BreadcrumbItem>
                    </Breadcrumbs>
                    <h1 className="font-semibold sm:text-sm md:text-2xl h-full w-full">
                        {activeComponent}
                    </h1>
                </div>
                <div className="h-full flex flex-col ">
                    {
                       activeComponent == SidebarData[0].subNav[0].title? <Personal employee={props.employee} activeComponentNavbar={activeComponentNavbar} NavbarComponentData={NavbarComponentData} setActiveComponentNavbar={setActiveComponentNavbar}></Personal>: (activeComponent == SidebarData[0].subNav[1].title? <Employment></Employment> : null)
                    }
                </div>
            </div>
        </div>
    )
}
export default DetailEmployee;