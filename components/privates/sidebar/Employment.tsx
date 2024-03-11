import { useEffect } from "react";

const Employment = (props:any) => {

    useEffect(()=>{
        
    },[])

    return(
        <>
        <div className="flex min-h-fit pb-10 border-b-1">
                    <div className="h-full flex flex-col items md:items-start md:flex-row w-full pt-5">
            <div className="flex flex-col md:w-1/6 border-b-1 pb-2 md:border-b-0">
                <h1 className="font-semibold ">
                    Employment Data
                </h1>
                <p className="text-xs 4/5 text-gray-500">
                    Your data information related to company.
                </p>
            </div>
            <div className="md:w-4/6 md:px-4 flex flex-col pt-1 gap-4">
                <div className="flex flex-col md:flex-row gap-2 md:gap-8 md:items-center">
                    <h3 className="font-semibold text-sm w-2/6">
                        Company ID
                    </h3>
                    <p className="text-xs w-4/6 items-center">
                        ITB
                    </p>
                </div>
                <div className="flex flex-col md:flex-row gap-2 md:gap-8 md:items-center">
                    <h3 className="font-semibold text-sm w-2/6">
                        Emplotee ID
                    </h3>
                    <p className="text-xs w-4/6 items-center">
                        T001
                    </p>
                </div>
                <div className="flex flex-col md:flex-row gap-2 md:gap-8 md:items-center">
                    <h3 className="font-semibold text-sm w-2/6">
                        Organization Name
                    </h3>
                    <p className="text-xs w-4/6 items-center">
                        BOD
                    </p>
                </div>
                <div className="flex flex-col md:flex-row gap-2 md:gap-8 md:items-center">
                    <h3 className="font-semibold text-sm w-2/6">
                        Job Position
                    </h3>
                    <p className="text-xs w-4/6 items-center">
                        CEO
                    </p>
                </div>
                <div className="flex flex-col md:flex-row gap-2 md:gap-8 md:items-center">
                    <h3 className="font-semibold text-sm w-2/6">
                        Employment Status
                    </h3>
                    <p className="text-xs w-4/6 items-center">
                        -
                    </p>
                </div>
                <div className="flex flex-col md:flex-row gap-2 md:gap-8 md:items-center">
                    <h3 className="font-semibold text-sm w-2/6">
                        Branch
                    </h3>
                    <p className="text-xs w-4/6 items-center">
                        Pusat
                    </p>
                </div>
                <div className="flex flex-col md:flex-row gap-2 md:gap-8 md:items-center">
                    <h3 className="font-semibold text-sm w-2/6">
                        Join Date
                    </h3>
                    <p className="text-xs w-4/6 items-center">
                        01 Jan 2010
                    </p>
                </div>
                <div className="flex flex-col md:flex-row gap-2 md:gap-8 md:items-center">
                    <h3 className="font-semibold text-sm w-2/6">
                        Grade
                    </h3>
                    <p className="text-xs w-4/6 items-center">
                        -
                    </p>
                </div>
                <div className="flex flex-col md:flex-row gap-2 md:gap-8 md:items-center">
                    <h3 className="font-semibold text-sm w-2/6">
                        Class
                    </h3>
                    <p className="text-xs w-4/6 items-center">
                        -
                    </p>
                </div>
                <div className="flex flex-col md:flex-row gap-2 md:gap-8 md:items-center">
                    <h3 className="font-semibold text-sm w-2/6">
                        Approval Line
                    </h3>
                    <p className="text-xs w-4/6 items-center">
                        -
                    </p>
                </div>
            </div>
            <div className="md:w-1/6">
                
            </div>
        </div>
        </div>
        <div className="h-full flex flex-col items md:items-start md:flex-row w-full pt-5">
            <div className="flex flex-col md:w-1/6 border-b-1 pb-2 md:border-b-0">
                <h1 className="font-semibold ">
                    Direct Reports
                </h1>
                <p className="text-xs 4/5 text-gray-500">
                    Employees who need your approval.
                </p>
            </div>
            <div className="md:w-4/6 md:px-4 flex flex-col pt-1 gap-4">
                <p className="text-sm text-gray-500">
                    Employee doesn't have direct reports
                </p>
            </div>
            <div className="md:w-1/6">
        
            </div>
        </div>
        </>
    )
}

export default Employment;