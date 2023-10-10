import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.scss";
import Button from 'react-bootstrap/Button';
import LoginModal from "./LoginModal";
import UserModal from "./UserModal";

const Navbar = () => {
  const location = useLocation();
  const { token, setShow, setShowLogout } = useContext(AuthContext);

  const handleShow = () => {
    setShow(true);
  }

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
                <Button variant="primary" onClick={handleShow}>
                  Login
                </Button>
              ) : (
                <Button variant="primary" onClick={handleShowLogout}>
                  User modal
                </Button>
              )}
            </li>
                { token === null ?(<li>
                    <Link to="/register" className={location.pathname === "/register" ? "active_link" : ""}>
                      Register
                    </Link>
                  </li>): null}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
