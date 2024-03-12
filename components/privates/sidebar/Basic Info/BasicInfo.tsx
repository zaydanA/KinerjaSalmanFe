import { apiBase } from "@/api"
import IdentityAddress from "./IdentityAddress"
import PersonalData from "./PersonalData"
import { useEffect,useState } from "react"
import { useAuth } from "@/contexts"

const BasicInfo = (props:any)=>{


    return(
        <>
                <div className="flex min-h-fit pb-10 border-b-1">
                        <PersonalData employee={props.employee}></PersonalData>
                </div>
                <div className="flex min-h-fit pb-10 border-b-1">
                        <IdentityAddress employee={props.employee}></IdentityAddress>
                </div>
        </>
    )
}

export default BasicInfo;