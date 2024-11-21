import MetricCard from "../../components/Card/MetricCard";
import OverviewTable from "../../components/Table/OverviewTable";
import DoughnutChartCard from "../../components/Card/DoughnutChartCard";
import ComboBox from "../../components/ComboBox";
import RoundedButton from "../../components/Button/RoundedButton";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import FormModal from "../../components/Modal/FormModal";
import TextField from "../../components/InputField/TextField";
import { addSupplier, getAllSuppliers, getSuppliersStatistic, updateSupplier } from "../../services/api/SupplierApi";
import CollapsedRowTable from "../../components/Table/CollapsedRowTable";
import toast from "react-hot-toast";
import ErrorToast from "../../components/Toast/ErrorToast";
import SuccessToast from "../../components/Toast/SuccessToast";
import { Period, SupplierStatus } from "../../constant/enum";
import { getAllImports, getImportStatistic } from "../../services/api/ImportApi";
import ValidationUtil from "../../utils/ValidationUtil";
import { supplierColumnData } from "../../data/ColumnData/SupplierColumnData";
import { importsColumnData } from "../../data/ColumnData/ImportColumnData";
import { SuppliersStatistic } from "../../data/StatisticData/SupplierStatistic";
import { ImportsStatistic } from "../../data/StatisticData/ImportStatistic";
import { Supplier, SupplierEntity } from "../../data/Entities/Supplier";
import { supplierStatusColorMapping } from "../../constant/mapping";


function SupplyManagement() {
    const navigate = useNavigate();
    const [isModalOpen, setModalOpen] = useState(false);
    const [suppliers, setSuppliers] = useState<Supplier[]>([]);
    const [imports, setImports] = useState([]);
    const [suppliersStatistic, setSupplierStatistic] = useState<SuppliersStatistic | null>(null);
    const [importsStatistic, setImportsStatistic] = useState<ImportsStatistic | null>(null);
    const [isAddModalValid, setIsAddModalValid] = useState(false);
    const [period, setPeriod] = useState<Period>(Period.YEARLY);
    const [loading, setLoading] = useState(true);

    const [supplierFormData, setSupplierFormData] = useState<Supplier>(new SupplierEntity());

    const handleValidationChange = (isValid: boolean) => {
        setIsAddModalValid(isValid);
    };

    const fetchSuppliers = async () => {
        try {
            const data = await getAllSuppliers();
            const statisticData = await getSuppliersStatistic();
            setSupplierStatistic(statisticData);
            setSuppliers(data);

        } catch (error) {
            console.error('Error fetching suppliers:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchImports = async () => {
        try {
            const data = await getAllImports();
            const statisticData = await getImportStatistic();

            setImports(data);
            setImportsStatistic(statisticData)

        } catch (error) {
            console.error('Error fetching suppliers:', error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchSuppliers();
        fetchImports();
    }, []);

    const doughnutChartData = {
        labels: importsStatistic?.statisticByCategory.map(category => category._id),
        values: importsStatistic?.statisticByCategory.map(category => category.totalImportedProduct),
    };

    const handleOpenModal = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const handleUpdateSupplier = async (updatedData: any) => {

        try {
            await updateSupplier(updatedData._id, { name: updatedData.name, status: updatedData.status, email: updatedData.email, phone: updatedData.phone, address: updatedData.address, description: updatedData.description })
            toast.custom((t) => (
                <SuccessToast
                    message="Update supplier success!"
                    onDismiss={() => toast.dismiss(t.id)}
                />
            ));
        } catch (error) {
            console.error('Error update supplier:', error);

        } finally {
            setLoading(false);
        }
    };

    const handleAddSupplier = async () => {
        try {
            await addSupplier(supplierFormData.name, supplierFormData?.email, supplierFormData?.phone, supplierFormData?.address, supplierFormData?.description);

            setSupplierFormData(new SupplierEntity);

            await fetchSuppliers();

            setModalOpen(false);

            toast.custom((t) => (
                <SuccessToast
                    message="Add supplier success!"
                    onDismiss={() => toast.dismiss(t.id)}
                />
            ));
        } catch (error) {
            toast.custom((t) => (
                <ErrorToast
                    message="Update supplier failed!"
                    onDismiss={() => toast.dismiss(t.id)}
                />));
        }
    }

    function handleSelect(option: any) {
        setPeriod(option);
    }

    function handleSeeAllImport() {
        navigate('/supplies/imports')
    }

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        if (name != undefined && value != undefined)
            setSupplierFormData(prevData => ({
                ...prevData,
                [name]: value,
            }));
    };

    return <>
        <div className="flex justify-between">
            <h1 className="text-2xl font-bold text-gray-800 mb-8">Supply Management</h1>
            <div className="flex gap-x-4">
                <ComboBox
                    options={[Period.YEARLY, Period.MONTHLY, Period.DAILY]}
                    placeholder="Choose a period..."
                    onSelect={handleSelect}
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
                <div className="grow">
                    <OverviewTable columnData={importsColumnData} seeAll={handleSeeAllImport} title="Imports Overview" itemData={imports} />
                </div>
                <DoughnutChartCard title="Import Distribution" data={doughnutChartData} />
            </div>

            <div className="grow">
                <CollapsedRowTable statusMapping={supplierStatusColorMapping} onSave={handleUpdateSupplier} addItem={handleOpenModal} title="Suppliers" itemData={suppliers} columnData={supplierColumnData} statuses={SupplierStatus} />
            </div>
        </div>

        <FormModal isOpen={isModalOpen} onClose={handleCloseModal} onSubmit={handleAddSupplier} title="Add new supplier" isFormValid={isAddModalValid}>
            <div className="flex flex-col gap-y-4 ">
                <div className="flex gap-x-4 w-full items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                    </svg>

                    <TextField
                        onChange={handleInputChange}
                        value={supplierFormData?.name}
                        name="name"
                        validations={[ValidationUtil.validateRequired("Supplier name")]}
                        validationPassed={handleValidationChange}
                        placeholder="Enter supplier name..." />
                </div>

                <div className="flex gap-x-4 w-full items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                    </svg>
                    <TextField
                        name="email"
                        value={supplierFormData?.email}
                        onChange={handleInputChange}
                        validations={[ValidationUtil.validateRequired("Email"), ValidationUtil.validateEmail]}
                        validationPassed={handleValidationChange}
                        placeholder="Enter email..."
                    />
                </div>
                <div className="flex gap-x-4 items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                    </svg>

                    <TextField
                        value={supplierFormData?.phone}
                        onChange={handleInputChange}
                        name="phone"
                        validations={[ValidationUtil.validateRequired("Phone number"), ValidationUtil.validatePhoneNumber]}
                        validationPassed={handleValidationChange}
                        placeholder="Enter phone number..." />
                </div>
                <div className="flex gap-x-4 items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                    </svg>

                    <TextField
                        value={supplierFormData?.address}
                        onChange={handleInputChange}
                        name="address"
                        validations={[ValidationUtil.validateRequired("Address")]}
                        validationPassed={handleValidationChange}
                        placeholder="Enter address..." />
                </div>


                <div className="flex gap-x-4 ">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
                    </svg>

                    <TextField
                        onChange={handleInputChange}
                        value={supplierFormData?.description}
                        name="description"
                        placeholder="Enter description..."
                        height="100px" />
                </div>

            </div>
        </FormModal >
    </>
}

export default SupplyManagement;
