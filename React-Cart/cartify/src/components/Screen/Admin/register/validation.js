import React from "react";

function validation(values) {
    var error = {
        firstName :"",
        lastName : "",
        email : "",
        password : "",
        confirmPassword:""
    };

    if (values.firstName === "") {
        error.firstName = "The first name should not be null";
    }
    if (values.lastName === "") {
        error.lastName = "The last name should not be null";
    }
    if (!validateEmail(values.email)) {
        error.email = "Enter a valid email";
    }
    if (!validatePassword(values.password)) {
        error.password =
            "Password must have a minimum length of 5 characters and at least one special character from the set !@#$%^&*\n and at least one digit.";
    }
    if (String(values.password) !== String(values.confirmPassword)) {
        error.confirmPassword = "The password did'nt march";
    }
    return error;
}

function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function validatePassword(password) {
    // Regular expression to match password criteria
    const regex = /^(?=.*[!@#$%^&*])(?=.*[0-9]).{5,}$/;

    // Test the password against the regular expression
    return regex.test(password);
}

export default validation;
