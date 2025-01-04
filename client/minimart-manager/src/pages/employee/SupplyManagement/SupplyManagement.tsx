import MetricCard from "../../../components/Card/MetricCard";
import OverviewTable from "../../../components/Table/OverviewTable";
import DoughnutChartCard from "../../../components/Card/DoughnutChartCard";
import ComboBox from "../../../components/ComboBox";
import RoundedButton from "../../../components/Button/RoundedButton";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllSuppliers, getSuppliersStatistic, updateSupplier } from "../../../services/api/SupplierApi";
import CollapsedRowTable from "../../../components/Table/CollapsedRowTable";
import toast from "react-hot-toast";
import SuccessToast from "../../../components/Toast/SuccessToast";
import { Period, SupplierStatus } from "../../../constant/enum";
import { getAllImports, getImportStatistic } from "../../../services/api/ImportApi";
import { supplierColumnData } from "../../../data/ColumnData/SupplierColumnData";
import { importsColumnData } from "../../../data/ColumnData/ImportColumnData";
import { SuppliersStatistic } from "../../../data/StatisticData/SupplierStatistic";
import { ImportsStatistic } from "../../../data/StatisticData/ImportStatistic";
import { Supplier } from "../../../data/Entities/Supplier";
import AddSupplier from "./AddSupplier";
import Urls from "../../../constant/urls";
import ErrorToast from "../../../components/Toast/ErrorToast";
import { LoadingScreen } from "../../../components/Loading/LoadingScreen";
import DoughnutChart from "../../../components/Chart/DoughnutChart";


function SupplyManagement() {
    const navigate = useNavigate();
    const [isModalOpen, setModalOpen] = useState(false);
    const [suppliers, setSuppliers] = useState<Supplier[]>([]);
    const [imports, setImports] = useState([]);
    const [suppliersStatistic, setSupplierStatistic] = useState<SuppliersStatistic | null>(null);
    const [importsStatistic, setImportsStatistic] = useState<ImportsStatistic | null>(null);
    const [period, setPeriod] = useState<Period>(Period.YEARLY);
    const [importLoading, setImportLoading] = useState(true);
    const [supplierLoading, setSupplierLoading] = useState(true);

    const fetchSuppliers = async () => {
        setSupplierLoading(true);
        try {
            const data = await getAllSuppliers();
            const statisticData = await getSuppliersStatistic();
            setSupplierStatistic(statisticData);
            console.log(statisticData)
            setSuppliers(data);

        } catch (error) {
            console.error('Error fetching suppliers:', error);
        } finally {
            setSupplierLoading(false);
        }
    };

    const fetchImports = async () => {
        setImportLoading(true);
        try {
            const data = await getAllImports();
            const statisticData = await getImportStatistic();

            setImports(data);
            setImportsStatistic(statisticData)

        } catch (error) {
            console.error('Error fetching suppliers:', error);
        } finally {
            setImportLoading(false);
        }
    }

    const doughnutChartData = {
        labels: importsStatistic?.statisticByCategory.map(category => category._id) || [],
        values: importsStatistic?.statisticByCategory.map(category => category.totalImportedProduct) || [],
    };

    const handleOpenModal = () => {
        setModalOpen(true);
    };

    const handleSelect = (selectedPeriod: Period) => {
        setPeriod(selectedPeriod);
    };

    const handleSeeAllImport = () => {
        navigate(Urls.ADMIN.SUPPLIES.IMPORTS.BASE.Path);
    };

    const handleUpdateSupplier = async (updatedData: any) => {
        try {
            const response = await updateSupplier(updatedData._id, updatedData);
            toast.custom((t) => (
                <SuccessToast
                    message={response || "Update supplier success!"}
                    onDismiss={() => toast.dismiss(t.id)}
                />
            ));
        } catch (error: any) {
            toast.custom((t) => (
                <ErrorToast
                    message={error || "Update supplier failed!"}
                    onDismiss={() => toast.dismiss(t.id)}
                />));

        } finally {
            fetchSuppliers();
        }
    };

    useEffect(() => {
        fetchSuppliers();
        fetchImports();
    }, []);

    if (importLoading || supplierLoading) {
        return <LoadingScreen />
    }

    return <>
        <div className="flex justify-between">
            <h1 className="text-2xl font-bold text-gray-800 mb-8">Supply Management</h1>
            <div className="flex gap-x-4">
                <ComboBox
                    options={[Period.YEARLY, Period.MONTHLY, Period.DAILY]}
                    placeholder="Choose a period..."
                    onSelect={(selectedPeriod: string) => handleSelect(selectedPeriod as Period)}
                />
                <RoundedButton label="Export" color="text-white bg-cyan-500" />
            </div>
        </div>

        <div className="gap-y-4 grid">
            <div className="flex gap-x-4">
                <MetricCard
                    title="Total Imports"
                    period={period == Period.DAILY ? "day" : (period == Period.MONTHLY ? "month" : "year")}
                    value={period == Period.DAILY ? (importsStatistic?.statisticByDate.todayImports) : (period == Period.MONTHLY ? importsStatistic?.statisticByMonth.thisMonthImports : importsStatistic?.statisticByYear.thisYearImports)}
                    percentage={period == Period.DAILY ? (importsStatistic?.statisticByDate.percentageCompareYesterday) : (period == Period.MONTHLY ? importsStatistic?.statisticByMonth.percentageCompareLastMonth : importsStatistic?.statisticByYear.percentageCompareLastYear)}
                    icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
                    </svg>} isPositive={true} />
                <MetricCard title="Total Imported products"
                    period={period == Period.DAILY ? "day" : (period == Period.MONTHLY ? "month" : "year")}
                    value={period == Period.DAILY ? (importsStatistic?.statisticByDate.todayImportedProducts) : (period == Period.MONTHLY ? importsStatistic?.statisticByMonth.thisMonthImportedProducts : importsStatistic?.statisticByYear.thisYearImportedProducts)}
                    percentage={period == Period.DAILY ? (importsStatistic?.statisticByDate.percentageCompareYesterday) : (period == Period.MONTHLY ? importsStatistic?.statisticByMonth.percentageCompareLastMonth : importsStatistic?.statisticByYear.percentageCompareLastYear)}
                    icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
                    </svg>} isPositive={true} />
                <MetricCard
                    period={period == Period.DAILY ? "day" : (period == Period.MONTHLY ? "month" : "year")}
                    title="Total Suppliers" value={period == Period.DAILY ? (suppliersStatistic?.statisticByDate.todaySuppliers) : (period == Period.MONTHLY ? suppliersStatistic?.statisticByMonth.thisMonthSuppliers : suppliersStatistic?.statisticByYear.thisYearSuppliers)}
                    percentage={period == Period.DAILY ? (suppliersStatistic?.statisticByDate.percentageCompareYesterday) : (period == Period.MONTHLY ? suppliersStatistic?.statisticByMonth.percentageCompareLastMonth : suppliersStatistic?.statisticByYear.percentageCompareLastYear)}
                    icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
                    </svg>} isPositive={true} />
            </div>

            <div className="flex gap-x-6">
                <div className="w-2/3">
                    <OverviewTable columnData={importsColumnData} seeAll={handleSeeAllImport} title="Imports Overview" itemData={imports} />
                </div>
                <div className="flex flex-col w-1/3 bg-white p-4 items-center rounded-lg gap-y-4">
                    <h2 className="text-xl font-medium">Import Distribution</h2>
                    <div className="justify-center">
                        <DoughnutChart data={{
                            labels: doughnutChartData.labels,
                            values: doughnutChartData.values,
                        }} />
                    </div>
                </div>


            </div>

            <div className="grow">
                <CollapsedRowTable onSave={handleUpdateSupplier} addItem={handleOpenModal} title="Suppliers" itemData={suppliers} columnData={supplierColumnData} statuses={SupplierStatus} />
            </div>
        </div>

        {
            isModalOpen && <AddSupplier isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
        }
    </>
}

export default SupplyManagement;