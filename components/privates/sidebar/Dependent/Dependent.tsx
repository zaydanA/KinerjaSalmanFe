"use client";
import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import BaseInputText from "@/components/shares/inputs/BaseInputText";
import DropdownInput from "@/components/shares/inputs/DropdownInput";
import TableData from "@/components/shares/tables/TableData";
import TableHeader from "@/components/shares/tables/TableHeader";
import { toast } from "react-toastify";
import { useRouter, usePathname } from "next/navigation";
import { IApiBaseDependent } from "@/types/dependent";
import { apiBase } from "@/api";
import { IUserPersonalData, IUserSelfData } from "@/types/user";
import BaseInputTextArea from "@/components/shares/inputs/BaseInputTextArea";
import { IApiBaseError } from "@/types/http";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import dependent from "@/api/dependent";

const tableHeaders = ["Name", "Address", "Relationships"];

interface DependentProps {
  user: IUserSelfData;
}

const Dependent: React.FC<DependentProps> = (props) => {
  const api = apiBase();
  const [dependents, setDependents] = useState<IApiBaseDependent[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [dependentID, setDependentID] = useState(Number);

  const apiBaseError = apiBase().error<IApiBaseError>();

  useEffect(() => {
    async function getId() {
      try {
        const id = props.user.user_id;
        fetchDependents(id);
      } catch (error) {
        apiBaseError.set(error);
      }
    }
    getId();
  }, []);

  const fetchDependents = async (userId: number) => {
    try {
      const response = await api.dependent().getDependentsByUserId(userId);
      if (response.status === "success") {
        setDependents(response.data);
      } else {
        toast.error("No dependents found");
      }
    } catch (error) {
      toast.error("Failed to fetch dependents");
    }
  };

  const handleClickAdd = () => {
    setFormData({
      user_id: props.user.user_id,
      full_name: "",
      address: "",
      relation_type: "",
    });
    setEditMode(false);
    setIsModalVisible(true);
  };

  const handleClickEdit = (dependent: IApiBaseDependent) => {
    setFormData({
      user_id: dependent.user_id, // Pastikan menggunakan user_id yang benar jika perlu
      full_name: dependent.full_name,
      address: dependent.address,
      relation_type: dependent.relation_type,
    });
    setDependentID(dependent.dependent_id);
    setEditMode(true);
    setIsModalVisible(true);
  };

  const handleClickDelete = (dependentId: number) => {
    confirmAlert({
      title: "Confirm to delete",
      message: "Are you sure to do this?",
      buttons: [
        {
          label: "Yes",
          onClick: () => deleteDependent(dependentId),
        },
        {
          label: "No",
        },
      ],
    });
  };

  const deleteDependent = async (dependentId: number) => {
    try {
      const response = await api.dependent().deleteDependent(dependentId);
      if (response.status === "success") {
        setDependents((prevDependents) =>
          prevDependents.filter((dep) => dep.dependent_id !== dependentId),
        );
        toast.success("Dependent successfully deleted");
      } else {
        toast.error("Failed to delete dependent");
      }
    } catch (error) {
      toast.error("Error deleting dependent: " + error);
    }
  };

  const addDependent = async (formData: {
    user_id: number;
    full_name: string;
    address: string;
    relation_type: string;
  }) => {
    try {
      const response = await api.dependent().addDependent(formData);

      if (response.status === "success") {
        fetchDependents(formData.user_id); // Refresh list after adding
        toast.success("Dependent added successfully");
        setIsModalVisible(false);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("Failed to add dependent");
    }
  };

  const [formData, setFormData] = useState({
    user_id: props.user.user_id,
    full_name: "",
    address: "",
    relation_type: "",
  });

  const handleChange = useCallback(
    (name: string) =>
      (
        event: ChangeEvent<
          HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >,
      ) => {
        setFormData((prevFormData) => ({
          ...prevFormData,
          [name]: event.target.value,
        }));
      },
    [setFormData],
  );

  const validateForm = () => {
    if (formData.address && formData.full_name && formData.relation_type) {
      return true;
    }
    toast.error(`All fields required.`);
    return false;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      return; // Stop the form submission if validation fails
    }

    if (editMode) {
      // Update existing dependent
      try {
        const response = await api
          .dependent()
          .updateDependent(dependentID, formData);
        if (response.status === "success") {
          toast.success("Dependent updated successfully");
          fetchDependents(props.user.user_id);
        } else {
          toast.error(response.message);
        }
      } catch (error) {
        toast.error("Failed to update dependent: " + error);
      }
    } else {
      // Add new dependent
      try {
        const response = await api.dependent().addDependent(formData);
        if (response.status === "success") {
          toast.success("Dependent added successfully");
          fetchDependents(props.user.user_id);
        } else {
          toast.error(response.message);
        }
      } catch (error) {
        toast.error("Failed to add dependent: " + error);
      }
    }
    setIsModalVisible(false);
  };

  const toggleModal = () => {
    setIsModalVisible((prev) => !prev);

    if (!isModalVisible) {
      setFormData({
        user_id: props.user.user_id,
        full_name: "",
        address: "",
        relation_type: "",
      });
    }
  };

  interface AddNewModalProps {
    onClose: () => void;
  }

  const AddNewModal: React.FC<AddNewModalProps> = ({ onClose }) => {
    return (
      <div
        className="fixed inset-0 z-30 h-full w-full overflow-y-auto bg-gray-600 bg-opacity-50"
        id="my-modal"
      >
        <div className="relative top-20 mx-auto w-96 rounded-md border bg-white p-5 shadow-lg">
          <button
            onClick={onClose}
            className="absolute right-2 top-2 text-gray-600 hover:text-gray-800"
            aria-label="Close modal"
          >
            <span className="text-xl">&times;</span>
          </button>
          <form onSubmit={handleSubmit}>
            <div className="mt-3 text-center">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Add New Dependent
              </h3>
              <div className="mt-2">
                <BaseInputText
                  key="full_name_input"
                  id="full_name"
                  label="Full Name"
                  required={true}
                  placeholder="Full Name"
                  value={formData.full_name}
                  setValue={handleChange("full_name")}
                  error={apiBaseError.getErrors("full_name")?.[0]?.toString()}
                />

                <BaseInputTextArea
                  key="address_input"
                  id="address"
                  label="Address"
                  required={true}
                  placeholder="Address"
                  value={formData.address}
                  setValue={handleChange("address")}
                  error={apiBaseError.getErrors("address")?.[0]?.toString()}
                />

                <DropdownInput
                  id="relation_type"
                  label="Relationship"
                  required={true}
                  options={[
                    { value: "SPOUSE", label: "Spouse" },
                    { value: "CHILD", label: "Child" },
                    { value: "PARENT", label: "Parent" },
                    { value: "OTHER", label: "Other" },
                  ]}
                  selectedValue={formData.relation_type}
                  error={apiBaseError
                    .getErrors("relation_type")?.[0]
                    .toString()}
                  onChange={handleChange("relation_type")}
                />
              </div>
              <div className="items-center px-4 py-3">
                <button
                  className="rounded-lg border-2 bg-[--kinerja-gold] px-0 px-2 font-mono text-gray-500 text-white hover:bg-[--kinerja-gold-hover] md:px-3"
                  type="submit"
                >
                  Save
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div className="h-full w-full">
      <div className="flex min-h-[12%] w-full justify-end px-5 py-5">
        <button
          className="rounded-lg border-1 bg-gray-50 px-5 text-sm font-light text-gray-500 md:mr-5"
          onClick={() => handleClickAdd()} // Attach toggleModal function to the button
        >
          Add New
        </button>
      </div>
      {isModalVisible && <AddNewModal onClose={toggleModal} />}{" "}
      <div className="flex h-[88%] w-[94%] py-5">
        <div id="horizontal" className="w-full overflow-x-scroll">
          <table className="min-w-full overflow-hidden border-b border-gray-200 shadow sm:rounded-lg">
            <TableHeader headers={tableHeaders} action={true} />
            <tbody className="divide-y divide-gray-200 bg-white">
              {dependents.map((dependent, index) => (
                <TableData
                  key={index}
                  dataContent={[
                    dependent.full_name,
                    dependent.address,
                    dependent.relation_type,
                  ]}
                  onClickEdit={() => handleClickEdit(dependent)}
                  onClickDelete={() =>
                    handleClickDelete(dependent.dependent_id)
                  }
                  isProfile={false}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dependent;
