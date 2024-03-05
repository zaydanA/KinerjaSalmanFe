const IdentityAddress = (props:any)=>{
    return(
        <div className="h-full flex flex-col items md:items-start md:flex-row w-full pt-5">
            <div className="md:w-4/6 md:px-4 flex flex-col pt-1 gap-4">
                <div className="flex flex-col md:flex-row gap-2 md:gap-8 md:items-center">
                    <h3 className="font-semibold text-sm w-2/6">
                        ID Number
                    </h3>
                    <p className="text-xs w-4/6 items-center">
                        {props.employee.emmployee_id?props.employee.emmployee_id:"-"}
                    </p>
                </div>
                <div className="flex flex-col md:flex-row gap-2 md:gap-8 md:items-center">
                    <h3 className="font-semibold text-sm w-2/6">
                        Citizen ID Address
                    </h3>
                    <p className="text-xs w-4/6 items-center">
                        {props.employee.identity_number?props.employee.identity_number : "-"}
                    </p>
                </div>
                <div className="flex flex-col md:flex-row gap-2 md:gap-8 md:items-center">
                    <h3 className="font-semibold text-sm w-2/6">
                        Residential Address
                    </h3>
                    <p className="text-xs w-4/6 items-center">
                        -
                    </p>
                </div>
            </div>
            <div className="md:w-1/6">
        
            </div>
        </div>
    )
}

export default IdentityAddress;