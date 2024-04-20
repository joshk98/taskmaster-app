import React from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faList, faUser } from "@fortawesome/free-solid-svg-icons";

import "../styles/navbar.css";

function NavBar() {
  return (
    <nav className="navbar-container">
      <h1>Task Master</h1>
      <NavLink to="/"><FontAwesomeIcon icon={faHouse} /></NavLink>
      <NavLink to="/projects"><FontAwesomeIcon icon={faList} /></NavLink>
      <a><FontAwesomeIcon icon={faUser} /></a>
    </nav>
  );
}

export default NavBar;
