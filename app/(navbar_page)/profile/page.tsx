"use client"
import { useEffect, useState } from 'react';
import React from "react";
import DetailEmployee from "@/components/privates/sidebar/detailEmployee/DetailEmployee";
import { apiBase } from "@/api";
import { useAuth } from "@/contexts";
import { usePathname } from "next/navigation";
import { BloodType, Gender, LastEducation, MaritalStatus } from '@/enums/enums';
import { IUserPersonalData } from '@/types/user';

const page = ()=>{

    const {user} = useAuth()

    return (
        <DetailEmployee user={user}></DetailEmployee>
    )
}
export default page;