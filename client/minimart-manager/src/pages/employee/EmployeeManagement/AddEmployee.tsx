import { FC, useState } from "react";
import { User } from "../../../data/Entities/User";

const AddEmployees: FC = () => {
  const [accountList, setAccountList] = useState<User[]>();
  const [name, setName] = useState("");
  const [salaryPerHour, setSalaryPerHour] = useState(0);
  const [startWorkingDate, setStartWorkingDate] = useState("");
  const getAccountList = () => {};
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h1 className="text-2xl font-semibold text-center mb-6">
        Add New Employee here!
      </h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              List of User
            </label>
            <select
              name="user"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select a customer</option>
              {accountList?.map((v, i) => (
                <option key={v._id} value={v._id}>
                  {v.lastname + v.firstname}
                </option>
              ))}
            </select>
          </div>
          <div>
            <input
              type="number"
              name="salaryPerHour"
              value={salaryPerHour}
              required
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <input
              type="date"
              name="startWorkingDate"
              value={startWorkingDate}
              required
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </form>
    </div>
  );
};
export default AddEmployees;
