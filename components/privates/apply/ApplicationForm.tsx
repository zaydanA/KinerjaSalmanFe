"use client";

import { apiBase } from "@/api";
import BaseInputButton from "@/components/shares/buttons/BaseInputButton";
import BaseInputDate from "@/components/shares/inputs/BaseInputDate";
import BaseInputFile from "@/components/shares/inputs/BaseInputFile";
import BaseInputText from "@/components/shares/inputs/BaseInputText";
import DropdownInput from "@/components/shares/inputs/DropdownInput";
import { ApplicationType, LeaveType } from "@/enums/enums";
import usePDFFile from "@/hooks/usePDFFile";
import useImageFile from "@/hooks/usePDFFile";
import { useInput } from "@/hooks/useInput";
import { lib } from "@/lib";
import { IApiBaseError } from "@/types/http";
import { Radio, Switch } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";

const ApplicationForm = () => {
  const customLib = lib();
  const api = apiBase();
  const apiBaseError = api.error<IApiBaseError>();
  const router = useRouter();

  const [isSelected, setIsSelected] = useState<boolean>(false);
  const [startDate, setStartDate] = useInput("");
  const [endDate, setEndDate] = useInput("");
  const [leaveType, setLeaveType] = useInput("");
  const [description, setDescription] = useInput("");
  const [eventName, setEventName] = useInput("");
  const [eventLocation, setEventLocation] = useInput("");
  const [pdfFile, setPdfFile] = usePDFFile(null);

  const handleSwitch = () => {
    setIsSelected(!isSelected);
    setStartDate("");
    setEndDate("");
    setLeaveType("");
    setDescription("");
    setEventName("");
    setEventLocation("");
    setPdfFile(null);
  };

  const handleSubmit = async () => {
    try {
      let response;
      if (isSelected) {
        response = await api.application().createApplication({
          applicationType: true,
          start_date: startDate,
          end_date: endDate,
          type: ApplicationType.LEAVE,
          description: description,
          leave_type: leaveType,
          file_url: pdfFile,
        });
      } else {
        response = await api.application().createApplication({
          applicationType: false,
          start_date: startDate,
          end_date: endDate,
          type: ApplicationType.DUTY,
          description: description,
          event_name: eventName,
          location: eventLocation,
          file_url: pdfFile,
        });
      }

      if (response.status === "success") {
        toast.success(response.message);
        router.push("/dashboard");
      }
    } catch (error) {
      apiBaseError.set(error);
      toast.error(apiBaseError.getMessage());
    }
  };

  return (
    <div className="mx-auto">
      <h2 className="mb-1 text-lg text-gray-500">Application Form</h2>
      <h1 className="mb-4 text-2xl font-bold">Leave Application</h1>
      <div className="mx-auto w-1/2">
        <h3 className="mb-1 text-lg font-bold"> Application Data </h3>
        <p className="text-sm text-gray-500"> Fill application data</p>
        <div className="my-6 grid grid-cols-2 gap-x-5 gap-y-4">
          <div className="col-span-2 flex gap-5">

            <div className="flex gap-1">
              <input
                data-cy='leave-radio-button'
                type="radio"
                id="timeOff"
                name="leaveType"
                value="timeOff"
                checked={isSelected}
                onChange={() => handleSwitch()}
              />
              <label htmlFor="timeOff">Time-off Leave</label>
            </div>

            <div className="flex gap-1">
              <input
               data-cy='duty-radio-button'
                type="radio"
                id="dutyLeave"
                name="leaveType"
                value="dutyLeave"
                checked={!isSelected}
                onChange={() => handleSwitch()}
              />
              <label htmlFor="dutyLeave">Duty Leave</label>
            </div>
          </div>
          <BaseInputDate
            id="start_date"
            label="Start Date"
            required={true}
            error={apiBaseError.getErrors("start_date")?.[0].toString()}
            value={String(startDate)}
            setValue={(e) => setStartDate(e.target.value)}
          />
          <BaseInputDate
            id="end_date"
            label="End Date"
            required={true}
            error={apiBaseError.getErrors("end_date")?.[0].toString()}
            value={String(endDate)}
            setValue={(e) => setEndDate(e.target.value)}
          />
          {isSelected ? (
            <>
              <div className="col-span-2">
                <DropdownInput
                  id="types"
                  label="Type"
                  required={true}
                  options={Object.keys(LeaveType).map((leave) => ({
                    value: leave,
                    label: customLib.toLabelCase(leave, true),
                  }))}
                  selectedValue={leaveType}
                  onChange={(e) => setLeaveType(e.target.value)}
                  error={apiBaseError.getErrors("leave_type")?.[0].toString()}
                />
              </div>
              <div className="col-span-2">
                <BaseInputText
                  id="description"
                  label="Description"
                  placeholder="Description"
                  required={true}
                  type="text"
                  error={apiBaseError.getErrors("description")?.[0].toString()}
                  value={description}
                  setValue={(e) => setDescription(e.target.value)}
                />
              </div>
            </>
          ) : (
            <>
              <BaseInputText
                id="event_name"
                label="Event Name"
                placeholder="Event Name"
                type="text"
                required={true}
                error={apiBaseError.getErrors("event_name")?.[0].toString()}
                value={eventName}
                setValue={(e) => setEventName(e.target.value)}
              />
              <BaseInputText
                id="location"
                label="Location"
                placeholder="Location"
                type="text"
                required={true}
                error={apiBaseError.getErrors("location")?.[0].toString()}
                value={eventLocation}
                setValue={(e) => setEventLocation(e.target.value)}
              />
              <div className="col-span-2">
                <BaseInputText
                  id="description"
                  label="Description"
                  placeholder="Description"
                  type="text"
                  required={true}
                  error={apiBaseError.getErrors("description")?.[0].toString()}
                  value={description}
                  setValue={(e) => setDescription(e.target.value)}
                />
              </div>
            </>
          )}
          <div className="col-span-2">
            <BaseInputFile
              id="application-upload"
              type="image"
              label="Attachment :"
              value={pdfFile}
              setValue={setPdfFile}
            />
          </div>
        </div>
      </div>
      <div className="mx-auto mt-8 flex w-1/2 justify-end gap-2">
        <BaseInputButton text="Submit" onClick={handleSubmit} />
      </div>
    </div>
  );
};

export default ApplicationForm;
