import { Outlet } from "react-router";
import Container from "../components/Container";
import Stack from "../components/Stack/index.jsx";
import Footer from "./Footer.jsx";
import Header from "./Header.jsx";
import ChatPopup from "../components/Chats/ChatPopup.jsx";
import { ChatProvider } from "../hooks/contexts/ChatContext.jsx";
import { useAuth } from "../hooks/contexts/AuthContext.jsx";

function Layout() {
  const { user } = useAuth();

  return (
    <ChatProvider>
      <Stack direction={`v`} gap={5} className="min-vh-100">
        <Header />
        <Container fluid={`lg`}>
          <Outlet />
          {user && user.id && <ChatPopup userId={user.id} />}
        </Container>
        <Footer />
      </Stack>
    </ChatProvider>
  );
}

export default Layout;