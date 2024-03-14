import {useState,useEffect,useMemo} from "react"
import BaseInputText from '../../../shares/inputs/BaseInputTextProfile';
import { useInput } from '@/hooks/useInput';
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Spinner, Switch, cn } from '@nextui-org/react';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { apiBase } from "@/api";
import { IUserPersonalData } from "@/types/user";
import { IApiBaseError } from "@/types/http";
import { PiWarningCircle } from "react-icons/pi";
import { useAuth } from "@/contexts";

const gender = ["M","F"];
const MaritalStatus = ["SINGLE","MARRIED","WIDOW","WIDOWER"]
const LastEducation = ["TIDAK_SEKOLAH","SD","SMP","SMA_SMK","D3","S1","S2","S3"]
const BloodType = ["A","B","O","AB"]
const PersonalData = (props:any)=>{
    const {user} = useAuth();
    const [isEditPersonal,setIsEditPersonal] = useState<boolean>(false)
    const [fullName,setFullName] = useInput("");
    const [mobilePhone,setMobilePhone] = useInput("");
    const [email,setEmail] = useInput("");
    const [placeOfBirth,setPlaceOfBirth] = useInput("");
    const [birthdate,setBirthdate] = useState<string>('');

    const [birthdateError,setBirthdateError] = useState<any>("");
    
    const [selectedKeysGender, setSelectedKeysGender] = useState<any>(new Set([""]));
    const [selectedKeysMarital, setSelectedKeysMarital] = useState<any>(new Set([""]));
    const [selectedKeysEducation, setSelectedKeysEducation] = useState<any>(new Set([""]));
    const [selectedKeysBloodType, setSelectedKeysBloodType] = useState<any>(new Set([""]));

    const selectedValueGender = useMemo(
      () => Array.from(selectedKeysGender).join(", ").replaceAll("_", " "),
      [selectedKeysGender]
    );

    const selectedValueMarital = useMemo(
      () => Array.from(selectedKeysMarital).join(", ").replaceAll("_", " "),
      [selectedKeysMarital]
    );
    const selectedValueEducation = useMemo(
      () => Array.from(selectedKeysEducation).join(", ").replaceAll("_", " "),
      [selectedKeysEducation]
    );
    const selectedValueBloodType = useMemo(
      () => Array.from(selectedKeysBloodType).join(", ").replaceAll("_", " "),
      [selectedKeysBloodType]
    );

    const apiBaseError = apiBase().error<IApiBaseError>();

    const updatePersonalData = async () => {

        const personalData : IUserPersonalData = {
            email: email,
            full_name: fullName,
            phone_number: mobilePhone,
            place_of_birth: placeOfBirth,
            date_of_birth: birthdate,
            gender: selectedValueGender,
            marital_status: selectedValueMarital,
            blood_type: selectedValueBloodType !== "-"? selectedValueBloodType : "",
            last_education: selectedValueEducation,
            emergency_number: props.employee.emergency_number,
            identity_number: props.employee.identity_number,
            address: props.employee.address,
        }
        try {
            const response = await apiBase().user().updatePersonalData(props.employee.user_id,personalData)
            // console.log(response)
            setIsEditPersonal(false);
        } catch (error) {
            apiBaseError.set(error)
        }
    }
    // console.log(apiBase().error().getMessage());

    const tempBirthdate = props.employee.date_of_birth &&  props.employee.date_of_birth.toString().split('T')[0];
    useEffect(()=>{
        // props.employee.date_of_birth && setBirthdate(tempBirthdate);
        props.employee.full_name && setFullName(props.employee.full_name)
        props.employee.phone_number && setMobilePhone(props.employee.phone_number)
        props.employee.email && setEmail(props.employee.email)
        props.employee.place_of_birth && setPlaceOfBirth(props.employee.place_of_birth)
        props.employee.gender && setSelectedKeysGender(new Set([props.employee.gender]))
        props.employee.marital_status && setSelectedKeysMarital(new Set([props.employee.marital_status]));
        props.employee.last_education && setSelectedKeysEducation(new Set([props.employee.last_education]));
        props.employee.blood_type && setSelectedKeysBloodType(new Set([props.employee.blood_type]));
        props.employee.date_of_birth && setBirthdate(tempBirthdate)
        // console.log(tempBirthdate);
    },[props.employee])

    const CancelChange = ()=>{
        props.employee.full_name && setFullName(props.employee.full_name)
        props.employee.phone_number && setMobilePhone(props.employee.phone_number)
        props.employee.email && setEmail(props.employee.email)
        props.employee.place_of_birth && setPlaceOfBirth(props.employee.place_of_birth)
        props.employee.gender && setSelectedKeysGender(new Set([props.employee.gender]))
        props.employee.marital_status && setSelectedKeysMarital(new Set([props.employee.marital_status]));
        props.employee.last_education && setSelectedKeysEducation(new Set([props.employee.last_education]));
        props.employee.blood_type && setSelectedKeysBloodType(new Set([props.employee.blood_type]));
        props.employee.date_of_birth && setBirthdate(tempBirthdate);

        setBirthdateError("");
        apiBaseError.clear();
    }

    return(
        <>
        {props.employee.full_name !== undefined ? <div className="h-full flex flex-col items md:items-start md:flex-row w-full pt-5">
            <div className="flex flex-col md:w-1/6 border-b-1 md:border-b-0">
                <h1 className="font-semibold ">
                    Personal Data
                </h1>
                <p className="text-xs 4/5 text-gray-500">
                    Your email address is your identity on Kinerja is used to log in.
                </p>
            </div>
            <div className="md:w-4/6 md:px-4 flex flex-col pt-1 gap-3">
                <div className="flex flex-col md:flex-row gap-2 md:gap-8 md:items-center">
                    <h3 className="font-semibold text-sm w-2/6 py-1 self-start">
                        Full Name
                    </h3>
                    <div className='w-4/6'>
                        {fullName || isEditPersonal?<BaseInputText 
                        value={fullName} 
                        id={"fullname"} 
                        label="" 
                        disabled={!isEditPersonal} 
                        setValue={setFullName}
                        error={apiBaseError.getErrors('full_name')?.[0].toString()}
                        ></BaseInputText>:"-"}
                    </div>
                </div>
                <div className="flex flex-col md:flex-row gap-2 md:gap-8 md:items-center">
                    <h3 className="font-semibold text-sm w-2/6 py-1 self-start">
                        Mobile Phone
                    </h3>
                    <div className='w-4/6'>
                        {mobilePhone || isEditPersonal?<BaseInputText 
                            value={mobilePhone} 
                            id={"mobilephone"} 
                            label="" 
                            disabled={!isEditPersonal} 
                            setValue={setMobilePhone}
                            error={apiBaseError.getErrors('phone_number')?.[0].toString()}
                        />:<p className="px-2 text-sm">-</p>}
                    </div>
                </div>
                <div className="flex flex-col md:flex-row gap-2 md:gap-8 md:items-center">
                    <h3 className="font-semibold text-sm w-2/6 py-1 self-start">
                        Email
                    </h3>
                    <div className='w-4/6'>
                        <BaseInputText 
                            value={email} 
                            id={"email"} 
                            label="" 
                            disabled={true} 
                            setValue={setEmail}
                            error={apiBaseError.getErrors('email')?.[0].toString()}
                        />
                    </div>
                </div>
                <div className="flex flex-col md:flex-row gap-2 md:gap-8 md:items-center">
                    <h3 className="font-semibold text-sm w-2/6 py-1 self-start">
                        Place of Birth
                    </h3>
                    <div className='w-4/6'>
                        {placeOfBirth || isEditPersonal?<BaseInputText value={placeOfBirth} id={"placeofbirth"} label="" disabled={!isEditPersonal} setValue={setPlaceOfBirth}></BaseInputText>:<p className="px-2 text-sm">-</p>}
                    </div>
                </div>
                <div className="flex flex-col md:flex-row gap-2 md:gap-8 md:items-center">
                    <h3 className={`font-semibold text-sm w-2/6 ${isEditPersonal?"py-3" : "py-1"} self-start`}>
                        Birthdate
                    </h3>
                    <div className={`w-4/6 flex flex-col justify-center`}>
                    {isEditPersonal ? <LocalizationProvider dateAdapter={AdapterDayjs}>
                        {<DatePicker
                            defaultValue={dayjs(birthdate)}
                            onChange={(newValue:any) => {
                            const middlewareBirthdate = `${newValue.$d.getFullYear()}-${newValue.$d.getMonth()+1 < 10? "0"+(newValue.$d.getMonth()+1):newValue.$d.getMonth()+1}-${newValue.$d.getDate()}`
                            try {

                                console.log(new Date());
                                if(newValue.$d > new Date()){
                                    throw 'Invalid Birthdate';
                                }else{
                                    setBirthdateError(null)
                                    setBirthdate(middlewareBirthdate)
                                }
                            } catch (error) {
                                setBirthdateError(error);
                            }
                        
                        }}
                            slotProps={{ textField: { size: 'small' } }}
                            />}
                        {birthdateError?      
                            <div className="flex flex-row gap-2 items-center">
                                <PiWarningCircle className="text-red-400"/>
                                <p className="text-sm font-light text-red-400 text-clr-text-danger">{birthdateError}</p>
                            </div>:""
                        }
                    </LocalizationProvider>
                    :<p className="px-2 text-xs w-4/6 items-center">
                        {birthdate?birthdate:"-"}
                    </p> }
                    </div>
                </div>
                <div className="flex flex-col md:flex-row gap-2 md:gap-8 md:items-center">
                    <h3 className="font-semibold text-sm w-2/6 py-1 self-start">
                        Gender
                    </h3>
                    {isEditPersonal?     
                    <div  className='w-4/6'>
                    <Dropdown>
                        <DropdownTrigger className='h-[25px] text-[12px] w-[3px] border-[--kinerja-gold-hover-border] border-1'>
                            <Button 
                            variant="bordered" 
                            className="capitalize"
                            >
                            {selectedValueGender}
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu 
                            aria-label="Single selection example"
                            variant="flat"
                            disallowEmptySelection
                            selectionMode="single"
                            selectedKeys={selectedKeysGender}
                            onSelectionChange={setSelectedKeysGender}
                            >
                            {gender.map((gender)=>(
                                <DropdownItem key={gender}>{gender}</DropdownItem>
                            ))}
                    </DropdownMenu>
                    </Dropdown>
                    </div>
                    : <p className="px-2 text-xs w-4/6 items-center">
                        {selectedValueGender?selectedValueGender:"-"}
                    </p> }
                </div>
                <div className="flex flex-col md:flex-row gap-2 md:gap-8 md:items-center">
                    <h3 className="font-semibold text-sm w-2/6 py-1 self-start">
                        Marital Status
                    </h3>
                    {isEditPersonal?     
                    <div  className='w-4/6'>
                    <Dropdown>
                        <DropdownTrigger className='h-[25px] text-[12px] w-[3px] border-[--kinerja-gold-hover-border] border-1'>
                            <Button 
                            variant="bordered" 
                            className="capitalize"
                            >
                            {selectedValueMarital}
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu 
                            aria-label="Single selection example"
                            variant="flat"
                            disallowEmptySelection
                            selectionMode="single"
                            selectedKeys={selectedKeysMarital}
                            onSelectionChange={setSelectedKeysMarital}
                            >
                            {MaritalStatus.map((status)=>(
                                <DropdownItem key={status}>{status === "TIDAK_SEKOLAH"? "TIDAK SEKOLAH": status === "SMA_SMK"? "SMA/SMK" : status}</DropdownItem>
                            ))}
                    </DropdownMenu>
                    </Dropdown>
                    </div>
                    : <p className="px-2 text-xs w-4/6 items-center">
                        {selectedValueMarital?selectedValueMarital:"-"}
                    </p> }
                </div>
                <div className="flex flex-col md:flex-row gap-2 md:gap-8 md:items-center">
                    <h3 className="font-semibold text-sm w-2/6 py-1 self-start">
                        Last Education
                    </h3>
                    {isEditPersonal?     
                    <div  className='w-4/6'>
                    <Dropdown>
                        <DropdownTrigger className='h-[25px] text-[12px] w-[3px] border-[--kinerja-gold-hover-border] border-1'>
                            <Button 
                            variant="bordered" 
                            className="capitalize"
                            >
                            {selectedValueEducation}
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu 
                            aria-label="Single selection example"
                            variant="flat"
                            disallowEmptySelection
                            selectionMode="single"
                            selectedKeys={selectedKeysEducation}
                            onSelectionChange={setSelectedKeysEducation}
                            >
                            {LastEducation.map((education)=>(
                                <DropdownItem key={education}>{education}</DropdownItem>
                            ))}
                    </DropdownMenu>
                    </Dropdown>
                    </div>
                    : <p className="px-2 text-xs w-4/6 items-center">
                        {selectedValueEducation?selectedValueEducation:"-"}
                    </p> }
                </div>
                <div className="flex flex-col md:flex-row gap-2 md:gap-8 md:items-center">
                    <h3 className="font-semibold text-sm w-2/6 py-1 self-start">
                        Blood Type
                    </h3>
                    {isEditPersonal?     
                    <div  className='w-4/6'>
                    <Dropdown>
                        <DropdownTrigger className='h-[25px] text-[12px] w-[3px] border-[--kinerja-gold-hover-border] border-1'>
                            <Button 
                            variant="bordered" 
                            className="capitalize"
                            >
                            {selectedValueBloodType}
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu 
                            aria-label="Single selection example"
                            variant="flat"
                            disallowEmptySelection
                            selectionMode="single"
                            selectedKeys={selectedKeysBloodType}
                            onSelectionChange={setSelectedKeysBloodType}
                            >
                            {BloodType.map((blood)=>(
                                <DropdownItem key={blood}>{blood}</DropdownItem>
                            ))}
                    </DropdownMenu>
                    </Dropdown>
                    </div>
                    : <p className="px-2 text-xs w-4/6 items-center">
                        {selectedValueBloodType?selectedValueBloodType:"-"}
                    </p> }
                
                </div>

                {isEditPersonal && 
                    <div className='flex gap-1 justify-end'>
                        <button className="text-gray-500 border-2 rounded-lg font-mono px-2 hover:bg-gray-100 py-1 px-3" onClick={()=>{
                            setIsEditPersonal(false);
                            CancelChange();
                            }}>
                            Cancel
                        </button>
                        <button onClick={()=>{
                            updatePersonalData();
                            
                        }} className="text-gray-500 border-2 rounded-lg font-mono px-2 bg-[--kinerja-gold] hover:bg-[--kinerja-gold-hover] text-white px-0 md:px-3">
                            Save Changes
                        </button>
                    </div>}
            </div>
            <div className="md:w-1/6 py-5 md:p-0">
                {!isEditPersonal ?<button onClick={()=>{setIsEditPersonal(true)}} className="text-gray-500 border-2 rounded-lg font-mono hover:border-[--kinerja-gold-hover-border] px-2">Edit</button>:<></>}
            </div>
        </div>: <div className='flex w-full h-[400px] justify-center items-center'>
            <Spinner color="default" size="lg"/>
        </div>
        }
        </>
    )
}

export default PersonalData;