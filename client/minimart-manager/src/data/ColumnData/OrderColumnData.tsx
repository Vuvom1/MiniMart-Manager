import { ColumnType } from "../../constant/enum";
import { importStatusColorMapping } from "../../constant/mapping";
import { ColumnData } from "./ColumnData";

export const orderColumnData: ColumnData[] = [
    {
        field: "_id",
        header: "ID",
        isEditable: false,
        type: ColumnType.ID,
        isCollapsed: true,
    },
    {
        field: "receipientName",
        header: "Receipant",
        isEditable: false,
        type: ColumnType.TEXT,
        isCollapsed: true,
    },
    {
        field: "deliveryFee",
        header: "Delivery Fee",
        isEditable: false,
        type: ColumnType.TEXT,
        isCollapsed: true,
    },
    {
        field: "receipt.time",
        header: "Time",
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
        colorMapping: importStatusColorMapping,
    },
    {
        field: "receipt.totalNetPrice",
        header: "Total Amount",
        isEditable: false,
        type: ColumnType.TEXT,
        isCollapsed: false,
    },
];