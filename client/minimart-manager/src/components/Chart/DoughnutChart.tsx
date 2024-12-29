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
  showLegend?: boolean;
}

const DoughnutChart: React.FC<DoughnutChartProps & { legendPosition?: 'top' | 'left' | 'bottom' | 'right' }> = ({ data, backgroundColors, legendPosition = 'bottom', showLegend = true }) => {
  const defaultColors = [
    '#0D9276',
    'rgba(0, 92, 230, 0.6)',
    'rgba(0, 220, 0, 0.6)',     
    'rgba(242, 242, 242, 0.6)', 
    'rgba(255, 99, 132, 0.6)', 
    'rgba(54, 162, 235, 0.6)', 
    'rgba(75, 192, 192, 0.6)', 
    'rgba(153, 102, 255, 0.6)', 
    'rgba(255, 159, 64, 0.6)', 
    'rgba(255, 206, 86, 0.6)', 
    'rgba(201, 203, 207, 0.6)', 
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
        cutout: '60%',
      },
    ],
  };

  const options = {
    plugins: {
      tooltip: {
        enabled: true,
      },
      legend: {
        display: showLegend,
        position: legendPosition,
        labels: {
          padding: 20,
          usePointStyle: true,
          pointStyle: 'circle',
        },
      },
    },
  };

  return (
    <>
     
        <Doughnut data={chartData} options={options} />
    </>
  );
};

export default DoughnutChart;
