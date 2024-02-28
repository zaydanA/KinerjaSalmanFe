"use client"
import Image from 'next/image'
import { usePathname } from "next/navigation";
import ProfileDropdown from './profileDropdown';
const NavbarData = [{
    title:"Dashboard",
    path:"/dashboard"

},{
    title: "Employee",
    path: "/employee"
},

]
const Navbar =  (props: any) => {
    const pathname = usePathname();

    console.log(pathname)

    return (
        <div className="w-full h-[60px] bg-white shadow-md px-5 font-medium text-gray-500 flex flex-row items-center justify-between">
            <div className='flex items-center h-full gap-10 font-mono'>
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
                    className="items-center mt-[2px] h-full"
                    width={100}
                    height={48}
                    priority
                    />
                </div>
                <div className='flex h-full items-center gap-2 text-sm'>
                    {NavbarData.map((page)=>(
                        <div className='flex flex-col h-full'>
                            <div className='flex h-full items-center pt-2 px-5'>{page.title}</div>
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