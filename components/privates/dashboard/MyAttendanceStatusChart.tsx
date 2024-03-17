import React from 'react';
import { defaults }  from 'chart.js/auto';
import { Doughnut } from 'react-chartjs-2';
import { IApiAnalyticsData } from '@/types/analytics';

defaults.maintainAspectRatio = false;
defaults.responsive = true;

defaults.plugins.legend.display = false;

interface Props {
  myAttendancesData: IApiAnalyticsData[]
}

const MyAttendanceStatusChart: React.FC<Props> = ({ myAttendancesData }) => {
  const colorDataReal = ["#009BDE", "#d1d5db"]
  const colorData = [
    "bg-graph-blue",
    "bg-gray-300",
  ]

  return(
    <div className='h-60 overflow-y-auto flex flex-col gap-4'>
      <div>
        <Doughnut
          data={{
            labels: myAttendancesData.map((data) => data.label),
            datasets: [
              {
                label: "Count",
                data: myAttendancesData.map((data) => data.value),
                backgroundColor: colorDataReal.map((data) => data)
              }
            ]
          }}
          options={{
            circumference: 180,
            rotation: 270,
            cutout: '75%',
            plugins: {
              tooltip: {
                filter: (tooltipItem) => {
                  return tooltipItem.dataIndex === 0
                }
              }
            }
          }}
        />
      </div>
      <div className='flex flex-col gap-3 text-xs mt-2'>
        {myAttendancesData.map((data, index) => (
          <>
            {index === 0 && (
              <div key={index} className='grid grid-cols-2 items-center'>
              <div className='flex gap-2 items-center'>
                <span className={`round-lg ${colorData[index]} w-2 h-2 rounded-sm`}>&nbsp;</span>
                <p className='font-semibold'>{data.label}</p>
              </div>
              <div className='flex justify-end items-center text-gray-500 font-normal'>
                <p className='w-10 text-start'>{data.percentage}%</p>
              </div>
            </div>
            )}
          </>
        ))}
      </div>
    </div>
  );
}

export default MyAttendanceStatusChart;