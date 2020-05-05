import React from "react";
import { NavLink } from "react-router-dom";
import HomeModal from "./HomeModal";

function Navbar() {
  return (
    <div className="Navbar-wrapper">
      <div className="Marketing-Navbar">
        <h1>fitness AnyWhere</h1>
        <nav id="model-nav">
          <NavLink exact to="/" activeClassName="active">
            home
          </NavLink>
          {/**
      
       
          <NavLink exact to="/login" activeClassName="active">
            Login
          </NavLink>
          <NavLink exact to="/signup" activeClassName="active">
            Sign Up
          </NavLink>
      */}

          <div className="Navbar-login-btn">
            <HomeModal option="login" />
          </div>
          <div className="Navbar-signup-btn">
            <HomeModal option="signup" />
          </div>
        </nav>
      </div>
    </div>
  );
}

export default Navbar;
