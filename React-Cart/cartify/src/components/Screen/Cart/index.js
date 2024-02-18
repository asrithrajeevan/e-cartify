import React, { useEffect, useState } from "react";
import NavBar from "../../Common/NavBar";
import { useDispatch, useSelector } from "react-redux";
import Table from "react-bootstrap/Table";
import "./style.css";
import bin from "../../Common/images/bin.png";
import { deleteCartItem, updateCartCount } from "../../store/action";
import EmptyCart from "../../Common/images/EmptyCart.jpg";
const Cart = () => {
    const cartItems = useSelector((state) => state.cart.items);
    const cartCount = useSelector((state) => state.cart.cartCount);
    const [data, getData] = useState([]);
    const [subTotal, setSubTotal] = useState();

    const dispatch = useDispatch();
    console.log("cartItems.length---->", cartItems.length);
    useEffect(() => {
        console.log("cartItems:", cartItems);
        getData(cartItems);
        calculateTotalAmount(cartItems);
    }, [cartItems]);

    const handleItemQnt = (item) => {
        alert("Are you sure wanna to remove the item from your cart...?");
        dispatch(deleteCartItem(item.id));
        dispatch(updateCartCount(cartCount - 1));
    };
    // finding the subtotal amount
    function calculateTotalAmount(items) {
        var totalAmount = 0;
        items.map((item) => {
            totalAmount += parseInt(item.amount) * item.quantity;
            console.log(`Total amount for item ${item.id}: ${totalAmount}`);
        });
        setSubTotal(totalAmount);
    }
    const quantityChanging = (e) => {
        console.log(e.target.value);
    };
    if (cartItems.length > 0) {
        return (
            <div>
                <NavBar />
                <div className="cart-table-container">
                    <Table striped hover style={{ textAlign: "center" }}>
                        <thead>
                            <tr>
                                <th style={{ width: 50 }}>ID</th>
                                <th style={{ width: 250 }}>Item Name</th>
                                <th style={{ width: 250 }}>Image</th>
                                <th style={{ width: 250 }}>Amount</th>
                                <th style={{ width: 250 }}>Quantity</th>
                                <th style={{ width: 250 }}>Total</th>
                                <th style={{ width: 50 }}>Remove</th>
                            </tr>
                        </thead>
                    </Table>
                    {data.map((item, id) => {
                        console.log(item);
                        const images = `http://localhost:8081/${item.image}`;
                        return (
                            <Table striped bordered hover>
                                <tbody>
                                    <tr>
                                        <td style={{ width: 80, textAlign: "center" }}>{id + 1}</td>
                                        <td style={{ width: 295, textAlign: "center" }}>{item.productName}</td>
                                        <td style={{ width: 295, textAlign: "center" }}>
                                            <img src={images} alt={item.productName} width={65} height={55} />
                                        </td>
                                        <td style={{ width: 295, textAlign: "center" }}>{item.amount}</td>
                                        <td style={{ width: 295, textAlign: "center" }}>
                                            <input
                                                type="number"
                                                value={item.quantity}
                                                width={2}
                                                min="1"
                                                onChange={(e) => quantityChanging(e)}
                                            />
                                        </td>
                                        <td style={{ width: 295, textAlign: "center" }}>{item.quantity * item.amount}</td>
                                        <td style={{ width: 80, textAlign: "center" }}>
                                            <button className="bin-button" onClick={() => handleItemQnt(item)}>
                                                <img className="bin-image" src={bin} width={40} height={40} alt={item.id} />
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>
                        );
                    })}
                    <div className="bottam-table">
                        <Table striped bordered style={{ alignItems: "end" }}>
                            <thead>
                                <tr>
                                    <th style={{ width: 250, color: "gray" }}>Delivery charge</th>
                                    <th style={{ width: 50, color: "gray" }}>₹00.00</th>
                                </tr>
                                <tr>
                                    <th style={{ width: 250, color: "gray" }}>Tax (-)</th>
                                    <th style={{ width: 50, color: "gray" }}>₹00.00</th>
                                </tr>
                                <tr>
                                    <th style={{ width: 250 }}>Sub Total</th>
                                    <th style={{ width: 50 }}>₹{subTotal}.00</th>
                                </tr>
                            </thead>
                        </Table>
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <div>
                <NavBar />
                <div className="EmptyCartContainer">
                    <img className="EmptyCart" src={EmptyCart} alt="bg" />
                </div>
            </div>
        );
    }
};

export default Cart;
