import { Employee } from "./Employee";

export interface Salary {
    _id: string;
    employee: Employee;
    startDate: Date;
    endDate: Date;
    totalHours: number;
    totalSalary: number;
    isPaid: boolean;
}