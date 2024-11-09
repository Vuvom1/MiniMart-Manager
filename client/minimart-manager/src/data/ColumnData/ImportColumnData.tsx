import { ColumnData } from "./ColumnData";

export const importsColumnData: ColumnData[] = [
    {
        field: "id",
        header: "ID",
        isEditable: false
    },
    {
        field: "invoiceNumber",
        header: "Invoice number",
        isEditable: false
    },
    {
        field: "supplier.name",
        header: "Supplier",
        isEditable: false
    },
    {
        field: "date",
        header: "Date",
        isEditable: false
    },
    {
        field: "totalQuantity",
        header: "Total Quantity",
        isEditable: false
    },
    {
        field: "totalImportPrice",
        header: "Total Import Price",
        isEditable: false
    },
];