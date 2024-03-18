import React from 'react';
import { defaults }  from 'chart.js/auto';
import { Pie } from 'react-chartjs-2';
import { IApiAnalyticsData } from '@/types/analytics';

defaults.maintainAspectRatio = false;
defaults.responsive = true;

defaults.plugins.legend.display = false;

interface Props {
  todaysAttendanceData: IApiAnalyticsData[]
}

const TodaysAttendanceChart: React.FC<Props> = ({ todaysAttendanceData }) => {
  const colorDataReal = ["#005FBF", "#009BDE", "#F96D01", "#5B37D4", "#8FB140"]
  const colorData = [
    "bg-graph-dark-blue",
    "bg-graph-blue",
    "bg-graph-orange",
    "bg-graph-purple",
    "bg-graph-green",
  ]
  
  return(
    <div className='h-60 overflow-y-auto flex flex-col gap-4'>
      <div>
        <Pie
          data={{
            labels: todaysAttendanceData.map((data) => data.label),
            datasets: [
              {
                label: "Count",
                data: todaysAttendanceData.map((data) => data.value),
                backgroundColor: colorDataReal.map((data) => data),
              }
            ]
          }}
        />
      </div>
      <div className='flex flex-col gap-3 text-xs mt-2'>
        {todaysAttendanceData.map((data, index) => (
          <>
            {index !== 0 && (
              <hr className='w-full border-0.5 border-gray-300' />
            )}
            <div key={index} className='grid grid-cols-2 items-center'>
              <div className='flex gap-2 items-center'>
                <span className={`round-lg ${colorData[index]} w-2 h-2 rounded-sm`}>&nbsp;</span>
                <p className='font-semibold'>{data.label}</p>
              </div>
              <div className='flex justify-end items-center text-gray-500 font-normal'>
                <p className='text-end mr-6'>{data.value}</p>
                <p className='w-10 text-start'>{data.percentage}%</p>
              </div>
            </div>
          </>
        ))}
      </div>
    </div>
  );
}

export default TodaysAttendanceChart;