"use client"
import React, { useState } from "react";
import Pagination from "@/components/shares/pagination/Pagination";
import AddEmployee from "../../../../components/privates/employees/add/AddEmployee";
import ProtectedRoute from "@/app/Rbac";
import { useAuth } from "@/contexts";

const page = () => {
    const{user} = useAuth();
    return (
        <ProtectedRoute allowedDept={[1,2,user?.dept.dept_id]} allowedPos={[1,2]}>
            <AddEmployee/>
        </ProtectedRoute>
    )
}

export default page;