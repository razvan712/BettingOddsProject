import React, { useState, useContext } from "react";
import { Button, Form, Alert } from "react-bootstrap";
import { useCookies } from "react-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Register.scss";
import { AuthContext } from "../contexts/AuthContext";


const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [nameInput, setNameInput] = useState("");

  const [cookies, setCookie] = useCookies(["token"]);

  const navigate = useNavigate();
  const {setToken, setUserID, setName, name} = useContext(AuthContext);

  const handleSubmit = async (event) => {
    event.preventDefault();

     

    try {

      console.log("username", username);
      console.log("password", password);
     const result= await axios.post("http://localhost:3001/auth/register", {
        username,
        password,
        name: nameInput,
      });
      console.log(result, 'iiiiiiiiiiiiiiiiii');
      setToken(result.data.token);
      setUserID(result.data.userID);
      setName(nameInput);
       setCookie("token", result.data.token, { path: "/" });
        localStorage.setItem("name", nameInput);
    
      navigate("/"); 
    } catch (error) {
      console.error(error);
      setError('Registration error');
    }
  };

  return (
    <div className="auth-container">
      <h1>Register</h1>
      {error && <Alert variant='danger'>{error}</Alert>}
      <Form style={{maxWidth: '400px', margin: '0 auto'}} onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label htmlFor="username">Username:</Form.Label>
          <Form.Control 
            type="text"
            id="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="password">Password:</Form.Label>
          <Form.Control 
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="name">Name:</Form.Label>
          <Form.Control 
            type="text"
            id="name"
            value={nameInput}
            onChange={(event) => setNameInput(event.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Register
        </Button>
      </Form>
    </div>
  );
};

export default Register;
