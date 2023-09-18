import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import "./Login.css"; // Import the CSS file

function Login({ setIsAuthenticated }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Initialize the useNavigate hook

  async function loginUser(event) {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:1337/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      if (data.user) {
        setIsAuthenticated(true);
        alert("Login successful");

        // Pass the username to the pdf.js page
        navigate("/pdf", { state: { emailId: email } });
      } else {
        alert("Please check your username or password");
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
    console.log(email);
  }

  return (
    <div className="container">
      <div className="login-form">
        <h1>Login</h1>
        <form onSubmit={loginUser}>
          <input
            className="input-field"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
          />
          <br />
          <input
            className="input-field"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
          />
          <br />
          <input className="submit-button" type="submit" value="Login" />
        </form>
        <p>
          Don't have an account? <Link to="/register">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
