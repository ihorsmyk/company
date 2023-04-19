import { Link, useNavigate, useParams } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { EmployeeType } from "../../utils/types/employee";
import {
  getEmployeeById,
  updateEmployeeById,
} from "../../utils/services/companyAPI";
import company from "../../utils/stores/company";
import Loader from "../../components/Loader/Loader";
import { Position } from "../../utils/enums/position";
import { toast } from "react-toastify";
import "./UpdateEmployeePage.scss";

const UpdateEmployeePage: React.FC = observer(() => {
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const [employeeInfo, setEmployeeInfo] = useState<any>({
    firstName: "",
    lastName: "",
    email: "",
    position: Position.FRONTEND,
  });

  const { employeeId } = useParams();

  const getEmployeeInfo = async (employeeId: number) => {
    try {
      company.setIsLoading(true);
      const receivedEmployeeInfo: EmployeeType = await getEmployeeById(
        employeeId
      );
      const info = {
        firstName: receivedEmployeeInfo.firstName,
        lastName: receivedEmployeeInfo.lastName,
        email: receivedEmployeeInfo.email,
        position: receivedEmployeeInfo.position,
      };
      setEmployeeInfo(info);
    } catch (error: any) {
      setError(error.message);
    } finally {
      company.setIsLoading(false);
    }
  };

  const updateEmployeeInfo = async (
    employeeId: number,
    employeeInfo: any
  ): Promise<void> => {
    try {
      company.setIsLoading(true);
      const response = await updateEmployeeById(employeeId, employeeInfo);
      if (response.status === 200) {
        toast.success("updated successfully", {
          autoClose: 2000,
        });
      }
    } catch (error: any) {
      setError(error.message);
    } finally {
      company.setIsLoading(false);
    }
  };

  useEffect(() => {
    getEmployeeInfo(Number(employeeId));
  }, [employeeId]);

  useEffect(() => {
    if (!error) return;
    toast.error(error, {
      autoClose: 2000,
    });
  }, [error]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setEmployeeInfo((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    updateEmployeeInfo(Number(employeeId), employeeInfo);
    company.cleanEmployeeList();
    navigate("/");
  };

  return (
    <>
      {company.isLoading && <Loader />}

      <form className="form" onSubmit={handleSubmit}>
        <label className="form__label">
          first name:
          <input
            className="form__input"
            type="text"
            id="firstName"
            name="firstName"
            value={employeeInfo?.firstName}
            onChange={handleChange}
          />
        </label>
        <label className="form__label">
          last name:
          <input
            className="form__input"
            type="text"
            id="lastName"
            name="lastName"
            value={employeeInfo?.lastName}
            onChange={handleChange}
          />
        </label>
        <label className="form__label">
          email:
          <input
            className="form__input"
            type="email"
            id="email"
            name="email"
            value={employeeInfo?.email}
            onChange={handleChange}
          />
        </label>
        <label className="form__label">
          position:
          <select
            className="form__select"
            id="position"
            name="position"
            value={employeeInfo?.position}
            onChange={handleChange}
          >
            <option value={Position.FRONTEND}>FRONTEND</option>
            <option value={Position.BACKEND}>BACKEND</option>
            <option value={Position.DEVOPS}>DEVOPS</option>
            <option value={Position.MANAGER}>MANAGER</option>
            <option value={Position.HR}>HR</option>
          </select>
        </label>
        
        <div className="form__btns">
          <button className="form__ok" type="submit">
            UPDATE
          </button>

          <Link className="form__cancel" to={"/employees"}>
            CANCEL
          </Link>
        </div>
      </form>
    </>
  );
});

export default UpdateEmployeePage;
