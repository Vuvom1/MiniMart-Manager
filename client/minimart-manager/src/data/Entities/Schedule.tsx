import { Employee } from "./Employee";
import { ScheduleDetail } from "./ScheduleDetail";

export interface Schedule {
        id?: string;
        employee: Employee;
        scheduleDetails: ScheduleDetail[];
        createAt: string;
        updateAt: string;
}