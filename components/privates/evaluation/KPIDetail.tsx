import React, { useState, useEffect } from 'react';
import { apiBase } from "@/api";
import { IKPI, IKPIDetail } from '@/types/kpi';
import BaseInputText from '@/components/shares/inputs/BaseInputText'; // Import BaseInputText component

interface KPIDetailProps {
  employeeId: number;
  onBackToEvaluationEmployee: () => void;
}

const KPIDetail: React.FC<KPIDetailProps> = ({ employeeId, onBackToEvaluationEmployee }) => {
  const [kpi, setKPI] = useState<IKPI>();
  const [realizationInputs, setRealizationInputs] = useState<string[]>([]); 

  useEffect(() => {
    const fetchKPIDetails = async () => {
      try {
        const response = await apiBase().kpi().getKPI(employeeId);
        const kpiData = response.data.data[0];
        setKPI(kpiData);
        const initialRealizations = kpiData.kpiDetails.map(detail => '');
        setRealizationInputs(initialRealizations);
      } catch (error) {
        console.error('Error fetching KPI details:', error);
      }
    };

    fetchKPIDetails();
  }, [employeeId]);

  const handleRealizationChange = (index: number, value: string) => {
    const updatedRealizations = [...realizationInputs];
    updatedRealizations[index] = value; 
    setRealizationInputs(updatedRealizations);
  };

  const handleSubmit = async () => {
    if (!kpi || kpi.kpi_id === undefined) {
      console.error('No KPI available');
      return;
    }
    
    try {
      const updatedKPI: IKPI = {
        ...kpi,
        kpiDetails: kpi.kpiDetails.map((detail, index) => ({
          ...detail,
          realization: realizationInputs[index],
        })),
      };
  
      await apiBase().kpi().updateKPI(kpi.kpi_id, updatedKPI);
      console.log('KPI updated successfully');
    } catch (error) {
      console.error('Error updating realizations:', error);
    }
  };

  const handleBackToEvaluationEmployee = () => {
    onBackToEvaluationEmployee();
  };

  return (
    <div className="p-4 mt-4">
      {kpi ? (
       <div>
          <h3 className="font-bold text-lg">KPI Details for Employee ID: {employeeId}</h3>
          <ul>
            {kpi.kpiDetails.map((detail, index) => (
              <li key={index}>
                <div className="border rounded-md p-4 mb-4">
                  <div>Type: {detail.type}</div>
                  <div>Indicator: {detail.indicator}</div>
                  <div>Target: {detail.target}</div>
                  <BaseInputText
                    id={`realization`}
                    label="Realization"
                    value={realizationInputs[index]}
                    setValue={(event) => handleRealizationChange(index, event.target.value)}
                    required
                  />
                </div>
              </li>
            ))}
          </ul>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex justify-start">
              <button
                onClick={handleBackToEvaluationEmployee}
                className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600"
              >
                Back
              </button>
            </div>
            <div className="flex justify-end">
              <button 
                onClick={handleSubmit}
                className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <p className="font-bold text-lg">No KPI available for this employee.</p>

          <button
              onClick={handleBackToEvaluationEmployee}
              className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 justify-self-start"
            >
              Back
          </button>
        </div>
      )}
    </div>
  );
};

export default KPIDetail;
