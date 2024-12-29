import { useEffect, useState } from "react";
import MetricCard from "../../../components/Card/MetricCard";
import DoughnutChart from "../../../components/Chart/DoughnutChart";
import MixChart from "../../../components/Chart/MixChart";
import PieChart from "../../../components/Chart/PieChart";
import { OverallReport } from "../../../data/Entities/Reports/OverallReport";
import { ShiftTimeDistribution } from "../../../data/Entities/Reports/ShiftTimeDistribution";
import { getOrderSourcesDistribution, getOverallReport, getSaleDistributionByCategory, getShiftTimeDistribution, getCurrentStockLevel as fetchCurrentStockLevelFromApi } from "../../../services/api/ReportApi";
import { SaleDistributionByCategory } from "../../../data/Entities/Reports/SaleDistributionByCategory";
import { LoadingScreen } from "../../../components/Loading/LoadingScreen";
import { OrderSourcesDistribution } from "../../../data/Entities/Reports/OrderSourcesDistribution";
import BarChart from "../../../components/Chart/BarChart";
import { StockLevel } from "../../../data/Entities/Reports/StockLevel";

function Dashboard() {
    const [overallReport, setOverallReport] = useState<OverallReport>();
    const [orderSourcesDistribution, setOrderSourcesDistribution] = useState<OrderSourcesDistribution[]>();
    const [shiftTimeDistributions, setShiftTimeDistributions] = useState<ShiftTimeDistribution[]>();
    const [saleDistributionByCategory, setSaleDistributionByCategory] = useState<SaleDistributionByCategory[]>();
    const [mixChartData, setMixChartData] = useState<{ labels: string[], datasets: { label: string, data: number[] }[] }>();
    const [currentStockLevel, setCurrentStockLevel] = useState<StockLevel[]>();
    const [loading, setLoading] = useState(false);


    const fetchOverallReport = async () => {
        setLoading(true);
        try {
            const data = await getOverallReport();
            setOverallReport(data);
        } catch (error) {
            console.error('fetchOverallReport', error);
        } finally {
            setLoading(false);
        }
    }

    const fetchShiftTimeDistribution = async () => {
        setLoading(true);
        try {
            const data = await getShiftTimeDistribution();
            setShiftTimeDistributions(data);
        } catch (error) {
            console.error('fetchShiftTimeDistribution', error);
        } finally {
            setLoading(false);
        }
    }

    const fetchSaleDistributionByCategory = async () => {
        setLoading(true);
        try {
            const data = await getSaleDistributionByCategory();
            setSaleDistributionByCategory(data);
        } catch (error) {
            console.error('fetchOverallReport', error);
        } finally {
            setLoading(false);
        }
    }

    const fetchOrderSourcesDistribution = async () => {
        setLoading(true);
        try {
            const data = await getOrderSourcesDistribution();
            setOrderSourcesDistribution(data);
        } catch (error) {
            console.error('fetchOrderSourcesDistribution', error);
        } finally {
            setLoading(false);
        }
    }

    const fetchCurrentStockLevel = async () => {
        setLoading(true);
        try {
            const data = await fetchCurrentStockLevelFromApi();
            setCurrentStockLevel(data);
        } catch (error) {
            console.error('fetchCurrentStockLevel', error);
        } finally {
            setLoading(false);
        }
    }
    

    const handleMixChart = () => {
        setMixChartData({
            labels: overallReport?.totalSalesByMonths?.map((item) => item.period) ?? [],
            datasets: [
                {
                    label: "Total Sales",
                    data: overallReport?.totalSalesByMonths?.map((item) => item.total) ?? [],

                },
                {
                    label: "Total Expenses",
                    data: overallReport?.totalExpensesByMonths.map((item) => item.total) ?? [],
                },
                {
                    label: "Total Earning",
                    data: overallReport?.totalEarningsByMonths.map((item) => item.total) ?? [],
                },
            ],
        });

        console.log(overallReport?.totalSalesByMonths?.map((item) => item.period) ?? [])
    }

    useEffect(() => {
        fetchOverallReport();
        fetchShiftTimeDistribution();
        fetchOverallReport();
        fetchSaleDistributionByCategory();
        fetchOrderSourcesDistribution();
        fetchCurrentStockLevel();
    }, []);

    useEffect(() => {
        if (overallReport) {
            handleMixChart();
        }
    }, [overallReport]);

    if (loading) {
        return <LoadingScreen />;
    }

    return (
        <>
            <div className="flex flex-col w-full h-full gap-y-4">
                <h1 className="text-2xl font-medium">Dashboard</h1>
                <div className="flex gap-x-4 w-full h-1/2">
                    <div className="grid grid-cols-2 gap-4 w-1/2">
                        <MetricCard icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
</svg>
} title="Earning" period="month" value={overallReport?.totalEarningsByMonths[0]?.total ?? 0} percentage={(overallReport?.totalEarningsByMonths[0]?.total ?? 0) * 100 / (overallReport?.totalEarningsByMonths[1]?.total ?? 1)} isPositive={true} />
                        <MetricCard title="Total Expense" value={overallReport?.totalExpensesByMonths[0]?.total ?? 0} period="month" percentage={(overallReport?.totalExpensesByMonths[0]?.total ?? 0) * 100 / (overallReport?.totalExpensesByMonths[1]?.total ?? 1)} isPositive={false} />
                        <MetricCard title="Sales" value={overallReport?.totalSalesByMonths[0]?.total ?? 0} period="month" percentage={(overallReport?.totalSalesByMonths[0]?.total ?? 0) * 100 / (overallReport?.totalSalesByMonths[1]?.total ?? 1)} isPositive={(overallReport?.totalSalesByMonths[0]?.total ?? 0) > 0} />
                        <MetricCard title="Sales" value={overallReport?.totalSalesByMonths[0]?.total ?? 0} period="month" percentage={(overallReport?.totalSalesByMonths[0]?.total ?? 0) * 100 / (overallReport?.totalSalesByMonths[1]?.total ?? 1)} isPositive={(overallReport?.totalSalesByMonths[0]?.total ?? 0) > 0} />
                    </div>
                    <div className="flex flex-col w-1/2 shadow-lg bg-white rounded-lg p-4 h-full">
                        <p className="text-gray-600 text-lg font-medium col-span-2">Order Sources Overview</p>
                        <div className="w-full justify-center flex h-full px-4">
                            <DoughnutChart legendPosition="right" data={{
                                labels: orderSourcesDistribution ? orderSourcesDistribution[0].sources.map(source => source.transactionType) : [],
                                values: orderSourcesDistribution ? orderSourcesDistribution[0].sources.map(source => source.total) : [],
                            }}/>
                        </div>
                    </div>
                </div>

                <div className="flex gap-x-4 h-1/2">

                    <div className="flex flex-col w-2/5 h-full bg-white shadow-lg rounded-lg p-4">
                        <h1 className="text-xl">Shift Time Distribution</h1>
                        <div className="flex justify-center w-full px-2 py-2 h-full">
                            {shiftTimeDistributions && <PieChart
                                backgroundColors={['#FF7F3E', '#FFF6E9', '#80C4E9', '#4335A7']}
                                legendPosition="right"
                                data={{
                                    labels: shiftTimeDistributions ? ['6am-12am', '12am-6pm', '6pm-12pm'] : [],
                                    values: shiftTimeDistributions ? [shiftTimeDistributions[0]._6amTo12am, shiftTimeDistributions[0]._12amTo6pm, shiftTimeDistributions[0]._6pmTo12pm] : [],
                                }} />}

                        </div>

                    </div>

                    <div className="flex flex-col w-3/5 h-full shadow-lg bg-white rounded-lg p-4">
                        <h1 className="text-xl">Stock Levels</h1>
                        <div className="flex justify-center w-full px-2 py-2 h-full">
                            <BarChart data={{
                                barDatasets: [currentStockLevel ? { data: currentStockLevel.map(stock => stock.total), label: 'Stock Level' } : { data: [], label: '' }],
                                labels: currentStockLevel ? currentStockLevel.map(stock => stock.category) : [],
                            }} />
                        </div>

                    </div>


                </div>
                <div className="flex gap-x-4 w-full pb-4">
                    <div className="flex flex-col h-full w-2/3 shadow-lg bg-white rounded-lg px-8 py-4 gap-y-4">
                        <h1 className="text-xl">Sale figures</h1>
                        <div>
                            <MixChart labels={mixChartData?.labels ?? []} datasets={mixChartData?.datasets ?? []} />
                        </div>

                    </div>
                    <div className="flex flex-col w-1/3 h-full shadow-lg bg-white rounded-lg p-4">
                        <h1 className="text-xl">Sale Distribution</h1>
                        <div className="flex justify-center w-full px-4 py-8 h-full">
                            <div>
                                <DoughnutChart
                                    backgroundColors={['#F6F4F0', '#E38E49', '#0A3981', '#1F509A']}
                                    legendPosition="bottom"
                                    data={{
                                        labels: saleDistributionByCategory ? saleDistributionByCategory[0].categories.map(category => category.name) : [],
                                        values: saleDistributionByCategory ? saleDistributionByCategory[0].categories.map(category => category.total) : [],
                                    }} />
                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </>
    );
}
export default Dashboard;