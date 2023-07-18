import React, { useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Button, Form, Alert } from "react-bootstrap";
import "./Login.scss";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (username === "admin" && password === "admin") {
      setIsLoggedIn(true);
      console.log("Logged in");
    } else {
      setError("Wrong username or password");
    }
  };

  return (
    <div className="login-container">
      <h1>RazBet</h1>

      <Form onSubmit={handleSubmit}>
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
      </Form>
    </div>
  );
};

export default Login;
