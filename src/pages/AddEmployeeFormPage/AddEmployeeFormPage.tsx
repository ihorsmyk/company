import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { addEpmloyee } from "../../utils/services/companyAPI";
import { Position } from "../../utils/enums/position";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import company from "../../utils/stores/company";
import Loader from "../../components/Loader/Loader";
import { toast } from "react-toastify";
import "./AddEmployeeFormPage.scss";

const AddEmployeeFormPage: React.FC = observer(() => {
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const [employeeInfo, setEmployeeInfo] = useState<any>({
    firstName: "",
    lastName: "",
    email: "",
    position: Position.FRONTEND,
  });

  const addNewEmployee = async (employeeInfo: any): Promise<void> => {
    try {
      company.setIsLoading(true);
      const response = await addEpmloyee(employeeInfo);
      if (response.status === 201) {
        toast.success("added successfully", {
          autoClose: 2000,
        });
      }
    } catch (error: any) {
      setError(error.message);
    } finally {
      company.setIsLoading(false);
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    addNewEmployee(employeeInfo);
    company.cleanEmployeeList();
    navigate("/");
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setEmployeeInfo((prev: any) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if (!error) return;
    toast.error(error);
  }, [error]);

  return (
    <>
      {company.isLoading && <Loader />}

      <form className="form" onSubmit={handleSubmit}>
        <label className="form__label">
          name:
          <input
            className="form__input"
            autoComplete="off"
            type="text"
            name="firstName"
            value={employeeInfo.firstName}
            onChange={handleChange}
          />
        </label>
        <label>
          surname:
          <input
            className="form__input"
            autoComplete="off"
            type="text"
            name="lastName"
            value={employeeInfo.lastName}
            onChange={handleChange}
          />
        </label>
        <label>
          email:
          <input
            className="form__input"
            autoComplete="off"
            type="email"
            name="email"
            value={employeeInfo.email}
            onChange={handleChange}
          />
        </label>

        <label>
          position:
          <select
            className="form__input"
            name="position"
            onChange={handleChange}
            id="position"
          >
            <option value={Position.FRONTEND}> FRONTEND</option>
            <option value={Position.BACKEND}> BACKEND</option>
            <option value={Position.DEVOPS}> DEVOPS</option>
            <option value={Position.MANAGER}> MANAGER</option>
            <option value={Position.HR}> HR</option>
          </select>
        </label>
        <div className="form__btns">
          <button className="form__ok" type="submit">
            ADD
          </button>
          <Link className="form__cancel" to={"/employees"}>
            CANCEL
          </Link>
        </div>
      </form>
    </>
  );
});

export default AddEmployeeFormPage;
