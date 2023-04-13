import { Navigate, Outlet } from "react-router-dom";
import company from "../../store/company";

const PublicRoute: React.FC = () => {
  const token: boolean = company.token;
  return token ? <Navigate to="/login" /> : <Outlet />; // HACK
};

export default PublicRoute;
