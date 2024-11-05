export interface ColumnData {
    field: string;
    header: string;
    isEditable: boolean;
    validations?: Array<(value: string) => string | null>;
}