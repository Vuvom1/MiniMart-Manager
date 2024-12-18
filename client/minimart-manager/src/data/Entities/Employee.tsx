import { Salary } from "./Salary";
import { User } from "./User";

export interface Employee {
    _id?: string;
    user: User;
    salary?: Salary;
    startWorkingDate: string,
    salaryPerHour: string,
}
