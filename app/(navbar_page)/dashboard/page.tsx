import Dashboard from "@/components/privates/dashboard/Dashboard";
import dynamic from "next/dynamic";

const NoSSR = dynamic(() => import('@/components/privates/dashboard/Dashboard'), { ssr: false })

const page = ()=>{
    return (
        <div className="w-full">
            {/* <NoSSR /> */}
        </div>
    )
}
export default page;