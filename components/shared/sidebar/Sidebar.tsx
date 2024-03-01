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
const NavbarData2 = [
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
const Sidebar =  (props: any) => {
    const pathname = usePathname();
    const [activeComponent, setActiveComponent] = useState(NavbarData2[0].subNav[0].title)

    return (
        <div className="w-full">
            {NavbarData2.map((data,index)=>(     
                <SubMenu item={data} key={index} active={activeComponent} setActiveComponent={setActiveComponent}></SubMenu>
            ))}
        </div>
    )
}
export default Sidebar;