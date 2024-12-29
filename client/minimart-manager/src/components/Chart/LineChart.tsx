import React from 'react';
import { Chart, registerables } from 'chart.js';
import { Line } from 'react-chartjs-2';

Chart.register(...registerables);

interface LineChartDataset {
  label: string;
  data: number[];
  backgroundColor: string;
  borderColor: string;
}

interface LineChartProps {
  data: {
    datasets: LineChartDataset[];
    labels: string[];
  };
  height?: string,
  width?: string,
}

const LineChart: React.FC<LineChartProps> = ({height = '100%', width = '100%', data }) => {
  const { datasets, labels } = data;

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
        position: 'bottom' as const,
        labels: {
          usePointStyle: true,
          pointStyle: 'circle',
        },
      },
    },
  };

  return (
    <div  style={{ width: width, height: height }} className='p-4'>
      <Line
        data={{
          labels: labels,
          datasets: datasets,
        }}
        
        options={options}
      />
    </div>
  );
};

export default LineChart;
