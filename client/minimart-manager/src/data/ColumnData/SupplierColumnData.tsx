import { SupplierStatus } from "../../constant/enum";
import ValidationUtil from "../../utils/ValidationUtil";
import { ColumnData } from "./ColumnData";

export const supplierColumnData: ColumnData[] = [
    {
        field: "_id",
        header: "ID",
        isEditable: false,
        isCollapsed: false,
    },
    {
        field: "name",
        header: "Name",
        isEditable: true,
        isCollapsed: false,
        validations: [ValidationUtil.validateRequired("Supplier name")]
    },
    {
        field: "email",
        header: "Email",
        isEditable: true,
        isCollapsed: false,
        validations: [
            ValidationUtil.validateRequired("Email"),
            ValidationUtil.validateEmail
        ]
    },
    {
        field: "status",
        header: "Status",
        isEditable: true,
        isCollapsed: false,
        options: [SupplierStatus.ACTIVE, SupplierStatus.INACTIVE]
    },
    {
        field: "phone",
        header: "Phone number",
        isEditable: true,
        isCollapsed: true,
        validations: [
            ValidationUtil.validateRequired("Phone number"),
            ValidationUtil.validatePhoneNumber
        ]
        
    },
    {
        field: "address",
        header: "Address",
        isEditable: true,
        isCollapsed: true,
        validations: [
            ValidationUtil.validateRequired("Address")
        ]
    },
    {
        field: "description",
        header: "Description",
        isCollapsed: true,
        isEditable: true,
    }
];
