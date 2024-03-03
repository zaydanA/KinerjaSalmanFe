const IdentityAddress = (props:any)=>{
    return(
        <div className="h-full flex flex-col items md:items-start md:flex-row w-full pt-5">
            <div className="flex flex-col md:w-1/6 border-b-1 pb-2 md:border-b-0">
                <h1 className="font-semibold ">
                    Personal Data
                </h1>
                <p className="text-xs 4/5">
                    Your email address is your identity on Talenta is used to log in.
                </p>
            </div>
            <div className="md:w-4/6 md:px-4 flex flex-col pt-1 gap-4">
                <div className="flex flex-col md:flex-row gap-2 md:gap-8 md:items-center">
                    <h3 className="font-semibold text-sm w-2/6">
                        Full Name
                    </h3>
                    <p className="text-xs w-4/6 items-center">
                        Muhammad Zaydan Athallah
                    </p>
                </div>
                <div className="flex flex-col md:flex-row gap-2 md:gap-8 md:items-center">
                    <h3 className="font-semibold text-sm w-2/6">
                        Mobile Phone
                    </h3>
                    <p className="text-xs w-4/6 items-center">
                        0878 kapan kapan kita ke dufan
                    </p>
                </div>
                <div className="flex flex-col md:flex-row gap-2 md:gap-8 md:items-center">
                    <h3 className="font-semibold text-sm w-2/6">
                        Email
                    </h3>
                    <p className="text-xs w-4/6 items-center">
                        zaydanathallah@gmail.com
                    </p>
                </div>
                <div className="flex flex-col md:flex-row gap-2 md:gap-8 md:items-center">
                    <h3 className="font-semibold text-sm w-2/6">
                        Phone
                    </h3>
                    <p className="text-xs w-4/6 items-center">
                        -
                    </p>
                </div>
                <div className="flex flex-col md:flex-row gap-2 md:gap-8 md:items-center">
                    <h3 className="font-semibold text-sm w-2/6">
                        Place of Birth
                    </h3>
                    <p className="text-xs w-4/6 items-center">
                        Jakarta
                    </p>
                </div>
                <div className="flex flex-col md:flex-row gap-2 md:gap-8 md:items-center">
                    <h3 className="font-semibold text-sm w-2/6">
                        Birthdate
                    </h3>
                    <p className="text-xs w-4/6 items-center">
                        17 Agustus 2003
                    </p>
                </div>
                <div className="flex flex-col md:flex-row gap-2 md:gap-8 md:items-center">
                    <h3 className="font-semibold text-sm w-2/6">
                        Gender
                    </h3>
                    <p className="text-xs w-4/6 items-center">
                        Male
                    </p>
                </div>
                <div className="flex flex-col md:flex-row gap-2 md:gap-8 md:items-center">
                    <h3 className="font-semibold text-sm w-2/6">
                        Marital Status
                    </h3>
                    <p className="text-xs w-4/6 items-center">
                        Coming Soon
                    </p>
                </div>
                <div className="flex flex-col md:flex-row gap-2 md:gap-8 md:items-center">
                    <h3 className="font-semibold text-sm w-2/6">
                        Blood Type
                    </h3>
                    <p className="text-xs w-4/6 items-center">
                        AB
                    </p>
                </div>
                <div className="flex flex-col md:flex-row gap-2 md:gap-8 md:items-center">
                    <h3 className="font-semibold text-sm w-2/6">
                        Religion
                    </h3>
                    <p className="text-xs w-4/6 items-center">
                        Islam
                    </p>
                </div>
            </div>
            <div className="md:w-1/6">
        
            </div>
        </div>
    )
}

export default IdentityAddress;