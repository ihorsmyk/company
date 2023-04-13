import { NavLink } from "react-router-dom";
import company from "../../store/company";
import "./Navigation.scss";

const Navigation: React.FC = () => {
  const token: boolean = company.token;
  return (
    <nav className="navigation">
      <NavLink to={token ? "/employees" : "/login"}>
        {token ? "EMPLOYEES" : "LOG IN"}
      </NavLink>
      <NavLink to={token ? "/projects" : "registration"}>
        {token ? "PROJECTS" : "REGISTRATION"}
      </NavLink>
      {token && <NavLink to="/chat"> CHAT </NavLink>}
    </nav>
  );
};

export default Navigation;
