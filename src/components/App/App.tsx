import { Route, Routes } from "react-router-dom";
import { lazy, Suspense, FC } from "react";
import { ToastContainer } from "react-toastify";
import Loader from "../Loader/Loader";
import Layout from "../Layout/Layout";
import PublicRoute from "../PublicRoute/PublicRoute";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import "react-toastify/dist/ReactToastify.css";

const Home = lazy(() => import("../../pages/Home/Home"));
const Login = lazy(() => import("../../pages/Login/Login"));
const Registration = lazy(
  () => import("../../pages/Registration/Registration")
);
const EmployeeListPage = lazy(
  () => import("../../pages/EmployeeListPage/EmployeeListPage")
);
const EmployeeDetails = lazy(
  () => import("../../pages/EmployeeDetails/EmployeeDetails")
);
const UpdateEmployeePage = lazy(
  () => import("../../pages/UpdateEmployeePage/UpdateEmployeePage")
);
const AddEmployeeFormPage = lazy(
  () => import("../../pages/AddEmployeeFormPage/AddEmployeeFormPage")
);
const ProjectListPage = lazy(
  () => import("../../pages/ProjectsListPage/ProjectsListPage")
);
const ProjectDetails = lazy(
  () => import("../../pages/ProjectDetails/ProjectDetails")
);
const UpdateProjectPage = lazy(
  () => import("../../pages/UpdateProjectPage/UpdateProjectPage")
);
const AddProjectFormPage = lazy(
  () => import("../../pages/AddProjectFormPage/AddProjectFormPage")
);
const NotFound = lazy(() => import("../../pages/NotFound/NotFound"));
const Chat = lazy(() => import("../../pages/Chat/Chat"));

const App: FC = () => {
  return (
    <>
      <ToastContainer />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/" element={<PublicRoute />}>
              <Route path="login" element={<Login />} />
              <Route path="registration" element={<Registration />} />
            </Route>
            <Route path="/" element={<PrivateRoute />}>
              <Route path="employees" element={<EmployeeListPage />} />
              <Route
                path="employees/:employeeId/*"
                element={<EmployeeDetails />}
              />
              <Route
                path="employees/:employeeId/updateemp"
                element={<UpdateEmployeePage />}
              />
              <Route path="newemployee" element={<AddEmployeeFormPage />} />
              <Route path="projects" element={<ProjectListPage />} />
              <Route
                path="projects/:projectId/*"
                element={<ProjectDetails />}
              />
              <Route
                path="projects/:projectId/updateproj"
                element={<UpdateProjectPage />}
              />
              <Route path="newproject" element={<AddProjectFormPage />} />
              <Route path="chat" element={<Chat />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </>
  );
};

export default App;
