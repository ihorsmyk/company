import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { ProjectType } from "../../utils/types/project";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import {
  deleteProjectById,
  getProjectById,
} from "../../utils/services/companyAPI";
import Loader from "../../components/Loader/Loader";
import company from "../../utils/stores/company";
import "./ProjectDetails.scss";
import IsSureModal from "../../components/IsSureModal/IsSureModal";

const ProjectDetails: React.FC = observer(() => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const [projecttInfo, setProjectInfo] = useState<ProjectType | undefined>(
    undefined
  );
  const location = useLocation();
  const { projectId } = useParams();

  const handleDeleteProject = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleConfirmDelete = () => {
    (async (projectId: number) => {
      try {
        company.setIsLoading(true);
        const response = await deleteProjectById(projectId);
        console.log(response);
      } catch (error: any) {
        company.setError(error.message);
      } finally {
        company.setIsLoading(false);
        navigate("/");
      }
    })(Number(projectId));

    setIsModalOpen(false);
  };

  const getProjectInfo = async (projectId: number) => {
    try {
      company.setIsLoading(true);
      const receivedProjectInfo: ProjectType | undefined = await getProjectById(
        projectId
      );
      setProjectInfo(receivedProjectInfo);
    } catch (error: any) {
      company.setError(error.message);
    } finally {
      company.setIsLoading(false);
    }
  };

  useEffect(() => {
    getProjectInfo(Number(projectId));
  }, [projectId]);

  return (
    <>
      <Link className="project__go-back" to={location?.state?.from ?? "/"}>
        GO BACK
      </Link>

      {company.isLoading && <Loader />}

      <div className="project">
        <h2 className="project__name"> {projecttInfo?.name} </h2>
      </div>

      <Link className="project__update" to={"updateproj"}>
        UPDATE
      </Link>

      <button
        className="project__delete"
        type="submit"
        onClick={handleDeleteProject}
      >
        DELETE
      </button>

      <IsSureModal
        isOpen={isModalOpen}
        onCancel={handleCancel}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
});

export default ProjectDetails;
