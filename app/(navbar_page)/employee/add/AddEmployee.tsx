"use client"
import React, { useState, useEffect } from "react";
import PersonalDataForm from "./personalDataStep";
import EmployeeDataForm from "./EmployeeDataStep";
import PayrollDataForm from "./PayrollDataStep";
import { BloodType, Gender, LastEducation, MaritalStatus } from "@/enums/enums"
import { apiBase } from '@/api';

interface FormData {
    personalData: {
        firstName: string;
        lastName: string;
        email: string;
        phoneNumber: string | null;
        emergencyNumber: string | null;
        address: string;
        placeOfBirth: string;
        dateOfBirth: string;
        gender: Gender;
        maritalStatus: MaritalStatus;
        bloodType: BloodType;
        identityNumber: string | null;
        lastEducation: LastEducation;
        status: number;
    };
    employeeData: {
        employeeID: string;
        department: string | null;
        position: string | null;
        joinDate: string;
        resignDate: string;
    };
    payrollData: {
        npwpNumber: string;
    };
}

interface RequiredFields {
    personalData: string[];
    employeeData: string[];
    payrollData: string[];
  }

const AddEmployee = () => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState<FormData>({
        personalData: {
            firstName: '',
            lastName: '',
            email: '',
            phoneNumber: null,
            emergencyNumber: null,
            address: '',
            placeOfBirth: '',
            dateOfBirth: '',
            gender: Gender.M,
            maritalStatus: MaritalStatus.SINGLE,
            bloodType: BloodType.A,
            identityNumber: null,
            lastEducation: LastEducation.TIDAK_SEKOLAH,
            status: 0,
        },
        employeeData: {
            employeeID: '',
            department: null,
            position: null,
            joinDate: null,
            resignDate: null,
        },
        payrollData: {
            npwpNumber: '',
        }
    });

    console.log("data: ", formData)

    const [isFormValid, setIsFormValid] = useState(false);

    const handleNextStep = () => {
        if (isFormValid) {
            setStep(step + 1);
        }
    };

    const handlePreviousStep = () => {
        setStep(step - 1);
    };


    const handleChange = ({ category, name, value }) => {
        setFormData({
            ...formData,
            [category]: {
                ...formData[category],
                [name]: value,
            },
        });
    };

    const isRequiredField = (category, field) => {
        const requiredField = {
            personalData: [ 'firstName', 'lastName', 'email', 'phoneNumber', 'emergencyNumber', 'address', 'placeOfBirth', 'dateOfBirth', 'gender', 'maritalStatus', 'bloodType', 'identityNumber', 'lastEducation', 'status' ],
            employeeData: [ 'employeeID', 'department', 'position', 'joinDate', 'resignDate' ],
            payrollData: [ 'npwpNumber' ]
        }
        return requiredField[category]?.includes(field);
    }

    const validateForm = () => {
        if (step == 1){
            for (const field in formData['personalData']){
                if (isRequiredField('personalData', field) && formData['personalData'][field] === '') {
                    return false;
                }
            }
        } 
        if (step == 2){
            for (const field in formData['employeeData']){
                if (isRequiredField('employeeData', field) && formData['employeeData'][field] === '') {
                    return false;
                }
            }
        }

        if (step == 3){
            for (const field in formData['payrollData']){
                if (isRequiredField('payrollData', field) && formData['payrollData'][field] === '') {
                    return false;
                }
            }
        }

        return true;
    }

    useEffect(() => {
        setIsFormValid(validateForm());
    }, [formData]);

    const handleSubmit = async() => {
        try {

            if(formData.personalData.dateOfBirth instanceof Date){
                console.log("AAAA")
            } else {
                console.log("BBBB")
            }

            const formattedFormData = {
                ...formData,
                personalData: {
                    ...formData.personalData,
                    dateOfBirth: formData.personalData.dateOfBirth ? new Date(formData.personalData.dateOfBirth) : null
                },
                employeeData: {
                    ...formData.employeeData,
                    joinDate: formData.employeeData.joinDate ? new Date(formData.employeeData.joinDate) : null,
                    resignDate: formData.employeeData.resignDate ? new Date(formData.employeeData.resignDate) : null
                }
            };

            

            const mappedFormData = {
                personal_data: {
                    full_name: formData.personalData.firstName + ' ' + formData.personalData.lastName,
                    email: formData.personalData.email,
                    phone_number: formData.personalData.phoneNumber,
                    emergency_number: formData.personalData.emergencyNumber,
                    place_of_birth: formData.personalData.placeOfBirth,
                    date_of_birth: formattedFormData.personalData.dateOfBirth ? formattedFormData.personalData.dateOfBirth.toISOString() : null,
                    gender: formData.personalData.gender,
                    marital_status: formData.personalData.maritalStatus,
                    blood_type: formData.personalData.bloodType,
                    identity_number: formData.personalData.identityNumber,
                    address: formData.personalData.address,
                    last_education: formData.personalData.lastEducation,
                    status: formData.personalData.status,
                },
                employment_data: {
                    employee_id: formData.employeeData.employeeID,
                    dept_id: parseInt(formData.employeeData.department ?? '0'),
                    position_id: parseInt(formData.employeeData.position ?? '0'), 
                    join_date: formattedFormData.employeeData.joinDate ? formattedFormData.employeeData.joinDate.toISOString() : null,
                    resign_date: formattedFormData.employeeData.resignDate ? formattedFormData.employeeData.resignDate.toISOString() : null,
                },
                payroll_data: {
                    npwp_number: formData.payrollData.npwpNumber,
                }
            };
    
            console.log("Mapped Form Data", mappedFormData);

            await apiBase().employee().addEmployee(mappedFormData);
        } catch (error) {
            throw error;
        }
    }


    return (
        <div className="container mx-auto my-8">
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
                    formData={formData.personalData}
                    handleChange={(name, value) => handleChange({category: 'personalData', name, value})}
                />
            )}

            { step === 2 && (
                <EmployeeDataForm
                    formData={formData.employeeData}
                    handleChange={(name, value) => handleChange({category: 'employeeData', name, value})}
                />
            )}

            { step === 3 && (
                <PayrollDataForm
                    formData={formData.payrollData}
                    handleChange={(name, value) => handleChange({category: 'payrollData', name, value})}
                />
            )}

            <div className="flex justify-end mt-8 w-1/2 mx-auto">
                {step > 1 && 
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4" onClick={handlePreviousStep}>Previous</button>}
                {step < 3 && (
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleNextStep}>Next</button>
                )} 
                {step === 3 && (
                    <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={handleSubmit} >
                        Submit
                    </button>
                )}
            </div>
        </div>
    )
}

export default AddEmployee;