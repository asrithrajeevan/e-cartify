import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Screen/Home";
import Cart from "./components/Screen/Cart";
import Register from "./components/Screen/Admin/register";
import Login from "./components/Screen/Admin/login";
import AddProductForm from "./components/Screen/Admin/addproduct";
import DeleteItem from "./components/Screen/Admin/deleteproduct";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* Use the Routes component to define routes */}
                <Route path="/home" element={<Home />} /> {/* Specify the exact path for the Home component */}
                <Route path="/cart" element={<Cart />} />
                <Route path="/admin/register" element={<Register />} />
                <Route path="/admin/login" element={<Login />} />
                <Route path="/admin/add-product" element={<AddProductForm />} />
                <Route path="/admin/delete-product" element={<DeleteItem />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
