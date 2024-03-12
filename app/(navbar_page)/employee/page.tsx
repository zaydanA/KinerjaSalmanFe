import EmployeeList from "@/components/privates/employees/EmployeeList";

import React from "react";

const page = () => {
  return (
    <div className="mx-10  flex h-full flex-col gap-5 rounded-lg border bg-white p-4 max-lg:m-5 max-lg:p-2 max-md:m-0 max-md:gap-2 max-md:p-1">
      <EmployeeList />
    </div>
  );
};
export default page;
