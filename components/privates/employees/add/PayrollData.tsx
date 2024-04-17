import React, { useEffect, useState } from "react";
import BaseInputText from '@/components/shares/inputs/BaseInputText';
import { IUserPayrollData } from "@/types/user";
import { IApiError } from "@/types/http";
import DropdownInput from "@/components/shares/inputs/DropdownInput";
import { IApiBaseBank } from "@/types/bank";
import { apiBase } from "@/api";
import BaseInputDate from "@/components/shares/inputs/BaseInputDate";
import BaseInputButton from "@/components/shares/buttons/BaseInputButton";
import { IApiBaseAllowance, IApiBaseAllowanceType } from "@/types/allowance";
import { IoClose } from "react-icons/io5";


type ChangeHandler<T> = (data: Partial<T>) => void;
type PayrollDataFormProps = {
    formData: IUserPayrollData,
    handleChange: ChangeHandler<IUserPayrollData>;
    apiBaseError: IApiError
}

const PayrollDataForm = ({ 
    formData, 
    handleChange,
    apiBaseError
}: PayrollDataFormProps) => {
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

    useEffect (() => {
        fetchBanks();
        fetchAllowanceTypes();
    }, []);

    const handlePayrollDataChange = (name: keyof IUserPayrollData, value: any) => {        
        let parsedValue: any = value;
    
        if (name === "basic_salary") {
            parsedValue = parseInt(value.replace(/\D/g, ''), 10);
        }
        
        if (name === "npwp_number" || name === "bpjs_kesehatan_number" || name === "bpjs_ketenagakerjaan_number") {
            parsedValue = value.replace(/\s/g, "");
        }

        handleChange({
            [name]: parsedValue
        });
    }
    
    const handleAllowancesDataChange = (index: number, name: keyof IApiBaseAllowance, value: any) => {
        const updatedAllowances = [...formData.allowances];

        let parsedValue: any = value;
    
        if (name === "amount") {
            parsedValue = parseInt(value.replace(/\D/g, ''), 10);
        }

        updatedAllowances[index] = {
            ...updatedAllowances[index],
            [name]: parsedValue
        };
        handleChange({
            ["allowances"]: updatedAllowances
        });
    }

    const handleAddAllowance = () => {
        const updatedAllowances = [...formData.allowances, {
            allowance_type_id: -1,
            amount: undefined
        }];

        handleChange({
            ["allowances"]: updatedAllowances
        });
    }

    const handleDeleteAllowance = (index: number) => {
        const updatedAllowances = [...formData.allowances];
        updatedAllowances.splice(index, 1);
        handleChange({
            ["allowances"]: updatedAllowances
        });

        apiBaseError.clear();
    };

    return (
        <div className="w-1/2 mx-auto">
            <h3 className="text-lg mb-1 font-bold">Payroll Data</h3>
            <p className="text-gray-500 text-sm">Fill all payroll data information</p>
            <div className="grid grid-cols-2 gap-y-4 gap-x-5 mt-6 mb-4">
                <BaseInputText
                    id="npwp_number"
                    label="NPWP Number (new)"
                    fixedLength={16}
                    format="#### #### #### ####"
                    required={true}
                    placeholder="0000 0000 0000 0000"
                    type="text"
                    value={formData.npwp_number}
                    error={apiBaseError.getErrors('npwp_number')?.[0].toString()}
                    setValue={(e) => handlePayrollDataChange('npwp_number', e.target.value)}
                />

                <BaseInputText
                    id="basic_salary"
                    label="Basic Salary"
                    required={true}
                    placeholder="Rp5.000.000"
                    type="currencies"
                    value={formData.basic_salary}
                    error={apiBaseError.getErrors('basic_salary')?.[0].toString()}
                    setValue={(e) => handlePayrollDataChange('basic_salary', e.target.value)}
                />
            </div>

            <div className="flex flex-col gap-4">
                <div>
                    <p className="text-gray-500 text-sm">Employee&apos;s additional allowance</p>
                </div>

                {formData.allowances.map((allowance, index) => (
                    <div className="grid grid-cols-11 gap-x-5" key={index}>
                        <div className="col-span-5">
                            <DropdownInput
                                id={`allowance_${index}_type_id`}
                                label="Type"
                                required={true}
                                options= {allowanceTypes.map(type => ({ value: type.allowance_type_id, label: type.name }))}
                                selectedValue={allowance.allowance_type_id}
                                error={apiBaseError.getErrors('allowance_type_id')?.[0].toString()}
                                onChange={(e) => handleAllowancesDataChange(index, 'allowance_type_id', parseInt(e.target.value))}
                            />
                        </div>

                        <div className="col-span-5">
                            <BaseInputText
                                id={`allowance_${index}_amount`}
                                label="Amount"
                                required={true}
                                placeholder="Rp100.000"
                                type="currencies"
                                value={allowance.amount}
                                error={apiBaseError.getErrors('amount')?.[0].toString()}
                                setValue={(e) => handleAllowancesDataChange(index, 'amount', e.target.value)}
                            />
                        </div>

                        <div className="pt-5 flex items-center">
                            <IoClose
                                size={24}
                                className="text-red-500 cursor-pointer"
                                onClick={() => handleDeleteAllowance(index)} 
                            />
                        </div>
                    </div>
                ))}

                <div className={`${formData.allowances.length > 0 ? 'mt-2' : ''}`}>
                    <BaseInputButton
                        text="Add Allowance"
                        type="outlined"
                        onClick={handleAddAllowance}
                    />
                </div>
            </div>

            <hr className='w-full border-1 mt-8 mb-6' />
            <h3 className="text-lg mb-1 font-bold">Bank Information</h3>
            <p className="text-gray-500 text-sm">Data information related to employee&apos;s bank account</p>
            <div className="grid grid-cols-2 gap-y-4 gap-x-5 my-6">
                <DropdownInput
                    id="bank_id"
                    label="Bank"
                    required={true}
                    options= {banks.map(bank => ({ value: bank.bank_id, label: bank.bank_name }))}
                    selectedValue={formData.bank_id}
                    error={apiBaseError.getErrors('bank_id')?.[0].toString()}
                    onChange={(e) => handlePayrollDataChange('bank_id', parseInt(e.target.value))}
                />

                <BaseInputText
                    id="bank_account_number"
                    label="Bank Account Number"
                    required={true}
                    maxLength={16}
                    placeholder="Bank Account Number"
                    type="number"
                    value={formData.bank_account_number}
                    error={apiBaseError.getErrors('bank_account_number')?.[0].toString()}
                    setValue={(e) => handlePayrollDataChange('bank_account_number', e.target.value)}
                />

                <div className="col-span-2">
                    <BaseInputText
                        id="bank_account_holder"
                        label="Bank Account Holder Name"
                        placeholder="Bank Account Holder Name"
                        toUppercase={true}
                        maxLength={255}
                        type="text"
                        required={true}
                        value={formData.bank_account_holder}
                        error={apiBaseError.getErrors('bank_account_holder')?.[0].toString()}
                        setValue={(e) => handlePayrollDataChange('bank_account_holder', e.target.value)}
                    />
                </div>
            </div>
            <hr className='w-full border-1 mt-8 mb-6' />
            <h3 className="text-lg mb-1 font-bold">BPJS</h3>
            <p className="text-gray-500 text-sm">BPJS data information</p>
            <div className="grid grid-cols-2 gap-y-4 gap-x-5 my-6">
                <BaseInputText
                    id="bpjs_ketenagakerjaan_number"
                    label="BPJS Ketenagakerjaan Number"
                    required={true}
                    fixedLength={16}
                    format="#### #### #### ####"
                    placeholder="0000 0000 0000 0000"
                    type="text"
                    value={formData.bpjs_ketenagakerjaan_number}
                    error={apiBaseError.getErrors('bpjs_ketenagakerjaan_number')?.[0].toString()}
                    setValue={(e) => handlePayrollDataChange('bpjs_ketenagakerjaan_number', e.target.value)}
                />
                
                <BaseInputDate
                    id="bpjs_ketenagakerjaan_date"
                    label="BPJS Ketenagakerjaan Date"
                    required={true}
                    value={formData.bpjs_ketenagakerjaan_date}
                    error={apiBaseError.getErrors('bpjs_ketenagakerjaan_date')?.[0].toString()}
                    setValue={(e) => handlePayrollDataChange('bpjs_ketenagakerjaan_date', e.target.value)}
                />

                <BaseInputText
                    id="bpjs_kesehatan_number"
                    label="BPJS Kesehatan Number"
                    required={true}
                    fixedLength={13}
                    format="#### #### #### #"
                    placeholder="0000 0000 0000 0"
                    type="text"
                    value={formData.bpjs_kesehatan_number}
                    error={apiBaseError.getErrors('bpjs_kesehatan_number')?.[0].toString()}
                    setValue={(e) => handlePayrollDataChange('bpjs_kesehatan_number', e.target.value)}
                />

                <BaseInputDate
                    id="bpjs_kesehatan_date"
                    label="BPJS Kesehatan Date"
                    required={true}
                    value={formData.bpjs_kesehatan_date}
                    error={apiBaseError.getErrors('bpjs_kesehatan_date')?.[0].toString()}
                    setValue={(e) => handlePayrollDataChange('bpjs_kesehatan_date', e.target.value)}
                />
            </div>
        </div>
    )
}

export default PayrollDataForm;