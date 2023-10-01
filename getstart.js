document.addEventListener("DOMContentLoaded", function() {
    const signupForm = document.getElementById("signup-form");
    const loginForm = document.getElementById("login-form");

    signupForm.addEventListener("submit", function(event) {
        event.preventDefault();
        const username = document.getElementById("signup-username").value;
        const password = document.getElementById("signup-password").value;

        // Send a POST request to your backend to handle user registration
        // Example: fetch('/signup', { method: 'POST', body: JSON.stringify({ username, password }) })
        // Handle the response accordingly
    });

    loginForm.addEventListener("submit", function(event) {
        event.preventDefault();
        const username = document.getElementById("login-username").value;
        const password = document.getElementById("login-password").value;

        // Send a POST request to your backend to handle user login
        // Example: fetch('/login', { method: 'POST', body: JSON.stringify({ username, password }) })
        // Handle the response accordingly
    });
});
