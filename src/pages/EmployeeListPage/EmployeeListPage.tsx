import { Link, useLocation } from "react-router-dom";
import { useEffect, useState, FC } from "react";
import { toast } from "react-toastify";
import { observer } from "mobx-react-lite";
import company from "../../utils/stores/company";
import Loader from "../../components/Loader/Loader";
import { EmployeeType } from "../../utils/types/employee";
import "./EmployeeListPage.scss";

const EmployeeListPage: FC = observer(() => {
  const [error, setError] = useState<string | null>(null);
  const location = useLocation();
  const [page, setPage] = useState(0);

  const getEmployees = async (page: number): Promise<void> => {
    try {
      company.setIsLoading(true);
      await company.fetchEmployees(page);
    } catch (error: any) {
      setError(error.message);
    } finally {
      company.setIsLoading(false);
    }
  };

  useEffect(() => {
    getEmployees(page);
  }, [page]);

  useEffect(() => {
    if (!error) return;
    toast.error(error, {
      autoClose: 2000,
    });
  }, [error]);

  const handleChangePage = () => {
    setPage((prev) => prev + 1);
  };

  return (
    <>
      {company.isLoading && <Loader />}
      <ul className="employee-list">
        {company.employeeList?.map((e: EmployeeType) => {
          return (
            <li
              key={e.id}
              className="employee-list__item"
            >
              <Link
                // data-aos="zoom-out"
                // data-aos-duration="500"
                state={{ from: location }}
                to={String(e.id)}
                className="employee-list__link"
              >
                <h2 className="employee-list__fullname">
                  {e?.firstName + " " + e?.lastName}
                </h2>
                <p className="employee-list__position">{e?.position}</p>
              </Link>
            </li>
          );
        })}
      </ul>

      {company.employeeList.length < company.totalEmployees && (
        <button className="employee-list__more" onClick={handleChangePage}>
          LOAD MORE
        </button>
      )}
    </>
  );
});

export default EmployeeListPage;
