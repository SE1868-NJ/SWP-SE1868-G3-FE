import { Outlet } from "react-router-dom";
import Header from "./Header";
import ChatPopup from "../../components/Chats/ChatPopup.jsx";
import { CartProvider } from "../../hooks/contexts/CartContext";
import { ChatProvider } from "../../hooks/contexts/ChatContext.jsx";
import { useAuth } from "../../hooks/contexts/AuthContext.jsx";

function CartLayout() {
	const { user } = useAuth();
	return (
		<ChatProvider>
			<CartProvider>
				<div className="vstack">
					<Header />
					<div style={{ padding: "12px" }}>
						<Outlet />
						{user && user.id && <ChatPopup userId={user.id} />}
					</div>
				</div>
			</CartProvider>
		</ChatProvider>
	);
}

export default CartLayout;
