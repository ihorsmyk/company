import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { addEpmloyee } from "../../utils/services/companyAPI";
import { Position } from "../../utils/enums/position";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import company from "../../utils/stores/company";
import Loader from "../../components/Loader/Loader";
import "./AddEmployeeFormPage.scss";
import { toast } from "react-toastify";

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
      console.log(response);
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

      <form className="add-employee-form" onSubmit={handleSubmit}>
        <label>
          name:
          <input
            className="add-employee-form__firstname"
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
            className="add-employee-form__lastname"
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
            className="add-employee-form__email"
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
            className="add-employee-form__position"
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

        <Link className="add-employee__go-back" to={"/employees"}>
          CANCEL
        </Link>

        <button className="add-employee-form__btn" type="submit">
          Submit
        </button>
      </form>
    </>
  );
});

export default AddEmployeeFormPage;
