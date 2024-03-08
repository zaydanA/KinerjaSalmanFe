import EmployeeList from "@/components/privates/employees/EmployeeList";

import React from "react";
import Employee from "./Employee";

const page = ()=>{

    return (        
        <div className="w-full">
          <Employee>

          </Employee>
  return (
    <div className="flex h-full m-10 p-4 flex-col gap-5 border bg-white rounded-lg">
      <div className="flex justify-between">
        <h1 className=" text-xl font-bold">Employees</h1>
        <button>Add Employee</button>
      </div>

      <div><EmployeeList /></div>

      <div>{/* <Pagination /> */}</div>
    </div>
  );
};
export default page;
