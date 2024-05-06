import React from 'react';
import { IApiBaseEmployee } from '@/types/employee';

interface EmployeeContainerProps {
  employee: IApiBaseEmployee;
  onReviewClick: (employeeId: number) => void;
  onAddKpiClick: (employeeId: number) => void;
}

const EmployeeContainer: React.FC<EmployeeContainerProps> = ({ employee, onReviewClick, onAddKpiClick }) => {
  const handleReviewClick = () => {
    onReviewClick(employee.user_id);
  };

  const handleAddKpiClick = () => {
    onAddKpiClick(employee.user_id);
  };

  return (
    <div className="border rounded-md p-4 mb-4 employee-container hover:brightness-90 flex justify-between items-center">
      <div>
      <div className="font-bold text-lg">{employee.full_name}</div>
        <div>position ID:{employee.position_id}</div>
        <div>department ID:{employee.dept_id}</div>
      </div>
      <div>
        <button
          onClick={handleReviewClick}
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Review
        </button>
        <button
          onClick={handleAddKpiClick}
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 ml-2"
        >
          Add KPI
        </button>
      </div>
    </div>
  );
};

export default EmployeeContainer;
