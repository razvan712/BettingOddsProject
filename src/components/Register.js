import React, { useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Button, Form, Alert } from "react-bootstrap";
import jwt_decode from "jwt-decode"; // Import JWT decoding library
import "./Register.scss";
import google from '../assets/google.png'

const Register = () => {

  const [error, setError] = useState("");

  // const { login , username, setUsername, password,setPassword} = useContext(AuthContext);

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   if (username === "admin" && password === "admin") {
  //     // Simulating successful authentication by generating a JWT token
  //     const token = "your_generated_jwt_token_here";
  //     login(token);
  //     console.log("Logged in");
  //   } else {
  //     setError("Wrong username or password");
  //   }
  // };

  return (
    <div className="login-container">
      <h1>RazBet</h1>
{/* 
      <Form onSubmit={handleSubmit}>
      <Button
      style={{
        backgroundColor: "#ffffff",
        border: "1px solid #dddddd",
        borderRadius: "4px",
        padding: "10px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        width: "200px",
        height: "40px",
        margin: "10px",
        
      }}
    >
      <img
        src={google} // Replace with your Google icon image source
        alt="Google Icon"
        style={{
          width: "20px",
          height: "20px",
          marginRight: "10px",
        }}
      />
     <span>Sign in with Google</span> 
    </Button>
        <Form.Group controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        {error && <Alert variant="danger">{error}</Alert>}

        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form> */}
    </div>
  );
};

export default Register;
