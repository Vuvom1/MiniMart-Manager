import { ColumnType } from "../../constant/enum";
import { importStatusColorMapping } from "../../constant/mapping";
import { ColumnData } from "./ColumnData";

export const importsColumnData: ColumnData[] = [
    {
        field: "_id",
        header: "ID",
        isEditable: false,
        type: ColumnType.ID,
        isHidden: true,
    },
    {
        field: "invoiceNumber",
        header: "Invoice number",
        isEditable: false,
        type: ColumnType.TEXT,
        isHidden: true,
    },
    {
        field: "supplier.name",
        header: "Supplier",
        isEditable: false,
        type: ColumnType.TEXT,
        isHidden: true,
    },
    {
        field: "date",
        header: "Date",
        isEditable: false,
        type: ColumnType.DATETIME,
        isHidden: true,
    },
    {
        field: "status",
        header: "Status",
        isEditable: true,
        type: ColumnType.STATUS,
        isHidden: true,
        colorMapping: importStatusColorMapping,
    },
    {
        field: "totalQuantity",
        header: "Total Quantity",
        isEditable: false,
        type: ColumnType.TEXT,
        isHidden: false,
    },
    {
        field: "totalImportPrice",
        header: "Total Import Price",
        isEditable: false,
        type: ColumnType.TEXT,
        isHidden: false,
    },
];