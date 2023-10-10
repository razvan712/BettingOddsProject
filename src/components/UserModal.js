import React, { useContext } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { AuthContext } from "../contexts/AuthContext";
import { set } from "react-hook-form";

const LoginModal = () => {
  const { setShowLogout, username, showLogout, setUsername, password, setPassword, show, handleClose, setToken, setFirstname, setLastname, handleCloseLogout,logout } =
    useContext(AuthContext);

    const data={
      token: "123456789",
       user: {firstname: "joe",
        lastname: "doe",
        role: "admin",}
    }

    const handleSubmit = (e) => {
        e.preventDefault();
     if(username === "admin" && password === "admin") {
      localStorage.setItem("token", data.token);
         setToken(data.token);
         setFirstname(data.user.firstname);
          setLastname(data.user.lastname);

        handleClose();
        
        }
        alert("wrong username or password")
        // console.log(username, password, 'yyyy')
  
    }

  return (
    <Modal show={showLogout} onHide={handleCloseLogout}>
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{justifyContent: 'center'}}>
        {/* <Form  onSubmit={handleSubmit}>
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
            <Form.Label  >Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
        </Form> */}

        <h1 style={{alignSelf: 'center'}}>User details</h1>
      </Modal.Body>
      <Modal.Footer style={{justifyContent: 'center'}}>
        <Button variant="secondary"  onClick={logout}>
        logout
        </Button>
        
      </Modal.Footer>
    </Modal>
  );
};

export default LoginModal;
