"use client"
import React, { useState, useEffect } from 'react';
import Pagination from '@/components/shares/pagination/Pagination';
import ApplicationContainer from './ApplicationContainer';
import { apiBase } from "@/api";
import { IApiBaseApplication } from '@/types/application';

interface Pagination {
  total: number;
  current_page: number;
  last_page: number;
}

const ApplicationList = () => {
  const [applications, setApplications] = useState<IApiBaseApplication[]>([]);
  const [pagination, setPagination] = useState<Pagination>({
    total: 0,
    current_page: 1,
    last_page: 1,
  });
  const [activeTab, setActiveTab] = useState<'leave' | 'duty'>('leave');
  const api = apiBase();

  useEffect(() => {
    fetchApplications(1);
  }, []);

  const fetchApplications = async (page: number) => {
    try {
      let response;
      if (activeTab === 'leave') {
        response = await api.application().getApplications(0, page, 5);
      } else {
        response = await api.application().getApplications(1, page, 5);
      }

      setApplications(response.data.data);
      setPagination({
          total: response.data.total,
          current_page: response.data.current_page,
          last_page: response.data.last_page,
      });
    } catch (error) {
      console.error("Error fetching applications:", error);
    }
  };

  const handlePageChange = (page: number) => {
    fetchApplications(page);
  };

  const handleTabChange = (tab: 'leave' | 'duty') => {
    setActiveTab(tab);
    fetchApplications(1); // Fetch applications for the first page when tab changes
  };

  return (
    <div className="mx-auto">
      <h2 className="text-lg mb-1 text-gray-500"> Application </h2>
      <h1 className="text-2xl font-bold mb-4"> Applications List </h1>
      <button
        className={`px-4 py-2 rounded ${
          activeTab === 'leave' ? 'bg-gray-300' : 'bg-gray-100'
        }`}
        onClick={() => handleTabChange('leave')}
      >
        Leave
      </button>
      <button
        className={`px-4 py-2 rounded ${
          activeTab === 'duty' ? 'bg-gray-300' : 'bg-gray-100'
        }`}
        onClick={() => handleTabChange('duty')}
      >
        Duty
      </button> 
      <div className="mb-2">
        {applications.map((application) => (
          <ApplicationContainer 
              key={application.user_id} 
              application={application} 
          />
        ))}
      </div>
      
      <Pagination
        currentPage={pagination.current_page}
        totalPage={pagination.last_page}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default ApplicationList;
