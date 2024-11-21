import { User } from "./User";

export interface Employee {
    _id?: string;
    user: User;
    startWorkingDate: string,
    salaryPerHour: string,
}
