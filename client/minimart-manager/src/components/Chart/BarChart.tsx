import React from 'react';
import { Chart, registerables } from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';

Chart.register(...registerables);

interface BarChartDataset {
  label: string;
  data: number[];
  backgroundColor: string;
}

interface BarChartProps {
  data: {
    barDatasets: BarChartDataset[];
    labels: string[];
  };
  height?: string,
  width?: string,
}

const BarChart: React.FC<BarChartProps> = ({height = '300px', width = '500px', data }) => {
  const { barDatasets, labels } = data;

  const options = {
    responsive: true,
    scales: {
      x: {
        stacked: true,
      },
      y: {
        beginAtZero: true,
        stacked: true,
      },
    },
    plugins: {
      legend: {
        position: 'right' as const,
      },
    },
  };

  return (
    <div  style={{ width: width, height: height }} className='p-4 shadow-lg'>
      <Bar 
        data={{
          labels: labels,
          datasets: barDatasets,
        }}
        
        options={options}
      />
    </div>
  );
};

export default BarChart;
