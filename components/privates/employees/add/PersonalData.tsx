import React from 'react';
import { Gender, BloodType, LastEducation, MaritalStatus } from '@/enums/enums';
import BaseInputText from '@/components/shares/inputs/BaseInputText';
import BaseInputDate from '@/components/shares/inputs/BaseInputDate';
import DropdownInput from '@/components/shares/inputs/DropdownInput';
import { IUserPersonalData } from '@/types/user';
import { IApiError } from '@/types/http';
import { lib } from '@/lib';
import BaseInputTextArea from '@/components/shares/inputs/BaseInputTextArea';

type ChangeHandler<T> = (data: Partial<T>) => void;
type PersonalDataFormProps = {
    formData: IUserPersonalData,
    handleChange: ChangeHandler<IUserPersonalData>;
    apiBaseError: IApiError
}

const PersonalDataForm = ({ 
    formData, 
    handleChange, 
    apiBaseError 
}: PersonalDataFormProps) => {
    const handlePersonalDataChange = (name: keyof IUserPersonalData, value: any) => {                
        let parsedValue: any = value;
        
        if (name === "identity_number") {
            parsedValue = value.replace(/\s/g, "");
        }
        
        handleChange({
            [name]: parsedValue
        });
    }

    const customLib = lib();

    return (
        <div className="w-1/2 mx-auto">
            <h3 className="text-lg mb-1 font-bold"> Personal Data </h3>
            <p className="text-gray-500 text-sm"> Fill all employee personal basic information data </p>
            <div className="grid grid-cols-2 gap-y-4 gap-x-5 my-6">
                <div className="col-span-2">
                    <BaseInputText
                        id="full_name"
                        label="Full Name"
                        maxLength={255}
                        placeholder="Full Name"
                        type="text"
                        required={true}
                        value={formData.full_name}
                        error={apiBaseError.getErrors('full_name')?.[0].toString()}
                        setValue={(e) => handlePersonalDataChange('full_name', e.target.value)}
                    />
                </div>
                <div className="col-span-2">
                    <BaseInputText
                        id="email"
                        label="Email"
                        placeholder="Email"
                        maxLength={255}
                        type="text"
                        required={true}
                        value={formData.email}
                        error={apiBaseError.getErrors('email')?.[0].toString()}
                        setValue={(e) => handlePersonalDataChange('email', e.target.value)}
                    />
                </div>
                <BaseInputText
                    id="phone_number"
                    label="Phone Number"
                    placeholder="Phone Number"
                    type="number"
                    maxLength={15}
                    showLength={true}
                    required={true}
                    value={formData.phone_number}
                    error={apiBaseError.getErrors('phone_number')?.[0].toString()}
                    setValue={(e) => handlePersonalDataChange('phone_number', e.target.value)}
                />
                <BaseInputText
                    id="emergency_number"
                    label="Emergency Number"
                    placeholder="Emergency Number"
                    type="number"
                    maxLength={15}
                    showLength={true}
                    required={true}
                    value={formData.emergency_number}
                    error={apiBaseError.getErrors('emergency_number')?.[0].toString()}
                    setValue={(e) => handlePersonalDataChange('emergency_number', e.target.value)}
                />
                <BaseInputText
                    id="place_of_birth"
                    label="Place of Birth"
                    placeholder="Place of Birth"
                    maxLength={50}
                    type="text"
                    value={formData.place_of_birth}
                    error={apiBaseError.getErrors('place_of_birth')?.[0].toString()}
                    setValue={(e) => handlePersonalDataChange('place_of_birth', e.target.value)}
                />
                <BaseInputDate
                    id="date_of_birth"
                    label="Date of Birth"
                    maxToday={true}
                    required={true}
                    value={String(formData.date_of_birth)}
                    error={apiBaseError.getErrors('date_of_birth')?.[0].toString()}
                    setValue={(e) => handlePersonalDataChange('date_of_birth', e.target.value)}
                />
                <DropdownInput
                    id="gender"
                    label="Gender"
                    required={true}
                    options={Object.keys(Gender).map(gender => ({ value: gender, label: customLib.toLabelCase(gender, true) }))}
                    selectedValue={formData.gender}
                    error={apiBaseError.getErrors('gender')?.[0].toString()}
                    onChange={(e) => handlePersonalDataChange('gender', e.target.value)}
                />
                <DropdownInput
                    id="marital_status"
                    label="Marital Status"
                    required={true}
                    options={Object.keys(MaritalStatus).map(marital_status => ({ value: marital_status, label: customLib.toLabelCase(marital_status, false) }))}
                    selectedValue={formData.marital_status}
                    error={apiBaseError.getErrors('marital_status')?.[0].toString()}
                    onChange={(e) => handlePersonalDataChange('marital_status', e.target.value)}
                />
                <DropdownInput
                    id="blood_type"
                    label="Blood Type"
                    required={false}
                    options={Object.keys(BloodType).map(blood_type => ({ value: blood_type, label: blood_type }))}
                    selectedValue={formData.blood_type as string}
                    error={apiBaseError.getErrors('blood_type')?.[0].toString()}
                    onChange={(e) => handlePersonalDataChange('blood_type', e.target.value)}
                />
            </div>
            <hr className='w-full border-1 mt-8 mb-6' />
            <h3 className="text-lg mb-1 font-bold"> Identity & Address </h3>
            <p className="text-gray-500 text-sm"> Employee identity information </p>
            <div className="grid grid-cols-2 gap-y-4 gap-x-5 my-6">
                <BaseInputText
                    id="identity_number"
                    label="Identity Number"
                    fixedLength={16}
                    format="#### #### #### ####"
                    placeholder="0000 0000 0000 0000"
                    type="text"
                    required={true}
                    value={String(formData.identity_number)}
                    error={apiBaseError.getErrors('identity_number')?.[0].toString()}
                    setValue={(e) => handlePersonalDataChange('identity_number', e.target.value)}
                />
                <DropdownInput
                    id="last_education"
                    label="Last Education"
                    required={true}
                    options={Object.keys(LastEducation).map(last_education => ({ value: last_education, label: customLib.toLabelCase(last_education, true) }))}
                    selectedValue={formData.last_education}
                    error={apiBaseError.getErrors('last_education')?.[0].toString()}
                    onChange={(e) => handlePersonalDataChange('last_education', e.target.value)}
                />
                <div className="col-span-2">
                    <BaseInputTextArea
                        id="address"
                        label="Address"
                        maxLength={255}
                        showLength={true}
                        placeholder="Address"
                        required={true}
                        value={formData.address}
                        error={apiBaseError.getErrors('address')?.[0].toString()}
                        setValue={(e) => handlePersonalDataChange('address', e.target.value)}
                    />
                </div>
            </div>
        </div>
    )
}

export default PersonalDataForm;