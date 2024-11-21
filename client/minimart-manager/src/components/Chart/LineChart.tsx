import React from 'react';
import { Chart, registerables } from 'chart.js';
import { Line } from 'react-chartjs-2';

Chart.register(...registerables);

interface LineChartDataset {
  label: string;
  data: number[];
  backgroundColor: string;
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
      },
    },
  };

  return (
    <div  style={{ width: width, height: height }} className='pb-16 pt-2 px-8'>
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
