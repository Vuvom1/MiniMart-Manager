import { Route, Routes } from "react-router-dom";
import SupplyManagement from "../pages/employee/SupplyManagement/SupplyManagement";
import SupplierList from "../pages/employee/SupplyManagement/SupplierDetail";
import ImportList from "../pages/employee/SupplyManagement/ImportList";
import AddImport from "../pages/employee/SupplyManagement/AddImport";

const SupplyRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<SupplyManagement />} />
      <Route path="supplier" element={<SupplierList />} />
      <Route path="imports" element={<ImportList />} />
      <Route path="imports/add" element={<AddImport />} />
    </Routes>
  );
};

const SuppliesPackageRoot = () => {
  return <SupplyRoutes />;
};

export default SuppliesPackageRoot;
