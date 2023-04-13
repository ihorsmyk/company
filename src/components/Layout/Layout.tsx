import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import Container from "../Container/Container";
import Header from "../Header/Header";
import Loader from "../Loader/Loader";

const Layout: React.FC = () => {
  return (
    <Container>
      <Header />
      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
    </Container>
  );
};

export default Layout;
