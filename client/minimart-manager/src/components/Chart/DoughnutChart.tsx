import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';

Chart.register(ArcElement, Tooltip, Legend);

interface DoughnutChartProps {
  data: {
    labels: string[];
    values: number[];
  };
  width?: number;
  height?: number;
}

const DoughnutChart: React.FC<DoughnutChartProps> = ({ data, width = 150, height = 150 }) => {
  const totalValue = data.values.reduce((acc, value) => acc + value, 0);
  const chartData = {
    labels: data.labels,
    datasets: [
      {
        data: data.values,
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
        ],
        borderColor: 'rgba(255, 255, 255, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      tooltip: {
        enabled: false,
      },
      legend: {
        display: false,
      },
    },
  };

  return (<>
    <div className="flex flex-col items-center px-12">
      <Doughnut data={chartData} options={options} width={width} height={height} />
    </div>
    <div className="flex flex-col mt-2 ">
        {data.labels.map((label, index) => {
          const percentage = ((data.values[index] / totalValue) * 100).toFixed(2);
          return (
            <div key={index} className="flex justify-between mb-1">
              <div className='flex'>
                <span
                  className="block w-4 h-4 rounded-full mr-2"
                  style={{ backgroundColor: chartData.datasets[0].backgroundColor[index] }}
                > </span>
                <span>
                  {label}
                </span>
              </div>

              <span>{percentage}%</span>
            </div>
          );
        })}
      </div>
  </>

  );
};

export default DoughnutChart;
