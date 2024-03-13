import React from "react";
import BaseInputText from '@/components/shares/inputs/BaseInputText';
import { IUserPayrollData } from "@/types/user";
import { IApiError } from "@/types/http";

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
    const handlePayrollDataChange = (name: keyof IUserPayrollData, value: any) => {
        handleChange({
            [name]: value
        })
    }
    return (
        <div className="w-1/2 mx-auto mt-5">
            <div className="grid grid-cols-2 gap-4 my-6">
                 <BaseInputText
                    id="npwp_number"
                    label="NPWP Number :"
                    placeholder="NPWP Number"
                    type="text"
                    value={formData.npwp_number}
                    setValue={(e) => handlePayrollDataChange('npwp_number', e.target.value)}
                />
            </div>
        </div>
    )
}

export default PayrollDataForm;