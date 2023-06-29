import React, { useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

import { Button, Form } from "react-bootstrap";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);

  console.log(isLoggedIn, "isLoggedIn");

  const handleSubmit = (e) => {
    e.preventDefault();

    username === "admin" && password === "admin"
      ? setIsLoggedIn(true) && console.log("Logged in")
      : console.log("Wrong username or password");
  };

  return (
    <div>
      <h1>Login</h1>

      <Form onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          id="username"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />

        <Button type="submit" value="Login">
          Login
        </Button>
      </Form>
    </div>
  );
};

export default Login;
