import { IUserPersonalData } from "@/types/user";
import IdentityAddress from "./IdentityAddress"
import PersonalData from "./PersonalData"

const BasicInfo = ({
        employee
        }:{
        employee:IUserPersonalData
        })=>{


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