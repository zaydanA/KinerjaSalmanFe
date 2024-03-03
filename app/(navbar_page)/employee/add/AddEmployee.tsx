"use client"
import React, { useState, useEffect } from "react";
import PersonalDataForm from "./personalDataStep";
import EmployeeDataForm from "./EmployeeDataStep";

interface FormData {
    personalData: {
        firstName: string;
        lastName: string;
        email: string;
        phoneNumber: number | null;
        emergencyNumber: number | null;
        address: string;
        placeOfBirth: string;
        dateOfBirth: Date | null;
        gender: string;
        maritalStatus: string;
        bloodType: string;
        identityNumber: number | null;
        lastEducation: string;
    };
    employeeData: {
        employeeID: string;
        npwpNumber: string | null;
        deptID: string | null;
        positionID: string | null,
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
            deptID: null,
            positionID: null,
            joinDate: null,
        },
    });

    const [isFormValid, setIsFormValid] = useState(false);

    const handleNextStep = () => {
        // if (isFormValid) {
        //     setStep(step + 1);
        // }
        setStep(step + 1);
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

    // const isRequiredField = (category, field) => {
    //     const requiredField = {
    //         personalData: [ 'firstName', 'lastName', 'email', 'phoneNumber', 'emergencyNumber', 'address', 'placeOfBirth', 'dateOfBirth', 'gender', 'maritalSTatus', 'bloodType', 'identotyNumber', 'lastEducation' ],
    //         employeeData: [ 'employeeID', 'npwpNumber', 'deptID', 'positionID', 'joinDate' ]
    //     }
    //     return requiredField[category]?.includes(field);
    // }

    // const validateForm = () => {
    //     for (const category in formData){
    //         for (const field in formData[category]){
    //             if (isRequiredField(category, field) && formData[category][field] === '') {
    //                 console.log("selamat4");
    //                 console.log(category, field);
    //                 return false;
    //             }
    //         }
    //     }
    //     return true;
    // }

    // useEffect(() => {
    //     setIsFormValid(validateForm());
    //   }, [formData]);


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
                {step > 1 && <button onClick={handlePreviousStep}>Previous</button>}
                {step < 2 && <button onClick={handleNextStep}>Next</button>}
            </div>
        </div>
    )
}

export default AddEmployee;