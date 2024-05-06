"use client"

import React, { useState, useEffect } from 'react';
import EmployeeContainer from './EvaluationEmployeesContainer';
import KPIDetail from './KPIDetail';
import Evaluation from './Evaluation';
import Pagination from '@/components/shares/pagination/Pagination';
import { apiBase } from '@/api';
import { IApiBaseEmployee } from '@/types/employee';

const EvaluationEmployee: React.FC = () => {
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<number>(0);
  const [showEvaluation, setShowEvaluation] = useState(false);
  const [showKPIDetail, setShowKPIDetail] = useState(false);
  const [employees, setEmployees] = useState<IApiBaseEmployee[]>([]);
  const [pagination, setPagination] = useState({
    total: 0,
    current_page: 1,
    last_page: 1,
  });

  useEffect(() => {
    fetchEmployees(1);
  }, []);

  const fetchEmployees = async (page: number) => {
    try {
      const limit = 5;
      const response = await apiBase().employee().getEmployeesForReview(page, limit);

      setEmployees(response.data.data);

      setPagination({
        total: response.data.total,
        current_page: response.data.current_page,
        last_page: response.data.last_page,
      });
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const handlePageChange = (page: number) => {
    fetchEmployees(page);
  };

  const handleReviewClick = (employeeId: number) => {
    setSelectedEmployeeId(employeeId);
    setShowEvaluation(false);
    setShowKPIDetail(true);
  };

  const handleAddKpiClick = (employeeId: number) => {
    setSelectedEmployeeId(employeeId);
    setShowEvaluation(true);
    setShowKPIDetail(false); 
  }

  const handleBackToEvaluationEmployee = () => {
    setShowEvaluation(false);
    setShowKPIDetail(false); 
  };

  let contentToRender = null;

  if (showEvaluation) {
    contentToRender = <Evaluation employeeId={selectedEmployeeId || 0} onBackToEvaluationEmployee={handleBackToEvaluationEmployee} />;
  } else if (showKPIDetail) {
    contentToRender = <KPIDetail employeeId={selectedEmployeeId || 0} onBackToEvaluationEmployee={handleBackToEvaluationEmployee}/>;
  } else {
    contentToRender = (
      <div className="mt-8">
        {employees.map((employee) => (
          <EmployeeContainer key={employee.user_id} employee={employee} onReviewClick={handleReviewClick} onAddKpiClick={handleAddKpiClick}/>
        ))}
        <Pagination
          currentPage={pagination.current_page}
          totalPage={pagination.last_page}
          onPageChange={handlePageChange}
        />
      </div>
    );
  }

  return (
    <div className="mx-auto">
      <div>
        <h2 className="text-lg mb-1 text-gray-500">Evaluation</h2>
        <h1 className="text-2xl font-bold">List of Employees</h1>
      </div>
      {contentToRender}
    </div>
  );
};

export default EvaluationEmployee;

