"use client"
import Image from 'next/image'
import { usePathname } from "next/navigation";
import Link from 'next/link';
import SubMenu from './Submenu';
import { IoSettingsOutline } from 'react-icons/io5';
import { RiArrowDropDownLine, RiArrowDropUpLine } from 'react-icons/ri';
import { CiUser } from "react-icons/ci";
import { useState } from 'react';
import { PiCalculatorThin } from "react-icons/pi";

const Sidebar =  (props: any) => {
    const pathname = usePathname();

    return (
        <div className="w-full">
            {props.SidebarData.map((data: any,index: any)=>(     
                <SubMenu item={data} key={index} active={props.activeComponent} setActiveComponent={props.setActiveComponent}></SubMenu>
            ))}
        </div>
    )
}
export default Sidebar;