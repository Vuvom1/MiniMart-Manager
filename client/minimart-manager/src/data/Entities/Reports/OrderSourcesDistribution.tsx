export interface OrderSourcesDistribution {
    sources: {
        transactionType: string;
        total: number;
    }[];
    period: string;
}