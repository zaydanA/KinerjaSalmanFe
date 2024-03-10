import React, { useEffect, useRef } from 'react';
import { Chart as ChartJS, defaults }  from 'chart.js/auto';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import { IApiGenderData } from '@/types/employee';

defaults.maintainAspectRatio = false;
defaults.responsive = true;

defaults.plugins.legend.display = false;

interface Props {
  genderData: IApiGenderData[]
}

const GenderDiversityChart: React.FC<Props> = ({ genderData }) => {
  const colorData = ["#009BDE", "EE8CA5"];

  return(
    <>
      <div>
        <Doughnut
          data={{
            labels: genderData.map((data) => data.label),
            datasets: [
              {
                label: "Count",
                data: genderData.map((data) => data.value),
                backgroundColor: colorData.map((data) => data),
              }
            ]
          }}
        />
      </div>
      <div className='flex flex-col gap-4 px-10 text-xs mt-2'>
        {genderData.map((data, index) => (
          <div key={index} className='flex justify-between items-center'>
            <div className='flex gap-2 items-center'>
              <span className={`round-lg bg-[${colorData[index]}] w-2 h-2 rounded-sm`}>&nbsp;</span>
              <p className='font-semibold'>{data.label}</p>
            </div>
            <div className='flex gap-4 items-center text-gray-500 font-normal'>
              <p>{data.value}</p>
              <p>{data.percentage}%</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default GenderDiversityChart;