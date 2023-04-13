import { Route, Routes } from "react-router-dom";
import Loader from "../Loader/Loader";
import Layout from "../Layout/Layout";
import EmployeeListPublicPage from "../../pages/EmployeeListPublicPage/EmployeeListPublicPage";
import PublicRoute from "../PublicRoute/PublicRoute";
import Registration from "../../pages/Registration/Registration";
import Login from "../../pages/Login/Login";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import EmployeeListPrivatePage from "../../pages/EmployeeListPrivatePage/EmployeeListPrivatePage";
import Projects from "../../pages/Projects/Projects";
import Chat from "../../pages/Chat/Chat";
import Home from "../../pages/Home/Home";
import company from "../../store/company";
import EmployeeDetails from "../../pages/EmployeeDetails/EmployeeDetails";
import ProjectDetails from "../../pages/ProjectDetails/ProjectDetails";

const App: React.FC = () => {
  const isLoading: boolean = company.isLoading;

  return (
    <>
      {isLoading && <Loader />}

      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<EmployeeListPublicPage />} />
          <Route path="/" element={<PublicRoute />}>
            <Route path="employee" element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="registration" element={<Registration />} />
          </Route>
          <Route path="/" element={<PrivateRoute />}>
            <Route path="employees" element={<EmployeeListPrivatePage />} />
            <Route path="employees/:employeeId/*" element={<EmployeeDetails />} />
            <Route path="projects" element={<Projects />} />
            <Route path="projects/:projectId/*" element={<ProjectDetails />} />
            <Route path="chat" element={<Chat />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
};

export default App;

