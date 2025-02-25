import React, { useState, useEffect } from 'react';
import { apiBase } from '@/api';
import { IApiBasePosition } from '@/types/position';
import { IApiBaseDepartment } from '@/types/department';
import BaseInputDate from '@/components/shares/inputs/BaseInputDate';
import DropdownInput from '@/components/shares/inputs/DropdownInput';
import { IUserEmploymentData } from '@/types/user';
import { IApiError } from '@/types/http';
import { useAuth } from '@/contexts';

type ChangeHandler<T> = (data: Partial<T>) => void;
type EmploymentDataFormProps = {
    formData: IUserEmploymentData,
    handleChange: ChangeHandler<IUserEmploymentData>;
    apiBaseError: IApiError
}

const EmploymentDataForm = ({ 
    formData, 
    handleChange,
    apiBaseError
}: EmploymentDataFormProps) => {
    const { user } = useAuth();

    const [positions, setPositions] = useState<IApiBasePosition[]>([]);
    const [departments, setDepartments] = useState<IApiBaseDepartment[]>([]);

    const fetchDataPosition = async () => {
        try {
            const position = await apiBase().position().getPosition();
            let filteredPositions = [...position.data];
            if (user?.position.title !== "Director") {
                filteredPositions = position.data.filter(pos => pos.title !== 'Director');  
            }
            setPositions(filteredPositions);
        } catch (error) {
            console.error(error);
        }
    }

    const fetchDataDepartment = async () => {
        try {
            const department = await apiBase().department().getDepartment();
            let filteredDepartments = [...department.data];
            // filteredDepartments = department.data.filter(dep => dep.dept_name !== "BOD");

            if (user?.position.title !== "Director" && user?.dept.dept_name !== "HRD") {
                filteredDepartments = department.data.filter(dep => dep.dept_name === user?.dept.dept_name);
            }
            setDepartments(filteredDepartments);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect (() => {
        fetchDataPosition();
        fetchDataDepartment();
    }, []);

    const handleEmploymentDataChange = (name: keyof IUserEmploymentData, value: any) => {
        handleChange({
            [name]: value
        });
    }

    return (
        <div className="w-1/2 mx-auto">
            <h3 className="text-lg mb-1 font-bold"> Employment Data </h3>
            <p className="text-gray-500 text-sm"> Fill all employee data information related to company </p>
            <div className="grid grid-cols-2 gap-y-4 gap-x-5 my-6">
                <BaseInputDate
                    id="join_date"
                    label="Join Date"
                    required={true}
                    value={formData.join_date}
                    error={apiBaseError.getErrors('join_date')?.[0].toString()}
                    setValue={(e) => handleEmploymentDataChange('join_date', e.target.value)}
                />
                <div></div>
                <DropdownInput
                    id="dept_id"
                    label="Department"
                    required={true}
                    options= {departments.map(department => ({ value: department.dept_id, label: department.dept_name }))}
                    selectedValue={formData.dept_id}
                    error={apiBaseError.getErrors('dept_id')?.[0].toString()}
                    onChange={(e) => handleEmploymentDataChange('dept_id', parseInt(e.target.value))}
                />
                <DropdownInput
                    id="position_id"
                    label="Position"
                    required={true}
                    options= {positions.map(position => ({ value: position.position_id, label: position.title }))}
                    selectedValue={formData.position_id}
                    error={apiBaseError.getErrors('position_id')?.[0].toString()}
                    onChange={(e) => handleEmploymentDataChange('position_id', parseInt(e.target.value))}
                />
            </div>
        </div>
    )
}

export default EmploymentDataForm;