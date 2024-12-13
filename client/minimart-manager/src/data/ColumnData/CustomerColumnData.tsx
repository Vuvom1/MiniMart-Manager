import { ColumnData } from "./ColumnData";
import { ColumnType } from "../../constant/enum";
import { customerStatusColorMapping } from "../../constant/mapping";

export const CustomerColumnData: ColumnData[] = [
    {
        field: "id",
        header: "ID",
        isCollapsed: false,
        isEditable: false,
        type: ColumnType.ID,
    },
    {
        field: "name",
        header: "Name",
        isCollapsed: false,
        isEditable: false,
        type: ColumnType.TEXT,
    },
    {
        field: "email",
        header: "Email",
        isCollapsed: true,
        isEditable: false,
        type: ColumnType.TEXT,
    },
    {
        field: "phone",
        header: "Phone Number",
        isCollapsed: false,
        isEditable: false,
        type: ColumnType.TEXT,
    },
    {
        field: "address",
        header: "Address",
        isCollapsed: true,
        isEditable: false,
        type: ColumnType.TEXT,
    },
    {
        field: "status",
        header: "Status",
        isCollapsed: false,
        isEditable: false,
        type: ColumnType.CHECK,
        colorMapping: customerStatusColorMapping,
    },
    {
        field: "point",
        header: "Point",
        isCollapsed: false,
        isEditable: false,
        type: ColumnType.TEXT,
    },

];