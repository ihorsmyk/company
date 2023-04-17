import AdminMenu from "../AdminMenu/AdminMenu";
import Logo from "../Logo/Logo";
import Navigation from "../Navigation/Navigation";
import company from "../../utils/stores/company";
import { observer } from "mobx-react-lite";
import "./Header.scss";

const Header: React.FC = observer(() => {
  return (
    <header className="header">
      <Logo />
      <Navigation />
      {company.token && <AdminMenu />}
    </header>
  );
});

export default Header;
