import { Route, Routes } from "react-router";
import Container from "../components/Container";
import ListPage from "./ListPage";
import Login from "./Login";
import Signup from "./Signup";
import Test from "./Test";

function Pages() {
  return (
    <Container fluid={`lg`}>
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="test" element={<Test />} />
        <Route path="listpage" element={<ListPage />} />
      </Routes>
    </Container>
  );
}

export default Pages;
