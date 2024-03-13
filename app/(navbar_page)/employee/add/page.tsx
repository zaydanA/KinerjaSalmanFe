"use client"
import React from "react";
import AddEmployee from "../../../../components/privates/employees/add/AddEmployee";
import ProtectedRoute from "@/app/Rbac";

const page = () => {

    return (
        <ProtectedRoute allowedDept={[1,2]} allowedPos={[1,2]}>
            <AddEmployee/>
        </ProtectedRoute>
    )
}

export default page;