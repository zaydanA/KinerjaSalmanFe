import React, {ChangeEvent, useState} from "react";
import TableHeader from "../../tables/TableHeader";
import TableData from "../../tables/TableData";
import BaseInputText from "../../inputs/BaseInputText";
import DropdownInput from "../../inputs/DropdownInput";

const tableHeaders = [
    "Name",
    "Relationships",
    "Birtdate",
    "ID Number",
    "Marital Status",
    "Gender",
    "Job",
    "Religion"
];

const usersData = [
    ["John Doe", "Brother", "1990-01-01", "123456789", "Married", "Male", "Engineer", "Christian"],
    ["John Doe", "Brother", "1990-01-01", "123456789", "Married", "Male", "Engineer", "Christian"],
  ];


const Family = (props:any)=>{
    const [isModalVisible, setIsModalVisible] = useState(false);

    const handleClickEdit = () => {

    };
    const handleClickDelete = () => {

    };

    const toggleModal = () => setIsModalVisible(!isModalVisible);
    
    interface AddNewModalProps {
        onClose: () => void;
    }
      
    const AddNewModal: React.FC<AddNewModalProps> = ({ onClose }) => {
        const [formData, setFormData] = useState({
            name: '',
            relationship: '',
            birthdate: '',
            idNumber: '',
            maritalStatus: '',
            gender: '',
            job: '',
            religion: '',
        });
    
        const relationships = ["Parent", "Sibling", "Child", "Spouse", "Other"];
        const relationshipOptions = [
            { value: '', label: 'Select Relationship' },
            { value: 'parent', label: 'Parent' },
            { value: 'sibling', label: 'Sibling' },
            // Add more options as needed
        ];
        const maritalStatuses = ["Single", "Married", "Divorced", "Widowed"];
        const maritalStatusOptions = [
            { value: '', label: 'Select Marital Status' },
            { value: 'single', label: 'Single' },
            { value: 'married', label: 'Married' },
            // Add more options as needed
        ];
        const genders = ["Male", "Female", "Other"];
        const genderOptions = [
            { value: '', label: 'Select Gender' },
            { value: 'male', label: 'Male' },
            { value: 'female', label: 'Female' },
            // Add more options as needed
        ];
        const religions = ["Christianity", "Islam", "Hinduism", "Buddhism", "Other"];
        const religionOptions = [
            { value: '', label: 'Select Religion' },
            { value: 'islam', label: 'Islam' },
            { value: 'other', label: 'Other' },
            // Add more options as needed
        ];
    
        const handleChange = (name: string) => (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
            setFormData({ ...formData, [name]: event.target.value });
        };
        
    
        const handleSubmit = (e: { preventDefault: () => void; }) => {
            e.preventDefault();
            console.log(formData); // Here you would handle form submission
            onClose();
        };
    
        return (
            <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="my-modal">
                <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                    <form onSubmit={handleSubmit}>
                        <div className="mt-3 text-center">
                            <h3 className="text-lg leading-6 font-medium text-gray-900">Add New Family Member</h3>
                            <div className="mt-2">
                                <BaseInputText
                                    id="name"
                                    label="Full name"
                                    type="text"
                                    placeholder="Enter name"
                                    value={formData.name}
                                    setValue={handleChange('name')}
                                />
                                {/* Replace with Dropdown Component */}
                                <DropdownInput
                                    id="relationship"
                                    label="Relationship"
                                    options={relationshipOptions}
                                    selectedValue={formData.relationship}
                                    onChange={handleChange('relationship')}
                                />
                                <BaseInputText
                                    id="date"
                                    label="birthdate"
                                    type="date"
                                    // placeholder="Select birthdate"
                                    value={formData.birthdate}
                                    setValue={handleChange('birthdate')}
                                />
                                <BaseInputText
                                    id="idNumber"
                                    label="ID Number"
                                    type="text"
                                    // placeholder="Enter ID Number"
                                    value={formData.idNumber}
                                    setValue={handleChange('idNumber')}
                                />
                                <DropdownInput
                                    id="maritalStatus"
                                    label="MaritalStatus"
                                    options={maritalStatusOptions}
                                    selectedValue={formData.maritalStatus}
                                    onChange={handleChange('maritalStatus')}
                                />
                                <DropdownInput
                                    id="gender"
                                    label="Gender"
                                    options={genderOptions}
                                    selectedValue={formData.gender}
                                    onChange={handleChange('gender')}
                                />
                                <BaseInputText
                                    id="job"
                                    label="Job"
                                    type="text"
                                    // placeholder="Enter Job"
                                    value={formData.job}
                                    setValue={handleChange('job')}
                                />
                                <DropdownInput
                                    id="religion"
                                    label="Religion"
                                    options={religionOptions}
                                    selectedValue={formData.religion}
                                    onChange={handleChange('religion')}
                                />
                            </div>
                            <div className="items-center px-4 py-3">
                                <button 
                                  type="submit"
                                  className="px-4 py-2 bg-green-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-300"
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
    
    

    return(
        <>
            <div className="flex w-full min-h-[12%] py-5 justify-end">
                <button 
                  className="border-1 rounded-lg px-5 md:mr-5 bg-gray-50 font-light text-gray-500 text-sm"
                  onClick={toggleModal} // Attach toggleModal function to the button
                >
                    Add New
                </button>
            </div>

            {isModalVisible && <AddNewModal onClose={toggleModal} />} {/* Conditionally render the modal */}

            <div className="flex w-full h-[88%] py-5 px-4">
                <div id="horizontal" className="overflow-x-scroll w-full">
                    <table className="min-w-full shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                        <TableHeader headers={tableHeaders} action={true} />
                        <tbody className="bg-white divide-y divide-gray-200">
                            {usersData.map((userData, index) => (
                            <TableData
                                key={index}
                                dataContent={userData}
                                onClickEdit={handleClickEdit}
                                onClickDelete={handleClickDelete}
                                isProfile={false} 
                            />
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}


export default Family;