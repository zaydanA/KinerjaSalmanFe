import { apiBase } from "@/api"
import IdentityAddress from "./IdentityAddress"
import PersonalData from "./PersonalData"
import { useEffect,useState } from "react"

const BasicInfo = (props:any)=>{
        const [employee,setEmployee] = useState<any>({})

        useEffect(()=>{
            async function getEmployeeById(){
                const employee = await apiBase().user().self(1);
                
                setEmployee(employee.data);
            }   
            getEmployeeById()
        },[])

    return(
        <>
                <div className="flex min-h-fit pb-10 border-b-1">
                        <PersonalData employee={employee}></PersonalData>
                </div>
                <div className="flex min-h-fit pb-10 border-b-1">
                        <IdentityAddress employee={employee}></IdentityAddress>
                </div>
        </>
    )
}

export default BasicInfo;