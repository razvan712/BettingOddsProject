import React from "react";
import { BrowserRouter, Routes, Route, Link, Outlet } from "react-router-dom";


const About = () => {
  return (
    <>
      <div>
        <h1>About</h1>
      </div>
      <nav>
        <ul>
         
          <li>
            <Link to="us">Us</Link>
          </li>
          <li>
            <Link to="they">They</Link>
          </li>
        </ul>
      </nav>
        <Outlet />

     
    </>
  );
};

export default About;
