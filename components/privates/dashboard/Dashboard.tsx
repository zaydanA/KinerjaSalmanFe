"use client"
import { apiBase } from '@/api';
import { IApiBaseError, IApiBaseResponse } from '@/types/http';
import { IApiBaseUserSelf } from '@/types/user';
import React, { useEffect, useState } from 'react'

function Dashboard() {
  const [user, setUser] = useState<IApiBaseResponse<IApiBaseUserSelf>>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await apiBase().user().self();
        console.log(user);
        setUser(user);
  
      } catch (error) {
        apiBaseError.set(error);
      }
    };
    fetchData();
  }, []);

  const apiBaseError = apiBase().error<IApiBaseError>();

  return (
    <>
      {user?.data.full_name}
    </>
  )
}

export default Dashboard