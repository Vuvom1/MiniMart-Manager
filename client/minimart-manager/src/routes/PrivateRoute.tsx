import { Navigate, Outlet } from 'react-router-dom';
import { Role } from '../components/constant/enum';
import { useAuth } from '../components/providers/AuthProvider';


const PrivateRoute = ({userRole, allowedRoles = [] }: {userRole: Role, allowedRoles?: Role[] }) => {

  const hasAccess = allowedRoles.includes(userRole);

  return hasAccess ? <Outlet /> : <Navigate to="/unauthorized" />;
};

export default PrivateRoute;
