import { useAuth } from '@/contexts';
import { Spinner } from '@nextui-org/react';
import { usePathname } from 'next/navigation';
import React from 'react'

const PayrollInfo = (props:any) => {
  const pathname = usePathname().split("/");
  const userId = props.user ? props.user.user_id : pathname[2];
  const { isHRDManagerOrDirector, isManager } = useAuth();
  return (
    <>
      {employmentData ?
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
                        <p className="px-2 text-xs w-4/6 items-center">
                            {employeeID?employeeID:"-"}
                        </p> 
                    </div>
                </div>
                {/* <div className="flex flex-col md:flex-row gap-2 md:gap-8 md:items-center">
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
                </div> */}

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
                  {( !isEditEmployment && (user?.position.position_id == 1 || user?.position.position_id === 2) && (user?.dept.dept_id == 1 || user?.dept.dept_id || user.dept.dept_id === employmentData.dept_id) )   ? <button onClick={()=>{setIsEditEmployment(true)}} className="text-gray-500 border-2 rounded-lg font-mono hover:border-[--kinerja-gold-hover-border] px-2">Edit</button> : <></>}
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
                Employee doesn&apos;t have direct reports
              </p>
            </div>
            <div className="md:w-1/6">
        
            </div>
          </div>
        </> : 
      <div className='flex w-full h-[50%] justify-center items-center'>
        <Spinner color="default" size="lg"/>
      </div>}
    </>
  )
}

export default PayrollInfo