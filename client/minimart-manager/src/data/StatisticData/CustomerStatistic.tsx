export interface CustomerStatistic {
    statisticByDate: {
        totalCustomersByDate: {
            _id: string;                
            totalCustomers: number;         
        }[];
        todayTotalCustomers: number;
        yesterdayTotalCustomers: number;
        todayNewCustomers: number;
        yesterdayNewCustomers: number;
        totalCustomerComparison: number;  
        totalCustomerPercentage: number;  
        newCustomerComparison: number;   
        newCustomerPercentage: number;   
    };

    statisticByMonth: {
        totalCustomersByMonth: {
            _id: string;               
            totalCustomers: number;        
        }[];
    
        currentMonthTotalCustomers: number;
        previousMonthTotalCustomers: number;
        currentMonthNewCustomers: number;
        previousMonthNewCustomers: number;
        totalCustomerComparison: number;  
        totalCustomerPercentage: number;  
        newCustomerComparison: number;   
        newCustomerPercentage: number;   
    };

    statisticByYear: {
        totalCustomersByYear: {
            _id: string;                
            totalCustomers: number;        
        }[];
        currentYearTotalCustomers: number;
        previousYearTotalCustomers: number;
        currentYearNewCustomers: number;
        previousYearNewCustomers: number;
        totalCustomerComparison: number; 
        totalCustomerPercentage: number;  
        newCustomerComparison: number;    
        newCustomerPercentage: number;  
    };
}
