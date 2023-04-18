import { FC } from "react";
import { observer } from "mobx-react-lite";
import company from "../../utils/stores/company";
import AdminMenu from "../AdminMenu/AdminMenu";
import Logo from "../Logo/Logo";
import Navigation from "../Navigation/Navigation";
import "./Header.scss";

const Header: FC = observer(() => {
  return (
    <header className="header container">
      <Logo />
      <Navigation />
      {company.token && <AdminMenu />}
    </header>
  );
});

export default Header;
