const express = require("express");
const bodyParser = require("body-parser");
const { MongoClient } = require("mongodb");
const app = express();
const port = 3000;

app.use(bodyParser.json());

const mongoURI = "mongodb://localhost:27017"; // MongoDB connection URI
const dbName = "YOUR_DB_NAME"; // Replace with your database name
const collectionName = "users"; // Collection name for user data

// Connect to the MongoDB server
MongoClient.connect(mongoURI, { useNewUrlParser: true }, (err, client) => {
    if (err) {
        console.error("Error connecting to MongoDB:", err);
        return;
    }
    console.log("Connected to MongoDB");

    // Specify the database and collection you want to work with
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // Define a route for user signup
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

    // Define a route for user login
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

    // Start the Express server
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
});
