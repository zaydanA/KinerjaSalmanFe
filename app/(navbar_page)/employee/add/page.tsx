import React from "react";
import ProtectedRoute from "@/app/Rbac";
import AddEmployee from "@/components/privates/employees/add/AddEmployee";

const page = () => {
    return (
        <ProtectedRoute allowedPos={[1, 2]}>
            <div className="py-10 px-12">
                <AddEmployee/>
            </div>
        </ProtectedRoute>
    )
}

export default page;