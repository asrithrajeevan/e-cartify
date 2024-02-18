import React, { useState } from "react";
import axios from "axios";
import "./style.css";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const AddProductForm = () => {
    const [productValues, setProductValues] = useState({
        productId: Date.now(),
        productName: "",
        amount: "",
        image: null,
        category: "",
    });

    const handleInput = (event) => {
        setProductValues((prev) => ({ ...prev, [event.target.id]: event.target.value }));
    };

    const handleImageChange = (event) => {
        setProductValues((prev) => ({ ...prev, image: event.target.files[0] }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append("productId", productValues.productId);
            formData.append("productName", productValues.productName);
            formData.append("amount", productValues.amount);
            formData.append("image", productValues.image);
            formData.append("category", productValues.category);

            // Send form data to backend using Axios

            axios
                .post("http://localhost:8081/upload", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                })
                .then((res) => {
                    Swal.fire({
                        text: "item added successfully",
                        icon: "success",
                        showConfirmButton: false, // Remove the "OK" button
                        timer: 2000,
                    });
                    // Reset form fields after submission
                    setProductValues({
                        productId: Date.now(),
                        productName: "",
                        amount: "",
                        image: null,
                        category: "",
                    });
                })
                .catch((err) => {
                    console.log(err);
                });
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div className="container-bg">
            <div className="container form-container mt-4 p-5" style={{ width: 500 }}>
                <form onSubmit={handleSubmit}>
                    <h2 className="mb-4" style={{ textAlign: "center" }}>
                        Add Product
                    </h2>
                    <div className="mb-4">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Product Name"
                            id="productName"
                            name="productName"
                            value={productValues.productName}
                            onChange={handleInput}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Product Amount"
                            id="amount"
                            name="amount"
                            value={productValues.amount}
                            onChange={handleInput}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="file"
                            className="form-control"
                            id="image"
                            name="image"
                            onChange={handleImageChange}
                            accept="image/*"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="text"
                            className="form-control"
                            id="category"
                            name="category"
                            placeholder="Product Category"
                            value={productValues.category}
                            onChange={handleInput}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-success">
                        Add Product
                    </button>
                    <div className="mt-4" style={{ textAlign: "center" }}>
                        <Link to="/admin/delete-product">See All Product</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddProductForm;
