import { Navigate, Outlet } from "react-router-dom";
import { observer } from "mobx-react-lite";
import company from "../../utils/stores/company";

const PublicRoute: React.FC = observer(() => {
  return company.token ? <Navigate to="/" /> : <Outlet />;
});

export default PublicRoute;
