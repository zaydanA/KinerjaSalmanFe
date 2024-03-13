"use client"
import Image from 'next/image'
import { usePathname } from "next/navigation";
import Link from 'next/link';
import ProfileDropdown from './ProfileDropdown';
import { useAuth } from '@/contexts';
const NavbarData = [{
    title:"Dashboard",
    path:"/dashboard"

},{
    title: "Employee",
    path: "/employee"
},{
    title:"Payroll",
    path:"/payroll"
}

]
const Navbar =  (props: any) => {
    const pathname = usePathname();

    return (
        <div className="w-full h-[60px] bg-white shadow-md md:px-5 font-medium text-gray-500 flex flex-row items-center justify-between border-b-1">
            <div className='flex items-center w-3/4 h-full md:gap-6 font-mono'>
                <Link className='h-full flex' href="/dashboard">
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
                <div id="horizontal2" className='flex flex-row h-full w-full items-center md:ml-5 gap-0 text-sm md:pl-0 pt-2 overflow-x-scroll'>
                    {NavbarData.map((page,index)=>(
                        <div key={index} className='flex flex-col h-full hover:bg-gray-100 rounded-t-[25px] cursor-pointer'>
                            <Link className='flex h-full items-center pt-1 px-5' href={`${page.path}`}>{page.title}</Link>
                            {<div className={pathname === page.path? "h-[5px] bg-[--kinerja-gold] rounded-t-lg":"h-[5px] bg-transparent rounded-t-lg"}></div>}
                        </div>
                    ))}
                </div>
            </div>
            <div className='pl-2 w-1/4 h-full'>
                <ProfileDropdown></ProfileDropdown>
            </div>
            
        </div>
    )
}
export default Navbar;