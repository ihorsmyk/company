import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { BsFillArrowLeftSquareFill } from "react-icons/bs";
import { ProjectType } from "../../utils/types/project";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import {
  deleteProjectById,
  getProjectById,
} from "../../utils/services/companyAPI";
import Loader from "../../components/Loader/Loader";
import company from "../../utils/stores/company";
import IsSureModal from "../../components/IsSureModal/IsSureModal";
import { toast } from "react-toastify";
import "./ProjectDetails.scss";

const ProjectDetails: React.FC = observer(() => {
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const [projecttInfo, setProjectInfo] = useState<ProjectType | undefined>(
    undefined
  );
  const location = useLocation();
  const { projectId } = useParams();

  const handleDeleteProject = (): void => {
    setIsModalOpen(true);
  };

  const handleCancel = (): void => {
    setIsModalOpen(false);
  };

  const handleConfirmDelete = (): void => {
    (async (projectId: number) => {
      try {
        company.setIsLoading(true);
        const response = await deleteProjectById(projectId);
        console.log(response);
      } catch (error: any) {
        setError(error.message);
      } finally {
        company.setIsLoading(false);
        navigate("/");
      }
    })(Number(projectId));

    setIsModalOpen(false);
  };

  const getProjectInfo = async (projectId: number): Promise<void> => {
    try {
      company.setIsLoading(true);
      const receivedProjectInfo: ProjectType | undefined = await getProjectById(
        projectId
      );
      setProjectInfo(receivedProjectInfo);
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

  return (
    <>
      {company.isLoading && <Loader />}

      <div data-aos="fade-up" data-aos-duration="800" className="project">
        <Link className="project__go-back" to={location?.state?.from ?? "/"}>
          <BsFillArrowLeftSquareFill size="33px" />
        </Link>

        <h2 className="project__name">
          <span className="project__span">project name: </span>
          {projecttInfo?.name}
        </h2>

        <div className="project__btns">
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

export default ProjectDetails;
