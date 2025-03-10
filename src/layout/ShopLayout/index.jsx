import { Outlet } from "react-router";
import Footer from "./Footer.jsx";
import Header from "./Header.jsx";
import ChatPopup from "../../components/Chats/ChatPopup.jsx";
import { ChatProvider } from "../../hooks/contexts/ChatContext.jsx";
import { useAuth } from "../../hooks/contexts/AuthContext.jsx";

function ShopLayout() {
  const { user } = useAuth();
  return (
    <ChatProvider>
      <Header />
      <Outlet />
      <ChatPopup userId={user.id} />
      <Footer />
    </ChatProvider>
  );
}

export default ShopLayout;
