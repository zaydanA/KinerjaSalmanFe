import React, { useEffect, useState } from "react";
import { IApiBaseApplication } from "@/types/application";
import { useAuth } from "@/contexts";
import BaseModal from "@/components/shares/modals/BaseModal";
import { FaFilePdf } from "react-icons/fa6";
import { IoMdDownload } from "react-icons/io";
import { apiBase } from "@/api";
import { Spinner } from "@nextui-org/react";
import Link from "next/link";
import { ApplicationsStatus } from "@/enums/enums";
import { lib } from "@/lib";

interface ApplicationContainerProps {
  application: IApiBaseApplication;
  type: "leave" | "duty";
  handleAccept: (application: IApiBaseApplication) => void;
  handleReject: (application: IApiBaseApplication) => void;
}

const ApplicationContainer: React.FC<ApplicationContainerProps> = ({
  application,
  type,
  handleAccept,
  handleReject,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalOption, setModalOption] = useState<boolean>(false); // true: Accept, false: Reject
  const [fileUrl,setFileUrl] = useState('');
  const { isHRDManagerOrDirector, isManager } = useAuth();
  const customLib = lib();

  const startDate = customLib.getDate(new Date(application.start_date), true);
  const endDate = customLib.getDate(new Date(application.end_date), true);

  const toggleModal = (modalType?: boolean) => {
    setModalOption(modalType ?? true);
    setModalOpen(!modalOpen);
  };

  useEffect(()=>{
    async function generateFileUrl(){
      console.log(fileUrl);
      if(showModal===true && (application.file_url && application.hr_status == ApplicationsStatus.PENDING && application.manager_status != ApplicationsStatus.REJECTED)){
        const response = await apiBase().application().generateFileUrlApplication(application.file_url)
        setFileUrl(response.data);
      }else if(showModal===false){
        setFileUrl('')
      }

    }
  generateFileUrl()
  },[showModal])

  return (
    
    <div className="mb-2 mt-3 rounded-md border-1 border-gray-400 py-2 px-4 hover:shadow-md"  >
      <div className="flex items-center justify-between" >
        <div data-cy='application-container' className="w-full" onClick={() => setShowModal(!showModal)}>
          <div className=" w-fit">
            <h3
              className="text-lg font-bold hover:cursor-pointer hover:underline"
            >
              {application.user.full_name}
            </h3>
          </div>
          <p className="text-md">
            {application.leave_type}
          </p>
          <p className="text-sm">
            Date: {startDate} - {endDate}
          </p>
        </div>
        {isHRDManagerOrDirector() ? (
          application.hr_status === "PENDING" ? (
            // Display buttons for HR approval
            <div className="center mt-2 flex">
              <button
                className="accept-button w-fit rounded bg-green-500 px-4 py-2 text-white"
                onClick={() => toggleModal(true)}
              >
                Approve
              </button>
              <button
                className="reject-button w-20 rounded bg-white px-4 py-2 text-black"
                onClick={() => toggleModal(false)}
              >
                Reject
              </button>
            </div>
          ) : (
            // Display HR approval status
            <div className="flex items-center">
              <p
                className={
                  application.hr_status === "ACCEPTED"
                    ? "font-bold text-green-500"
                    : "font-bold text-red-500"
                }
              >
                {application.hr_status === "ACCEPTED" ? "Accepted" : "Rejected"}
              </p>
            </div>
          )
        ) : (
          // Check for Manager
          isManager() &&
          (application.manager_status === "PENDING" ? (
            // Display buttons for Manager approval
            <div className="center flex gap-2">
              <button
                className="accept-button w-fit rounded bg-green-500 px-4 py-2 text-white"
                onClick={() => toggleModal(true)}
              >
                Approve
              </button>
              <button
                className="reject-button w-20 rounded bg-white px-4 py-2 text-black"
                onClick={() => toggleModal(false)}
              >
                Reject
              </button>
            </div>
          ) : (
            // Display Manager approval status
            <div className="flex items-center">
              <p
                className={
                  application.manager_status === "ACCEPTED"
                    ? "font-bold text-green-500"
                    : "font-bold text-red-500"
                }
              >
                {application.manager_status === "ACCEPTED"
                  ? "Accepted"
                  : "Rejected"}
              </p>
            </div>
          ))
        )}
      </div>
      {showModal && (
        <BaseModal open={showModal} setOpen={setShowModal}>
          <div className="flex flex-col justify-between gap-5 p-4">
            <div>
              <h2 className="mb-4 text-2xl font-bold">Application Details</h2>
            </div>
            <div className="flex flex-col gap-2">
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
              {(application.file_url && application.hr_status == ApplicationsStatus.PENDING && application.manager_status != ApplicationsStatus.REJECTED)? (fileUrl != '' ? <Link className="h-full w-full border-1 border-gray-300 rounded-lg px-5 py-4 flex flex-row items-center justify-between" href={fileUrl} target="_blank">
                  <div className="flex flex-row text-sm justify-end text-right gap-2">
                    <FaFilePdf className="text-[--kinerja-gold] text-xl"></FaFilePdf> 
                      {application.file_url}
                  </div>
                  <IoMdDownload className="text-[--kinerja-gold]"></IoMdDownload>
              </Link> : <Spinner color="default" size="sm"></Spinner>)
              :null}
            </div>
            <div>
              <button
                className="w-full rounded bg-[--kinerja-gold] px-4 py-2 text-white"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </BaseModal>
      )}
      <BaseModal open={modalOpen} setOpen={setModalOpen}>
        <div className="flex flex-col justify-between gap-5 p-4">
          <h1 className="text-2xl font-semibold">Confirm Application</h1>
          <p>
            Are you sure you want to{" "}
            <strong>{modalOption ? "Accept" : "Reject"}</strong>{" "}
            {application.user.full_name}&apos;s application?
            Note: PDF file will be removed if there is any.
          </p>
          <div className="flex justify-end gap-5">
            <button onClick={() => toggleModal()}>Cancel</button>
            {modalOption ? (
              <button
                className="accept-button m-2 rounded bg-green-500 px-4 py-2 text-white"
                onClick={() => {
                  handleAccept(application);
                  toggleModal();
                }}
              >
                Accept
              </button>
            ) : (
              <button
                className="reject-button m-2 rounded bg-red-500 px-4 py-2 text-white"
                onClick={() => {
                  handleReject(application);
                  toggleModal();
                }}
              >
                Reject
              </button>
            )}
          </div>
        </div>
      </BaseModal>
    </div>
  );
};

export default ApplicationContainer;
