"use client"
import React, { useState, useEffect } from "react";
import PersonalDataForm from "./personalDataStep";
import EmployeeDataForm from "./EmployeeDataStep";
import { IApiBaseEmployee } from "@/types/employee";
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
        dateOfBirth: Date | null;
        gender: string;
        maritalStatus: string;
        bloodType: string;
        identityNumber: string | null;
        lastEducation: string;
    };
    employeeData: {
        employeeID: string;
        npwpNumber: string | null;
        department: string | null;
        position: string | null;
        joinDate: string | null;
        resignDate: string |null;
    };
}

interface RequiredFields {
    personalData: string[];
    employeeData: string[];
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
            dateOfBirth: null,
            gender: '',
            maritalStatus: '',
            bloodType: '',
            identityNumber: null,
            lastEducation: '',
        },
        employeeData: {
            employeeID: '',
            npwpNumber: null,
            department: null,
            position: null,
            joinDate: null,
            resignDate: null,
        },
    });

    console.log("data: ", formData)

    const [isFormValid, setIsFormValid] = useState(false);

    const handleNextStep = () => {
        console.log("hai")
        if (isFormValid) {
            console.log("hai2")
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
            personalData: [ 'firstName', 'lastName', 'email', 'phoneNumber', 'emergencyNumber', 'address', 'placeOfBirth', 'dateOfBirth', 'gender', 'maritalSTatus', 'bloodType', 'identityNumber', 'lastEducation' ],
            employeeData: [ 'employeeID', 'npwpNumber', 'deptID', 'positionID', 'joinDate' ]
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

        return true;
    }

    useEffect(() => {
        setIsFormValid(validateForm());
    }, [formData]);

    const handleSubmit = async() => {
        try {
            const mappedFormData = {
                full_name: formData.personalData.firstName + ' ' + formData.personalData.lastName,
                email: formData.personalData.email,
                phone_number: formData.personalData.phoneNumber,
                emergency_number: formData.personalData.emergencyNumber,
                place_of_birth: formData.personalData.placeOfBirth,
                date_of_birth: formData.personalData.dateOfBirth,
                gender: formData.personalData.gender,
                marital_status: formData.personalData.maritalStatus,
                blood_type: formData.personalData.bloodType,
                identity_number: formData.personalData.identityNumber,
                address: formData.personalData.address,
                last_education: formData.personalData.lastEducation,
                employee_id: formData.employeeData.employeeID,
                npwp_number: formData.employeeData.npwpNumber,
                dept_id: parseInt(formData.employeeData.department ?? '0'),
                position_id: parseInt(formData.employeeData.position ?? '0'), 
                join_date: formData.employeeData.joinDate,
                password: "abcdef",
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