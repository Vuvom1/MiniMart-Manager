import { SupplierStatus } from "../../constant/enum";
import ValidationUtil from "../../utils/ValidationUtil";
import { ColumnData } from "./ColumnData";
import { ColumnType } from "../../constant/enum";

export const supplierColumnData: ColumnData[] = [
    {
        field: "_id",
        header: "ID",
        isEditable: false,
        isCollapsed: false,
        type: ColumnType.ID,
    },
    {
        field: "name",
        header: "Name",
        isEditable: true,
        isCollapsed: false,
        validations: [ValidationUtil.validateRequired("Supplier name")],
        type: ColumnType.TEXT,
    },
    {
        field: "email",
        header: "Email",
        isEditable: true,
        isCollapsed: false,
        validations: [
            ValidationUtil.validateRequired("Email"),
            ValidationUtil.validateEmail
        ],
        type: ColumnType.TEXT,
    },
    {
        field: "status",
        header: "Status",
        isEditable: true,
        isCollapsed: false,
        options: [SupplierStatus.ACTIVE, SupplierStatus.INACTIVE],
        type: ColumnType.STATUS,
    },
    {
        field: "phone",
        header: "Phone number",
        isEditable: true,
        isCollapsed: true,
        validations: [
            ValidationUtil.validateRequired("Phone number"),
            ValidationUtil.validatePhoneNumber
        ],
        type: ColumnType.TEXT,
        
    },
    {
        field: "address",
        header: "Address",
        isEditable: true,
        isCollapsed: true,
        validations: [
            ValidationUtil.validateRequired("Address")
        ],
        type: ColumnType.TEXT,
    },
    {
        field: "description",
        header: "Description",
        isCollapsed: true,
        isEditable: true,
        type: ColumnType.TEXT,
    }
];
