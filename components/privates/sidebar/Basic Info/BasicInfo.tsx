import { apiBase } from "@/api"
import IdentityAddress from "./IdentityAddress"
import PersonalData from "./PersonalData"
import { useEffect,useState } from "react"

const BasicInfo = (props:any)=>{
        const [employee,setEmployee] = useState<any>({})

        useEffect(()=>{
            async function getEmployeeById(){
                const res = await apiBase().user().personalData(1);
                
                setEmployee(res.data);
                console.log(res.data);
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