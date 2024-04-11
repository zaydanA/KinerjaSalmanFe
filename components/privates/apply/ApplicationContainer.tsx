import React, { useState, useEffect } from 'react';
import { IApiBaseApplication } from '@/types/application'; // Import your application data type here
import { apiBase } from '@/api';
import ApplicationModal from './ApplicationModal';

interface ApplicationContainerProps {
  application: IApiBaseApplication;
  type: 'leave' | 'duty';
  handleAccept: (application: IApiBaseApplication, isDuty: number) => void;
  handleReject: (application: IApiBaseApplication, isDuty: number) => void;
}

const ApplicationContainer: React.FC<ApplicationContainerProps> = ({ application, type, handleAccept, handleReject }) => {
  const [showModal, setShowModal] = useState(false); 
  const isDuty = type === 'leave'? 0 : 1;

  const startDate = new Date(application.start_date).toLocaleString('en-US', {
    timeZone: 'America/New_York',
    dateStyle: 'long',
    timeStyle: 'short'
  });

  const endDate = new Date(application.end_date).toLocaleString('en-US', {
    timeZone: 'America/New_York',
    dateStyle: 'long',
    timeStyle: 'short'
  });
  

  // const toggleModal = (event: React.MouseEvent<HTMLDivElement>) => {
  //   // setShowModal(!showModal);
  //   if (!(event.target as HTMLElement).closest('.accept-button') && !(event.target as HTMLElement).closest('.reject-button')) {
  //     setShowModal(!showModal);
  //   }
  // };

  // const toggleModal: () => void = () => {
  //   setShowModal(!showModal);
  // };

  const handleButtonClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const target = event.target as HTMLElement;
    if (!(target.closest('.accept-button') || target.closest('.reject-button'))) {
      setShowModal(!showModal);
    }
  };
  

  return (
    <div className="border rounded p-4 mt-3 mb-2  hover:shadow-md" onClick={handleButtonClick}>
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-bold mb-2">Name: {application.user?.full_name}</h3>
          <p className="text-md mb-2">Application ID: {application.application_id}</p>
          <p className="text-sm">Date: {startDate} - {endDate}</p>
        </div>
        {application.status === 'PENDING' ? (
          <div className="flex center mt-2">
            <button className="bg-green-500 text-white px-4 py-2 rounded mr-2 w-20 accept-button" onClick={() => handleAccept(application, isDuty)}>Accept</button>
            <button className="bg-red-500 text-white px-4 py-2 rounded w-20 reject-button" onClick={() => handleReject(application, isDuty)}>Reject</button>
          </div>
        ) : (
          <div className="flex items-center">
            <p className={application.status === 'ACCEPTED' ? "text-green-500 font-bold" : "text-red-500 font-bold"}>
              {application.status === 'ACCEPTED' ? "Accepted" : "Rejected"}
            </p>
          </div>
        )}
      </div>
      {/* {showModal && <ApplicationModal application={application} type={type} onClose={toggleModal} />} */}
      {showModal && <ApplicationModal application={application} type={type} onClose={() => setShowModal(false)} />}
    </div>

  );
};

export default ApplicationContainer;
