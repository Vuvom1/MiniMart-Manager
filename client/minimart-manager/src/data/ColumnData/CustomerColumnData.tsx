import { ColumnData } from "./ColumnData";
import { ColumnType } from "../../constant/enum";
import { customerStatusColorMapping } from "../../constant/mapping";

export const CustomerColumnData: ColumnData[] = [
    {
        field: "id",
        header: "ID",
        isHidden: false,
        isEditable: false,
        type: ColumnType.ID,
    },
    {
        field: "name",
        header: "Name",
        isHidden: false,
        isEditable: false,
        type: ColumnType.TEXT,
    },
    {
        field: "email",
        header: "Email",
        isHidden: true,
        isEditable: false,
        type: ColumnType.TEXT,
    },
    {
        field: "phone",
        header: "Phone Number",
        isHidden: false,
        isEditable: false,
        type: ColumnType.TEXT,
    },
    {
        field: "address",
        header: "Address",
        isHidden: true,
        isEditable: false,
        type: ColumnType.TEXT,
    },
    {
        field: "status",
        header: "Status",
        isHidden: false,
        isEditable: false,
        type: ColumnType.CHECK,
        colorMapping: customerStatusColorMapping,
    },
    {
        field: "point",
        header: "Point",
        isHidden: false,
        isEditable: false,
        type: ColumnType.TEXT,
    },
];
