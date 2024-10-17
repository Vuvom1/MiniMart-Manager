import React from 'react';
import PieChart from '../Chart/DoughnutChart';
import ComboBox from '../ComboBox';

interface DoughnutChartCardProps {
  title: string;
  data: {
    labels: string[];
    values: number[];
  };
}

const DoughnutChartCard: React.FC<DoughnutChartCardProps> = ({ title, data }) => {
  function handleSelect(option: string) {
    console.log("Selected option:", option);
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <div className="flex justify-between items-center mb-4 gap-x-4">
        <div className="flex-1 text-center">
          <h2 className="text-xl font-bold">{title}</h2>
        </div>
        <div className="w-20">
          <ComboBox
            options={['Daily', 'Monthly', 'Yearly']}
            placeholder="Choose a period..."
            onSelect={handleSelect}
          />
        </div>
      </div>

      <PieChart data={data} />
    </div>
  );
};

export default DoughnutChartCard;
