import React, { useState } from 'react';
import EvaluationDetail from './EvaluationDetail';
import { KPIType } from '@/enums/enums';
import { IKPI, IKPIDetail } from '@/types/kpi';
import { IApiBaseError } from "@/types/http";
import { apiBase } from "@/api";
import { toast } from "react-toastify";
import BaseModal from '@/components/shares/modals/BaseModal';

interface EvaluationProps {
  employeeId: number;
  onBackToEvaluationEmployee: () => void;
}

const Evaluation: React.FC<EvaluationProps> = ({ employeeId, onBackToEvaluationEmployee }) =>  {
  const [kpi, setKpi] = useState<IKPI>({
    user_id: employeeId,
    kpiDetails: [{ indicator: '', type: KPIType.AKTIVITAS, target: '', realization: '', weight: '' }]
  });

  const [kpiTypes, setKpiTypes] = useState<KPIType[]>([
    KPIType.PROYEKSI, KPIType.AKTIVITAS, KPIType.HASIL
  ]);

  const apiBaseError = apiBase().error<IApiBaseError>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);

  const handleAddKpi = () => {
    const hasEmptyField = kpi.kpiDetails.some(detail => (
      detail.indicator === '' ||
      detail.target === '' ||
      detail.weight === ''
    ));
  
    if (hasEmptyField) {
      toast.error('Please fill in all required fields before adding a new KPI.');
      return;
    }
  
    setKpi({
      ...kpi,
      kpiDetails: [...kpi.kpiDetails, {
        indicator: '', type: KPIType.AKTIVITAS, target: '', realization: '', weight: ''
      }]
    });
  };
  

  const handleDeleteKpi = (index: number) => {
    const newKpi = { ...kpi };
    
    newKpi.kpiDetails.splice(index, 1);

    setKpi(newKpi);
  };

  const normalizeWeights = () => {
    const totalWeight = kpi.kpiDetails.reduce((total, detail) => total + parseFloat(detail.weight), 0);

    if (totalWeight !== 100) {
      const normalizedKPI = {
        ...kpi,
        kpiDetails: kpi.kpiDetails.map(detail => ({
          ...detail,
          weight: ((parseFloat(detail.weight) / totalWeight) * 100).toFixed(2)
        }))
      };

      setKpi(normalizedKPI);
    } else {
      toast.info('Weights are already normalized.');
    }
  };

  const handleChangeKpiDetail = <T extends keyof IKPIDetail>(index: number, field: T, value: IKPIDetail[T]) => {
    const newKpi = { ...kpi };
    newKpi.kpiDetails[index][field] = value;
    setKpi(newKpi);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsModalOpen(true);
  };

  const handleConfirmSubmit = async () => {
    setIsModalOpen(false); 
    try {
      await apiBase().kpi().createKPI(kpi);
      toast.success('KPI submitted successfully.');
      onBackToEvaluationEmployee();
    } catch (error) {
      apiBaseError.set(error);
      toast.error(apiBaseError.getMessage());
    }
  };

  const handleBackToEvaluationEmployee = () => {
    const hasNonEmptyInputs = kpi.kpiDetails.some(detail => (
      detail.indicator !== '' ||
      detail.target !== '' ||
      detail.weight !== ''
    ));

    if (hasNonEmptyInputs) {
      setIsConfirmationModalOpen(true);
    } else {
      onBackToEvaluationEmployee();
    }
  };

  const handleConfirmBack = () => {
    setIsConfirmationModalOpen(false);
    onBackToEvaluationEmployee();
  };

  return (
    <div className="">      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex justify-end">
        <button
            type="button"
            onClick={normalizeWeights}
            className="bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-yellow-600 ml-4"
          >
            Normalize
          </button>
          <button
            type="button"
            onClick={handleAddKpi}
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Add KPI
          </button>
        </div>
        {kpi.kpiDetails.map((detail, index) => (
          <EvaluationDetail
            key={index}
            detail={detail}
            kpiTypes={kpiTypes}
            onChange={(field, value) => handleChangeKpiDetail(index, field, value)}
            onDelete={() => handleDeleteKpi(index)}
          />
        ))}
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={handleBackToEvaluationEmployee}
            className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 justify-self-start"
          >
            Back
          </button>
          <button
            type="submit"
            className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 justify-self-end"
          >
            Submit
          </button>
        </div>
        { isModalOpen && <BaseModal open={isModalOpen} setOpen={setIsModalOpen}>
          <div className="text-center">
            <p className="mb-4">Are you sure you want to submit?</p>
            <button className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600" onClick={handleConfirmSubmit}>
              Yes, Submit
            </button>
            <button className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 ml-4" onClick={() => setIsModalOpen(false)}>
              Cancel
            </button>
          </div>
        </BaseModal>
        }
        { isConfirmationModalOpen && <BaseModal open={isConfirmationModalOpen} setOpen={setIsConfirmationModalOpen}>
            <div className="text-center">
              <p className="mb-4">Are you sure you want to go back? All unsaved changes will be lost.</p>
              <button className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600" onClick={handleConfirmBack}>
                Yes, Go Back
              </button>
              <button className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 ml-4" onClick={() => setIsConfirmationModalOpen(false)}>
                Cancel
              </button>
            </div>
          </BaseModal>
        }
      </form>
    </div>
  );
};

export default Evaluation;
