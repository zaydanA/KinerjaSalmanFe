import React from 'react';

const EmployeeDataForm = ({ formData, handleChange }) => {
    return (
        <div>
            <div>
                <label>
                    Employee ID:
                    <input 
                    type="text"
                    value={formData.employeeData}
                    onChange={(e) => handleChange('employeeData', e.target.value)}
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
                    {/* fetch from api */}
                </label>
            </div>
            <div>
                <label>
                    Position:
                    {/* fetch from api */}
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