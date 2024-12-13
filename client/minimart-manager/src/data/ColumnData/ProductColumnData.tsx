import { ColumnType } from "../../constant/enum";
import { importStatusColorMapping } from "../../constant/mapping";
import { ColumnData } from "./ColumnData";

export const productColumnData: ColumnData[] = [
    {
        field: "_id",
        header: "ID",
        isEditable: false,
        type: ColumnType.ID,
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
        field: "price",
        header: "Supplier",
        isEditable: false,
        type: ColumnType.TEXT,
        isHidden: true,
    },
    {
        field: "stock",
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
];