
import { useState } from "react"
import ChangePassword from "./ChangePassword"

const Account = ()=>{

    const NavbarComponentData = [
        {
            title:"Change Password",
        },{
            title: "Other",
        }
    ]
    const [activeComponentNavbar,setActiveComponentNavbar]= useState<string>(NavbarComponentData[0].title)

        return(
            <div className="flex flex-col items-center">
                <div id="horizontal2" className="flex flex-row gap-2 overflow-x-auto max-w-5/6">
                {NavbarComponentData && NavbarComponentData.map((page: { title: string },index:number)=>(
                    <div key={index} className={`flex flex-col h-full rounded-t-[25px] gap-2 pt-2 cursor-pointer ${activeComponentNavbar == page.title && "bg-white border-x-1 border-t-1"}`} onClick={()=>{setActiveComponentNavbar(page.title)}}>
                        <div className={activeComponentNavbar == page.title? 'flex w-full h-full justify-center items-center pt-1 px-5 font-mono text-sm' : 'flex w-full h-full items-center justify-center pt-1 px-5 font-mono text-sm font-light text-gray-400'}>{page.title}</div>
                        {/* {<div className={`h-[2px] ${activeComponentNavbar === page.title? "bg-[--kinerja-gold]": ""} rounded-t-lg`}></div>} */}
                    </div>
                    ))}
                </div>
                <div className="h-fit w-fit bg-white border-b-1 rounded-lg rounded-y-lg border-x-1 shadow-sm">
                    {activeComponentNavbar == NavbarComponentData[0].title? <ChangePassword></ChangePassword>:null}
                </div>
            </div>
        )
}

export default Account;