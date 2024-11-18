import { Shift } from "./Shift";

export interface ScheduleDetail {
    shift: Shift,
    dayOfWeek: string,
    date: string,
    isAbsent?: boolean, 
}