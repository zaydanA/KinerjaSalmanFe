"use client"
import React, { useState } from "react";
import PersonalDataForm from "./PersonalData";
import EmployeeDataForm from "./EmploymentData";
import PayrollDataForm from "./PayrollData";
import { BloodType, Gender, LastEducation, MaritalStatus } from "@/enums/enums"
import { apiBase } from '@/api';
import { IApiAddEmployee } from "@/types/employee";
import { IApiBaseError } from "@/types/http";
import { IUserEmploymentData, IUserPayrollData, IUserPersonalData } from "@/types/user";
import BaseInputButton from "@/components/shares/buttons/BaseInputButton";
import Finished from "./Finished";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const initialFormData: IApiAddEmployee = {
    personal_data: {
        full_name: '',
        email: '',
        phone_number: '',
        emergency_number: '',
        address: '',
        place_of_birth: '',
        date_of_birth: '',
        gender: '',
        marital_status: '',
        blood_type: '',
        identity_number: '',
        last_education: '',
    },
    employment_data: {
        dept_id: -1,
        position_id: -1,
        join_date: '',
    },
    payroll_data: {
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
}

const AddEmployee = () => {
    const [step, setStep] = useState(3);
    const [formData, setFormData] = useState<IApiAddEmployee>(initialFormData);

    const apiBaseError = apiBase().error<IApiBaseError>();
    const handleNextStep = async () => {
        try {
            let data: any = {}

            switch (step) {
                case 1:
                    data.personal_data = formData.personal_data;
                    break;
                case 2:
                    data.employment_data = formData.employment_data;
                    break;
                case 3:
                    data.payroll_data = formData.payroll_data;
                    break;
                default:
                    break;
            }

            const res = await apiBase().employee().validateAddEmployee(data, step);
            if (res.status === 'success') {
                setStep(step + 1);

                apiBaseError.clear();
            }
        } catch (error) {
            apiBaseError.set(error);
            toast.error(apiBaseError.getMessage());
        }
    };

    const handlePreviousStep = (current?: number) => {
        if (current) {
            setStep(current);
        } else {
            setStep(step - 1);
        }
        
        apiBaseError.clear();
    };

    const router = useRouter();
    const handleBack = () => {
        apiBaseError.clear();
        router.push('/employee')
    }

    const handleReset = () => {
        // Reset all
        setStep(1);
        setFormData(initialFormData);
        apiBaseError.clear();
    }

    const handleSubmit = async() => {
        try {
            const res = await apiBase().employee().addEmployee(formData);

            if (res.status === 'success') {
                setStep(4);
                toast.success(res.message);
                apiBaseError.clear();
            }
        } catch (error) {
            apiBaseError.set(error);
            toast.error(apiBaseError.getMessage());
        }
    }

    // Disable next button if not checked
    const checkPersonalDataRequired = () => {
        const personalDataRequired = [
            "full_name", 
            "email",
            "phone_number",
            "emergency_number",
            "address",
            "date_of_birth",
            "identity_number",
            "gender",
            "marital_status",
            "last_education"
        ];

        const isPersonalDataValid = personalDataRequired.every(field => {
            // Check if each required field is not an empty string
            const key = field as keyof IUserPersonalData;

            const value = formData.personal_data[key];
            return typeof value === 'string' && value.trim() !== '';
        });

        return isPersonalDataValid;
    }  
    
    // Disable next button if not checked
    const checkEmploymentDataRequired = () => {
        const employmentDataRequired = [
            "dept_id",
            "join_date",
            "position_id"
        ];

        const isEmploymentDataValid = employmentDataRequired.every(field => {
            // Check if each required field is not an empty string
            const key = field as keyof IUserEmploymentData;

            const value = formData.employment_data[key];
            return (typeof value === 'string' && value.trim() !== '') || (typeof value === 'number' && value !== -1);
        });

        return isEmploymentDataValid;
    }  

    // Disable next button if not checked
    const checkPayrollDataRequired = () => {
        const payrollDataRequired = [
            "npwp_number",
            "basic_salary",
            "bank_id",
            "bank_account_number",
            "bank_account_holder",
            "bpjs_ketenagakerjaan_number",
            "bpjs_ketenagakerjaan_date",
            "bpjs_kesehatan_number",
            "bpjs_kesehatan_date"
        ];

        const isPayrollDataValid = payrollDataRequired.every(field => {
            // Check if each required field is not an empty string
            const key = field as keyof IUserPayrollData;

            const value = formData.payroll_data[key];
            return (typeof value === 'string' && value.trim() !== '') || (typeof value === 'number' && isFinite(value));
        });

        // Check allowance
        const isValidAllowances = formData.payroll_data.allowances.every(allowance => 
            allowance.allowance_type_id !== -1 && allowance.amount !== undefined && isFinite(allowance.amount)
        );

        return isPayrollDataValid && isValidAllowances;
    }  

    type ChangeHandler<T> = (changedData: Partial<T>) => void;

    const handlePersonalDataChange: ChangeHandler<IUserPersonalData> = (changedData) => {
        setFormData({
            ...formData,
            personal_data: {
                ...formData.personal_data,
                ...changedData
            }
        })
    }

    const handleEmploymentDataChange: ChangeHandler<IUserEmploymentData> = (changedData) => {
        setFormData({
            ...formData,
            employment_data: {
                ...formData.employment_data,
                ...changedData
            }
        });           
    }

    const handlePayrollDataChange: ChangeHandler<IUserPayrollData> = (changedData) => {
        setFormData({
            ...formData,
            payroll_data: {
                ...formData.payroll_data,
                ...changedData
            }
        });
    };

    return (
        <div className="mx-auto">
            <h2 className="text-lg mb-1 text-gray-500"> Employee </h2>
            <h1 className="text-2xl font-bold mb-4"> Add Employee </h1>

            <ul className="flex text-center justify-center w-3/5 mx-auto text-sm mb-8">
                <li className="col-span-1 flex flex-col gap-2 items-center justify-center flex-1">
                    <div 
                        className={`relative rounded-full h-8 w-8 flex items-center justify-center 
                        ${step >= 1 ? 'bg-clr-kinerja-gold text-white cursor-pointer' : 'bg-transparent border-2 border-gray-300 text-gray-300 cursor-default'}`}
                        onClick={step > 1 ? () => handlePreviousStep(1) : undefined}
                    >
                    <span className={`${step >= 1 ? 'circle-lg' : 'circle'}`}>1</span>
                    </div>
                    <div className={`${step >= 1 ? 'text-black' : 'text-gray-400'}`}>Personal data</div>
                </li>
                <div className="flex">
                    <hr className={`w-16 border-1 mt-4 ${step >= 2 ? 'border-clr-kinerja-gold' : ''}`} />
                </div>
                <li className="flex flex-col gap-2 items-center justify-center flex-1">
                    <div 
                        className={`relative rounded-full h-8 w-8 flex items-center justify-center 
                        ${step >= 2 ? 'bg-clr-kinerja-gold text-white cursor-pointer' : 'bg-transparent border-2 border-gray-300 text-gray-300 cursor-default'}`}
                        onClick={step > 2 ? () => handlePreviousStep(2) : undefined}
                    >
                    <span className={`${step >= 2 ? 'circle-lg' : 'circle'}`}>2</span>
                    </div>
                    <div className={`${step >= 2 ? 'text-black' : 'text-gray-400'}`}>Employment data</div>
                </li>
                <div className="flex">
                    <hr className={`w-16 border-1 mt-4 ${step >= 3 ? 'border-clr-kinerja-gold' : ''}`} />
                </div>
                <li className="flex flex-col gap-2 items-center justify-center flex-1">
                    <div 
                        className={`relative rounded-full h-8 w-8 flex items-center justify-center 
                        ${step >= 3 ? 'bg-clr-kinerja-gold text-white cursor-pointer' : 'bg-transparent border-2 border-gray-300 text-gray-300 cursor-default'}`}
                    >
                    <span className={`${step >= 3 ? 'circle-lg' : 'circle'}`}>3</span>
                    </div>
                    <div className={`${step >= 3 ? 'text-black' : 'text-gray-400'}`}>Payroll data</div>
                </li>
                <div className="flex">
                    <hr className={`w-16 border-1 mt-4 ${step >= 4 ? 'border-clr-kinerja-gold' : ''}`} />
                </div>
                <li className="flex flex-col gap-2 items-center justify-center flex-1">
                    <div 
                        className={`relative rounded-full h-8 w-8 flex items-center justify-center 
                        ${step >= 4 ? 'bg-clr-kinerja-gold text-white cursor-pointer' : 'bg-transparent border-2 border-gray-300 text-gray-300 cursor-default'}`}
                    >
                    <span className={`${step >= 4 ? 'circle-lg' : 'circle'}`}>4</span>
                    </div>
                    <div className={`${step >= 4 ? 'text-black' : 'text-gray-400'}`}>Success</div>
                </li>
            </ul>

            {(step !== 4) && (<div>

                { step === 1 && (
                    <PersonalDataForm
                        formData={formData.personal_data}
                        handleChange={handlePersonalDataChange}
                        apiBaseError={apiBaseError}
                    />
                )}

                { step === 2 && (
                    <EmployeeDataForm
                        formData={formData.employment_data}
                        handleChange={handleEmploymentDataChange}
                        apiBaseError={apiBaseError}
                    />
                )}

                { step === 3 && (
                    <PayrollDataForm
                        formData={formData.payroll_data}
                        handleChange={handlePayrollDataChange}
                        apiBaseError={apiBaseError}
                    />
                )}

                <div className="flex justify-end mt-8 w-1/2 mx-auto gap-2">
                    {step > 1 && 
                        <BaseInputButton
                            text="Back"
                            type="underlined"
                            onClick={() => handlePreviousStep()}
                        />
                    }
                    {step < 3 && (
                        <BaseInputButton 
                            text="Next"
                            disabled={(() => {
                                    switch (step) {
                                        case 1:
                                            return !checkPersonalDataRequired();
                                        case 2:
                                            return !checkEmploymentDataRequired();
                                        default:
                                            return false;
                                    }
                                })()
                            }
                            onClick={handleNextStep}
                        />
                    )} 
                    {step === 3 && (
                        <BaseInputButton
                            text="Submit"
                            disabled={!checkPayrollDataRequired()}
                            onClick={handleSubmit}
                        />
                    )}
                </div>
            </div>)}
            {(step === 4) && (
                <Finished 
                    handleBack={handleBack}
                    handleAddAnother={handleReset}
                />
            )}
        </div>
    )
}

export default AddEmployee;