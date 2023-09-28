const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;
const MongoClient = require("mongodb").MongoClient;
const uri = "mongodb://localhost:27017"; // MongoDB connection URI
const client = new MongoClient(uri, { useNewUrlParser: true });

app.use(bodyParser.json());

// Connect to the MongoDB server
client.connect((err) => {
    if (err) {
        console.error("Error connecting to MongoDB:", err);
        return;
    }
    console.log("Connected to MongoDB");

    // Specify the database and collection you want to work with
    const db = client.db("mydatabase"); // Replace "mydatabase" with your database name
    const collection = db.collection("users");

    app.post("/signup", (req, res) => {
        const { username, password } = req.body;

        // Check if the username is already taken in the MongoDB collection
        collection.findOne({ username }, (err, existingUser) => {
            if (err) {
                console.error("Error finding user:", err);
                return res.status(500).json({ message: "Internal server error." });
            }

            if (existingUser) {
                return res.status(400).json({ message: "Username already exists." });
            }

            // Insert the user into the MongoDB collection
            collection.insertOne({ username, password }, (err, result) => {
                if (err) {
                    console.error("Error inserting user:", err);
                    return res.status(500).json({ message: "Internal server error." });
                }

                res.json({ message: "Signup successful." });
            });
        });
    });

    app.post("/login", (req, res) => {
        const { username, password } = req.body;

        // Find the user in the MongoDB collection
        collection.findOne({ username, password }, (err, user) => {
            if (err) {
                console.error("Error finding user:", err);
                return res.status(500).json({ message: "Internal server error." });
            }

            if (!user) {
                return res.status(401).json({ message: "Invalid credentials." });
            }

            res.json({ message: "Login successful." });
        });
    });

    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
});
