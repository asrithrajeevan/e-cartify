// Home.js

import NavBar from "../../Common/NavBar";
import Banners from "./Banner";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, updateCartCount } from "../../store/action";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
    const cartItems = useSelector((state) => state.cart.items);
    const cartCount = useSelector((state) => state.cart.cartCount);
    const [products, setProducts] = useState([]);

    const dispatch = useDispatch();
    // const products = [
    //     {
    //         id: "1",
    //         name: "Shoes",
    //         amount: "400",
    //         image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    //     },
    //     {
    //         id: "2",
    //         name: "Shoes",
    //         amount: "3450",
    //         image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    //     },
    //     {
    //         id: "3",
    //         name: "Shoes",
    //         amount: "2345",
    //         image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    //     },
    //     {
    //         id: "3",
    //         name: "Shoes",
    //         amount: "1234",
    //         image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    //     },
    //     {
    //         id: "4",
    //         name: "Shoes",
    //         amount: "900",
    //         image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    //     },
    //     {
    //         id: "5",
    //         name: "Shoes",
    //         amount: "5000",
    //         image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    //     },
    //     {
    //         id: "5",
    //         name: "Shoes",
    //         amount: "4545",
    //         image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    //     },
    // ];

    useEffect(() => {
        // Fetch products from backend API
        const fetchProducts = async () => {
            try {
                const response = await axios.get("http://localhost:8081/products");
                setProducts(response.data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();
    }, []);

    console.log("products--->", products);

    const handleAddToCart = (props) => {
        props.quantity = 1;
        Swal.fire({
            text: "item added to cart",
            icon: "success",
            showConfirmButton: false, // Remove the "OK" button
            timer: 2000 
        });
        dispatch(addToCart(props));
        const itemID = [];
        cartItems.map((items) => {
            itemID.push(items.id);
        });

        const isInArray = itemID.includes(props.id);
        if (!isInArray) {
            dispatch(updateCartCount(cartCount + 1));
            console.log("unique item founded");
        }
    };
    return (
        <div>
            <NavBar />
            <Banners />
            {/* Main content of the Home page */}
            <div className="home-content">{/* Your home page content goes here */}</div>
            <div className="product-container">
                {products.map((product) => {
                    return (
                        <div className="product-item" key={product.id}>
                            <div className="image-container">
                                <img
                                    className="p-2"
                                    src={`http://localhost:8081/${product.image}`}
                                    alt={product.productName}
                                    width={250}
                                    height={200}
                                />
                            </div>
                            <div className="product-details p-2">
                                <p>Name: {product.name}</p>
                                <p>Price: ₹{product.amount}</p>
                            </div>
                            <div className="product-details p-2">
                                <button className="btn-custom">Buy</button>
                                <button
                                    className="btn-custom"
                                    onClick={() => {
                                        handleAddToCart(product);
                                    }}
                                >
                                    Add to cart
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Home;
