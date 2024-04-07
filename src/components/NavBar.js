import React from "react";
import { NavLink } from "react-router-dom";

import "../styles/navbar.css";

function NavBar() {
  return (
    <nav className="navbar-container">
      <NavLink to="/">Overview</NavLink>
      <NavLink to="/projects">Projects</NavLink>
    </nav>
  );
}

export default NavBar;
