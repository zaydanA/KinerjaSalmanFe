import { parseISO, format } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';
import {useState,useEffect} from "react"
import BaseInputText from '../../inputs/BaseInputText';
import { useInput } from '@/hooks/useInput';
const PersonalData = (props:any)=>{

    const [isEditPersonal,setIsEditPersonal] = useState<boolean>(false)
    const [fullName,setFullName] = useInput("-");
    const [mobielPhone,setMobilePohne] = useInput("-");

    useEffect(()=>{
        props.employee.full_name && setFullName(props.employee.full_name)
    },[props.employee])

    const CancelChange = ()=>{
        setFullName(props.employee.full_name);

    }

    return(
        <div className="h-full flex flex-col items md:items-start md:flex-row w-full pt-5">
            <div className="flex flex-col md:w-1/6 border-b-1 pb-2 md:border-b-0">
                <h1 className="font-semibold ">
                    Personal Data
                </h1>
                <p className="text-xs 4/5 text-gray-500">
                    Your email address is your identity on Kinerja is used to log in.
                </p>
            </div>
            <div className="md:w-4/6 md:px-4 flex flex-col pt-1 gap-4">
                <div className="flex flex-col md:flex-row gap-2 md:gap-8 md:items-center">
                    <h3 className="font-semibold text-sm w-2/6">
                        Full Name
                    </h3>
                    <div className='w-4/6'>
                        {<BaseInputText value={fullName} id={"fullname"} label="" disabled={!isEditPersonal} setValue={setFullName}></BaseInputText>}
                    </div>
                </div>
                <div className="flex flex-col md:flex-row gap-2 md:gap-8 md:items-center">
                    <h3 className="font-semibold text-sm w-2/6">
                        Mobile Phone
                    </h3>
                    <p className="text-xs w-4/6 items-center">
                        {props.employee.phone_number? props.employee.phone_number:"-"}
                    </p>
                </div>
                <div className="flex flex-col md:flex-row gap-2 md:gap-8 md:items-center">
                    <h3 className="font-semibold text-sm w-2/6">
                        Email
                    </h3>
                    <p className="text-xs w-4/6 items-center">
                        {props.employee.email?props.employee.email:"-"}
                    </p>
                </div>
                <div className="flex flex-col md:flex-row gap-2 md:gap-8 md:items-center">
                    <h3 className="font-semibold text-sm w-2/6">
                        NPWP
                    </h3>
                    <p className="text-xs w-4/6 items-center">
                        {props.employee.npwp_number?props.employee.npwp_number:"-"}
                    </p>
                </div>
                <div className="flex flex-col md:flex-row gap-2 md:gap-8 md:items-center">
                    <h3 className="font-semibold text-sm w-2/6">
                        Place of Birth
                    </h3>
                    <p className="text-xs w-4/6 items-center">
                        {props.employee.place_of_birth?props.employee.place_of_birth:"-"}
                    </p>
                </div>
                <div className="flex flex-col md:flex-row gap-2 md:gap-8 md:items-center">
                    <h3 className="font-semibold text-sm w-2/6">
                        Birthdate
                    </h3>
                    <p className="text-xs w-4/6 items-center">
                        {/* {parsedTime} */}
                    </p>
                </div>
                <div className="flex flex-col md:flex-row gap-2 md:gap-8 md:items-center">
                    <h3 className="font-semibold text-sm w-2/6">
                        Gender
                    </h3>
                    <p className="text-xs w-4/6 items-center">
                        {props.employee.gender?props.employee.gender:"-"}
                    </p>
                </div>
                <div className="flex flex-col md:flex-row gap-2 md:gap-8 md:items-center">
                    <h3 className="font-semibold text-sm w-2/6">
                        Marital Status
                    </h3>
                    <p className="text-xs w-4/6 items-center">
                        {props.employee.marital_status}
                    </p>
                </div>
                <div className="flex flex-col md:flex-row gap-2 md:gap-8 md:items-center">
                    <h3 className="font-semibold text-sm w-2/6">
                        Last Education
                    </h3>
                    <p className="text-xs w-4/6 items-center">
                        {props.employee.last_education}
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

                {isEditPersonal && 
                    <div className='flex gap-1 justify-end'>
                        <button className="text-gray-500 border-2 rounded-lg font-mono px-2 hover:bg-gray-100 py-1 px-3" onClick={()=>{
                            setIsEditPersonal(false);
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
                {!isEditPersonal?<button onClick={()=>{setIsEditPersonal(true)}} className="text-gray-500 border-2 rounded-lg font-mono hover:border-[--kinerja-gold-hover-border] px-2">Edit</button>:<></>}
            </div>
        </div>
    )
}

export default PersonalData;