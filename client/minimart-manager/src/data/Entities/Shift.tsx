import { Style } from "./Style";

export interface Shift {
    _id?: string,
    name: string,
    startTime: string,
    endTime: string,
    style: Style,
}