import React from 'react';
import { IApiBaseApplication } from '@/types/application'; // Import your application data type here

interface ApplicationContainerProps {
  application: IApiBaseApplication;
}

const ApplicationContainer: React.FC<ApplicationContainerProps> = ({ application }) => {
  return (
    <div className="border rounded p-4 mt-3 mb-2">
      <h3 className="text-lg font-bold mb-2">Application ID: {application.application_id}</h3>
      <p className="text-md mb-2">Employee Name: {application.user?.full_name}</p>
      <p className="text-sm">Start Date: {application.start_date}</p>
      <p className="text-sm">End Date: {application.end_date}</p>
    </div>
  );
};

export default ApplicationContainer;
