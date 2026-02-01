import {Outlet,Navigate} from 'react-router-dom'

function ProtectRoutes() {
  const token = localStorage.getItem('token');
  return token ? <Outlet /> : <Navigate to="/account" />;
}

export default ProtectRoutes