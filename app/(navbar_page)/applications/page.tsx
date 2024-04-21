import ApplicationList from "@/components/privates/apply/ApplicationList";
import ProtectedRoute from "@/app/Rbac";
import React from "react";

const page = () => {
  return (
    <ProtectedRoute allowedPos={[1, 2]}>
    <div className="rounded-md border bg-white px-12 py-10 shadow-md max-sm:p-2">
      <ApplicationList />
    </div>
    </ProtectedRoute>
  );
};

export default page;