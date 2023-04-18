import { observer } from "mobx-react-lite";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import company from "../../utils/stores/company";
import { ProjectType } from "../../utils/types/project";
import {
  getProjectById,
  updateProjectById,
} from "../../utils/services/companyAPI";
import Loader from "../../components/Loader/Loader";
import { toast } from "react-toastify";
import "./UpdateProjectPage.scss";

const UpdateProjectPage: React.FC = observer(() => {
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const [projectInfo, setProjectInfo] = useState<any>({
    name: "",
  });

  const { projectId } = useParams();

  const getProjectInfo = async (projectId: number) => {
    try {
      company.setIsLoading(true);
      const receivedProjectInfo: ProjectType = await getProjectById(projectId);
      const info = {
        name: receivedProjectInfo.name,
      };
      setProjectInfo(info);
    } catch (error: any) {
      setError(error.message);
    } finally {
      company.setIsLoading(false);
    }
  };

  const updateProjectInfo = async (projectId: number, projectInfo: any) => {
    try {
      company.setIsLoading(true);
      const response = await updateProjectById(projectId, projectInfo);
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
    getProjectInfo(Number(projectId));
  }, [projectId]);

  useEffect(() => {
    if (!error) return;
    toast.error(error, {
      autoClose: 2000,
    });
  }, [error]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target);
    const { name, value } = e.target;
    setProjectInfo((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateProjectInfo(Number(projectId), projectInfo);
    company.cleanProjectList();
    navigate("/");
  };

  return (
    <>
      {company.isLoading && <Loader />}

      <form className="form" onSubmit={handleSubmit}>
        <label className="form__label">
          project name:
          <input
            className="form__input"
            type="text"
            id="name"
            name="name"
            value={projectInfo?.name}
            onChange={handleChange}
          />
        </label>
        <div className="form__btns">
          <button className="form__ok" type="submit">
            UPDATE
          </button>

          <Link className="form__cancel" to={"/projects"}>
            CANCEL
          </Link>
        </div>
      </form>
    </>
  );
});

export default UpdateProjectPage;
