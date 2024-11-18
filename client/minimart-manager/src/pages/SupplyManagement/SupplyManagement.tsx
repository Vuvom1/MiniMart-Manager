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
            console.log('Supplier added successfully');

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
                    <OverviewTable columnData={importsColumnData} seeAll={handleSeeAllImport} title="Imports Overview" itemData={imports}  />
                </div>
                <DoughnutChartCard title="Import Distribution" data={doughnutChartData} />
            </div>

            <div className="grow">
                <CollapsedRowTable onSave={handleUpdateSupplier} addItem={handleOpenModal} title="Suppliers" itemData={suppliers} columnData={supplierColumnData} />
            </div>
        </div>

        <FormModal isOpen={isModalOpen} onClose={handleCloseModal} onSubmit={handleAddSupplier} title="Add Supplier" isFormValid={isAddModalValid}>
        <div className="flex flex-col gap-y-4">
            <TextField
                onChange={handleInputChange}
                value={supplierFormData?.name}
                name="name"
                label="Supplier Name"
                validations={[ValidationUtil.validateRequired("Supplier name")]}
                validationPassed={handleValidationChange}
                placeholder="Enter supplier name..." />
            <TextField
                label="Email"
                name="email"
                value={supplierFormData?.email}
                onChange={handleInputChange}
                validations={[ValidationUtil.validateRequired("Email"), ValidationUtil.validateEmail]}
                validationPassed={handleValidationChange}
                placeholder="Enter email..."
            />
            <TextField
                value={supplierFormData?.phone}
                onChange={handleInputChange}
                label="Phone number"
                name="phone"
                validations={[ValidationUtil.validateRequired("Phone number"), ValidationUtil.validatePhoneNumber]}
                validationPassed={handleValidationChange}
                placeholder="Phone number..." />
            <TextField
                value={supplierFormData?.address}
                onChange={handleInputChange}
                name="address"
                label="Address"
                validations={[ValidationUtil.validateRequired("Address")]}
                validationPassed={handleValidationChange}
                placeholder="Enter address..." />
            <TextField
                onChange={handleInputChange}
                value={supplierFormData?.description}
                name="description"
                label="Description"
                height="100px" />
        </div>
    </FormModal >
    </>
}

export default SupplyManagement;
