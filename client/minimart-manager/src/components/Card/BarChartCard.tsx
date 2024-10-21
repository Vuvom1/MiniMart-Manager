import React from 'react';
import BarChart from '../Chart/BarChart';

interface BarChartCardProps {
  data: {
    labels: string[];
    barDatasets: {
      label: string;
      data: number[];
      backgroundColor: string;
    }[];
  };
  width?: string,
  height?: string,
}

const BarChartCard: React.FC<BarChartCardProps> = ({height, width, data }) => {
  return (
    <div className="bg-white flex flex-col shadow-md rounded-lg w-full h-full">
      <p  className="text-xl font-bold ml-8 mt-4 mb-4">Age Distribution and Total</p>
      <BarChart height={height} width={width} data={data} />
    </div>
  );
};

export default BarChartCard;
