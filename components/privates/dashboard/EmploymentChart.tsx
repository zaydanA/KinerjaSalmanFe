import React, { useEffect, useRef } from 'react';
import { Chart as ChartJS, defaults }  from 'chart.js/auto';
import { Bar, Doughnut, Line } from 'react-chartjs-2';

defaults.maintainAspectRatio = false;
defaults.responsive = true;

defaults.plugins.legend.display = false;

const EmploymentChart = () => {

  const genderData = [
    {
      "label": "Male",
      "value": 32
    },
    {
      "label": "Female",
      "value": 20
    }
  ]

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
                backgroundColor: [
                  "#009BDE",
                  "#EE8CA5",
                ],
              }
            ]
          }}
        />
      </div>
    </>
  );
}

export default EmploymentChart