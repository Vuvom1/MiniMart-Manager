import { Route, Routes } from 'react-router-dom';
import SupplyManagement from '../pages/SupplyManagement/SupplyManagement';
import SupplierList from '../pages/SupplyManagement/SupplierDetail';
import ImportList from '../pages/SupplyManagement/ImportList';

const SupplyRoutes = () => {
    return (
        <Routes>

            <Route path="" element={<SupplyManagement />} />
            <Route path="supplier" element={<SupplierList />} />
            <Route path='imports' element={<ImportList />} /> 
        </Routes>
    );
};

const SuppliesPackageRoot = () => {
    return (
      <SupplyRoutes /> 
    );
  };

export default SuppliesPackageRoot;
