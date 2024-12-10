import { ColumnType } from "../../constant/enum";
import { promotionStatusColorMapping } from "../../constant/mapping";
import { ColumnData } from "./ColumnData";

export const promotionColumnData: ColumnData[] = [
    {
        field: "code",
        header: "Code",
        isEditable: false,
        type: ColumnType.TEXT,
        isCollapsed: true,
    },
    {
        field: "name",
        header: "Name",
        isEditable: false,
        type: ColumnType.TEXT,
        isCollapsed: true,
    },
    {
        field: "type",
        header: "Type",
        isEditable: false,
        type: ColumnType.TEXT,
        isCollapsed: true,
    },
    {
        field: "discountType",
        header: "Discount Type",
        isEditable: false,
        type: ColumnType.TEXT,
        isCollapsed: true,
    },
    {
        field: "startTime",
        header: "Start Time",
        isEditable: false,
        type: ColumnType.DATETIME,
        isCollapsed: true,
    },
    {
        field: "endTime",
        header: "End Time",
        isEditable: false,
        type: ColumnType.DATETIME,
        isCollapsed: true,
    },
    {
        field: "status",
        header: "Status",
        isEditable: true,
        type: ColumnType.STATUS,
        isCollapsed: true,
        colorMapping: promotionStatusColorMapping,
    },
];