import React, { useState } from 'react';
import { Gender, BloodType, MaritalStatus, LastEducation } from '@/enums/enums';
import { useInput } from "@/hooks/useInput";
import BaseInputText from '@/components/shares/inputs/BaseInputText';

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
        <div>
            <div>
                {/* <label>
                    First Name:
                    <input 
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => handleChange('firstName', e.target.value)}
                    required>
                    </input>
                </label> */}
                <BaseInputText
                    id="firstName"
                    label="First Name"
                    placeholder="First Name"
                    type="text"
                    value={formData.firstName}
                    setValue={(value) => handleChange('firstName', value)}
                />
            </div>
            <div>
                {/* <label>
                    Last Name:
                    <input 
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => handleChange('lastName', e.target.value)}
                    required>
                    </input>
                </label> */}
                <BaseInputText
                    id="lastName"
                    label="Last Name :"
                    placeholder="Last Name"
                    type="text"
                    value={formData.lastName}
                    setValue={(value) => handleChange('lastName', value)}
                />
            </div>
            <div>
                {/* <label htmlFor="email">Email:</label> */}
                {/* <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                /> */}
                <BaseInputText
                    id="email"
                    label="Email :"
                    placeholder="Email"
                    type="text"
                    value={formData.email}
                    setValue={(value) => handleChange('email', value)}
                />
                {emailError && <p>{emailError}</p>}
            </div>
            <div>
                {/* <label>
                    Phone Number:
                    <input 
                    type="text"
                    value={formData.phoneNumber}
                    onChange={(e) => handleChange('phoneNumber', e.target.value)}
                    required>
                    </input>
                </label> */}
                <BaseInputText
                    id="phoneNumber"
                    label="Phone Number :"
                    placeholder="Phone Number"
                    type="text"
                    value={formData.phoneNumber}
                    setValue={(value) => handleChange('phoneNumber', value)}
                />
            </div>
            <div>
                {/* <label>
                    Emergency Number:
                    <input 
                    type="text"
                    value={formData.emergencyNumber}
                    onChange={(e) => handleChange('emergencyNumber', e.target.value)}
                    required>
                    </input>
                </label> */}
                <BaseInputText
                    id="emergencyNumber"
                    label="Emergency Number :"
                    placeholder="Emergency Number"
                    type="text"
                    value={formData.emergencyNumber}
                    setValue={(value) => handleChange('emergencyNumber', value)}
                />
            </div>
            <div>
                {/* <label>
                    Address:
                    <input 
                    type="text"
                    value={formData.address}
                    onChange={(e) => handleChange('address', e.target.value)}
                    required>
                    </input>
                </label> */}
                <BaseInputText
                    id="address"
                    label="Address :"
                    placeholder="Address"
                    type="text"
                    value={formData.address}
                    setValue={(value) => handleChange('address', value)}
                />
            </div>
            <div>
                {/* <label>
                    Place Of Birth:
                    <input 
                    type="text"
                    value={formData.placeOfBirth}
                    onChange={(e) => handleChange('placeOfBirth', e.target.value)}
                    required>
                    </input>
                </label> */}
                <BaseInputText
                    id="placeOfBirth"
                    label="Place of Birth :"
                    placeholder="Place of Birth"
                    type="text"
                    value={formData.phoneNumber}
                    setValue={(value) => handleChange('phoneNumber', value)}
                />
            </div>
            <div>
                {/* <label>
                    Date Of Birth:
                    <input 
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => handleChange('dateOfBirth', e.target.value)}
                    required>
                    </input>
                </label> */}
                <BaseInputText
                    id="dateOfBirth"
                    label="Date of Birth :"
                    placeholder="Date of Birth"
                    type="text"
                    value={formData.dateOfBirth}
                    setValue={(value) => handleChange('dateOfBirth', value)}
                />
            </div>
            <div>
                <label>
                    Gender:
                    <select value={formData.gender} onChange={(e) => handleChange('gender', e.target.value)}>
                        {Object.keys(Gender).map((gender, index) => (
                            <option key={index} value={Gender[gender as keyof typeof Gender]}>{gender}</option>
                        ))}
                    </select>
                </label>
            </div>
            <div>
                <label>
                    Marital Status:
                    <select value={formData.maritalStatus} onChange={(e) => handleChange('maritalStatus', e.target.value)}>
                        {Object.keys(MaritalStatus).map((maritalstatus, index) =>
                            <option key={index} value={MaritalStatus[maritalstatus as keyof typeof MaritalStatus]}>{maritalstatus}</option>
                        )}
                    </select>
                </label>
            </div>
            <div>
                <label>
                    Blood Type:
                    <select value={formData.bloodType} onChange={(e) => handleChange('bloodType', e.target.value)}>
                        {Object.keys(BloodType).map((bloodtype, index) =>
                            <option key={index} value={BloodType[bloodtype as keyof typeof BloodType]}>{bloodtype}</option>
                        )}
                    </select>
                </label>
            </div>
            <div>
                {/* <label>
                    Identity Number:
                    <input 
                    type="text"
                    value={formData.identityNumber}
                    onChange={(e) => handleChange('identityNumber', e.target.value)}
                    required>
                    </input>
                </label> */}
                <BaseInputText
                    id="identityNumber"
                    label="Identity Number :"
                    placeholder="Identity Number"
                    type="text"
                    value={formData.identityNumber}
                    setValue={(value) => handleChange('identityNumber', value)}
                />
            </div>
            <div>
                <label>
                    Last Education:
                    <select value={formData.lastEducation} onChange={(e) => handleChange('lastEducation', e.target.value)}>
                        {Object.keys(LastEducation).map((lasteducation, index) =>
                            <option key={index} value={LastEducation[lasteducation as keyof typeof LastEducation]}>{lasteducation}</option>
                        )}
                    </select>
                </label>
            </div>
        </div>
    )
}

export default PersonalDataForm;