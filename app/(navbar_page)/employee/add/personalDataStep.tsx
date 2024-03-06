import React, { useState } from 'react';
import { Gender, BloodType, MaritalStatus, LastEducation } from '@/enums/enums';
import { useInput } from "@/hooks/useInput";
import BaseInputText from '@/components/shares/inputs/BaseInputText';
import BaseInputDate from '@/components/shares/inputs/BaseInputDate';
import DropdownInput from '@/components/shares/inputs/DropdownInput';

const PersonalDataForm = ({ formData, handleChange }) => {

    const [emailError, setEmailError] = useState('');

    const handleEmailChange = (event) => {
        const { name, value } = event.target;
        handleChange(name, value);

        if (!isValidEmail(value)) {
            setEmailError('Please enter a valid email address');
        } else {
            setEmailError('');
        }
    };

    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    return (
        <div className="w-1/2 mx-auto mt-5">
            <h3 className="text-lg mb-1 font-bold"> Personal Data </h3>
            <p className="text-gray-500"> Fill all employee personal basic information data </p>
            <div className="flex gap-4 mb-2 mt-8">
                <div className="flex-grow">
                    <BaseInputText
                        id="firstName"
                        label="First Name :"
                        placeholder="First Name"
                        type="text"
                        value={formData.firstName}
                        setValue={(e) => handleChange('firstName', e.target.value)}
                    />
                </div>
                <div className="flex-grow">
                    <BaseInputText
                        id="lastName"
                        label="Last Name :"
                        placeholder="Last Name"
                        type="text"
                        value={formData.lastName}
                        setValue={(e) => handleChange('lastName', e.target.value)}
                    />
                </div>
            </div>
            <div className="mb-2">
                <BaseInputText
                    id="email"
                    label="Email :"
                    placeholder="Email"
                    type="text"
                    value={formData.email}
                    setValue={(e) => handleChange('email', e.target.value)}
                />
                {emailError && <p>{emailError}</p>}
            </div>
            <div className="flex gap-4 mb-2">
                <div className='flex-grow'>
                <BaseInputText
                    id="phoneNumber"
                    label="Phone Number :"
                    placeholder="Phone Number"
                    type="text"
                    value={formData.phoneNumber}
                    setValue={(e) => handleChange('phoneNumber', e.target.value)}
                />
                </div>
                <div className='flex-grow'>
                <BaseInputText
                    id="emergencyNumber"
                    label="Emergency Number :"
                    placeholder="Emergency Number"
                    type="text"
                    value={formData.emergencyNumber}
                    setValue={(e) => handleChange('emergencyNumber', e.target.value)}
                />
                </div>
            </div>
            <div className="mb-2"> 
                <BaseInputText
                    id="address"
                    label="Address :"
                    placeholder="Address"
                    type="text"
                    value={formData.address}
                    setValue={(e) => handleChange('address', e.target.value)}
                />
            </div>
            <div className="flex gap-4 mb-2">
                <div className="flex-grow">
                    <BaseInputText
                        id="placeOfBirth"
                        label="Place of Birth :"
                        placeholder="Place of Birth"
                        type="text"
                        value={formData.placeOfBirth}
                        setValue={(e) => handleChange('placeOfBirth', e.target.value)}
                    />
                </div>
                <div className="flex-grow">
                    <BaseInputDate
                        id="dateOfBirth"
                        label="Date of Birth :"
                        value={formData.dateOfBirth}
                        setValue={(e) => handleChange('dateOfBirth', e.target.value)}
                    />
                </div>
            </div>
            <div className="mb-2">
                <BaseInputText
                    id="identityNumber"
                    label="Identity Number :"
                    placeholder="Identity Number"
                    type="text"
                    value={formData.identityNumber}
                    setValue={(e) => handleChange('identityNumber', e.target.value)}
                />
            </div>
            <div className="flex gap-4 mb-2">
                <div className="flex-grow">
                    <DropdownInput
                        id="gender"
                        label="Gender :"
                        options={Object.keys(Gender).map(gender => ({ value: gender, label: gender }))}
                        selectedValue={formData.gender}
                        onChange={(e) => handleChange('gender', e.target.value)}
                    />
                </div>
                <div className="flex-grow">
                    <DropdownInput
                        id="maritalStatus"
                        label="Marital Status :"
                        options={Object.keys(MaritalStatus).map(maritalstatus => ({ value: maritalstatus, label: maritalstatus }))}
                        selectedValue={formData.maritalSTatus}
                        onChange={(e) => handleChange('maritalStatus', e.target.value)}
                    />
                </div>
            </div>
            <div className="flex gap-4 mb-2">
                <div className='flex-grow'>
                    <DropdownInput
                        id="bloodType"
                        label="Blood Type :"
                        options={Object.keys(BloodType).map(bloodtype => ({ value: bloodtype, label: bloodtype }))}
                        selectedValue={formData.bloodType}
                        onChange={(e) => handleChange('bloodType', e.target.value)}
                    />
                </div>
                <div className='flex-grow'>
                    <DropdownInput
                        id="lastEducation"
                        label="Last Education :"
                        options={Object.keys(LastEducation).map(lasteducation => ({ value: lasteducation, label: lasteducation }))}
                        selectedValue={formData.lastEducation}
                        onChange={(e) => handleChange('lastEducation', e.target.value)}
                    />
                </div>
            </div>
        </div>
    )
}

export default PersonalDataForm;