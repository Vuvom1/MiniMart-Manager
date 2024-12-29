import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  EditEmployee,
  getEmployeeById,
} from "../../../services/api/EmployeeApi";
import defaultPic from "../../../assets/images/default_avatar.jpg";

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
  const [newSalaryPerHour, setNewSalaryPerHour] = useState<number | string>("");
  const [isEditing, setIsEditing] = useState(false);
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

    fetchEmployeeDetails();
  }, [id]);

  const handleSalaryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewSalaryPerHour(e.target.value);
  };

  const handleSaveSalary = async () => {
    if (!employee) return;
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
      alert(response);
    } catch (error: any) {
      console.error("Error updating product: ", error);
      if (error.response) {
        // Server responded with a status other than 2xx
        alert(
          error.response.data.message ||
            "Failed to update product. Please check your input."
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
            <h3 className="font-semibold">Salary</h3>
            {!isEditing ? (
              <div className="flex items-center gap-4">
                <p>{employee.salaryPerHour}VND/hour</p>
                <button
                  onClick={() => setIsEditing(true)}
                  className="text-blue-500 hover:underline"
                >
                  Edit
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <input
                  type="number"
                  value={newSalaryPerHour}
                  onChange={handleSalaryChange}
                  className="border p-2 rounded-md"
                />
                <button
                  onClick={handleSaveSalary}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                  Save
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="text-red-500 hover:underline"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetails;
