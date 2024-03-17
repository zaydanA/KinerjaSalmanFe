"use client"
import { apiBase } from '@/api';
import { useAuth } from '@/contexts';
import React, { useEffect, useMemo, useState } from 'react'
import BaseCard from '@/components/shares/cards/BaseCard';
import { lib } from '@/lib';
import EmploymentChart from './EmploymentChart';
import GenderDiversityChart from './GenderDiversityChart';
import TodaysAttendanceChart from './TodaysAttendanceChart';
import { IApiAnalyticsData } from '@/types/analytics';
import MyAttendanceStatusChart from './MyAttendanceStatusChart';
import BaseInputButton from '@/components/shares/buttons/BaseInputButton';
import Link from 'next/link';

const Dashboard = () => {
  const { user, isHRDManagerOrDirector, isManager } = useAuth();
  const customLib = lib();
  const canAccess = isHRDManagerOrDirector() || isManager();

  const [myAttendancesData, setMyAttendancesData] = useState<IApiAnalyticsData[]>([]);
  const [genderData, setGenderData] = useState<IApiAnalyticsData[]>([]);
  const [todaysAttendanceData, setTodaysAttendanceData] = useState<IApiAnalyticsData[]>([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        // My attendances
        const res1 = await apiBase().analytics().getMyAttendances();

        if (res1.status === 'success') {
          setMyAttendancesData(res1.data);
        }

        // Gender
        const res2 = await apiBase().analytics().getGenders();

        if (res2.status === 'success') {
          setGenderData(res2.data);
        }

        // Today's attendance
        const res3 = await apiBase().analytics().getTodaysAttendances();

        if (res3.status === 'success') {
          setTodaysAttendanceData(res3.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    if (canAccess) {
      fetchData();
    }
  }, []);

  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className='grid grid-cols-4 gap-4'>
        <div className='col-span-4'>
          <BaseCard>
            <div className='flex flex-col gap-4'>
              <div className='flex flex-col gap-1'>
                <h1 className='font-semibold text-2xl'>Good {customLib.getTimeOfDay(currentDateTime)}, {user?.full_name}!</h1>
                <p className='text-sm font-medium text-gray-500'>It&apos;s {customLib.getDate(currentDateTime)}</p>
              </div>
            </div>
          </BaseCard>
        </div>
        <BaseCard>
          <div className='flex flex-col gap-4'>
            <h1 className='font-semibold text-md'>My Attendance Status</h1>
            <MyAttendanceStatusChart myAttendancesData={myAttendancesData}/>
          </div>
        </BaseCard>
        {canAccess && (
          <>
            <BaseCard>
              <div className='flex flex-col gap-4'>
                <h1 className='font-semibold text-md'>Total Employment</h1>
                {/* <EmploymentChart/> */}
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
                <div className='flex justify-between'>
                  <h1 className='font-semibold text-md'>Today&apos;s Attendance</h1>
                  <Link 
                    className='text-sm hover:underline text-clr-kinerja-gold'
                    href={'/attendance'}
                  >
                    View
                  </Link>
                </div>
                <TodaysAttendanceChart todaysAttendanceData={todaysAttendanceData}/>
              </div>
            </BaseCard>
          </>
        )}
      </div>
    </>
  )
}

export default Dashboard