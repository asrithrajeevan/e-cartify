import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "react-bootstrap/esm/Table";
import bin from "../../../Common/images/bin.png";
import Swal from "sweetalert2";

const DeleteItem = () => {
    const [products, setProducts] = useState([]);
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
    });
    const deleteItem = (id) => {
        const pid = { productid: id };
        try {
            axios
                .post("http://localhost:8081/delete", pid)
                .then((res) => {
                    if (res.data.message) {
                        Swal.fire({
                            text: "Product successfully deleted",
                            icon: "success",
                            showConfirmButton: false, // Remove the "OK" button
                            timer: 2000,
                        });
                    }
                })
                .catch((err) => console.log(err));
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    return (
        <div className="p-4">
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th style={{ width: 250, textAlign: "center" }}>Product ID</th>
                        <th style={{ width: 250, textAlign: "center" }}>Product Name</th>
                        <th style={{ width: 250, textAlign: "center" }}>Product Amount</th>
                        <th style={{ width: 250, textAlign: "center" }}>Product image</th>
                        <th style={{ width: 250, textAlign: "center" }}>Remove</th>
                    </tr>
                </thead>
            </Table>
            {products.map((item, id) => {
                return (
                    <Table striped bordered hover>
                        <tbody>
                            <tr>
                                <td style={{ width: 250, textAlign: "center" }}>{item.id}</td>
                                <td style={{ width: 250, textAlign: "center" }}>{item.productName}</td>
                                <td style={{ width: 250, textAlign: "center" }}>₹ {item.amount}.00/-</td>
                                <td style={{ width: 250, textAlign: "center" }}>
                                    <img
                                        src={`http://localhost:8081/${item.image}`}
                                        alt={item.productName}
                                        width={45}
                                        height={40}
                                    />
                                </td>
                                <td style={{ width: 250, textAlign: "center" }}>
                                    <button className="bin-button" onClick={() => deleteItem(item.id)}>
                                        <img className="bin-image" src={bin} width={40} height={40} alt={item.id} />
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                );
            })}
        </div>
    );
};

export default DeleteItem;
