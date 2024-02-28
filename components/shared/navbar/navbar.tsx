"use client"
import Image from 'next/image'
import { usePathname } from "next/navigation";
import ProfileDropdown from './ProfileDropdown';
import Link from 'next/link';
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
        <div className="w-full h-[60px] bg-white shadow-md sm:px-5 font-medium text-gray-500 flex flex-row items-center justify-between border-b-1">
            <div className='flex items-center h-full sm:gap-6 font-mono'>
                <div className='h-full flex'>
                    <Image
                    src="/LogoSalman.svg"
                    alt="Salman Logo"
                    className="items-center h-full py-2"
                    width={50}
                    height={40}
                    priority
                    />
                    <Image
                    src="/Kinerja.svg"
                    alt="Kinerja Logo"
                    className="items-center mt-[2px] h-full w-0 sm:w-[100px]"
                    width={100}
                    height={48}
                    priority
                    />
                </div>
                <div className='flex h-full items-center gap-2 text-sm pl-2 sm:pl-0'>
                    {NavbarData.map((page,index)=>(
                        <div key={index} className='flex flex-col h-full'>
                            <Link className='flex h-full items-center pt-2 px-5' href={`${page.path}`}>{page.title}</Link>
                            {<div className={pathname === page.path? "h-[5px] bg-[--kinerja-gold] rounded-t-lg":"h-[5px] bg-transparent rounded-t-lg"}></div>}
                        </div>
                    ))}
                </div>
            </div>
                <ProfileDropdown></ProfileDropdown>
            
        </div>
    )
}
export default Navbar;