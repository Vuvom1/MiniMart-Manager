export interface ImportsStatistic {

    statisticByDate: {
        todayImports: number;
        yesterdayImports: number;
        lastMonthImports: number,
        todayImportedProducts: number,
        yesterdayImportedProducts: number,
        comparison: number,
        percentageCompareYesterday: number;
    }

    statisticByMonth: {
        thisMonthImports: number;
        lastMonthImports: number;
        thisMonthImportedProducts: number;
        lastMonthImportedProducts: number;
        comparison: number,
        percentageCompareLastMonth: number;
    }

    statisticByYear: {
        thisYearImports: number;
        lastYearImports: number;
        thisYearImportedProducts: number;
        lastYearImportedProducts: number;
        comparison: number,
        percentageCompareLastYear: number;
    }

    statisticByCategory: {
        _id: string,
        totalImport: number,
        totalImportedProduct: number,
    }[],
}
