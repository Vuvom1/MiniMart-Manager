import React from 'react';
import { Customer } from '../../data/Entities/Customer';

interface RankingCardProps {
  customers: Customer[];
}

const RankingCard: React.FC<RankingCardProps> = ({ customers }) => {
  const sortedCustomers = [...customers].sort((a, b) => b.point - a.point).slice(0, 10);;

  return (
    <div className="bg-white shadow-md rounded-lg p-4 w-full h-full max-w-md">
      <h2 className="text-xl font-bold mb-4 text-center">Customer Ranking</h2>
      <ul className="divide-y divide-gray-200">
        {sortedCustomers.map((customer, index) => (
          <li key={index} className="py-2 flex justify-between items-center">
            <div className="flex items-center">
              <span className="font-bold text-lg mr-2">{index + 1}.</span>
              <span className="text-gray-700 font-semibold">{customer.name}</span>
            </div>
            <span className="text-blue-600 font-semibold">{customer.point} points</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RankingCard;