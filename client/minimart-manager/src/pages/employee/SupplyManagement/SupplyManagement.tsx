import MetricCard from "../../../components/Card/MetricCard";
import OverviewTable from "../../../components/Table/OverviewTable";
import DoughnutChartCard from "../../../components/Card/DoughnutChartCard";
import ComboBox from "../../../components/ComboBox";
import RoundedButton from "../../../components/Button/RoundedButton";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import FormModal from "../../../components/Modal/FormModal";
import TextField from "../../../components/InputField/TextField";
import {
  addSupplier,
  getAllSuppliers,
  getSuppliersStatistic,
  updateSupplier,
} from "../../../services/api/SupplierApi";
import CollapsedRowTable from "../../../components/Table/CollapsedRowTable";
import toast from "react-hot-toast";
import ErrorToast from "../../../components/Toast/ErrorToast";
import SuccessToast from "../../../components/Toast/SuccessToast";
import { SupplierStatus } from "../../../constant/enum";
import { getAllImports } from "../../../services/api/ImportApi";

interface SuppliersStatistic {
  totalSuppliers: number;
  percentageCompareLastMonnth: number;
}

function SupplyManagement() {
  const navigate = useNavigate();
  const [isModalOpen, setModalOpen] = useState(false);
  const [suppliers, setSuppliers] = useState([]);
  const [imports, setImports] = useState([]);
  const [suppliersStatistic, setSupplierStatistic] =
    useState<SuppliersStatistic | null>(null);
  const [loading, setLoading] = useState(true);

  const [supplierFormData, setSupplierFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    description: "",
  });

  const fetchSuppliers = async () => {
    try {
      const data = await getAllSuppliers();
      const statisticData = await getSuppliersStatistic();
      setSupplierStatistic(statisticData);
      setSuppliers(data);
    } catch (error) {
      console.error("Error fetching suppliers:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchImports = async () => {
    try {
      const data = await getAllImports();

      setImports(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching suppliers:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSuppliers();
    fetchImports();
  }, []);

  const doughnutChartData = {
    labels: ["Red", "Blue", "Yellow", "Green", "Purple"],
    values: [12, 19, 3, 5, 2],
  };

  const importsHeaders = [
    "ID",
    "Invoice number",
    "Supplier",
    "Date",
    "Total Quantity",
    "Total Import Price",
  ];
  const importDataFields = [
    "_id",
    "invoiceNumber",
    "supplier.name",
    "date",
    "totalQuantity",
    "totalImportPrice",
  ];

  const supplierHeaders = [
    "ID",
    "Name",
    "Email",
    "Status",
    "Phone number",
    "Address",
    "Description",
  ];
  const supplierFields = [
    "_id",
    "name",
    "email",
    "status",
    "phone",
    "address",
    "description",
  ];

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleUpdateSupplier = async (updatedData: any) => {
    try {
      await updateSupplier(updatedData._id, {
        name: updatedData.name,
        status: updatedData.status,
        email: updatedData.email,
        phone: updatedData.phone,
        address: updatedData.address,
        description: updatedData.description,
      });
      toast.custom((t) => (
        <SuccessToast
          message="Update supplier success!"
          onDismiss={() => toast.dismiss(t.id)}
        />
      ));
    } catch (error) {
      console.error("Error update supplier:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddSupplier = async () => {
    try {
      await addSupplier(
        supplierFormData.name,
        supplierFormData.email,
        supplierFormData.phone,
        supplierFormData.address,
        supplierFormData.description
      );
      console.log("Supplier added successfully");

      setSupplierFormData({
        name: "",
        email: "",
        phone: "",
        address: "",
        description: "",
      });

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
        />
      ));
    }
  };

  function handleSelect(option: string) {
    console.log("Selected option:", option);
  }

  function handleSeeAllImport() {
    navigate("/supplies/imports");
  }

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setSupplierFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <>
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold text-gray-800 mb-8">
          Supply Management
        </h1>
        <div className="flex gap-x-4">
          <ComboBox
            options={["Daily", "Monthly", "Yearly"]}
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
            value="0.00"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"
                />
              </svg>
            }
            isPositive={true}
          />
          <MetricCard
            title="Total Imported products"
            value="0.00"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"
                />
              </svg>
            }
            isPositive={true}
          />
          <MetricCard
            title="Total Suppliers"
            percentage={suppliersStatistic?.percentageCompareLastMonnth ?? 0}
            value={suppliersStatistic?.totalSuppliers ?? 0}
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"
                />
              </svg>
            }
            isPositive={true}
          />
        </div>

        <div className="flex gap-x-6">
          <div className="grow">
            <OverviewTable
              seeAll={handleSeeAllImport}
              title="Imports Overview"
              itemData={imports}
              columnHeaders={importsHeaders}
              dataFields={importDataFields}
            />
          </div>
          <DoughnutChartCard
            title="Import Distribution"
            data={doughnutChartData}
          />
        </div>

        <div className="grow">
          <CollapsedRowTable
            statusOptions={[SupplierStatus.ACTIVE, SupplierStatus.INACTIVE]}
            onSave={handleUpdateSupplier}
            addItem={handleOpenModal}
            title="Suppliers"
            itemData={suppliers}
            columnHeaders={supplierHeaders}
            dataFields={supplierFields}
          />
        </div>
      </div>

      <FormModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleAddSupplier}
        title="Add Supplier"
      >
        <div className="flex flex-col gap-y-4">
          <TextField
            onChange={handleInputChange}
            value={supplierFormData.name}
            name="name"
            label="Supplier Name"
            placeholder="Enter supplier name..."
          />
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
            placeholder="Phone number..."
          />
          <TextField
            value={supplierFormData.address}
            onChange={handleInputChange}
            name="address"
            label="Address"
            placeholder="Enter address..."
          />
          <TextField
            onChange={handleInputChange}
            value={supplierFormData.description}
            name="description"
            label="Description"
            height="100px"
          />
        </div>
      </FormModal>
    </>
  );
}

export default SupplyManagement;
