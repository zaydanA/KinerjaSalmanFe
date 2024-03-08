"use client"
import Image from 'next/image'
import { usePathname } from "next/navigation";
import Link from 'next/link';
import SubMenu from './Submenu';
import { IoSettingsOutline } from 'react-icons/io5';
import { RiArrowDropDownLine, RiArrowDropUpLine } from 'react-icons/ri';
import { CiUser } from "react-icons/ci";
import { useEffect, useState } from 'react';
import { PiCalculatorThin } from "react-icons/pi";
import { apiBase } from '@/api';

const Sidebar =  (props: any) => {
    const pathname = usePathname();
    const [user,setUser] = useState("-");
    useEffect(()=>{
        async function getUser(){
            const res = await apiBase().user().self(1);
            
            setUser(res.data);
            // console.log(res.data);
        }   
        getUser()
    },[])
    return (
        <div className="w-full">
            {props.SidebarData.map((data: any,index: any)=>(     
                <SubMenu item={data} key={index} active={props.activeComponent} setActiveComponent={props.setActiveComponent}></SubMenu>
            ))}
        </div>
    )
}
export default Sidebar;