import Sidebar from "@/components/shared/sidebar/Sidebar";
import { Avatar } from "@nextui-org/react";


const page = ()=>{
    return (
        <div className="w-full h-full bg-white shadow-md rounded-lg flex border-1">
            <div className="w-[240px] h-full border-r-1 flex flex-col items-center p-2">
                <div className="flex flex-col items-center h-[197px] m-3 border-b-1 pb-4">
                    <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026708c" className="w-[80px] h-[80px] text-large mb-2" />
                    <h1 className="text-center font-semibold my-2 text-lg">
                        Muhammad Zaydan Athallah
                    </h1>
                    <p className="text-center text-xs font-extralight">
                        CEO
                    </p>
                </div>
                <div className="flex flex-col h-full w-full">
                    <Sidebar></Sidebar>
                </div>
            </div>
            <div>
                
            </div>
        </div>
    )
}
export default page;