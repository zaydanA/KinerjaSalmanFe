"use client"
import React from "react";
import DetailEmployee from "@/components/privates/sidebar/detailEmployee/DetailEmployee";
import { useAuth } from "@/contexts";


const page = ()=>{

    const {user} = useAuth()

    return (
        <DetailEmployee user={user}></DetailEmployee>
    )
}
export default page;