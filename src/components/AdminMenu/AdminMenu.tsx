import { observer } from "mobx-react-lite";
import company from "../../store/company";
import "./AdminMenu.scss";

const AdminMenu: React.FC = observer(() => {
  const name: string = company.admin; //TO DO

  return (
    <div className="admin-menu">
      <p className="admin-menu__name">{name}</p>
      <button
        type="button"
        onClick={() => company.setToken(false)}
        className="admin-menu__btn"
      >
        Sign Out
      </button>
    </div>
  );
});

export default AdminMenu;
