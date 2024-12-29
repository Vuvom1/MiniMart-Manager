import React from 'react';
import { Chart, registerables } from 'chart.js';
import { Bar } from 'react-chartjs-2';

Chart.register(...registerables);

interface BarChartDataset {
  label: string;
  data: number[];
  backgroundColor?: string;
}

interface BarChartProps {
  data: {
    barDatasets: BarChartDataset[];
    labels: string[];
  };
  height?: string,
  width?: string,
}

const BarChart: React.FC<BarChartProps> = ({ data }) => {
  const { barDatasets, labels } = data;

  const defaultBackgroundColor = '#FCC737';

  const datasetsWithDefaultColor = barDatasets.map(dataset => ({
    ...dataset,
    backgroundColor: dataset.backgroundColor || defaultBackgroundColor,
  }));

  const options = {
    responsive: true,
    scales: {
      x: {
        stacked: true,
        title: {
          display: true,
          text: 'Categories',
        },

      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Stock Level',
        },
      },
    },
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
    },
    barThickness: 20,
    elements: {
      bar: {
        borderRadius: 4,
      },
    },
  };

  return (
    <Bar
      data={{
        labels: labels,
        datasets: datasetsWithDefaultColor,
      }}
      options={options}
    />
  );
};

export default BarChart;
