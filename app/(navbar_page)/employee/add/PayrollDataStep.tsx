import React from "react";
import BaseInputText from '@/components/shares/inputs/BaseInputText';

const PayrollDataForm = ({ formData, handleChange }) => {
    return (
        <div className="w-1/2 mx-auto mt-5">
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
        </div>
    )
}

export default PayrollDataForm;