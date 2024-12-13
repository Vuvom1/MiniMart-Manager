import { Position } from "./Position";
import { Schedule } from "./Schedule";

export interface Shift {
    _id?: string,
    title?: string,
    date: string,
    startTime: string,
    endTime: string,
    schedule: Schedule,
    position: Position,
    breakDuration: string,
    notes: string,
}