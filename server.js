const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Simulated user database (replace with a real database)
const users = [];

// Route for user registration
app.post('/signup', (req, res) => {
  const { username, password } = req.body;

  // Check if the username is already taken
  if (users.find(user => user.username === username)) {
    return res.status(400).json({ message: 'Username already exists.' });
  }

  // Store the user in the database (in-memory storage for this example)
  users.push({ username, password });

  // You should also hash and salt the password for security in a real application

  res.json({ message: 'Signup successful.' });
});

// Route for user login
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Find the user in the database
  const user = users.find(user => user.username === username);

  if (!user || user.password !== password) {
    return res.status(401).json({ message: 'Invalid credentials.' });
  }

  res.json({ message: 'Login successful.' });
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
