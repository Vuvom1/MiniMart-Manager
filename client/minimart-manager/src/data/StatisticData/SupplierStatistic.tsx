export interface SuppliersStatistic {
    totalSuppliers: number;
    statisticByDate: {
        todaySuppliers: number;
        yesterdaySuppliers: number;
        comparison: number;
        percentageCompareYesterday: number;
    };
    statisticByMonth: {
        thisMonthSuppliers: number;
        lastMonthSuppliers: number;
        comparison: number;
        percentageCompareLastMonth: number;
    };
    statisticByYear: {
        thisYearSuppliers: number;
        lastYearSuppliers: number;
        comparison: number;
        percentageCompareLastYear: number;
    };
}
