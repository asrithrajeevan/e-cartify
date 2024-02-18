import React, { useEffect, useState } from "react";
import "./style.css"; // Import your CSS file for styling if needed
import validation from "./validation";
import axios from "axios";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

const Register = () => {
    const navigate = useNavigate();
    const [userValues, setUserValues] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [errors, setErrors] = useState({});

    const handleInput = (event) => {
        setUserValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
    };

    useEffect(() => {
        // Function to check for errors and submit the form
        const submitForm = () => {
            // Check if all fields are valid
            if (
                errors.firstName === "" &&
                errors.lastName === "" &&
                errors.email === "" &&
                errors.password === "" &&
                errors.confirmPassword === ""
            ) {
                // No errors, submit the form
                axios
                    .post("http://localhost:8081/register", userValues)
                    .then((res) => {
                        navigate("/admin/add-product");
                    })
                    .catch((err) => console.log("err--->", err));
            }
        };

        // Call the submitForm function whenever errors change
        submitForm();
    }, [errors]); // Run this effect whenever errors change

    const handleSubmit = (event) => {
        event.preventDefault();
        // Set errors based on the input values
        setErrors(validation(userValues));
    };

    return (
        <div className="register-title">
            <div className="register-container pt-4">
                <form onSubmit={handleSubmit} className="register-form">
                    <h2 className="pb-3">Sign Up</h2>
                    <div className="form-group">
                        <input
                            placeholder="First Name"
                            type="text"
                            id="firstName"
                            name="firstName"
                            value={userValues.firstName}
                            onChange={handleInput}
                            required
                        />
                        {errors.firstName && <span className="text-danger">{errors.firstName}</span>}
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="Last Name"
                            id="lastName"
                            name="lastName"
                            value={userValues.lastName}
                            onChange={handleInput}
                            required
                        />
                        {errors.lastName && <span className="text-danger">{errors.lastName}</span>}
                    </div>
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
                    <div className="form-group">
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
                    <div className="form-group">
                        <input
                            placeholder="Confirm Password"
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={userValues.confirmPassword}
                            onChange={handleInput}
                            required
                        />
                        {errors.confirmPassword && <span className="text-danger">{errors.confirmPassword}</span>}
                    </div>
                    <button className="btn btn-success mb-4" type="submit">
                        Register
                    </button>
                    <Link to="/admin/login">Login Account</Link>
                </form>
            </div>
        </div>
    );
};

export default Register;
