"use client"
import { apiBase } from '@/api';
import { IApiAttendancePayload } from '@/types/attendance';
import BaseCard from '@/components/shares/cards/BaseCard';
import React, { useEffect, useState } from 'react'
import { lib } from '@/lib';
import BaseInputText from '@/components/shares/inputs/BaseInputText';
import { useInput } from '@/hooks/useInput';
import { IApiBaseError } from '@/types/http';
import BaseInputButton from '@/components/shares/buttons/BaseInputButton';

const LiveAttendance = () => {
  const [attendanceData, setAttendanceData] = useState<IApiAttendancePayload>();
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const customLib = lib();

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
        // My attendances
        const res = await apiBase().attendance().getTodaySelf();

        if (res.status === 'success') {
          setAttendanceData(res.data);
        }
      } catch (error) {
        console.error(error);
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
          // setError(error.message);
          // TODO: toast
        }
      );
    } else {
      // setError("Geolocation is not supported by this browser.");
      // TODO: toast
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
        }
      } else {
        // TODO: toast
      }
    } catch (error) {
      apiBaseError.set(error);
      // TODO: toast
    }
  }

  return (
   <>
    <div className="mx-auto">
      <h2 className="text-lg mb-1 text-gray-500">Attendance</h2>
      <h1 className="text-2xl font-bold mb-4">Live Attendance</h1>

      <div className='flex items-center justify-center'>
        <div className='max-w-xl w-full'>
          <BaseCard outline={true} padding={false}>
            <div className='block text-center'>
              <div className='p-6 border-b-1'>
                <p className='text-2xl font-semibold'>{formattedTime}</p>
                <p className='text-xs'>{formattedDate}</p>
              </div>
              <div className='p-6'>
                <p className='font-semibold'>{attendanceData?.working_hours.message}</p>
                <p className='text-sm'>{workingHours}</p>

                <div className='mt-6 grid grid-cols-2 gap-6'>
                  <div className='col-span-2'>
                    <BaseInputText
                      id="notes"
                      label="Notes"
                      placeholder="Place your notes here"
                      type="text"
                      required={false}
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
        </div>
      </div>
    </div>
   </>
  )
}

export default LiveAttendance