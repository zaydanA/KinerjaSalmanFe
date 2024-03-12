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
import { useAuth } from "@/contexts";
import { IUserPersonalData, IUserSelfData } from "@/types/user";
import { usePathname } from "next/navigation";
import { apiBase } from "@/api";
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

interface DetailEmployeeType{
    // employee: IUserPersonalData|null
    user: IUserSelfData | undefined | null
    // page:string
}
const DetailEmployee: React.FC<DetailEmployeeType> = (props)=>{
    const [employee,setEmployee] = useState<IUserPersonalData|null|undefined>(
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
    useEffect(()=>{
        async function getEmployeeById(){
            const res = await apiBase().user().personalData(props.user?props.user.user_id:Number(pathname[2]));
            
            setEmployee(res && res.data);
        }   
        getEmployeeById()
    },[])
    const [activeComponent, setActiveComponent] = useState(SidebarData[0].subNav[0].title)
    const [activeComponentNavbar, setActiveComponentNavbar] = useState(NavbarComponentData[0].title)
    const [isSidebarOpen,setIsSidebarOpen] = useState(false)

    return (
        <div className="md:w-full h-fit min-h-[90%] bg-white shadow-md rounded-lg flex border-1 mt-[-2px] md:m-0">
            <div className={`max-w-[240px] rounded-l-lg z-20 h-fit w-fit pt-3 bg-white flex flex-col ${isSidebarOpen?"absolute min-w-[240px] h-full md:border-r-0 border-r-1 md:relative" : "h-full"}`}>
                <div className="flex flex-row w-full px-1 bg-white">
                    {isSidebarOpen ? <IoCloseOutline className="text-3xl" onClick={()=>{setIsSidebarOpen(false)}}></IoCloseOutline> : <IoMenuOutline className="text-3xl" onClick={()=>{setIsSidebarOpen(true)}}></IoMenuOutline>}
                </div>
                <div className={`flex-col h-full flex-col items-center p-2 ease-in-out duration-300 ${isSidebarOpen?"min-w-[236px] bg-white rounded-l-lg":"hidden"}`}>
                    <div className={`flex flex-col items-center h-[197px] m-3 border-b-1 pb-2 `}>
                        <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026708c" className="w-[80px] h-[80px] mb-2"/>
                        <h1 className="text-center font-semibold my-2 text-lg">
                            {employee?.full_name}
                        </h1>
                        {props.user ? 
                        <p className="text-center text-xs font-extralight">
                            {props.user.position.title}
                        </p>
                        :
                        <p className="text-center text-xs font-extralight">
                            {employee?.email}
                        </p>
                        }
                    </div>
                    <div className="flex flex-col h-fit w-full bg-white">
                        <Sidebar SidebarData={SidebarData} activeComponent={activeComponent} setActiveComponent={setActiveComponent}></Sidebar>
                    </div>
                </div>
            </div>
            <div className={`py-[14px] pr-2 pl-2 md:px-[24px] flex flex-col w-5/6 md:w-full border-l-1 ${isSidebarOpen?"md:ml-0 ml-[38px]":""}`}>
                <div className="flex flex-col min-h-[52px] mb-[14px] z-[1] gap-1">
                    <Breadcrumbs isDisabled size="sm">
                        <BreadcrumbItem>{pathname[1]}</BreadcrumbItem>
                        <BreadcrumbItem>{employee?.full_name}</BreadcrumbItem>
                        <BreadcrumbItem>{activeComponent}</BreadcrumbItem>
                        <BreadcrumbItem>{activeComponentNavbar}</BreadcrumbItem>
                    </Breadcrumbs>
                    <h1 className="font-semibold text-xl md:text-2xl h-full w-full text-[--kinerja-gold]">
                        {activeComponent}
                    </h1>
                </div>
                <div className="h-full flex flex-col ">
                    {
                       activeComponent == SidebarData[0].subNav[0].title? <Personal employee={employee} activeComponentNavbar={activeComponentNavbar} NavbarComponentData={NavbarComponentData} setActiveComponentNavbar={setActiveComponentNavbar}></Personal>: (activeComponent == SidebarData[0].subNav[1].title? <Employment user={props.user}></Employment> : null)
                    }
                </div>
            </div>
        </div>
    )
}
export default DetailEmployee;