import React from 'react';
import { Gender, BloodType, MaritalStatus, LastEducation } from '@/enums/enums';

const PersonalDataForm = ({ formData, handleChange }) => {
    return (
        <div>
            <div>
                <label>
                    First Name:
                    <input 
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => handleChange('firstName', e.target.value)}
                    required>
                    </input>
                </label>
            </div>
            <div>
                <label>
                    Last Name:
                    <input 
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => handleChange('lastName', e.target.value)}
                    required>
                    </input>
                </label>
            </div>
            <div>
                <label>
                    Email:
                    <input 
                    type="text"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    required>
                    </input>
                </label>
            </div>
            <div>
                <label>
                    Phone Number:
                    <input 
                    type="number"
                    value={formData.phoneNumber}
                    onChange={(e) => handleChange('phoneNumber', e.target.value)}
                    required>
                    </input>
                </label>
            </div>
            <div>
                <label>
                    Emergency Number:
                    <input 
                    type="number"
                    value={formData.emergencyNumber}
                    onChange={(e) => handleChange('emergencyNumber', e.target.value)}
                    required>
                    </input>
                </label>
            </div>
            <div>
                <label>
                    Address:
                    <input 
                    type="text"
                    value={formData.address}
                    onChange={(e) => handleChange('address', e.target.value)}
                    required>
                    </input>
                </label>
            </div>
            <div>
                <label>
                    Place Of Birth:
                    <input 
                    type="text"
                    value={formData.placeOfBirth}
                    onChange={(e) => handleChange('placeOfBirth', e.target.value)}
                    required>
                    </input>
                </label>
            </div>
            <div>
                <label>
                    Date Of Birth:
                    <input 
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => handleChange('dateOfBirth', e.target.value)}
                    required>
                    </input>
                </label>
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
                <label>
                    Identity Number:
                    <input 
                    type="number"
                    value={formData.identityNumber}
                    onChange={(e) => handleChange('identityNumber', e.target.value)}
                    required>
                    </input>
                </label>
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