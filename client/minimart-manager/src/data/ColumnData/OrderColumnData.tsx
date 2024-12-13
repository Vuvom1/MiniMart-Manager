import { ColumnType } from "../../constant/enum";
import { orderStatusColorMapping } from "../../constant/mapping";
import { ColumnData } from "./ColumnData";

export const orderColumnData: ColumnData[] = [
    {
        field: "_id",
        header: "ID",
        isEditable: false,
        type: ColumnType.ID,
        isHidden: true,
    },
    {
        field: "receipientName",
        header: "Receipant",
        isEditable: false,
        type: ColumnType.TEXT,
        isHidden: true,
    },
    {
        field: "deliveryFee",
        header: "Delivery Fee",
        isEditable: false,
        type: ColumnType.TEXT,
        isHidden: true,
    },
    {
        field: "receipt.time",
        header: "Time",
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
        colorMapping: orderStatusColorMapping,
    },
    {
        field: "receipt.totalNetPrice",
        header: "Total Amount",
        isEditable: false,
        type: ColumnType.TEXT,
        isHidden: false,
    },
];