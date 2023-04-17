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
import "./UpdateProjectPage.scss";

const UpdateProjectPage: React.FC = observer(() => {
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
      company.setError(error.message);
    } finally {
      company.setIsLoading(false);
    }
  };

  const updateProjectInfo = async (projectId: number, projectInfo: any) => {
    try {
      company.setIsLoading(true);
      const response = await updateProjectById(projectId, projectInfo);
      console.log(response);
    } catch (error: any) {
      company.setError(error.message);
    } finally {
      company.setIsLoading(false);
    }
  };

  useEffect(() => {
    getProjectInfo(Number(projectId));
  }, [projectId]);

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
      <Link className="project__go-back" to={"/projects"}>
        CANCEL
      </Link>

      {company.isLoading && <Loader />}

      <form onSubmit={handleSubmit}>
        <label>
          project name:
          <input
            type="text"
            id="name"
            name="name"
            value={projectInfo?.name}
            onChange={handleChange}
          />
        </label>
        <button type="submit">update</button>
      </form>
    </>
  );
});

export default UpdateProjectPage;
