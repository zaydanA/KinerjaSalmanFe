"use client"
import React, { useState, useEffect } from "react";
import PersonalDataForm from "./PersonalData";
import EmployeeDataForm from "./EmploymentData";
import PayrollDataForm from "./PayrollData";
import { BloodType, Gender, LastEducation, MaritalStatus } from "@/enums/enums"
import { apiBase } from '@/api';
import { IApiAddEmployee } from "@/types/employee";
import { IApiBaseError } from "@/types/http";
import BaseInputText from "@/components/shares/inputs/BaseInputTextProfile";
import { IUserEmploymentData, IUserPayrollData, IUserPersonalData } from "@/types/user";
import BaseInputButton from "@/components/shares/buttons/BaseInputButton";

const AddEmployee = () => {
    const [step, setStep] = useState(2);
    const [formData, setFormData] = useState<IApiAddEmployee>({
        personal_data: {
            full_name: '',
            email: '',
            phone_number: '',
            emergency_number: '',
            address: '',
            place_of_birth: '',
            date_of_birth: '',
            gender: Gender.M,
            marital_status: MaritalStatus.SINGLE,
            blood_type: BloodType.A,
            identity_number: '',
            last_education: LastEducation.TIDAK_SEKOLAH,
            status: 1,
        },
        employment_data: {
            dept_id: 2,
            position_id: 5,
            join_date: ''
        },
        payroll_data: {
            npwp_number: '',
        }
    });

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
            }
        } catch (error) {
            apiBaseError.set(error)
            console.log(apiBaseError.getErrors('email')?.[0].toString());
        }
    };

    const handlePreviousStep = () => {
        setStep(step - 1);
    };

    const handleSubmit = async() => {
        try {
            const res = await apiBase().employee().addEmployee(formData);
        } catch (error) {
            throw error;
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
            "blood_type",
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
            return (typeof value === 'string' && value.trim() !== '') || (typeof value === 'number' && isFinite(value));
        });

        return isEmploymentDataValid;
    }  

    // Disable next button if not checked
    const checkPayrollDataRequired = () => {
        const payrollDataRequired = [
            "npwp_number"
        ];

        const isPayrollDataValid = payrollDataRequired.every(field => {
            // Check if each required field is not an empty string
            const key = field as keyof IUserPayrollData;

            const value = formData.payroll_data[key];
            return (typeof value === 'string' && value.trim() !== '') || (typeof value === 'number' && isFinite(value));
        });

        return isPayrollDataValid;
    }  

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-lg mb-1 text-gray-500"> Employee </h2>
            <h1 className="text-2xl font-bold mb-4"> Add Employee </h1>

            <ul className="flex justify-between w-1/2 mx-auto">
                <li className={`flex flex-col items-center justify-center step ${step >= 1 ? 'checked' : ''}`}>
                    <div className={`relative rounded-full h-8 w-8 flex items-center justify-center ${step === 1 ? 'bg-black text-white' : 'bg-transparent border-3 border-black'}`}>
                    <span className={`${step >= 1 ? 'circle-lg' : 'circle'}`}>1</span>
                    </div>
                    <div>Personal data</div>
                </li>
                <li className={`flex flex-col items-center justify-center step ${step >= 2 ? 'checked' : ''}`}>
                    <div className={`relative rounded-full h-8 w-8 flex items-center justify-center ${step === 2 ? 'bg-black text-white' : 'bg-transparent border-3 border-black'}`}>
                    <span className={`${step >= 2 ? 'circle-lg' : 'circle'}`}>2</span>
                    </div>
                    <div>Employment data</div>
                </li>
                <li className={`flex flex-col items-center justify-center step ${step >= 3 ? 'checked' : ''}`}>
                    <div className={`relative rounded-full h-8 w-8 flex items-center justify-center ${step === 3 ? 'bg-black text-white' : 'bg-transparent border-3 border-black'}`}>
                    <span className={`${step === 3 ? 'circle-lg' : 'circle'}`}>3</span>
                    </div>
                    <div>Payroll data</div>
                </li>
            </ul>
            { step === 1 && (
                <PersonalDataForm
                    formData={formData.personal_data}
                    handleChange={(data) => {
                        setFormData(
                        {
                            ...formData,
                            personal_data: {
                                ...formData.personal_data,
                                ...data
                            }
                        }
                    )}
                    }
                    apiBaseError={apiBaseError}
                />
            )}

            { step === 2 && (
                <EmployeeDataForm
                    formData={formData.employment_data}
                    handleChange={(data) => {
                        setFormData(
                        {
                            ...formData,
                            employment_data: {
                                ...formData.employment_data,
                                ...data
                            }
                        }
                    )}
                    }
                    apiBaseError={apiBaseError}
                />
            )}

            { step === 3 && (
                <PayrollDataForm
                    formData={formData.payroll_data}
                    handleChange={(data) => {
                        setFormData(
                        {
                            ...formData,
                            payroll_data: {
                                ...formData.payroll_data,
                                ...data
                            }
                        }
                    )}
                    }
                    apiBaseError={apiBaseError}
                />
            )}

            <div className="flex justify-end mt-8 w-1/2 mx-auto gap-2">
                {step > 1 && 
                    <BaseInputButton
                        text="Back"
                        type="underlined"
                        onClick={handlePreviousStep}
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
        </div>
    )
}

export default AddEmployee;