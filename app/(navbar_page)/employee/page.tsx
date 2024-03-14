import ProtectedRoute from "@/app/Rbac";
import EmployeeList from "@/components/privates/employees/EmployeeList";

import React from "react";

const page = () => {
  return (
    <ProtectedRoute allowedPos={[1, 2]}>
      <EmployeeList />
    </ProtectedRoute>
  );
};
export default page;
