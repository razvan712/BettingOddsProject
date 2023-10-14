import React, { useContext, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { AuthContext } from "../contexts/AuthContext";
import { useCookies } from "react-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginModal = () => {
  const [_, setCookies] = useCookies(["access_token"]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { show, setShow , setName} = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const result = await axios.post("http://localhost:3001/auth/login", {
        username,
        password,
      });

      setCookies("token", result.data.token);
      setShow(false);  // To close the modal
      setName(result.data.name);
      localStorage.setItem("name", result.data.name);
      navigate("/");
    } catch (error) {
      console.error(error);
      alert("Wrong username or password");  // Assuming any error is an auth failure, you may need more specific error handling
    }
  };

  return (
    <Modal show={show} onHide={() => setShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="usernameInput">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="username"
              autoFocus
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="passwordInput">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer style={{justifyContent: "center"}}>
        <Button variant="primary" onClick={handleSubmit}>
          Login
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default LoginModal;
