import { ColumnData } from "./ColumnData";
import { ColumnType } from "../../constant/enum";

export const EmployeeColumnData: ColumnData[] = [

    {
        field: "_id",
        header: "ID",
        isHidden: false,
        isEditable: false,
        type: ColumnType.ID,
    },
    {
        field: "avatar",
        header: "Avatar",
        isHidden: false,
        isEditable: false,
        type: ColumnType.IMAGE,
    },
    {
        field: "firstname",
        header: "First Name",
        isHidden: false,
        isEditable: false,
        type: ColumnType.TEXT,
    },
    {
        field: "lastname",
        header: "Last Name",
        isHidden: false,
        isEditable: false,
        type: ColumnType.TEXT,
    },
    {
        field: "email",
        header: "Email",
        isHidden: false,
        isEditable: false,
        type: ColumnType.TEXT,
    },
]