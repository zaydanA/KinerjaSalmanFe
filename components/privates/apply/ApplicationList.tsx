"use client";
import React, { useState, useEffect } from "react";
import Pagination from "@/components/shares/pagination/Pagination";
import ApplicationContainer from "./ApplicationContainer";
import { apiBase } from "@/api";
import { IApiBaseApplication } from "@/types/application";
import { ApplicationsStatus, ApplicationType } from "@/enums/enums";
import BaseModal from "@/components/shares/modals/BaseModal";

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
  const [activeTab, setActiveTab] = useState<"leave" | "duty">("leave");

  const api = apiBase();

  useEffect(() => {
    fetchApplications(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  const fetchApplications = async (page: number) => {
    try {
      let response;
      if (activeTab === "leave") {
        response = await api
          .application()
          .getApplications(ApplicationType.LEAVE, page, 5);
      } else {
        response = await api
          .application()
          .getApplications(ApplicationType.DUTY, page, 5);
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

  const handleTabChange = (tab: "leave" | "duty") => {
    setActiveTab(tab);
  };

  const handleAccept = async (application: IApiBaseApplication) => {
    try {
      console.log("masuk");
      await apiBase()
        .application()
        .updateApplicationStatus(
          application.application_id,
          ApplicationsStatus.ACCEPTED,
        );
      fetchApplications(pagination.current_page);
    } catch (error) {
      console.log("Error accepting application");
    }
  };

  const handleReject = async (application: IApiBaseApplication) => {
    try {
      await apiBase()
        .application()
        .updateApplicationStatus(
          application.application_id,
          ApplicationsStatus.REJECTED,
        );
      fetchApplications(pagination.current_page);
    } catch (error) {
      console.log("Error rejecting application");
    }
  };

  return (
    <div className="mx-auto">
      <h2 className="mb-1 text-lg text-gray-500"> Application </h2>
      <h1 className="mb-4 text-2xl font-bold"> Applications List </h1>
      <button
        className={`rounded px-4 py-2 ${
          activeTab === "leave" ? "bg-gray-300" : "bg-gray-100"
        }`}
        onClick={() => handleTabChange("leave")}
      >
        Leave
      </button>
      <button
        className={`rounded px-4 py-2 ${
          activeTab === "duty" ? "bg-gray-300" : "bg-gray-100"
        }`}
        onClick={() => handleTabChange("duty")}
      >
        Duty
      </button>
      <div className="mb-2">
        {applications.map((application, index) => (
          <ApplicationContainer
            key={index}
            application={application}
            type={activeTab}
            handleAccept={() => handleAccept(application)}
            handleReject={() => handleReject(application)}
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
