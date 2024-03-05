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
        position: string | null,
        joinDate: string | null,
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
        },
    });

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
        <div>
            { step == 1 && (
                <PersonalDataForm
                formData={formData.personalData}
                handleChange={(name, value) => handleChange({category: 'personalData', name, value})}
            />
            )}

            { step == 2 && (
                <EmployeeDataForm
                formData={formData.employeeData}
                handleChange={(name, value) => handleChange({category: 'employeeData', name, value})}
            />
            )}

            <div>
                {step > 1 && 
                    <button onClick={handlePreviousStep}>Previous</button>}
                {step < 2 && (
                    <button onClick={handleNextStep}>Next</button>
                )} 
                {step === 2 && (
                    <button onClick={handleSubmit} >
                        Submit
                    </button>
                )}
            </div>
        </div>
    )
}

export default AddEmployee;