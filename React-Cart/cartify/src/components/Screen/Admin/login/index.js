import React, { useState } from "react";
import "./style.css"; // Import your CSS file for styling if needed
import validation from "./validation";
import axios from "axios";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { setAdminAuthToken } from "../../../store/action";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [userValues, setUserValues] = useState({
        email: "",
        password: "",
    });
    const [errors, setErrors] = useState({});
    const handleInput = (event) => {
        setUserValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        setErrors(validation(userValues));
        if (errors.email === undefined && errors.password === undefined) {
            axios
                .post("http://localhost:8081/login", userValues)
                .then((res) => {
                    if (res.data.token) {
                        dispatch(setAdminAuthToken(res.data.token)); // Dispatch action to set token in Redux
                        Swal.fire({
                            text: "Login successfull",
                            icon: "success",
                            showConfirmButton: false, // Remove the "OK" button
                            timer: 2000, // Display for 2 seconds (2000 milliseconds)
                        });
                        navigate("/admin/add-product");
                    } else {
                        alert(`No records exists, authentication ${res.data}`);
                    }
                })
                .catch((err) => console.log("err--->", err));
        }
    };

    return (
        <div className="register-title">
            <div className="register-container pt-4">
                <form onSubmit={handleSubmit} className="register-form">
                    <h2 className="mb-3">Sign in</h2>
                    <div className="form-group">
                        <input
                            placeholder="Email"
                            type="email"
                            id="email"
                            name="email"
                            value={userValues.email}
                            onChange={handleInput}
                            required
                        />
                        {errors.email && <span className="text-danger">{errors.email}</span>}
                    </div>
                    <div className="form-group" style={{ marginBottom: 50 }}>
                        <input
                            placeholder="Password"
                            type="password"
                            id="password"
                            name="password"
                            value={userValues.password}
                            onChange={handleInput}
                            required
                        />
                        {errors.password && <span className="text-danger">{errors.password}</span>}
                    </div>
                    <button className="btn btn-success mb-4" type="submit">
                        Login
                    </button>
                    <Link to="/admin/register">Dont'n you register..?</Link>
                </form>
            </div>
        </div>
    );
};

export default Login;
