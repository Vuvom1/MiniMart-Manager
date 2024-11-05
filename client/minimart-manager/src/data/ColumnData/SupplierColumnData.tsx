import ValidationUtil from "../../utils/ValidationUtil";
import { ColumnData } from "./ColumnData";

export const supplierColumnData: ColumnData[] = [
    {
        field: "_id",
        header: "ID",
        isEditable: false,
    },
    {
        field: "name",
        header: "Name",
        isEditable: false,
        validations: [ValidationUtil.validateRequired("Supplier name")]
    },
    {
        field: "email",
        header: "Email",
        isEditable: false,
        validations: [
            ValidationUtil.validateRequired("Email"),
            ValidationUtil.validateEmail
        ]
    },
    {
        field: "status",
        header: "Status",
        isEditable: false,
    },
    {
        field: "phone",
        header: "Phone number",
        isEditable: false,
        validations: [
            ValidationUtil.validateRequired("Phone number"),
            ValidationUtil.validatePhoneNumber
        ]
        
    },
    {
        field: "address",
        header: "Address",
        isEditable: false,
        validations: [
            ValidationUtil.validateRequired("Address")
        ]
    },
    {
        field: "description",
        header: "Description",
        isEditable: false,
    }
];
