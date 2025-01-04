import { ColumnType } from "../../constant/enum";
import { promotionStatusColorMapping } from "../../constant/mapping";
import { ColumnData } from "./ColumnData";

export const receiptColumnData: ColumnData[] = [
    {
        field: "receiptNumber",
        header: "Receipt Number",
        isEditable: false,
        type: ColumnType.TEXT,
        isHidden: false,
    },
    {
        field: "paymentMethod",
        header: "Payment Method",
        isEditable: false,
        type: ColumnType.TEXT,
        isHidden: false,
    },
    {
        field: "time",
        header: "Time",
        isEditable: false,
        type: ColumnType.DATETIME,
        isHidden: false,
    },
    {
        field: "transactionType",
        header: "Transaction Type",
        isEditable: false,
        type: ColumnType.TEXT,
        isHidden: false,
    },
    {
        field: "totalPrice",
        header: "Total Price",
        isEditable: false,
        type: ColumnType.TEXT,
        isHidden: false,
    },
    {
        field: "totalNetPrice",
        header: "Total Net Price",
        isEditable: false,
        type: ColumnType.TEXT,
        isHidden: false,
    },
    {
        field: "status",
        header: "Status",
        isEditable: true,
        type: ColumnType.STATUS,
        isHidden: false,
        colorMapping: promotionStatusColorMapping,
    },
];