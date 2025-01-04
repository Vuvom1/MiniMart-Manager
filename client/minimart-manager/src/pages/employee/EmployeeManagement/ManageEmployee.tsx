import { useEffect, useState } from "react";
import RoundedButton from "../../../components/Button/RoundedButton";
import { getAllEmployees } from "../../../services/api/EmployeeApi";
import { useNavigate } from "react-router-dom";
import TableLayout from "../../../components/Table/TableLayout";
import Urls from "../../../constant/urls";
import { EmployeeColumnData } from "../../../data/ColumnData/EmployeeColumnData";

interface Employee {
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
  avatar: string;
  salaryPerHour: number;
}

const ManageEmployee = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<Employee[]>([]);

  const fetchEmployees = async () => {
    try {
      const fetchedEmployees = await getAllEmployees();
      const extractedEmployees: Employee[] = fetchedEmployees.map((p: any) => ({
        _id: p._id,
        firstname: p.user.firstname,
        lastname: p.user.lastname,
        avatar: p.user.image,
        email: p.user.email,
        salaryPerHour: p.salaryPerHour,
      }));
      setData(extractedEmployees);
      console.log(extractedEmployees);
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <div className="flex flex-col gap-4 h-full">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Manage Employees</h1>
        <div className="flex gap-x-4">
          <RoundedButton suffixIcon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15m0-3-3-3m0 0-3 3m3-3V15" />
          </svg>
          } label="Export" color="text-white bg-cyan-500" />
        </div>
      </div>
      <div className="flex gap-x-4 w-full">

      </div>
      <div className="grow mb-4">
        <TableLayout
          action={(id: string) => { navigate(`${id}`) }}
          addItem={() => navigate(Urls.ADMIN.EMPLOYEE.ADD.Path)}
          title="Employee List"
          data={data}
          columns={EmployeeColumnData} />

      </div>

    </div>
  );
};
export default ManageEmployee;
