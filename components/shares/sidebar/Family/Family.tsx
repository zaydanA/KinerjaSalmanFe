import TableHeader from "../../tables/TableHeader";


const tableHeader = [
    "Name",
    "Relationships",
    "Birtdate",
    "ID Number",
    "Marital Status",
    "Gender",
    "Job",
    "Religion"
];

const dummyHeader = [
    "Employee",
    "Divisi",
    "Employment Status",
    "Join Date",
    "End Date",
    "Birth Date",
    "Address",
    "Phone",
    "Gender",
    "Marital Status",
  ];
const Family = (props:any)=>{
    
    return(
        <>
            <div className="flex w-full min-h-[12%] py-5 justify-end">
                <button className="border-1 rounded-lg px-5 md:mr-5 bg-gray-50 font-light text-gray-500 text-sm">
                    Add New
                </button>
            </div>
            <div className="flex w-full h-[88%] py-5 px-4">
                <div id="horizontal" className="overflow-x-scroll w-full">
                    {/* <table className="w-full">
                        <TableHeader headers={dummyHeader} action={true}/>
                        <tbody>

                        </tbody>
                    </table> */}
                </div>
            </div>
        </>
    )
}
export default Family;