import { FC } from "react";
import { NavLink } from "react-router-dom";
import { observer } from "mobx-react-lite";
import company from "../../utils/stores/company";
import "./Navigation.scss";

const Navigation: FC = observer(() => {
  return (
    <nav className="navigation">
      <NavLink
        className="navigation__link"
        to={company.token ? "/employees" : "/login"}
      >
        {company.token ? "EMPLOYEES" : "LOG IN"}
      </NavLink>
      <NavLink
        className="navigation__link"
        to={company.token ? "/projects" : "/registration"}
      >
        {company.token ? "PROJECTS" : "REGISTRATION"}
      </NavLink>
      {company.token && (
        <NavLink className="navigation__link" to="/chat">
          CHAT
        </NavLink>
      )}
      {company.token && (
        <NavLink className="navigation__link" to="/newemployee">
          ADD EMPLOYEE
        </NavLink>
      )}
      {company.token && (
        <NavLink className="navigation__link" to="/newproject">
          ADD PROJECT
        </NavLink>
      )}
    </nav>
  );
});

export default Navigation;
