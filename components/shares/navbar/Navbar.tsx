"use client"
import Image from 'next/image'
import { usePathname } from "next/navigation";
import Link from 'next/link';
import ProfileDropdown from './ProfileDropdown';
import { useAuth } from '@/contexts';
import { useEffect, useState } from 'react';

const NavbarDataForManagerAndAbove = [{
    title:"Dashboard",
    path:"/dashboard"
},{
    title: "Employee",
    path: "/employee"
},{
    title:"Employee Hierarchy",
    path:"/organizationstructure"
},{
    title:"My Payroll",
    path:"/my-payroll"
},{
    title: "Payroll",
    path: "/payroll"
},{
    title:"Live Attendance",
    path:"/live-attendance"
}, {
    title:"Applications",
    path:"/applications"
}, {
    title:"Time-off",
    path:"/apply"
}, {
    title:"Evaluation",
    path:"/evaluation"
},
];

const NavbarDataForBelowManager = [{
    title:"Dashboard",
    path:"/dashboard"
},{
    title:"Employee Hierarchy",
    path:"/organizationstructure"
},{
    title:"My Payroll",
    path:"/my-payroll"
},{
    title:"Live Attendance",
    path:"/live-attendance"
}, {
    title:"Time-off",
    path:"/apply"
}
];

interface NavbarData {
    title: string
    path: string
}

const Navbar =  (props: any) => {
    const pathname = usePathname();
    const { isHRDManagerOrDirector, isManager } = useAuth();
    const [navbarData, setNavbarData] = useState<NavbarData[]>();

    useEffect(() => {
        if (isHRDManagerOrDirector() || isManager()) {
            setNavbarData(NavbarDataForManagerAndAbove);
        } else {
            setNavbarData(NavbarDataForBelowManager);
        }
    
        return;
    }, []);
    

    return (
        <div className="sticky top-0 z-50 w-full h-[60px] bg-white shadow-md md:px-5 font-medium text-gray-500 flex flex-row items-center justify-between border-b-1">
            <div className='flex items-center w-[75%] sm:w-[80%] md:w-[90%] h-full md:gap-6 font-mono'>
                <Link className='h-full flex' href="/">
                    <Image
                    src="/LogoSalman.svg"
                    alt="Salman Logo"
                    className="items-center h-full py-2 w-0 md:w-[50px]"
                    width={50}
                    height={40}
                    priority
                    />
                    <Image
                    src="/Kinerja.svg"
                    alt="Kinerja Logo"
                    className="items-center mt-[2px] h-full w-0 md:w-[100px]"
                    width={100}
                    height={48}
                    priority
                    />
                </Link>
                <div id="horizontal2" className='flex flex-row h-full w-full items-center md:ml-5 gap-0 text-sm md:pl-0 pt-2 overflow-x-auto'>
                    {navbarData?.map((page,index)=>(
                        <div key={index} className='flex flex-col h-full hover:bg-gray-100 rounded-t-[25px] cursor-pointer'>
                            <Link className='flex h-full items-center pt-1 px-5' href={`${page.path}`}>{page.title}</Link>
                            {<div className={pathname.startsWith(page.path) ? "h-[5px] bg-[--kinerja-gold] rounded-t-lg":"h-[5px] bg-transparent rounded-t-lg"}></div>}
                        </div>
                    ))}
                </div>
            </div>
            <div className='w-[25%] sm:w-[20%] md:w-[10%] h-full'>
                <ProfileDropdown></ProfileDropdown>
            </div>
            
        </div>
    )
}
export default Navbar;