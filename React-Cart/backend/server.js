require("dotenv").config();

const jwt = require("jsonwebtoken");
const secretKey = process.env.JWT_SECRET_KEY;

const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const multer = require("multer");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

// Set up multer for file upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Specify the directory where uploaded files will be stored
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        // Specify the filename for uploaded files
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});
const upload = multer({ storage });

// Create our database connection
const db = mysql.createConnection({
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database,
});

// function for creating jwt tocken
const generateToken = (userId) => {
    return jwt.sign({ userId }, secretKey, { expiresIn: "1h" }); // Change userId to the actual user ID
};

app.post("/register", (req, res) => {
    const sql = "INSERT INTO admin_register(`firstname`, `lastname`, `email`, `password`) VALUES(?, ?, ?, ?)";
    const values = [req.body.firstName, req.body.lastName, req.body.email, req.body.password];
    db.query(sql, values, (err, data) => {
        if (err) {
            console.error("Error inserting into database:", err);
            return res.json("Error");
        }
        console.log("Data inserted successfully:", data);
        return res.json(data);
    });
});

app.post("/login", (req, res) => {
    const sql = "SELECT * FROM admin_register WHERE email = ? AND password = ?";
    db.query(sql, [req.body.email, req.body.password], (err, data) => {
        if (err) {
            return res.json("Error");
        }
        if (data.length > 0) {
            // User login successful, generate JWT token
            const token = generateToken(data[0].id); // Assuming user ID is stored in the 'id' field
            res.json({ token });
        } else {
            res.json("failed");
        }
    });
});

// File upload and database insertion endpoint
app.post("/upload", upload.single("image"), (req, res) => {
    // req.file contains information about the uploaded file
    if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
    }

    // Get other form data from the request body
    const { productName, amount, category } = req.body;

    // Insert form data and file path into the database
    const sqlInsert = "INSERT INTO products (productName, amount, image, category) VALUES (?, ?, ?, ?)";
    const values = [productName, amount, req.file.path, category];

    db.query(sqlInsert, values, (err, result) => {
        if (err) {
            console.error("Error inserting into database:", err);
            return res.status(500).json({ message: "Internal server error" });
        }
        console.log("Data inserted successfully:", result.insertId);

        // Fetch the inserted product from the database
        const productId = result.insertId;
        const sqlSelect = "SELECT * FROM products WHERE id = ?";

        db.query(sqlSelect, [productId], (err, rows) => {
            if (err) {
                console.error("Error fetching product from database:", err);
                return res.status(500).json({ message: "Internal server error" });
            }

            if (rows.length === 0) {
                return res.status(404).json({ message: "Product not found" });
            }

            const product = rows[0];
            return res.json(product);
        });
    });
});

// Serve static files from the "uploads" folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Endpoint to fetch all products from the db for listing the added product
app.get("/products", (req, res) => {
    const sql = "SELECT * FROM products";
    db.query(sql, (err, result) => {
        if (err) {
            console.error("Error fetching products:", err);
            res.status(500).json({ error: "Error fetching products" });
            return;
        }
        res.json(result);
    });
});

app.post("/delete", (req, res) => {
    // SQL query to delete the product with the given ID
    const sql = "DELETE FROM products WHERE id = ?";
    
    // Execute the query with the product ID
    db.query(sql, [req.body.productid], (err, result) => {
        if (err) {
            console.error("Error deleting product:", err);
            res.status(500).json({ error: "Error deleting product" });
            return;
        }
        
        // Check if any rows were affected (if a product was deleted)
        if (result.affectedRows === 0) {
            res.status(404).json({ error: "Product not found" });
            return;
        }
        
        // Send a success response
        res.json({ message: "Product successfully deleted" });
    });
});

app.listen(8081, () => {
    console.log("Listening on port 8081");
});
