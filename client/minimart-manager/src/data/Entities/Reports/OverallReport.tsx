export interface OverallReport {
    totalReceiptByPeriods: { total: number; period: string }[];
    totalSalaryByPeriods: { total: number; period: string }[];
    totalImportByMonths: { total: number; period: string }[];
    totalEarningsByMonths: { total: number; period: string }[];
    totalExpensesByMonths: { total: number; period: string }[];
    totalSalesByMonths: { total: number; period: string }[];
}