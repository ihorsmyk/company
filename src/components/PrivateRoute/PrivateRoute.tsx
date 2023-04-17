import { Outlet, Navigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import company from "../../utils/stores/company";

const PrivateRoute: React.FC = observer(() => {
  return company.token ? <Outlet /> : <Navigate to="/" />;
});

export default PrivateRoute;
