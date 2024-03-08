"use client"
import { apiBase } from '@/api';
import { useAuth } from '@/contexts';
import { IApiBaseError, IApiBaseResponse } from '@/types/http';
import React, { useEffect, useState } from 'react'

function Dashboard() {
  const { user } = useAuth();
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const user = await apiBase().user().self();
  //       console.log(user);
  //       setUser(user);
  
  //     } catch (error) {
  //       apiBaseError.set(error);
  //     }
  //   };
  //   fetchData();
  // }, []);

  const apiBaseError = apiBase().error<IApiBaseError>();

  return (
    <>
      {user?.full_name}
    </>
  )
}

export default Dashboard