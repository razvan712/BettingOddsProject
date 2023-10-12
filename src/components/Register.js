import React, { useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Button, Form, Alert } from "react-bootstrap";
import "./Register.scss";
import  {useNavigate} from 'react-router-dom';

const Register = () => {

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    firstname: '',
    lastname: ''
  });
  const [error, setError] = useState("");
  const { setToken, setFirstname, setLastname, setUserID, setRole } = useContext(AuthContext);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

   
    if (formData.username === 'admin' && formData.password === 'admin') {
      const dummyToken = 'dummyToken123';
      const dummyFirstname = 'John';
      const dummyLastname = 'Doe';
      const dummyID = '12345';
      const dummyRole = 'admin';

      setToken(dummyToken);
      setFirstname(formData.firstname);
      setLastname(formData.lastname);
      setUserID(dummyID);
      setRole(formData.role);



     
      setFormData({
        username: '',
        password: '',
        firstname: '',
        lastname: ''
      });
      setError(''); 
      navigate('/');



    } else {
      
      setError('Registration error: invalid username or password');
    }
  };

  return (
    <div className="login-container">
      <h1>RazBet</h1>
      {error && <Alert variant='danger'>{error}</Alert>}

      <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Enter username" 
            name="username" 
            value={formData.username} 
            onChange={handleInputChange} 
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control 
            type="password" 
            placeholder="Password" 
            name="password" 
            value={formData.password} 
            onChange={handleInputChange} 
          />
        </Form.Group>

        <Form.Group controlId="formBasicFirstname">
          <Form.Label>First Name</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Enter first name" 
            name="firstname" 
            value={formData.firstname} 
            onChange={handleInputChange} 
          />
        </Form.Group>

        <Form.Group controlId="formBasicLastname">
          <Form.Label>Last Name</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Enter last name" 
            name="lastname" 
            value={formData.lastname} 
            onChange={handleInputChange} 
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
