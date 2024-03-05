import React, { useState, useEffect } from 'react';
import { apiBase } from '@/api';
import { IApiBasePosition } from '@/types/position';
import { IApiBaseDepartment } from '@/types/department';


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
        <div>
            <div>
                <label>
                    Employee ID:
                    <input 
                    type="text"
                    value={formData.employeeID}
                    onChange={(e) => handleChange('employeeID', e.target.value)}
                    required>
                    </input>
                </label>
            </div>
            <div>
                <label>
                    NPWP Number:
                    <input 
                    type="text"
                    value={formData.npwpNumber}
                    onChange={(e) => handleChange('npwpNumber', e.target.value)}
                    required>
                    </input>
                </label>
            </div>
            <div>
                <label>
                    Department:
                    <select value={formData.department} onChange={(e) => handleChange('department', e.target.value)}>
                        <option value=''>Select Department</option>
                        {departments.map((department) => 
                        <option key={department.dept_id} value={department.dept_id}>
                            {department.dept_name}
                        </option>)}
                    </select>
                </label>
            </div>
            <div>
                <label>
                    Position:
                    <select value={formData.position} onChange={(e) => handleChange('position', e.target.value)}>
                        <option value=''>Select Position</option>
                        {positions.map((position) => 
                        <option key={position.position_id} value={position.position_id}>
                            {position.title}
                        </option>)}
                    </select>
                </label>
            </div>
            <div>
                <label>
                    Join Date:
                    <input 
                    type="date"
                    value={formData.joinDate}
                    onChange={(e) => handleChange('joinDate', e.target.value)}
                    required>
                    </input>
                </label>
            </div>
        </div>
    )
}

export default EmployeeDataForm;