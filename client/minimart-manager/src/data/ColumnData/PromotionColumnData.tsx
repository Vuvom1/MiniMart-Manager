import { ColumnType } from "../../constant/enum";
import { promotionStatusColorMapping } from "../../constant/mapping";
import { ColumnData } from "./ColumnData";

export const promotionColumnData: ColumnData[] = [
    {
        field: "code",
        header: "Code",
        isEditable: false,
        type: ColumnType.TEXT,
        isHidden: true,
    },
    {
        field: "name",
        header: "Name",
        isEditable: false,
        type: ColumnType.TEXT,
        isHidden: true,
    },
    {
        field: "type",
        header: "Type",
        isEditable: false,
        type: ColumnType.TEXT,
        isHidden: true,
    },
    {
        field: "discountType",
        header: "Discount Type",
        isEditable: false,
        type: ColumnType.TEXT,
        isHidden: true,
    },
    {
        field: "startDate",
        header: "Start Date",
        isEditable: false,
        type: ColumnType.DATE,
        isHidden: true,
    },
    {
        field: "startTime",
        header: "Start Time",
        isEditable: false,
        type: ColumnType.TIME,
        isHidden: true,
    },
    {
        field: "endDate",
        header: "End Date",
        isEditable: false,
        type: ColumnType.DATE,
        isHidden: true,
    },
    {
        field: "endTime",
        header: "End Time",
        isEditable: false,
        type: ColumnType.TIME,
        isHidden: true,
    },
    {
        field: "status",
        header: "Status",
        isEditable: true,
        type: ColumnType.STATUS,
        isHidden: true,
        colorMapping: promotionStatusColorMapping,
    },
];