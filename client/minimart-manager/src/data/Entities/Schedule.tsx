import { Employee } from "./Employee";
import { Shift } from "./Shift";

export interface Schedule {
        _id?: string;
        employee: Employee;
        shifts: Shift[];
        createAt: string;
        updateAt: string;
}