import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.scss";
import Button from 'react-bootstrap/Button';
import LoginModal from "./LoginModal";
import UserModal from "./UserModal";
import { get, set } from "react-hook-form";
import { useCookies } from "react-cookie";

const Navbar = () => {
  const location = useLocation();
  const { token, setShow, setShowLogout, setToken , name, setName} = useContext(AuthContext);
  // const [name, setName] = useState('');
  const [cookies, setCookie] = useCookies(["token"]);


  const handleShow = () => {
    setShow(true);
  }

  const getToken = () => {
    console.log(cookies.token, 'special');
    return cookies.token;
  }




  useEffect(() => {
    if (cookies.token) {
      setToken(cookies.token);
    }
    
    const storedName = localStorage.getItem("name");
    
    if (storedName) {
      setName(storedName);
    }
  }, [cookies.token]); // Listen for changes in cookies.token
  


  const handleShowLogout = () => {
    setShowLogout(true);
  
   
    

   
  }

  return (
    <>
      <LoginModal />
      <UserModal />
      
      <div className="navbar_container bg-success-subtle">
        <nav>
          <ul>
            <li>
              <Link to="/" className={location.pathname === "/" ? "active_link" : ""}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className={location.pathname === "/about" ? "active_link" : ""}>
                About
              </Link>
            </li>
            <li>
              {token === null ? (
                <>
                <Button variant="primary" onClick={handleShow}>
                  Login
                </Button>
                <Link to="/register" className={location.pathname === "/register" ? "active_link" : ""}>
                      Register
                    </Link>
                    </>
              ) : (
                <Button variant="primary" onClick={handleShowLogout}>
                 {name}
                </Button>
              )}
            </li>
             
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
