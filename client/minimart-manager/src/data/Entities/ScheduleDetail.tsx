import { Shift } from "./Shift";

export interface ScheduleDetail {
    _id?: string,
    shift: Shift,
    dayOfWeek: string,
    date: string,
    isAbsent?: boolean, 
}