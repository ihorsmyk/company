import { Outlet, Navigate } from "react-router-dom";
import company from "../../store/company";

const PrivateRoute: React.FC = () => {
  const token: boolean = company.token;
  return token ? <Outlet /> : <Navigate to="login" />;
};

export default PrivateRoute;
