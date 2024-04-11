import React from "react";
import { IApiBaseApplication } from "@/types/application"; // Import your application data type here
import { ApplicationType } from "@/enums/enums";

interface ModalProps {
  application: IApiBaseApplication;
  onClose: (event: React.MouseEvent<HTMLButtonElement>) => void;
  type: string;
}

const ApplicationModal: React.FC<ModalProps> = ({
  application,
  onClose,
  type,
}) => {
  const startDate = new Date(application.start_date).toLocaleDateString();
  const endDate = new Date(application.end_date).toLocaleDateString();
  return (
    <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="flex h-96 w-96 flex-col justify-between rounded-lg bg-white p-8 shadow-lg">
        <div>
          <h2 className="mb-4 text-2xl font-bold">Application Details</h2>
        </div>
        <div>
          <p>
            <strong>Application ID:</strong> {application.application_id}
          </p>
          <p>
            <strong>Name:</strong> {application.user?.full_name}
          </p>
          <p>
            <strong>Start Date:</strong> {startDate}
          </p>
          <p>
            <strong>End Date:</strong> {endDate}
          </p>
          <p>
            <strong>Type:</strong> {application.type}
          </p>
          <p>
            <strong>Description:</strong> {application.description}
          </p>
          {(application.leave_type && (
            <p>
              <strong>Leave type:</strong> {application.leave_type}
            </p>
          )) ??
            null}
          {(application.event_name && (
            <p>
              <strong>Event Name:</strong> {application.event_name}
            </p>
          )) ??
            null}
          {(application.location && (
            <p>
              <strong>Location :</strong> {application.location}
            </p>
          )) ??
            null}
        </div>
        <div>
          <button
            className="w-full rounded bg-red-500 px-4 py-2 text-white"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApplicationModal;
