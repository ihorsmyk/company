import { observer } from "mobx-react-lite";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { addProject } from "../../utils/services/companyAPI";
import company from "../../utils/stores/company";
import "./AddProjectFormPage.scss";
import Loader from "../../components/Loader/Loader";
import { toast } from "react-toastify";

const AddProjectFormPage: React.FC = observer(() => {
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const [projectInfo, setProjectInfo] = useState<any>({
    name: "",
  });

  const addNewProject = async (projectInfo: any): Promise<void> => {
    try {
      company.setIsLoading(true);
      const response = await addProject(projectInfo);
      if (response.status === 201) {
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

  const handleSubmit = (e: any) => {
    e.preventDefault();
    addNewProject(projectInfo);
    company.cleanProjectList();
    navigate("/");
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setProjectInfo((prev: any) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if (!error) return;
    toast.error(error, {
      autoClose: 2000,
    });
  }, [error]);

  return (
    <>
      {company.isLoading && <Loader />}
      <form className="add-project-form" onSubmit={handleSubmit}>
        <label>
          name:
          <input
            className="add-project-form__input"
            autoComplete="off"
            type="text"
            name="name"
            value={projectInfo.name}
            onChange={handleChange}
          />
        </label>
        <Link className="add-project-form__go-back" to={"/projects"}>
          CANCEL
        </Link>

        <button className="add-project-form__btn" type="submit">
          Submit
        </button>
      </form>
    </>
  );
});

export default AddProjectFormPage;
