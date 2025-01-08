import React from "react";
import { Link } from "react-router-dom";
import "./CSS/Header.css";

const Header = () => {
  return (
    <>
      <header className="header">
        <div className="logo">
          <h1>My Dashboard</h1>
        </div>
        <nav className="navbar">
          <ul className="nav-links">
            <li>
              <Link to="/">Home</Link>
            </li>
            {/* <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li> */}
          </ul>
        </nav>
      </header>
      
    </>
  );
};

export default Header;
