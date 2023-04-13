import AdminMenu from "../AdminMenu/AdminMenu";
import Logo from "../Logo/Logo";
import Navigation from "../Navigation/Navigation";
import company from "../../store/company";
import "./Header.scss";

const Header: React.FC = () => {
  const token: boolean = company.token;
  return (
    <header className="header">
      <Logo />
      <Navigation />
      {token && <AdminMenu />}
    </header>
  );
};

export default Header;
