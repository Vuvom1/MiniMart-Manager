import { ColumnType } from "../../constant/enum";

export interface ColumnData {
    field: string;
    header: string;
    isEditable: boolean;
    validations?: Array<(value: string) => string | null>;
    options?: any[];
    isCollapsed?: boolean;
    type: ColumnType,
    colorMapping?: any;
}