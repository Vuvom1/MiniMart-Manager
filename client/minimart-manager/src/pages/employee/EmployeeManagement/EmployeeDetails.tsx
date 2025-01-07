import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  EditEmployee,
  getEmployeeById,
} from "../../../services/api/EmployeeApi";
import {
  getSalaryByEmployee,
  updateSalaries,
} from "../../../services/api/SalaryApi";
import defaultPic from "../../../assets/images/default_avatar.jpg";
import RoundedButton from "../../../components/Button/RoundedButton"
import { Salary } from "../../../data/Entities/Salary";


interface Employee {
  id: string;
  name: string;
  picture?: string;
  salaryPerHour: number;
  email: string;
  phone: string;
  startWorkingDate: string;
  address: string;
  dateOfBirth: string;
  userId: string;
}
type RouteParams = {
  id: string;
};
const EmployeeDetails: React.FC = () => {
  const { id } = useParams<RouteParams>();
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [salary, setSalary] = useState<Salary | null>(null);
  const [newSalaryPerHour, setNewSalaryPerHour] = useState<number | string>("");
  const [newTotalHours, setNewTotalHours] = useState<number | string>("");
  const [newTotalSalary, setNewTotalSalary] = useState<number | string>("");
  const [isEditing, setIsEditing] = useState(false);
  const [isPaid, setIsPaid] = useState(false);

  function formatDate(dateString: string): string {
    // Create a Date object from the string
    const date = new Date(dateString);

    // Format the date as YYYY-MM-DD
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is zero-based
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }
  useEffect(() => {
    // Fetch employee details from backend
    const fetchEmployeeDetails = async () => {
      if (!id) {
        console.error("No ID provided");
        return;
      }
      const response = await getEmployeeById(id); // Update endpoint
      setEmployee({
        id: response._id,
        name: `${response.user.lastname} ${response.user.firstname}`,
        picture: response.user.image,
        salaryPerHour: response.salaryPerHour,
        email: response.user.email,
        phone: response.user.phone,
        address: response.user.address,
        dateOfBirth: formatDate(response.user.dateOfBirth),
        startWorkingDate: formatDate(response.startWorkingDate),
        userId: response.user._id,
      });
      setNewSalaryPerHour(response.salaryPerHour); // Initialize salary for editing
    };
    const fetchEmployeeSalary = async () => {
      if (!id) {
        console.error("No ID provided");
        return;
      }
      const response = await getSalaryByEmployee(id);
      console.log(response);
      setSalary(response);
      setNewTotalHours(response.totalHours);
      setNewTotalSalary(response.totalSalary);
    };

    fetchEmployeeDetails();
    fetchEmployeeSalary();
  }, [id]);

  const handleSalaryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewSalaryPerHour(e.target.value);
  };

  const handleSaveSalary = async () => {
    if (!employee || !salary) return;
    try {
      const updatedData = {
        ...employee,
        salaryPerHour: Number(newSalaryPerHour),
      };
      const formData = {
        id: employee.id,
        user_id: employee.userId,
        startWorkingDate: employee.startWorkingDate,
        salaryPerHour: Number(newSalaryPerHour),
      };
      const response = await EditEmployee(formData);
      setEmployee(updatedData);
      const updatedSalary = {
        ...salary,
        totalHours: Number(newTotalHours),
        totalSalary: Number(newTotalSalary),
        isPaid,
      };
      const response2 = await updateSalaries(updatedSalary, salary._id || "");
      setSalary(updatedSalary);
      alert(response);
      alert(response2.message);
    } catch (error: any) {
      console.error("Error updating employee: ", error);
      if (error.response) {
        // Server responded with a status other than 2xx
        alert(
          error.response.data.message ||
            "Failed to update employee. Please check your input."
        );
      } else if (error.request) {
        // Request was made but no response was received
        alert("Unable to connect to the server. Please try again later.");
      } else {
        // Something else caused the error
        alert("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsEditing(false);
    }
  };

  if (!employee) return <p>Loading...</p>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-md shadow-md">
        <div className="flex items-center gap-6">
          <img
            src={employee.picture || defaultPic}
            alt={`${employee.name}'s picture`}
            className="w-24 h-24 rounded-full object-cover"
          />
          <div>
            <h1 className="text-3xl font-bold">{employee.name}</h1>
            <p className="text-gray-600">phone: {employee.phone}</p>
            <p className="text-gray-600">
              Start Date:{" "}
              {new Date(employee.startWorkingDate).toLocaleDateString()}
            </p>
          </div>
        </div>

        <div className="mt-6">
          <h2 className="text-xl font-bold mb-2">Details</h2>
          <p>Email: {employee.email}</p>
          <p>Address: {employee.address}</p>
          <p>Date of birth: {employee.dateOfBirth}</p>

          <div className="mt-4">
            <h3 className="font-semibold">
            Salary per hours: {employee.salaryPerHour.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
            </h3>
          </div>
          {/* <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Salary Details</h2>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600"
            >
              {isEditing ? "Cancel Edit" : "Enable Edit"}
            </button>
          </div> */}
          {/* Detailed Salary */}
          {/* <div className="mt-4">
            <label className="font-bold">Total Hours:</label>
            {isEditing ? (
              <input
                type="number"
                value={newTotalHours}
                onChange={(e) => setNewTotalHours(e.target.value)}
                className="border p-2 rounded-md w-full"
              />
            ) : (
              <p>{salary?.totalHours} hours</p>

            )}
          </div>
          <div className="mt-4">
            <label className="font-bold">Total Salary:</label>
            {isEditing ? (
              <input
                type="number"
                value={newTotalSalary}
                onChange={(e) => setNewTotalSalary(e.target.value)}
                className="border p-2 rounded-md w-full"
              />
            ) : (
              <p>{salary?.totalSalary} $</p>
            )}
          </div>
          <div className="mt-4 flex items-center gap-2">
            <label>Paid:</label>
            {isEditing ? (
              <input
                type="checkbox"
                checked={isPaid}
                onChange={(e) => setIsPaid(e.target.checked)}
              />
            ) : (
              <p>{isPaid ? "Yes" : "No"}</p>
            )}
          </div> */}

          {/* Save Button */}
          {isEditing && (
            <button
              onClick={handleSaveSalary}
              className="mt-6 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
            >
              Save Changes
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetails;
