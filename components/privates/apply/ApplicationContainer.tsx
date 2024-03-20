import React, { useState } from 'react';
import { IApiBaseApplication } from '@/types/application'; // Import your application data type here
import { apiBase } from '@/api';

interface ApplicationContainerProps {
  application: IApiBaseApplication;
  type: string;
}

const ApplicationContainer: React.FC<ApplicationContainerProps> = ({ application, type }) => {
  const [status, setStatus] = useState(application.status);
  const isDuty = type === 'leave'? 0 : 1;

  const handleAccept = async () => {
    try {
      const res = await apiBase().application().changeApplicationStatus(application.application_id, isDuty, "ACCEPTED");
      setStatus("ACCEPTED");
      console.log('Accepting application...');
    } catch (error) {
      console.log("gagal ngubah accept");
    }
  };

  const handleReject = async () => {
    try {
      const res = await apiBase().application().changeApplicationStatus(application.application_id, isDuty, "REJECTED");
      setStatus("REJECTED");
      console.log('Rejecting application...');
    } catch (error) {
      console.log("gagal ngubah reject");
    }
  };

  return (
    <div className="border rounded p-4 mt-3 mb-2">
      <div className="flex justify-between">
        <div>
          <h3 className="text-lg font-bold mb-2">Application ID: {application.application_id}</h3>
          <p className="text-md mb-2">Employee Name: {application.user?.full_name}</p>
          <p className="text-sm">Start Date: {application.start_date}</p>
          <p className="text-sm">End Date: {application.end_date}</p>
        </div>
        {status === 'PENDING' ? (
          <div className="flex center mt-2">
            <button className="bg-green-500 text-white px-4 py-2 rounded mr-2" onClick={handleAccept}>Accept</button>
            <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={handleReject}>Reject</button>
          </div>
        ) : (
          <div className="flex center mt-2">
            <p className={status === 'ACCEPTED' ? "text-green-500 font-bold" : "text-red-500 font-bold"}>
              {status === 'ACCEPTED' ? "Accepted" : "Rejected"}
            </p>
          </div>
        )}
      </div>
    </div>

  );
};

export default ApplicationContainer;
