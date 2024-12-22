import React from "react";
import defaultPicture from "../../assets/images/default_avatar.jpg";

interface EmployeeProps {
  picture?: string;
  name: string;
  salaryPerHour: number;
  onClick?: () => void;
}

const EmployeeCard: React.FC<EmployeeProps> = ({
  picture,
  name,
  salaryPerHour,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className="flex items-center gap-4 bg-white p-4 shadow-md rounded-md cursor-pointer"
    >
      <img
        src={picture || defaultPicture}
        alt={`${name}'s picture`}
        className="w-16 h-16 rounded-full object-cover"
      />
      <div>
        <h3 className="text-lg font-semibold">{name}</h3>
        <p className="text-sm text-gray-600">Salary: {salaryPerHour}VND/hour</p>
      </div>
    </div>
  );
};

export default EmployeeCard;
