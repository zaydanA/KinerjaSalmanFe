import Dashboard from "@/components/privates/dashboard/Dashboard";

// const NoSSR = dynamic(() => import('@/components/privates/dashboard/Dashboard'), { ssr: false })

const page = ()=>{
    return (
        <div className="w-full">
            <Dashboard/>
        </div>
    )
}
export default page;