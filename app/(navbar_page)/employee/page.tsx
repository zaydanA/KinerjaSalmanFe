import EmployeeList from "@/components/privates/employees/EmployeeList";

import React from "react";

const page = ()=>{

  return (
    <div className="flex h-full m-10 p-4 flex-col gap-5 border bg-white rounded-lg">
      <EmployeeList />
    </div>
  );
};
export default page;
