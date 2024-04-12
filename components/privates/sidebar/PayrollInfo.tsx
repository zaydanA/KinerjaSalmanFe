import { apiBase } from '@/api';
import BaseInputButton from '@/components/shares/buttons/BaseInputButton';
import BaseInputDate from '@/components/shares/inputs/BaseInputDate';
import BaseInputText from '@/components/shares/inputs/BaseInputText';
import BaseInputTextProfile from '@/components/shares/inputs/BaseInputTextProfile';
import DropdownInput from '@/components/shares/inputs/DropdownInput';
import { useAuth } from '@/contexts';
import { lib } from '@/lib';
import { IApiBaseAllowanceType } from '@/types/allowance';
import { IApiBaseBank } from '@/types/bank';
import { IApiBaseError } from '@/types/http';
import { IUserPayrollData } from '@/types/user';
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Spinner } from '@nextui-org/react';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { IoClose } from 'react-icons/io5';
import { toast } from 'react-toastify';

const initialPayrollData = {
  npwp_number: '',
  basic_salary: undefined,

  bank_id: -1,
  bank_account_number: '',
  bank_account_holder: '',

  bpjs_ketenagakerjaan_number: '',
  bpjs_ketenagakerjaan_date: '',
  bpjs_kesehatan_number: '',
  bpjs_kesehatan_date: '',

  allowances: []
}

const PayrollInfo = (props:any) => {
  const pathname = usePathname().split("/");
  const userId = props.user ? props.user.user_id : pathname[2];
  const { isHRDManagerOrDirector, isManager } = useAuth();

  // Payroll Data: forms
  // Temp Payroll Data: permanent data fetched
  const [payrollData, setPayrollData] = useState<IUserPayrollData>(initialPayrollData);
  const [tempPayrollData, setTempPayrollData] = useState<IUserPayrollData>(initialPayrollData);

  const [isEditPayrollData, setIsEditPayrollData] = useState(false);
  const [isEditBankData, setIsEditBankData] = useState(false);
  const [isEditBPJSData, setIsEditBPJSData] = useState(false);

  const canEdit = isHRDManagerOrDirector() || isManager();
  const apiBaseError = apiBase().error<IApiBaseError>();

  const cancelChange = ()=>{
    setPayrollData(tempPayrollData);
    apiBaseError.clear();
  }

  const updatePayrollData = async () => {
    try {
      const response = await apiBase().user().updatePayrollData(userId, payrollData);
      
      if (response.status === "success") {
        toast.success(response.message);

        setPayrollData(response.data);
        setTempPayrollData(response.data);

        setIsEditPayrollData(false);
        setIsEditBankData(false);
        setIsEditBPJSData(false);

        apiBaseError.clear();
      }
    } catch (error) {
      apiBaseError.set(error);
      toast.error(apiBaseError.getMessage());
    }
  }

  const [banks, setBanks] = useState<IApiBaseBank[]>([]);
  const [allowanceTypes, setAllowanceTypes] = useState<IApiBaseAllowanceType[]>([])

  const fetchBanks = async () => {
    try {
      const response = await apiBase().bank().getBank();
      if (response.status === "success")
        setBanks(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  const fetchAllowanceTypes = async () => {
    try {
      const response = await apiBase().allowance().getAllowanceTypes();
      if (response.status === "success")
        setAllowanceTypes(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  const fetchPayrollData = async () => {
    try {
      const response = await apiBase().user().payrollData(userId);
      if (response.status === "success")
        setTempPayrollData(response.data);
        setPayrollData(response.data);

        setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchBanks();
    fetchAllowanceTypes();

    fetchPayrollData();
  }, []);

  const customLib = lib();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleAddAllowance = () => {
    const updatedAllowances = [...payrollData.allowances, {
      allowance_type_id: -1,
      amount: undefined
    }];

    setPayrollData({
      ...payrollData,
      allowances: updatedAllowances
    });
  }

  const handleDeleteAllowance = (index: number) => {
    const updatedAllowances = [...payrollData.allowances];
    updatedAllowances.splice(index, 1);

    setPayrollData({
      ...payrollData,
      allowances: updatedAllowances
    });

    apiBaseError.clear();
  };

  return (
    <>
      {!isLoading ?
        <>
          <div className="flex min-h-fit md:pb-10 border-b-1">
            <div className="h-full flex flex-col items md:items-start md:flex-row w-full pt-5">
              <div className="flex flex-col md:w-1/6 border-b-1 pb-2 md:border-b-0">
                <h1 className="font-semibold ">
                  Payroll Data
                </h1>
                <p className="text-xs 4/5 text-gray-500">
                  Employee&apos;s payroll information.
                </p>
              </div>
              <div className="md:w-4/6 md:px-4 flex flex-col pt-1 gap-4">
                <div className="flex flex-col md:flex-row gap-2 md:gap-8 md:items-center">
                  <h3 className="font-semibold text-sm w-2/6 py-1 self-start">
                    NPWP Number
                  </h3>
                  <div className='w-4/6'>
                    <BaseInputTextProfile
                      value={payrollData.npwp_number} 
                      id="npwp_number" 
                      label="" 
                      fixedLength={16}
                      format="#### #### #### ####"
                      placeholder="0000 0000 0000 0000"
                      disabled={!isEditPayrollData}
                      setValue={(e) => setPayrollData({
                        ...payrollData,
                        npwp_number: e.target.value.replace(/\s/g, "")
                      })}
                      error={apiBaseError.getErrors('npwp_number')?.[0].toString()}
                    />
                  </div>
                </div>
                <div className="flex flex-col md:flex-row gap-2 md:gap-8 md:items-center">
                  <h3 className="font-semibold text-sm w-2/6 py-1 self-start">
                    Basic Salary
                  </h3>
                  <div className='w-4/6'>
                    <BaseInputTextProfile
                      value={payrollData.basic_salary} 
                      id="basic_salary" 
                      label="" 
                      placeholder="Rp5.000.000"
                      type="currencies"
                      disabled={!isEditPayrollData}
                      setValue={(e) => setPayrollData({
                        ...payrollData,
                        basic_salary: parseInt(e.target.value.replace(/\D/g, ''), 10)
                      })}
                      error={apiBaseError.getErrors('basic_salary')?.[0].toString()}
                    />
                  </div>
                </div>
                
                <div>
                  <p className="text-gray-500 text-sm">Employee&apos;s additional allowance</p>
                </div>

                {payrollData.allowances.length > 0 ? (
                  <>
                    {payrollData.allowances.map((allowance, index) => (
                      <div className={`flex flex-col md:flex-row gap-2 md:gap-8 md:items-center`} key={index}>
                        <div className="w-1/3 flex gap-2">
                          <p className='text-sm flex items-center'>
                            {index + 1}.
                          </p>
                          {isEditPayrollData ?
                            <Dropdown>
                              <DropdownTrigger className='h-[25px] text-xs w-fit border-[--kinerja-gold-hover-border] border-1'>
                                <Button 
                                  variant="bordered" 
                                  className="capitalize"
                                >
                                  {allowanceTypes.find(type => allowance.allowance_type_id === type.allowance_type_id)?.name}
                                </Button>
                              </DropdownTrigger>
                              <DropdownMenu 
                                variant="flat"
                                disallowEmptySelection
                                selectionMode="single"
                                selectedKeys={allowance.allowance_type_id ? [allowance.allowance_type_id.toString()] : []}
                                onSelectionChange={(keys) => {
                                  const selectedKeys = Array.from(keys) as string[];
                                  const selectedTypeId = selectedKeys.length > 0 ? parseInt(selectedKeys[0]) : null;
                                  if (selectedTypeId) {
                                    const updatedAllowances = [...payrollData.allowances];
                                    updatedAllowances[index] = {
                                      ...updatedAllowances[index],
                                      allowance_type_id: selectedTypeId
                                    };

                                    setPayrollData({
                                      ...payrollData,
                                      allowances: updatedAllowances
                                    });
                                  }
                                }}
                              >
                                {allowanceTypes.map((type: IApiBaseAllowanceType)=>(
                                  <DropdownItem key={type.allowance_type_id}>{type.name}</DropdownItem>
                                ))}
                              </DropdownMenu>
                            </Dropdown>
                            : <p className="px-2 text-xs w-2/3 flex items-center">
                                {allowanceTypes.find(type => allowance.allowance_type_id === type.allowance_type_id)?.name}
                              </p> 
                            }
                        </div>

                        <div className="w-2/3 grid grid-cols-12">
                          <div className='col-span-10'>
                            <BaseInputTextProfile
                              value={allowance.amount}
                              id={`allowance_${index}_amount`}
                              label=""
                              placeholder="Rp100.000"
                              type="currencies"
                              disabled={!isEditPayrollData}
                              setValue={(e) => {
                                const updatedAllowances = [...payrollData.allowances];
                                updatedAllowances[index] = {
                                  ...updatedAllowances[index],
                                  amount: parseInt(e.target.value.replace(/\D/g, ''), 10)
                                };

                                setPayrollData({
                                  ...payrollData,
                                  allowances: updatedAllowances
                                });
                              }}
                              error={apiBaseError.getErrors('amount')?.[0].toString()}
                            />
                          </div>

                          <div className={`pb-1 col-span-2 justify-center flex items-center ${isEditPayrollData ? 'block' : 'hidden'}`}>
                            <IoClose
                              size={24}
                              className="text-red-500 cursor-pointer"
                              onClick={() => handleDeleteAllowance(index)}
                            />
                          </div>
                        </div>
                      </div>
                    ))}

                    <div className={`${payrollData.allowances.length > 0 ? 'mt-2' : ''} ${isEditPayrollData ? 'block' : 'hidden'}`}>
                      <BaseInputButton
                        text="Add Allowance"
                        type="outlined"
                        onClick={handleAddAllowance}
                      />
                    </div>
                  </>
                ) : (
                  <p className="text-xs">No additional allowance</p>
                )}
                
                {isEditPayrollData && 
                <div className='flex gap-1 justify-end'>
                  <button className="text-gray-500 border-2 rounded-lg font-mono hover:bg-gray-100 py-1 px-3" 
                    onClick={()=>{
                      cancelChange();
                      setIsEditPayrollData(false);
                    }}
                  >
                    Cancel
                  </button>
                  <button onClick={()=>{
                    updatePayrollData();
                  }} className="border-2 rounded-lg font-mono bg-[--kinerja-gold] hover:bg-[--kinerja-gold-hover] text-white px-0 md:px-3">
                    Save Changes
                  </button>
                </div>}
              </div>
              <div className="md:w-1/6 py-5 md:p-0">
                {( !isEditPayrollData && canEdit ) ? <button onClick={()=>{setIsEditPayrollData(true)}} className="text-gray-500 border-2 rounded-lg font-mono hover:border-[--kinerja-gold-hover-border] px-2">Edit</button> : <></>}
              </div>
            </div>
          </div>

          <div className="flex min-h-fit md:pb-10 border-b-1">
            <div className="h-full flex flex-col items md:items-start md:flex-row w-full pt-5">
              <div className="flex flex-col md:w-1/6 border-b-1 pb-2 md:border-b-0">
                <h1 className="font-semibold ">
                  Bank Information
                </h1>
              </div>
              <div className="md:w-4/6 md:px-4 flex flex-col pt-1 gap-4">
                <div className="flex flex-col md:flex-row gap-2 md:gap-8 md:items-center">
                  <h3 className="font-semibold text-sm w-2/6 py-1 self-start">
                    Bank
                  </h3>
                  <div className='w-4/6'>
                    {isEditBankData ?
                    <Dropdown>
                      <DropdownTrigger className='h-[25px] text-[12px] w-[3px] border-[--kinerja-gold-hover-border] border-1'>
                        <Button 
                          variant="bordered" 
                          className="capitalize"
                        >
                          {banks.find(bank => payrollData.bank_id === bank.bank_id)?.bank_name}
                        </Button>
                      </DropdownTrigger>
                      <DropdownMenu 
                        variant="flat"
                        disallowEmptySelection
                        selectionMode="single"
                        selectedKeys={payrollData.bank_id ? [payrollData.bank_id.toString()] : []}
                        onSelectionChange={(keys) => {
                          const selectedKeys = Array.from(keys) as string[];
                          const selectedBankId = selectedKeys.length > 0 ? parseInt(selectedKeys[0]) : null;
                          if (selectedBankId) {
                            setPayrollData({
                              ...payrollData,
                              bank_id: selectedBankId
                            });
                          }
                        }}
                      >
                        {banks.map((bank: IApiBaseBank)=>(
                          <DropdownItem key={bank.bank_id}>{bank.bank_name}</DropdownItem>
                        ))}
                      </DropdownMenu>
                    </Dropdown>
                    : <p className="px-2 text-sm w-4/6 items-center">
                        {banks.find(bank => payrollData.bank_id === bank.bank_id)?.bank_name}
                      </p> 
                    }
                  </div>
                </div>
                <div className="flex flex-col md:flex-row gap-2 md:gap-8 md:items-center">
                  <h3 className="font-semibold text-sm w-2/6 py-1 self-start">
                    Bank Account Number
                  </h3>
                  <div className='w-4/6'>
                    <BaseInputTextProfile
                      value={payrollData.bank_account_number} 
                      id="bank_account_number" 
                      label="" 
                      maxLength={16}
                      placeholder="Bank Account Number"
                      type="number"
                      disabled={!isEditBankData}
                      setValue={(e) => setPayrollData({
                        ...payrollData,
                        bank_account_number: e.target.value
                      })}
                      error={apiBaseError.getErrors('bank_account_number')?.[0].toString()}
                    />
                  </div>
                </div>
                <div className="flex flex-col md:flex-row gap-2 md:gap-8 md:items-center">
                  <h3 className="font-semibold text-sm w-2/6 py-1 self-start">
                    Bank Account Holder
                  </h3>
                  <div className='w-4/6'>
                    <BaseInputTextProfile
                      value={payrollData.bank_account_holder} 
                      id="bank_account_holder" 
                      label=""
                      placeholder="Bank Account Holder Name"
                      toUppercase={true}
                      maxLength={255}
                      type="text"
                      disabled={!isEditBankData}
                      setValue={(e) => setPayrollData({
                        ...payrollData,
                        bank_account_number: e.target.value
                      })}
                      error={apiBaseError.getErrors('bank_account_holder')?.[0].toString()}
                    />
                  </div>
                </div>
                
                {isEditBankData && 
                <div className='flex gap-1 justify-end'>
                  <button className="text-gray-500 border-2 rounded-lg font-mono hover:bg-gray-100 py-1 px-3" 
                    onClick={()=>{
                      cancelChange();
                      setIsEditBankData(false);
                    }}
                  >
                    Cancel
                  </button>
                  <button onClick={()=>{
                    updatePayrollData();
                  }} className="border-2 rounded-lg font-mono bg-[--kinerja-gold] hover:bg-[--kinerja-gold-hover] text-white px-0 md:px-3">
                    Save Changes
                  </button>
                </div>}
              </div>
              <div className="md:w-1/6 py-5 md:p-0">
                {( !isEditBankData && canEdit ) ? <button onClick={()=>{setIsEditBankData(true)}} className="text-gray-500 border-2 rounded-lg font-mono hover:border-[--kinerja-gold-hover-border] px-2">Edit</button> : <></>}
              </div>
            </div>
          </div>

          <div className="flex min-h-fit md:pb-10 border-b-1">
            <div className="h-full flex flex-col items md:items-start md:flex-row w-full pt-5">
              <div className="flex flex-col md:w-1/6 border-b-1 pb-2 md:border-b-0">
                <h1 className="font-semibold ">
                  BPJS Configuration
                </h1>
              </div>
              <div className="md:w-4/6 md:px-4 flex flex-col pt-1 gap-4">
                <div className="flex flex-col md:flex-row gap-2 md:gap-8 md:items-center">
                  <h3 className="font-semibold text-sm w-2/6 py-1 self-start">
                    BPJS Ketenagakerjaan Number
                  </h3>
                  <div className='w-4/6'>
                    <BaseInputTextProfile
                      value={payrollData.bpjs_ketenagakerjaan_number} 
                      id="bpjs_ketenagakerjaan_number" 
                      label="" 
                      fixedLength={16}
                      format="#### #### #### ####"
                      placeholder="0000 0000 0000 0000"
                      disabled={!isEditBPJSData}
                      setValue={(e) => setPayrollData({
                        ...payrollData,
                        bpjs_ketenagakerjaan_number: e.target.value.replace(/\s/g, "")
                      })}
                      error={apiBaseError.getErrors('bpjs_ketenagakerjaan_number')?.[0].toString()}
                    />
                  </div>
                </div>
                <div className="flex flex-col md:flex-row gap-2 md:gap-8 md:items-center">
                  <h3 className="font-semibold text-sm w-2/6 py-1 self-start">
                    BPJS Ketenagakerjaan Date
                  </h3>
                  <div className='w-4/6'>
                    {isEditBPJSData ? 
                    <BaseInputDate
                      id="bpjs_ketenagakerjaan_date"
                      label=""                      
                      value={customLib.formatDate(payrollData.bpjs_ketenagakerjaan_date)}
                      error={apiBaseError.getErrors('bpjs_ketenagakerjaan_date')?.[0].toString()}
                      setValue={(e) => setPayrollData({
                        ...payrollData,
                        bpjs_ketenagakerjaan_date: e.target.value
                      })}
                    />
                    : <p className="px-2 text-sm w-4/6 items-center">
                        {customLib.formatDateInput(payrollData.bpjs_ketenagakerjaan_date)}
                      </p> }
                  </div>
                </div>
                <div className="flex flex-col md:flex-row gap-2 md:gap-8 md:items-center">
                  <h3 className="font-semibold text-sm w-2/6 py-1 self-start">
                    BPJS Kesehatan Number
                  </h3>
                  <div className='w-4/6'>
                    <BaseInputTextProfile
                      value={payrollData.bpjs_kesehatan_number} 
                      id="bpjs_kesehatan_number" 
                      label="" 
                      fixedLength={13}
                      format="#### #### #### #"
                      placeholder="0000 0000 0000 0"
                      disabled={!isEditBPJSData}
                      setValue={(e) => setPayrollData({
                        ...payrollData,
                        bpjs_kesehatan_number: e.target.value.replace(/\s/g, "")
                      })}
                      error={apiBaseError.getErrors('bpjs_kesehatan_number')?.[0].toString()}
                    />
                  </div>
                </div>
                <div className="flex flex-col md:flex-row gap-2 md:gap-8 md:items-center">
                  <h3 className="font-semibold text-sm w-2/6 py-1 self-start">
                    BPJS Kesehatan Date
                  </h3>
                  <div className='w-4/6'>
                    {isEditBPJSData ? 
                    <BaseInputDate
                      id="bpjs_kesehatan_date"
                      label=""                      
                      value={customLib.formatDateInput(payrollData.bpjs_kesehatan_date)}
                      error={apiBaseError.getErrors('bpjs_kesehatan_date')?.[0].toString()}
                      setValue={(e) => setPayrollData({
                        ...payrollData,
                        bpjs_kesehatan_date: e.target.value
                      })}
                    />
                    : <p className="px-2 text-sm w-4/6 items-center">
                        {customLib.formatDateInput(payrollData.bpjs_kesehatan_date)}
                      </p> }
                  </div>
                </div>
                
                {isEditBPJSData && 
                <div className='flex gap-1 justify-end'>
                  <button className="text-gray-500 border-2 rounded-lg font-mono hover:bg-gray-100 py-1 px-3" 
                    onClick={()=>{
                      cancelChange();
                      setIsEditBPJSData(false);
                    }}
                  >
                    Cancel
                  </button>
                  <button onClick={()=>{
                    updatePayrollData();
                  }} className="border-2 rounded-lg font-mono bg-[--kinerja-gold] hover:bg-[--kinerja-gold-hover] text-white px-0 md:px-3">
                    Save Changes
                  </button>
                </div>}
              </div>
              <div className="md:w-1/6 py-5 md:p-0">
                {( !isEditBPJSData && canEdit ) ? <button onClick={()=>{setIsEditBPJSData(true)}} className="text-gray-500 border-2 rounded-lg font-mono hover:border-[--kinerja-gold-hover-border] px-2">Edit</button> : <></>}
              </div>
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