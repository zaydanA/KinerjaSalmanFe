import React from 'react';
import { IApiBaseApplication } from '@/types/application'; // Import your application data type here

interface ModalProps {
  application: IApiBaseApplication;
  onClose: (event: React.MouseEvent<HTMLButtonElement>) => void;
  type: string;
}

const ApplicationModal: React.FC<ModalProps> = ({ application, onClose, type }) => {
  const startDate = new Date(application.start_date).toLocaleDateString();
  const endDate = new Date(application.end_date).toLocaleDateString();
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96 h-96">
        <h2 className="text-xl font-bold mb-4">Application Details</h2>
        <p><strong>Application ID:</strong> {application.application_id}</p>
        <p><strong>Name:</strong> {application.user?.full_name}</p>
        <p><strong>Start Date:</strong> {startDate}</p>
        <p><strong>End Date:</strong> {endDate}</p>
        <p><strong>Type:</strong> {type === 'duty' ? '-' : application.type}</p>
        <p><strong>Description:</strong> {application.description}</p>
        <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default ApplicationModal;
