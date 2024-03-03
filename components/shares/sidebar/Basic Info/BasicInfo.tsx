import IdentityAddress from "./IdentityAddress"
import PersonalData from "./PersonalData"

const BasicInfo = (props:any)=>{
    
    return(
        <>
                <div className="flex min-h-fit pb-10 border-b-1">
                        <PersonalData></PersonalData>
                </div>
                <div className="flex min-h-fit pb-10 border-b-1">
                        <IdentityAddress></IdentityAddress>
                </div>
        </>
    )
}

export default BasicInfo;