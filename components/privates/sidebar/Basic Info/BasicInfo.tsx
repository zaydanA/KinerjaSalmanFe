import { apiBase } from "@/api"
import IdentityAddress from "./IdentityAddress"
import PersonalData from "./PersonalData"
import { useEffect,useState } from "react"
import { useAuth } from "@/contexts"

const BasicInfo = (props:any)=>{
        const [employee,setEmployee] = useState<any>({})
        const {user} = useAuth()
        useEffect(()=>{
            async function getEmployeeById(){
                const res = user && await apiBase().user().personalData(user.user_id);
                
                setEmployee(res && res.data);
                console.log(res && res.data);
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