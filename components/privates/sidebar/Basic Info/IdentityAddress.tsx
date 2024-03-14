import { useInput } from "@/hooks/useInput";
import { useEffect, useState } from "react"
import BaseInputText from "../../../shares/inputs/BaseInputTextProfile";
import { apiBase } from "@/api";
import { IUserPersonalData } from "@/types/user";
import { IApiBaseError } from "@/types/http";

const IdentityAddress = (props:any)=>{
    
    const [isEditIdentity,setIsEditIdentity] = useState<boolean>(false);
    const [idNumber,setIdNumber] = useInput("");
    const [emergencyNumber,setEmergencyNumber] = useInput("");
    const [address,setAddress] = useInput("");
    const apiBaseError = apiBase().error<IApiBaseError>();

    const updatePersonalDataIdentity = async () => {

        const personalData : IUserPersonalData = {
            email: props.employee.email,
            full_name: props.employee.full_name,
            phone_number: props.employee.phone_number,
            place_of_birth: props.employee.place_of_birth,
            date_of_birth: props.employee.date_of_birth,
            gender: props.employee.gender,
            marital_status: props.employee.marital_status,
            blood_type: props.employee.blood_type,
            last_education: props.employee.last_education,
            status:props.employee.status,
            identity_number: idNumber,
            address: address,
            emergency_number: emergencyNumber,
        }
        try {
            const response = await apiBase().user().updatePersonalData(props.employee.user_id,personalData)
            setIsEditIdentity(false);
        } catch (error) {
            apiBaseError.set(error)
        }
    }
    useEffect(()=>{
        props.employee.identity_number && setIdNumber(props.employee.identity_number);
        props.employee.emergency_number && setEmergencyNumber(props.employee.emergency_number);
        props.employee.address && setAddress("-")
    },[props.employee])

    const CancelChange = ()=>{
        props.employee.identity_number && setIdNumber(props.employee.identity_number);
        props.employee.emergency_number && setEmergencyNumber(props.employee.emergency_number);
        props.employee.address && setAddress("-")
        apiBaseError.clear()
    }
    return(
        <div className="h-full flex flex-col items md:items-start md:flex-row w-full pt-5">
            <div className="flex flex-col md:w-1/6 border-b-1 pb-4 md:border-b-0">
                <h1 className="font-semibold ">
                    Identity & Address
                </h1>
            </div>
            <div className="md:w-4/6 md:px-4 flex flex-col pt-1 gap-3">
                <div className="flex flex-col md:flex-row gap-2 md:gap-8 md:items-center">
                    <h3 className="font-semibold text-sm w-2/6 py-1 self-start">
                        Citizen ID Address
                    </h3>
                    <div className='w-4/6'>
                    {idNumber || isEditIdentity?<BaseInputText value={idNumber} id={"fullname"} label="" disabled={!isEditIdentity} setValue={setIdNumber}
                        error={apiBaseError.getErrors("identity_number")?.[0].toString()}
                    ></BaseInputText>:<p className="px-2 text-sm">-</p>}
                    </div>
                </div>
                <div className="flex flex-col md:flex-row gap-2 md:gap-8 md:items-center">
                    <h3 className="font-semibold text-sm w-2/6 py-1 self-start">
                        Residential Address
                    </h3>
                    <div className='w-4/6'>
                    {address || isEditIdentity?<BaseInputText value={address} id={"fullname"} label="" disabled={!isEditIdentity} setValue={setAddress}></BaseInputText>:<p className="px-2 text-sm">-</p>}

                    </div>
                </div>
                <div className="flex flex-col md:flex-row gap-2 md:gap-8 md:items-center">
                    <h3 className="font-semibold text-sm w-2/6 py-1 self-start">
                        Emergency Number
                    </h3>
                    <div className='w-4/6'>
                    {emergencyNumber || isEditIdentity?<BaseInputText value={emergencyNumber} id={"fullname"} label="" disabled={!isEditIdentity} setValue={setEmergencyNumber}></BaseInputText>:<p className="px-2 text-sm">-</p>}

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
                        <button className="text-gray-500 border-2 rounded-lg font-mono px-2 bg-[--kinerja-gold] hover:bg-[--kinerja-gold-hover] text-white px-0 md:px-3" onClick={updatePersonalDataIdentity}>
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