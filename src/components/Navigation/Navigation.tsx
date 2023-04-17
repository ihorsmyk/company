import { NavLink } from "react-router-dom";
import company from "../../utils/stores/company";
import { observer } from "mobx-react-lite";
import "./Navigation.scss";

const Navigation: React.FC = observer(() => {
  return (
    <nav className="navigation">
      <NavLink to={company.token ? "/employees" : "/login"}>
        {company.token ? "EMPLOYEES" : "LOG IN"}
      </NavLink>
      <NavLink to={company.token ? "/projects" : "/registration"}>
        {company.token ? "PROJECTS" : "REGISTRATION"}
      </NavLink>
      {company.token && <NavLink to="/chat"> CHAT </NavLink>}
      {company.token && <NavLink to="/newemployee"> ADD EMPLOYEE </NavLink>}
      {company.token && <NavLink to="/newproject"> ADD PROJECT </NavLink>}
    </nav>
  );
});

export default Navigation;
