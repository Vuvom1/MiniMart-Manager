import React, { useEffect, useState } from 'react';
import LineChart from '../Chart/LineChart';

interface LineChartCardProps {
  label?: string,
  data: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor: string;
    }[];
  };
  width?: string,
  height?: string,
}

const LineChartCard: React.FC<LineChartCardProps> = ({ label = "", height, width, data }) => {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoading = () => {
    if (data != undefined) {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    handleLoading();
  }, [data]);

  return (
    <div className="bg-white flex flex-col shadow-md rounded-lg w-full h-full">
      <p className="text-xl font-bold ml-8 mt-4 mb-4">{label}</p>
      {isLoading ? (<p className='text-center'>Loading line chart..</p>) : (<LineChart height={height} width={width} data={data} />)}

    </div>
  );
};

export default LineChartCard;
``