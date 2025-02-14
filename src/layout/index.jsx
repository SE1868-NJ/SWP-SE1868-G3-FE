import { Outlet } from "react-router";
import Container from "../components/Container";
import Stack from "../components/Stack/index.jsx";
import Footer from "./Footer.jsx";
import Header from "./Header.jsx";

function Layout() {
  return (
    <Stack direction={`v`} gap={5} className="min-vh-100">
      <Header />
      <Container fluid={`lg`}>
        <Outlet />
      </Container>
      <Footer />
    </Stack>
  );
}

export default Layout;
