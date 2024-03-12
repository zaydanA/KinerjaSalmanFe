import { apiBase } from "@/api";
import BaseInputText from "@/components/shares/inputs/BaseInputTextProfile";
import { useAuth } from "@/contexts";
import { useInput } from "@/hooks/useInput";
import { IApiBaseDepartment } from "@/types/department";
import { IApiBaseError, IApiBaseResponse } from "@/types/http";
import { IUserEmploymentData } from "@/types/user";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Spinner, Switch, cn } from "@nextui-org/react";
import dayjs from "dayjs";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";


// const departementEnums:any = {
//     "0":"",
//     1:"BOD",
//     2:"HRD",
//     3:"IT",
//     4:"Education",
//     "BOD":1,
//     "HRD":2,
//     "IT":3,
//     "Education":4,
// }
const Employment = (props:any) => {

    const [departmentEnums,setDepartementEnums] = useState<any>()
    const [positionEnums,setPositionEnums] = useState<any>()
    const [isEditEmployment,setIsEditEmployment] = useState(false)
    const {user} = useAuth();
    const [employmentData,setEmploymentData] = useState<IUserEmploymentData>(
        {
            employee_id: '',
            dept_id: 0,
            position_id: 0,
            join_date: new Date(),
            resign_date: new Date(),
            status:1
        }
    )
    const [employeeID,setEmployeeID] = useInput("");
    
    const [selectedKeysDept, setSelectedKeysDept] = useState<any>(new Set([""]));
    const [selectedKeysPos, setSelectedKeysPos] = useState<any>(new Set([""]));
    const [joinDate,setJoinDate] = useState<any>()
    const [resignDate,setResignDate] = useState<any>()
    const [status,setStatus] = useState<boolean>()

    
    const pathname = usePathname().split("/")
    useEffect(()=>{
        async function getEmployment(){
            const response:IApiBaseResponse<IUserEmploymentData> = await apiBase().user().employmentData(props.user?props.user.user_id:pathname[2])
            const departementResponse:IApiBaseResponse<any> = await apiBase().department().getDepartment();
            const positionResponse:IApiBaseResponse<any> = await apiBase().position().getPosition();
            
            setDepartementEnums(departementResponse.data);
            setPositionEnums(positionResponse.data);

            setEmploymentData(response.data);
            console.log(positionResponse.data);
            const employment = response.data;
            console.log(employment)
            
            employment && setEmployeeID(employment.employee_id);
            const foundDept = departementResponse.data.find((obj:any) => obj.dept_id === employment.dept_id);
            const foundPos = positionResponse.data.find((obj:any) => obj.position_id === employment.position_id);
            foundDept && setSelectedKeysDept(foundDept.dept_name); 
            foundPos && setSelectedKeysPos(foundPos.title); 
            
            const tempJoinDate = employment &&  employment.join_date.toString().split('T')[0];
            const tempResignDate = employment.resign_date &&  employment.resign_date.toString().split('T')[0];
            tempJoinDate && setJoinDate(tempJoinDate);
            tempResignDate && setResignDate(tempResignDate);

            employment.status && setStatus(Boolean(employment.status))
        }
        getEmployment()
    },[])

    const CancelChange = ()=>{
        employmentData && setEmployeeID(employmentData.employee_id);
        const foundDept = departmentEnums && departmentEnums.find((obj:any) => obj.dept_id === employmentData.dept_id);
        const foundPos = departmentEnums && positionEnums.find((obj:any) => obj.position_id === employmentData.position_id);
        foundDept && setSelectedKeysDept(foundDept.dept_name); 
        foundPos && setSelectedKeysPos(foundPos.title); 
        
        const tempJoinDate = employmentData &&  employmentData.join_date.toString().split('T')[0];
        const tempResignDate = employmentData.resign_date ? employmentData.resign_date.toString().split('T')[0] : setResignDate(undefined);
        tempJoinDate && setJoinDate(tempJoinDate);
        tempResignDate && setResignDate(tempResignDate);

        employmentData.status && setStatus(Boolean(employmentData.status))

        apiBaseError.clear();
    }


    const updateEmploymentData = async () => {

        const updateEmploymentData:IUserEmploymentData={
            employee_id: employeeID,
            dept_id: departmentEnums.find((obj:any) => obj.dept_name === selectedKeysDept).dept_id,
            position_id: positionEnums.find((obj:any) => obj.title === selectedKeysPos).position_id,
            join_date: new Date(joinDate),
            resign_date: resignDate ? new Date(resignDate) : undefined,
            status:Number(status),
        }
        try {

            // console.log(updateEmploymentData)
            const response = await apiBase().user().updateEmploymentData(props.user.user_id?props.user.user_id:user?.user_id,updateEmploymentData)
            console.log(response)
            setIsEditEmployment(false);
        } catch (error) {
            console.log(error);
            apiBaseError.set(error)
        }
    }

    const apiBaseError = apiBase().error<IApiBaseError>();
    return(
        <>
        {employmentData?
        <>
        <div className="flex min-h-fit md:pb-10 border-b-1">
                    <div className="h-full flex flex-col items md:items-start md:flex-row w-full pt-5">
            <div className="flex flex-col md:w-1/6 border-b-1 pb-2 md:border-b-0">
                <h1 className="font-semibold ">
                    Employment Data
                </h1>
                <p className="text-xs 4/5 text-gray-500">
                    Your data information related to company.
                </p>
            </div>
            <div className="md:w-4/6 md:px-4 flex flex-col pt-1 gap-4">
                <div className="flex flex-col md:flex-row gap-2 md:gap-8 md:items-center">
                    <h3 className="font-semibold text-sm w-2/6 py-1 self-start">
                        Employee ID
                    </h3>
                    <div className='w-4/6'>
                        {/* <BaseInputText
                            value={employeeID} 
                            id={"fullname"} 
                            label="" 
                            disabled={!isEditEmployment} 
                            setValue={setEmployeeID}
                            error={apiBaseError.getErrors('employee_id')?.[0].toString()}
                        /> */}
                        <p className="px-2 text-xs w-4/6 items-center">
                            {employeeID?employeeID:"-"}
                        </p> 
                    </div>
                </div>
                <div className="flex flex-col md:flex-row gap-2 md:gap-8 md:items-center">
                    <h3 className="font-semibold text-sm w-2/6 py-1 self-start">
                        Departement
                    </h3>
                    <div className='w-4/6'>
                        {isEditEmployment?     
                        <div  className='w-4/6'>
                        <Dropdown>
                            <DropdownTrigger className='h-[25px] text-[12px] w-[3px] border-[--kinerja-gold-hover-border] border-1'>
                                <Button 
                                variant="bordered" 
                                className="capitalize"
                                >
                                {selectedKeysDept}
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu 
                                aria-label="Single selection example"
                                variant="flat"
                                disallowEmptySelection
                                selectionMode="single"
                                selectedKeys={selectedKeysDept}
                                onSelectionChange={setSelectedKeysDept}
                                >
                                {departmentEnums && departmentEnums.map((blood:any)=>(
                                    <DropdownItem key={blood.dept_name}>{blood.dept_name}</DropdownItem>
                                ))}
                        </DropdownMenu>
                        </Dropdown>
                        </div>
                        : <p className="px-2 text-xs w-4/6 items-center">
                            {selectedKeysDept?selectedKeysDept:"-"}
                        </p> }
                    </div>
                </div>
                <div className="flex flex-col md:flex-row gap-2 md:gap-8 md:items-center">
                    <h3 className="font-semibold text-sm w-2/6 py-1 self-start">
                        Position
                    </h3>
                    <div className='w-4/6'>
                        {isEditEmployment?     
                        <div  className='w-4/6 z-1'>
                        <Dropdown>
                            <DropdownTrigger className='h-[25px] text-[12px] w-[3px] border-[--kinerja-gold-hover-border] border-1'>
                                <Button 
                                variant="bordered" 
                                className="capitalize"
                                >
                                {selectedKeysPos}
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu 
                                aria-label="Single selection example"
                                variant="flat"
                                disallowEmptySelection
                                selectionMode="single"
                                selectedKeys={selectedKeysPos}
                                onSelectionChange={setSelectedKeysPos}
                                >
                                {positionEnums && positionEnums.map((pos:any)=>(
                                    <DropdownItem key={pos.title}>{pos.title}</DropdownItem>
                                ))}
                        </DropdownMenu>
                        </Dropdown>
                        </div>
                        : <p className="px-2 text-xs w-4/6 items-center">
                            {selectedKeysPos?selectedKeysPos:"-"}
                        </p> }
                    </div>
                </div>
                <div className="flex flex-col md:flex-row gap-2 md:gap-8 md:items-center">
                    <h3 className="font-semibold text-sm w-2/6 py-1 self-start">
                        Join Date
                    </h3>
                    <div className='w-4/6'>
                        {isEditEmployment ? <LocalizationProvider dateAdapter={AdapterDayjs}>
                            {<DatePicker
                                value={dayjs(joinDate)}
                                onChange={(newValue:any) => {
                                const middlewareBirthdate = `${newValue.$d.getFullYear()}-${newValue.$d.getMonth()+1 < 10? "0"+(newValue.$d.getMonth()+1):newValue.$d.getMonth()+1}-${newValue.$d.getDate()}`
                                try {
                                    if(newValue.$d > new Date()){
                                        throw 'Invalid Birthdate';
                                    }else{
                                        // setBirthdateError(null)
                                        setJoinDate(middlewareBirthdate)
                                    }
                                } catch (error) {
                                    // setBirthdateError(error);
                                }
                            
                            }}
                                slotProps={{ textField: { size: 'small' } }}
                                />}
                            {/* {birthdateError?      
                                <div className="flex flex-row gap-2 items-center">
                                    <PiWarningCircle className="text-red-400"/>
                                    <p className="text-sm font-light text-red-400 text-clr-text-danger">{birthdateError}</p>
                                </div>:""
                            } */}
                        </LocalizationProvider>
                        :<p className="px-2 text-xs w-4/6 items-center">
                            {joinDate?joinDate:"-"}
                        </p> }
                    </div>
                </div>
                <div className="flex flex-col md:flex-row gap-2 md:gap-8 md:items-center">
                    <h3 className="font-semibold text-sm w-2/6 py-1 self-start">
                        Resign Date
                    </h3>
                    <div className='w-4/6'>
                        {isEditEmployment ? <LocalizationProvider dateAdapter={AdapterDayjs}>
                                {<DatePicker
                                    value={dayjs(resignDate)}
                                    onChange={(newValue:any) => {
                                    const middlewareBirthdate = `${newValue.$d.getFullYear()}-${newValue.$d.getMonth()+1 < 10? "0"+(newValue.$d.getMonth()+1):newValue.$d.getMonth()+1}-${newValue.$d.getDate()}`
                                    try {
                                        if(newValue.$d > new Date()){
                                            throw 'Invalid Birthdate';
                                        }else{
                                            // setBirthdateError(null)
                                            setResignDate(middlewareBirthdate)
                                        }
                                    } catch (error) {
                                        // setBirthdateError(error);
                                    }
                                
                                }}
                                    slotProps={{ textField: { size: 'small' } }}
                                    />}
                                {/* {birthdateError?      
                                    <div className="flex flex-row gap-2 items-center">
                                        <PiWarningCircle className="text-red-400"/>
                                        <p className="text-sm font-light text-red-400 text-clr-text-danger">{birthdateError}</p>
                                    </div>:""
                                } */}
                            </LocalizationProvider>
                            :<p className="px-2 text-xs w-4/6 items-center">
                                {resignDate?resignDate:"-"}
                            </p> }
                    </div>
                </div>

                <div className="flex flex-col md:flex-row gap-2 md:gap-8 md:items-center">
                    <h3 className="font-semibold text-sm w-2/6 py-1 self-start">
                        Active
                    </h3>
                    <div  className='w-4/6 flex items-center px-1'>
                        {<Switch isDisabled={!isEditEmployment} isSelected={status} 
                        onValueChange={()=>{
                            // if(status === true){
                            //     const resign_date = new Date()
                            //     const middlewareResginDate = `${resign_date.getFullYear()}-${resign_date.getMonth()+1 < 10? "0"+(resign_date.getMonth()+1):resign_date.getMonth()+1}-${resign_date.getDate()}`
                            //     setResignDate(middlewareResginDate);
                            // }else{
                            //     // const join_date = new Date()
                            //     // const middlewareJoinDate = `${join_date.getFullYear()}-${join_date.getMonth()+1 < 10? "0"+(join_date.getMonth()+1):join_date.getMonth()+1}-${join_date.getDate()}`
                            //     // setJoinDate(middlewareJoinDate);
                            //     setResignDate(undefined);
                            // }
                            setStatus(!status)
                            
                        }}
                        classNames={{
                            wrapper: cn("p-0 h-4 overflow-visible","group-data-[selected=true]:bg-[--kinerja-gold]"),
                            thumb: cn("w-6 h-6 border-2 shadow-lg",
                              "group-data-[hover=true]:border-[--kinerja-gold]",
                              //selected
                              "group-data-[selected=true]:border-[--kinerja-gold]",
                              "group-data-[selected=true]:ml-6",
                              // pressed
                              "group-data-[pressed=true]:w-7",
                              "group-data-[selected]:group-data-[pressed]:ml-4",
                            ),
                          }}
                        >
                        </Switch>}
                    </div>
                </div>

                {isEditEmployment && 
                    <div className='flex gap-1 justify-end'>
                        <button className="text-gray-500 border-2 rounded-lg font-mono px-2 hover:bg-gray-100 py-1 px-3" onClick={()=>{
                            CancelChange();
                            setIsEditEmployment(false);
                            }}>
                            Cancel
                        </button>
                        <button onClick={()=>{
                            updateEmploymentData();
                            
                        }} className="text-gray-500 border-2 rounded-lg font-mono px-2 bg-[--kinerja-gold] hover:bg-[--kinerja-gold-hover] text-white px-0 md:px-3">
                            Save Changes
                        </button>
                    </div>}
            </div>
            <div className="md:w-1/6 py-5 md:p-0">
                {!isEditEmployment && <button onClick={()=>{setIsEditEmployment(true)}} className="text-gray-500 border-2 rounded-lg font-mono hover:border-[--kinerja-gold-hover-border] px-2">Edit</button>}
            </div>
        </div>
        </div>
        <div className="h-full flex flex-col items md:items-start md:flex-row w-full pt-5">
            <div className="flex flex-col md:w-1/6 border-b-1 pb-2 md:border-b-0">
                <h1 className="font-semibold ">
                    Direct Reports
                </h1>
                <p className="text-xs 4/5 text-gray-500">
                    Employees who need your approval.
                </p>
            </div>
            <div className="md:w-4/6 md:px-4 flex flex-col pt-1 gap-4">
                <p className="text-sm text-gray-500">
                    Employee doesn't have direct reports
                </p>
            </div>
            <div className="md:w-1/6">
        
            </div>
        </div>
        </>
        :   <div className='flex w-full h-[50%] justify-center items-center'>
                <Spinner color="default" size="lg"/>
            </div>}
        </>
    )
}

export default Employment;