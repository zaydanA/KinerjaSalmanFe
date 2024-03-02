"use client"
import Sidebar from "@/components/shared/sidebar/Sidebar";
import { Avatar } from "@nextui-org/react";
import { RiArrowDropDownLine, RiArrowDropUpLine } from 'react-icons/ri';
import { CiUser } from "react-icons/ci";
import { useState } from 'react';
import { PiCalculatorThin } from "react-icons/pi";
import React from "react";
import {Breadcrumbs, BreadcrumbItem} from "@nextui-org/react";
import { IoMenuOutline,IoCloseOutline } from "react-icons/io5";
import Personal from "@/components/shared/sidebar/Personal";
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


const page = ()=>{
    
    const [activeComponent, setActiveComponent] = useState(SidebarData[0].subNav[0].title)
    const [activeComponentNavbar, setActiveComponentNavbar] = useState(NavbarComponentData[0].title)
    const [isSidebarOpen,setIsSidebarOpen] = useState(false)
    return (
        <div className="w-full min-h-full h-fit bg-white shadow-md rounded-lg flex border-1 mt-[-1px] md:m-0">
            <div className={`max-w-[240px] rounded-l-lg z-10 h-fit w-fit pt-3 bg-white flex flex-col ${isSidebarOpen?"absolute min-w-[240px] h-full md:border-r-0 border-r-1 md:relative" : "h-full"}`}>
                <div className="flex flex-row w-full px-1 bg-white">
                    {isSidebarOpen ? <IoCloseOutline className="text-3xl" onClick={()=>{setIsSidebarOpen(false)}}></IoCloseOutline> : <IoMenuOutline className="text-3xl" onClick={()=>{setIsSidebarOpen(true)}}></IoMenuOutline>}
                </div>
                <div className={`flex-col h-full flex-col items-center p-2 ease-in-out duration-300 ${isSidebarOpen?"min-w-[236px] bg-white rounded-l-lg":"hidden"}`}>
                    <div className={`flex flex-col items-center h-[197px] m-3 border-b-1 pb-4 `}>
                        <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026708c" className="w-[80px] h-[80px] mb-2"/>
                        <h1 className="text-center font-semibold my-2 text-lg">
                            Muhammad Zaydan Athallah
                        </h1>
                        <p className="text-center text-xs font-extralight">
                            CEO
                        </p>
                    </div>
                    <div className="flex flex-col h-fit w-full">
                        <Sidebar SidebarData={SidebarData} activeComponent={activeComponent} setActiveComponent={setActiveComponent}></Sidebar>
                    </div>
                </div>
            </div>
            <div className={`py-[14px] pr-2 pl-2 md:px-[24px] flex flex-col w-full border-l-1 ${isSidebarOpen?"pl-[46px]":""}`}>
                <div className="flex flex-col h-[52px] mb-[14px] z-[1]">
                    <Breadcrumbs isDisabled>
                        <BreadcrumbItem>Profile</BreadcrumbItem>
                        <BreadcrumbItem>Muhammad Zaydan Athallah</BreadcrumbItem>
                        <BreadcrumbItem>{activeComponent}</BreadcrumbItem>
                        <BreadcrumbItem>{activeComponentNavbar}</BreadcrumbItem>
                    </Breadcrumbs>
                    <h1 className="font-semibold text-2xl h-full w-full">
                        {activeComponent}
                    </h1>
                </div>
                <div className="h-full flex flex-col ">
                    {
                       activeComponent == SidebarData[0].subNav[0].title? <Personal activeComponentNavbar={activeComponentNavbar} NavbarComponentData={NavbarComponentData} setActiveComponentNavbar={setActiveComponentNavbar}></Personal>: null
                    }
                </div>
            </div>
        </div>
    )
}
export default page;