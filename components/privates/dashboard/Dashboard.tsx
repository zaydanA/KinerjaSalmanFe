"use client"
import { apiBase } from '@/api';
import { useAuth } from '@/contexts';
import { IApiBaseError, IApiBaseResponse } from '@/types/http';
import React, { useEffect, useMemo, useState } from 'react'
import BaseCard from '@/components/shares/cards/BaseCard';
import { lib } from '@/lib';
import EmploymentChart from './EmploymentChart';
import GenderDiversityChart from './GenderDiversityChart';
import { IApiGenderData } from '@/types/employee';

const Dashboard = () => {
  const { user } = useAuth();
  const apiBaseError = apiBase().error<IApiBaseError>();
  const customLib = lib();

  const [genderData, setGenderData] = useState<IApiGenderData[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await apiBase().analytics().getGenders();

        if (res.status === 'success') {
          setGenderData(res.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className='grid grid-cols-3 gap-4'>
        <div className='col-span-3'>
          <BaseCard>
            <div className='flex flex-col gap-4'>
              <div className='flex flex-col gap-1'>
                <h1 className='font-semibold text-2xl'>Good {customLib.getTimeOfDay()}, {user?.full_name}!</h1>
                <p className='text-sm font-medium text-gray-500'>It&apos;s {customLib.getDate()}</p>
              </div>
            </div>
          </BaseCard>
        </div>
        <BaseCard>
          <div className='flex flex-col gap-4'>
            <h1 className='font-semibold text-md'>Total Employment</h1>
            <EmploymentChart/>
          </div>
        </BaseCard>
        <BaseCard>
          <div className='flex flex-col gap-4'>
            <h1 className='font-semibold text-md'>Gender Diversity</h1>
            <GenderDiversityChart genderData={genderData}/>
          </div>
        </BaseCard>
        <BaseCard>
          <div className='flex flex-col gap-4'>
            <h1 className='font-semibold text-md'>Today&apos;s Attendance</h1>
          </div>
        </BaseCard>
      </div>
    </>
  )
}

export default Dashboard