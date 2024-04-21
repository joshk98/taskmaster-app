import React from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faList, faRobot, faPlus } from "@fortawesome/free-solid-svg-icons";

import "../styles/navbar.css";

function NavBar() {
  return (
    <nav className="navbar-container">
      <div className="navbar-container-title"><h1>Task <FontAwesomeIcon icon={faRobot} className="robot"/> Master</h1></div>
      <div className="navbar-container-links">
        <NavLink to="/"><FontAwesomeIcon icon={faHouse} /></NavLink>
        <NavLink to="/projects"><FontAwesomeIcon icon={faList} /></NavLink>
        <NavLink to="/add-project"><FontAwesomeIcon icon={faPlus} /></NavLink>
      </div>
    </nav>
  );
}

export default NavBar;
