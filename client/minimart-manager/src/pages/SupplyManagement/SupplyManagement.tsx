import MetricCard from "../../components/Card/MetricCard";
import OverviewTable from "../../components/Table/OverviewTable";
import DoughnutChartCard from "../../components/Card/DoughnutChartCard";
import ComboBox from "../../components/ComboBox";
import RoundedButton from "../../components/Button/RoundedButton";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import FormModal from "../../components/Modal/FormModal";
import TextField from "../../components/InputField/TextField";
import { addSupplier, getAllSuppliers } from "../../services/api/SupplierApi";

function SupplyManagement() {
    const navigate = useNavigate();
    const [isModalOpen, setModalOpen] = useState(false);
    const [suppliers, setSuppliers] = useState([]);
    const [loading, setLoading] = useState(true);

    const [supplierFormData, setSupplierFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        description: ''
    });

    const fetchSuppliers = async () => {
        try {
            const data = await getAllSuppliers();
            setSuppliers(data);
        } catch (error) {
            console.error('Error fetching suppliers:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSuppliers();
    }, []); 

    const doughnutChartData = {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple'],
        values: [12, 19, 3, 5, 2],
    };

    const columnHeaders = ["ID", "Supplier", "Time", "Date", "Staff", "Total Products", "Total Expenditure"];
    const dataFields = ["id", "supplier", "time", "date", "staff", "totalProducts", "totalExpenditure"];
    const itemData = [
        { id: 1, supplier: "Apples", time: 50, date: 100, staff: 50, totalProducts: "ABC Fruit", totalExpenditure: "2 days" },
        { id: 2, supplier: "Bananas", time: 30, date: 80, staff: 60, totalProducts: "XYZ Produce", totalExpenditure: "3 days" },
    ];

    const supplierHeaders = ["ID", "Name", "Email", "Phone number", "Address", "Description"];
    const supplierFields = ["_id", "name", "email", "phone", "address", "description"];

    const handleOpenModal = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const handleAddSupplier = async() => {
        try {
            await addSupplier(supplierFormData.name, supplierFormData.email, supplierFormData.phone, supplierFormData.address, supplierFormData.description);
            console.log('Supplier added successfully');

            // Reset the form data
            setSupplierFormData({
                name: '',
                email: '',
                phone: '',
                address: '',
                description: ''
            });

            // Refresh the suppliers list
            await fetchSuppliers(); // Call fetchSuppliers to refresh the list
            setModalOpen(false);
        } catch (error) {
            console.error('Error adding supplier:', error);
        }
    }

    function handleSelect(option: string) {
        console.log("Selected option:", option);
    }

    function handleSeeAllImport() {
        navigate('/supplies/imports')
    }

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
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
                    options={['Daily', 'Monthly', 'Yearly']}
                    placeholder="Choose a period..."
                    onSelect={handleSelect}
                />
                <RoundedButton label="Export" color="text-white bg-cyan-500" />
            </div>
        </div>

        <div className="gap-y-4 grid">
            <div className="flex gap-x-4">
                <MetricCard title="Total Imports" value="0.00" icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
                </svg>} isPositive={true} />
                <MetricCard title="Total Import products" value="0.00" icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
                </svg>} isPositive={true} />
                <MetricCard title="Total Import Expenditure" value="0.00" icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
                </svg>} isPositive={true} />
            </div>

            <div className="flex gap-x-6">
                <div className="grow">
                    <OverviewTable seeAll={handleSeeAllImport} title="Imports Overview" itemData={itemData} columnHeaders={columnHeaders} dataFields={dataFields} />
                </div>
                <DoughnutChartCard title="Import Distribution" data={doughnutChartData} />
            </div>

            <div className="grow">
                <OverviewTable addItem={handleOpenModal} title="Suppliers" itemData={suppliers} columnHeaders={supplierHeaders} dataFields={supplierFields} />
            </div>
        </div>

        <FormModal isOpen={isModalOpen} onClose={handleCloseModal} onSubmit={handleAddSupplier} title="Add Supplier">
            <div className="flex flex-col gap-y-4">
                <TextField
                    onChange={handleInputChange}
                    value={supplierFormData.name}
                    name="name"
                    label="Supplier Name"
                    placeholder="Enter supplier name..." />
                <TextField
                    label="Email"
                    name="email"
                    value={supplierFormData.email}
                    onChange={handleInputChange}
                    placeholder="Enter email..."
                />
                <TextField 
                    value={supplierFormData.phone}
                    onChange={handleInputChange} 
                    label="Phone number" 
                    name="phone"
                    placeholder="Phone number..." />
                <TextField 
                    value={supplierFormData.address}
                    onChange={handleInputChange} 
                    name="address"
                    label="Address" 
                    placeholder="Enter address..." />
                <TextField 
                    onChange={handleInputChange} 
                    value={supplierFormData.description}
                    name="description"
                    label="Description" 
                    height="100px" />
            </div>
        </FormModal>
    </>
}

export default SupplyManagement;
