import React, { useContext } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { AuthContext } from "../contexts/AuthContext";
import { set } from "react-hook-form";
import axios from "axios";

const UserModal = () => {
  const { setShowLogout, username, showLogout, setUsername, password, setPassword, show, handleClose, setToken,  handleCloseLogout,logout } =
    useContext(AuthContext);

    const data={
      token: "123456789",
       user: {firstname: "joe",
        lastname: "doe",
        role: "admin",}
    }

    const handleSubmit = (e) => {
        e.preventDefault();
    
      localStorage.setItem("token", data.token);
         setToken(data.token);

        

        handleClose();

        
        
        alert("wrong username or password")
        // console.log(username, password, 'yyyy')
  
    }

  return (
    <Modal show={showLogout} onHide={handleCloseLogout}>
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{justifyContent: 'center'}}>
       

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

export default UserModal;
