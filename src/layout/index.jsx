import { Outlet } from "react-router";
import Container from "../components/Container";
import Stack from "../components/Stack/index.jsx";
import Footer from "./Footer.jsx";
import Header from "./Header.jsx";
import ChatPopup from "../components/Chats/ChatPopup.jsx";
import { ChatProvider } from "../hooks/contexts/ChatContext.jsx";

function Layout() {
  return (
    <ChatProvider>
    <Stack direction={`v`} gap={5} className="min-vh-100">
      <Header />
      <Container fluid={`lg`}>
        <Outlet />
        <ChatPopup userId={15} />
      </Container>
      <Footer />
    </Stack>
    </ChatProvider>
  );
}

export default Layout;
