import { useInput } from "@/hooks/useInput";
import { useEffect, useState } from "react"
import BaseInputText from "../../../shares/inputs/BaseInputTextProfile";

const IdentityAddress = (props:any)=>{
    
    const [isEditIdentity,setIsEditIdentity] = useState<boolean>(false);
    const [idNumber,setIdNumber] = useInput("-");
    const [emergencyNumber,setEmergencyNumber] = useInput("-");
    const [address,setAddress] = useInput("-");

    useEffect(()=>{
        props.employee.identity_number && setIdNumber(props.employee.identity_number);
        props.employee.emergency_number && setEmergencyNumber(props.employee.emergency_number);
        setAddress("-")
    },[props.employee])

    const CancelChange = ()=>{
        props.employee.identity_number && setIdNumber(props.employee.identity_number);
        props.employee.emergency_number && setEmergencyNumber(props.employee.emergency_number);
        setAddress("-")
    }
    return(
        <div className="h-full flex flex-col items md:items-start md:flex-row w-full pt-5">
            <div className="flex flex-col md:w-1/6 border-b-1 pb-4 md:border-b-0">
                <h1 className="font-semibold ">
                    Identity & Address
                </h1>
            </div>
            <div className="md:w-4/6 md:px-4 flex flex-col pt-1 gap-4">
                <div className="flex flex-col md:flex-row gap-2 md:gap-8 md:items-center">
                    <h3 className="font-semibold text-sm w-2/6">
                        Citizen ID Address
                    </h3>
                    <div className='w-4/6'>
                        {<BaseInputText value={idNumber} id={"fullname"} label="" disabled={!isEditIdentity} setValue={setIdNumber}></BaseInputText>}
                    </div>
                </div>
                <div className="flex flex-col md:flex-row gap-2 md:gap-8 md:items-center">
                    <h3 className="font-semibold text-sm w-2/6">
                        Residential Address
                    </h3>
                    <div className='w-4/6'>
                        {<BaseInputText value={address} id={"fullname"} label="" disabled={!isEditIdentity} setValue={setAddress}></BaseInputText>}
                    </div>
                </div>
                <div className="flex flex-col md:flex-row gap-2 md:gap-8 md:items-center">
                    <h3 className="font-semibold text-sm w-2/6">
                        Emergency Number
                    </h3>
                    <div className='w-4/6'>
                        {<BaseInputText value={emergencyNumber} id={"fullname"} label="" disabled={!isEditIdentity} setValue={setEmergencyNumber}></BaseInputText>}
                    </div>
                </div>
                
                {isEditIdentity && 
                    <div className='flex gap-1 justify-end'>
                        <button className="text-gray-500 border-2 rounded-lg font-mono px-2 hover:bg-gray-100 py-1 px-3" onClick={()=>{
                            setIsEditIdentity(false);
                            CancelChange();
                            }}>
                            Cancel
                        </button>
                        <button className="text-gray-500 border-2 rounded-lg font-mono px-2 bg-[--kinerja-gold] hover:bg-[--kinerja-gold-hover] text-white px-0 md:px-3">
                            Save Changes
                        </button>
                    </div>}
            </div>
            <div className="md:w-1/6 py-5 md:p-0">
                {!isEditIdentity?<button onClick={()=>{setIsEditIdentity(true)}} className="text-gray-500 border-2 rounded-lg font-mono hover:border-[--kinerja-gold-hover-border] px-2">Edit</button>:<></>}
            </div>
        </div>
    )
}

export default IdentityAddress;