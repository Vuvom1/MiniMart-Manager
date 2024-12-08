import { Navigate, Outlet } from 'react-router-dom';
import { Role } from '../constant/enum';


const PrivateRoute = ({userRole, allowedRoles = [] }: {userRole: Role, allowedRoles?: Role[] }) => {

  const hasAccess = allowedRoles.includes(userRole);

  return hasAccess ? <Outlet /> : <Navigate to="/admin/unauthorized" />;
};

export default PrivateRoute;
