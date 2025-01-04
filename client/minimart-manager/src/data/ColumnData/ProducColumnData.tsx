import { ColumnType } from "../../constant/enum";
import { ColumnData } from "./ColumnData";

export const ProductColumnData: ColumnData[] = [
    {
        field: "_id",
        header: "ID",
        isHidden: false,
        isEditable: false,
        type: ColumnType.ID,
    },
    {
        field: "image",
        header: "Image",
        isHidden: false,
        isEditable: false,
        type: ColumnType.IMAGE,
    },
    {
        field: "name",
        header: "Name",
        isHidden: false,
        isEditable: false,
        type: ColumnType.TEXT,
    },
    {
        field: "category",
        header: "Category",
        isHidden: false,
        isEditable: false,
        type: ColumnType.TEXT,
    },
    {
        field: "price",
        header: "Price",
        isHidden: false,
        isEditable: false,
        type: ColumnType.TEXT,
    },
    {
        field: "stock",
        header: "In Stock",
        isHidden: false,
        isEditable: false,
        type: ColumnType.TEXT,
    },
    {
        field: "status",
        header: "Status",
        isHidden: false,
        isEditable: false,
        type: ColumnType.TEXT,
    },
]