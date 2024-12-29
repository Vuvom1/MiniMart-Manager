export interface SaleDistributionByCategory {
    categories: {
        name: string;
        total: number;
    }[];
    period: string;
}