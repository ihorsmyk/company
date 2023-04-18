import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { BsFillArrowLeftSquareFill } from "react-icons/bs";
import { EmployeeType } from "../../utils/types/employee";
import {
  deleteEmployeeById,
  getEmployeeById,
} from "../../utils/services/companyAPI";
import Loader from "../../components/Loader/Loader";
import company from "../../utils/stores/company";
import IsSureModal from "../../components/IsSureModal/IsSureModal";
import { toast } from "react-toastify";
import "./EmployeeDetails.scss";

const EmployeeDetails: React.FC = observer(() => {
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const [employeeInfo, setEmployeeInfo] = useState<EmployeeType | undefined>(
    undefined
  );
  const location = useLocation();
  const { employeeId } = useParams();

  const handleDeleteEmployee = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleConfirmDelete = () => {
    (async (employeeId: number) => {
      try {
        company.setIsLoading(true);
        const response = await deleteEmployeeById(employeeId);
        if (response.status === 200) {
          toast.success("deleted successfully", {
            autoClose: 2000,
          });
        }
      } catch (error: any) {
        setError(error.message);
      } finally {
        company.setIsLoading(false);
        navigate("/");
      }
    })(Number(employeeId));

    company.cleanEmployeeList();
    setIsModalOpen(false);
  };

  const getEmployeeInfo = async (employeeId: number) => {
    try {
      company.setIsLoading(true);
      const receivedEmployeeInfo: EmployeeType | undefined =
        await getEmployeeById(employeeId);
      setEmployeeInfo(receivedEmployeeInfo);
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

  return (
    <>
      {company.isLoading && <Loader />}

      <div data-aos="fade-up" data-aos-duration="800" className="employee">
        <Link className="employee__go-back" to={location?.state?.from ?? "/"}>
          <BsFillArrowLeftSquareFill size="33px" />
        </Link>
        <h2 className="employee__fullname">
          <span className="employee__span">name: </span>
          {employeeInfo?.firstName + " " + employeeInfo?.lastName ||
            "not known"}
        </h2>
        <p className="employee__email">
          <span className="employee__span">email: </span>
          {employeeInfo?.email || "not known"}
        </p>
        <p className="employee__position">
          <span className="employee__span">position: </span>
          {employeeInfo?.position || "not known"}
        </p>
        <p className="employee__projects">
          <span className="employee__span">project: </span>
          {employeeInfo?.project?.name || "not yet assigned"}
        </p>

        <div className="employee__btns">
          <Link className="employee__update" to={"updateemp"}>
            UPDATE
          </Link>
          <button
            className="employee__delete"
            type="submit"
            onClick={handleDeleteEmployee}
          >
            DELETE
          </button>
        </div>
      </div>

      <IsSureModal
        isOpen={isModalOpen}
        onCancel={handleCancel}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
});

export default EmployeeDetails;
