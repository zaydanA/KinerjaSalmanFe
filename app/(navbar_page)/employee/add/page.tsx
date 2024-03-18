"use client"
import React from "react";
import AddEmployee from "../../../../components/privates/employees/add/AddEmployee";
import ProtectedRoute from "@/app/Rbac";

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