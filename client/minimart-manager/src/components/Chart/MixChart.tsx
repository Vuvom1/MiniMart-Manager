import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, Title, Tooltip, Legend, PointElement, LineController, BarController } from 'chart.js';
import { Chart } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    PointElement,
    LineController,
    BarController
);

interface MixChartProps {
    labels: string[];
    datasets: any[];
}

const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'bottom' as const,
            labels: {
                usePointStyle: true,
                pointStyle: 'circle',
            },
        },
    },
    scales: {
        x: {
            beginAtZero: true,
        },
        y: {
          beginAtZero: true,
        },
      },
};

const MixChart: React.FC<MixChartProps> = ({ labels = [], datasets = [] }) => {

    const data = {
        labels: labels,
        datasets: [
            {
                type: 'line' as const,
                label: datasets[0]?.label || '',
                data: datasets[0]?.data || [],
                fill: false,
                borderColor: '#FF7F3E',
                tension: 0.3, 
            },
            {
                type: 'bar' as const,
                label: datasets[1]?.label || '',
                data: datasets[1]?.data || [],
                backgroundColor: '#80C4E9', 
                borderRadius: 2,
                borderSkipped: false,
                barThickness: 20,
            },
            {
                type: 'bar' as const,
                label: datasets[2]?.label || '',
                data: datasets[2]?.data || [],
                backgroundColor: '#604CC3', 
                borderRadius: 2,
                borderSkipped: false,
                barThickness: 20,
            },
        ],
    };

    return <Chart type='bar' data={data} options={options} />;
};

export default MixChart;
