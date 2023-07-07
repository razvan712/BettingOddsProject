import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.scss";

const Navbar = () => {
  const location = useLocation();

  return (
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
            <Link to="/login" className={location.pathname === "/login" ? "active_link" : ""}>
              Login
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;