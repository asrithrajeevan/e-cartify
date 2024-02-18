import { Link } from "react-router-dom";
import "./style.css";
import { useSelector } from "react-redux";

const NavBar = () => {
    const cartCount = useSelector((state) => state.cart.cartCount);
    console.log("cartCountFromNav--->", cartCount);
    var isValue = false;
    if (cartCount > 0) {
        isValue = true;
    }
    return (
        <div>
            {/* Navbar */}
            <div className="navbar">
                <div className="navbar-title">Cartify</div>
                <div className="navbar-links">
                    <Link to="/admin/login">Login</Link>
                    <Link to="/home">Home</Link>
                    <div className="cart-container">
                        {isValue ? <div className="cart-count">{cartCount}</div> : null}
                        <Link to="/cart">Cart</Link>
                    </div>
                    <div className="search-bar">
                        {/* Implement your search bar component here */}
                        {/* For simplicity, let's just use a basic input */}
                        <input type="text" placeholder="Search..." />
                        <button style={{ width: 70 }}>Search</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NavBar;
