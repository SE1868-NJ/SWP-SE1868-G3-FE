import { Outlet } from "react-router-dom";
import Header from "./Header";
import { CartProvider } from "../../hooks/contexts/CartContext";

function CartLayout() {
    return (
        <CartProvider>
            <div className="vstack">
                <Header />
                <div style={{ padding: "12px" }}>
                    <Outlet /> {/* Render nội dung của các trang con */}
                </div>
            </div>
        </CartProvider>
    );
}

export default CartLayout;
