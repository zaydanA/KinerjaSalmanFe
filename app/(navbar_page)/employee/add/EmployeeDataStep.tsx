import React, { useState, useEffect } from 'react';
import { apiBase } from '@/api';
import { IApiBasePosition } from '@/types/position';
import { IApiBaseDepartment } from '@/types/department';
import BaseInputText from '@/components/shares/inputs/BaseInputText';
import BaseInputDate from '@/components/shares/inputs/BaseInputDate';
import DropdownInput from '@/components/shares/inputs/DropdownInput';

const EmployeeDataForm = ({ formData, handleChange }) => {

    const [positions, setPositions] = useState<IApiBasePosition[]>([]);
    const [departments, setDepartments] = useState<IApiBaseDepartment[]>([]);

    const fetchDataPosition = async () => {
        try {
            const position = await apiBase().position().getPosition();
            setPositions(position.data);
        } catch (error) {
            throw error;
        }
    }

    const fetchDataDepartment = async () => {
        try {
            const department = await apiBase().department().getDepartment();
            setDepartments(department.data);
        } catch (error) {
            throw error;
        }
    }

    useEffect (() => {
        fetchDataPosition();
        fetchDataDepartment();
    }, []);

    return (
        <div className="w-1/2 mx-auto mt-5">
            <h3 className="text-lg mb-1 font-bold"> Employment Data </h3>
            <p className="text-gray-500"> Fill all employee data information related to company </p>
            <div className="mb-2 mt-8">
                <BaseInputText
                    id="employeeID"
                    label="Employee ID :"
                    placeholder="Employee ID"
                    type="text"
                    value={formData.employeeID}
                    setValue={(e) => handleChange('employeeID', e.target.value)}
                />
            </div>
            <div className="mb-2">
                 <BaseInputText
                    id="npwpNumber"
                    label="NPWP Number :"
                    placeholder="NPWP Number"
                    type="text"
                    value={formData.npwpNumber}
                    setValue={(e) => handleChange('npwpNumber', e.target.value)}
                />
            </div>
            <div className="mb-2">
                <DropdownInput
                    id="department"
                    label="Department :"
                    options= {departments.map(department => ({ value: String(department.dept_id), label: department.dept_name }))}
                    selectedValue={formData.department}
                    onChange={(e) => handleChange('department', e.target.value)}
                />
            </div>
            <div className="mb-2">
                <DropdownInput
                    id="position"
                    label="Position :"
                    options= {positions.map(position => ({ value: String(position.position_id), label: position.title }))}
                    selectedValue={formData.position}
                    onChange={(e) => handleChange('department', e.target.value)}
                />
            </div>
            <div className="mb-2">
                <BaseInputDate
                    id="joinDate"
                    label="Join Date :"
                    value={formData.joinDate}
                    setValue={(e) => handleChange('joinDate', e.target.value)}
                />
            </div>
            <div className="mb-2">
                <BaseInputDate
                    id="resignDate"
                    label="Resign Date :"
                    value={formData.resignDate}
                    setValue={(e) => handleChange('resignDate', e.target.value)}
                />
            </div>
        </div>
    )
}

export default EmployeeDataForm;