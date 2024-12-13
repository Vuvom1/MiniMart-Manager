import { ColumnType } from "../../constant/enum";
import { importStatusColorMapping } from "../../constant/mapping";
import { ColumnData } from "./ColumnData";

export const productColumnData: ColumnData[] = [
    {
        field: "_id",
        header: "ID",
        isEditable: false,
        type: ColumnType.ID,
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
        field: "price",
        header: "Supplier",
        isEditable: false,
        type: ColumnType.TEXT,
        isCollapsed: true,
    },
    {
        field: "stock",
        header: "Date",
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
        colorMapping: importStatusColorMapping,
    },
];