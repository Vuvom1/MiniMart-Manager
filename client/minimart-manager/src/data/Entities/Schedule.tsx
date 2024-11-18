import { Employee } from "./Employee";
import { ScheduleDetail } from "./ScheduleDetail";

export interface Schedule {
        _id?: string;
        employee: Employee;
        scheduleDetails: ScheduleDetail[];
        createAt: string;
        updateAt: string;
}