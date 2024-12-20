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
  backgroundColors?: string[];
}

const DoughnutChart: React.FC<DoughnutChartProps> = ({ data, width = 150, height = 150, backgroundColors }) => {
  const totalValue = data.values.reduce((acc, value) => acc + value, 0);
  const defaultColors = [
    'rgba(240, 240, 0, 0.8)',
    'rgba(0, 92, 230, 0.6)',
    'rgba(0, 220, 0, 0.6)',     
    'rgba(242, 242, 242, 0.6)', 
    'rgba(255, 99, 132, 0.6)', // red
    'rgba(54, 162, 235, 0.6)', // blue
    'rgba(75, 192, 192, 0.6)', // teal
    'rgba(153, 102, 255, 0.6)', // purple
    'rgba(255, 159, 64, 0.6)', // orange
    'rgba(255, 206, 86, 0.6)', // yellow
    'rgba(201, 203, 207, 0.6)', // grey
  ];

  const topEntities = data.values
    .map((value, index) => ({ label: data.labels[index], value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 8);

  const otherEntities = data.values
    .map((value, index) => ({ label: data.labels[index], value }))
    .sort((a, b) => b.value - a.value)
    .slice(8);

  const otherTotal = otherEntities.reduce((acc, entity) => acc + entity.value, 0);

  const chartData = {
    labels: [...topEntities.map(entity => entity.label), 'Others'],
    datasets: [
      {
        data: [...topEntities.map(entity => entity.value), otherTotal],
        backgroundColor: backgroundColors || defaultColors,
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

  return (
    <>
      <div className="flex flex-col items-center px-12">
        <Doughnut data={chartData} options={options} width={width} height={height} />
      </div>
      <div className="flex flex-col mt-2">
        {chartData.labels.map((label, index) => {
          const percentage = ((chartData.datasets[0].data[index] / totalValue) * 100).toFixed(2);
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
