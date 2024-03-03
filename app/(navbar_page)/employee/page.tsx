// import EmployeeList from "@/components/privates/employees/EmployeeList";

import React from "react";
import Employee from "./Employee";

const page = ()=>{

    return (        
        <div className="w-full">
          <Employee>

          </Employee>
  return (
    <div className="flex h-full m-10 p-4 flex-col gap-5 border">
      <div className="flex justify-between">
        <h1>Employees</h1>
        <button>Add Employee</button>
      </div>

      <div className="flex justify-between">
        <div className="flex gap-5">
          <p>Filter</p>
          <p>Sort</p>
        </div>
        <p>Search</p>
      </div>

      <div>{/* <EmployeeList /> */}</div>

      <div>{/* <Pagination /> */}</div>
    </div>
  );
};
export default page;
