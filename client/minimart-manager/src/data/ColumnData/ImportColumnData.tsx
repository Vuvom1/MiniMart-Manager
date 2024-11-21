import { ColumnType } from "../../constant/enum";
import { ColumnData } from "./ColumnData";

export const importsColumnData: ColumnData[] = [
    {
        field: "id",
        header: "ID",
        isEditable: false,
        type: ColumnType.ID,
        isCollapsed: true,
    },
    {
        field: "invoiceNumber",
        header: "Invoice number",
        isEditable: false,
        type: ColumnType.TEXT,
        isCollapsed: true,
    },
    {
        field: "supplier.name",
        header: "Supplier",
        isEditable: false,
        type: ColumnType.TEXT,
        isCollapsed: true,
    },
    {
        field: "date",
        header: "Date",
        isEditable: false,
        type: ColumnType.DATE,
        isCollapsed: true,
    },
    {
        field: "status",
        header: "Status",
        isEditable: true,
        type: ColumnType.STATUS,
        isCollapsed: true,
    },
    {
        field: "totalQuantity",
        header: "Total Quantity",
        isEditable: false,
        type: ColumnType.TEXT,
        isCollapsed: false,
    },
    {
        field: "totalImportPrice",
        header: "Total Import Price",
        isEditable: false,
        type: ColumnType.TEXT,
        isCollapsed: false,
    },
];