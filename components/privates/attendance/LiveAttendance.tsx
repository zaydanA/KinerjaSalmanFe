"use client"
import { apiBase } from '@/api';
import { IApiAttendanceData, IApiAttendancePayload } from '@/types/attendance';
import BaseCard from '@/components/shares/cards/BaseCard';
import React, { useEffect, useState } from 'react'
import { lib } from '@/lib';
import BaseInputText from '@/components/shares/inputs/BaseInputText';
import { useInput } from '@/hooks/useInput';
import { IApiBaseError } from '@/types/http';
import BaseInputButton from '@/components/shares/buttons/BaseInputButton';
import { useAuth } from '@/contexts';
import { LuCalendarClock } from "react-icons/lu";
import { toast } from 'react-toastify';
import BaseInputTextArea from '@/components/shares/inputs/BaseInputTextArea';
const LiveAttendance = () => {
  const [attendanceData, setAttendanceData] = useState<IApiAttendancePayload>();
  const [logData, setLogData] = useState<IApiAttendanceData[]>();
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const customLib = lib();
  const { user } = useAuth();

  const [notes, setNotes] = useInput();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formattedTime = currentDateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const formattedDate = customLib.getDate(currentDateTime, true);

  let workingHours;
  if (attendanceData?.working_hours.start && attendanceData.working_hours.end) {
    workingHours = `${attendanceData?.working_hours.start} - ${attendanceData?.working_hours.end}`;
  } else {
    workingHours = null;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Attendances
        const res = await apiBase().attendance().getTodaySelf();

        if (res.status === 'success') {
          setAttendanceData(res.data);
        }

        // Log
        if (user?.user_id) {
          const res_log = await apiBase().attendance().getUserAttendance(
            user.user_id,
            true
          );

          if (res_log.status === 'success') {
            setLogData(res_log.data.data);
          }
        }

        setNotes(res.data.attendance.notes);
      } catch (error) {
        // console.error(error);
      }
    };

    fetchData();
  }, []);

  const apiBaseError = apiBase().error<IApiBaseError>();

  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);

  useEffect(() => {
    // Get the user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        error => {
          apiBaseError.set(error);
          toast.error(apiBaseError.getMessage());
          apiBaseError.clear();
        }
      );
    } else {
      toast.error("Geolocation is not supported by this browser.");
    }
  }, []);

  const handleClocks = async (event_type: "clock_in" | "clock_out") => {
    try {
      if (latitude && longitude) {
        const res = await apiBase().attendance().clocksAttendanceToday({
          event_type: event_type,
          lat: latitude,
          long: longitude,
          notes: notes
        });

        if (res.status === "success") {
          setAttendanceData(res.data);
          toast.success(res.message);
          apiBaseError.clear();
        }
      }
    } catch (error) {
      apiBaseError.set(error);
      toast.error(apiBaseError.getMessage());
    }
  }

  return (
   <>    
    <div className="mx-auto">
      <h2 className="text-lg mb-1 text-gray-500">Attendance</h2>
      <h1 className="text-2xl font-bold mb-4">Live Attendance</h1>

      <div className='flex items-center justify-center'>
        <div className='flex flex-col max-w-xl w-full gap-8'>
          <BaseCard outline={true} padding={false}>
            <div className='block text-center'>
              <div className='p-6 border-b-1'>
                <p className='text-2xl font-semibold'>{formattedTime}</p>
                <p className='text-xs'>{formattedDate}</p>
              </div>
              <div className='p-6'>
                <p className='font-semibold'>{attendanceData?.working_hours.message}</p>
                <p className='text-sm'>{workingHours}</p>

                <p className='text-sm mt-2'>Status: <b className='font-semibold'>{customLib.toLabelCase(attendanceData?.attendance ? attendanceData.attendance.attendance_type : 'Null', false)}</b></p>

                <div className='mt-6 grid grid-cols-2 gap-6'>
                  <div className='col-span-2'>
                    <BaseInputTextArea
                      id="notes"
                      label="Notes"
                      placeholder="Place your notes here"
                      required={false}
                      disabled={!attendanceData?.can_clock_in && !attendanceData?.can_clock_out}
                      value={notes}
                      error={apiBaseError.getErrors('notes')?.[0].toString()}
                      setValue={(e) => setNotes(e.target.value)}
                    />
                  </div>

                  <BaseInputButton
                    text="Clock In"
                    disabled={!attendanceData?.can_clock_in}
                    onClick={() => handleClocks("clock_in")}
                  />
                  <BaseInputButton
                    text="Clock Out"
                    disabled={!attendanceData?.can_clock_out}
                    onClick={() => handleClocks("clock_out")}
                  />
                </div>
              </div>
            </div>
          </BaseCard>

          <div>
            <h3 className="text-md font-semibold mb-4">Attendance Log This Week</h3>
            <div className='max-h-5/6 overflow-y-auto'>
              {logData ? logData.map((logItem, index) => (
                <div key={index}>
                  <BaseCard
                    outline={true}
                  >
                    <p>Date: {customLib.formatDate(logItem.date)}</p>
                    <p>Type: {logItem.attendance_type}</p>
                  </BaseCard>
                </div>
              ))
            :
              <div className='w-full flex flex-col items-center text-black gap-5'>
                <LuCalendarClock className='text-8xl text-[--kinerja-gold]'/>
                <div className='flex flex-col items-center gap-1'>
                  <h3 className='font-semibold text-md'>
                    No attendance log this week
                  </h3>
                  <p className='text-sm text-gray-500'>
                    Your Clock In/Out activity will show up here.
                  </p>
                </div>
              </div>
            }
            </div>
          </div>
        </div>
      </div>
    </div>
   </>
  )
}

export default LiveAttendance