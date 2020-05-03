import React from "react";
// import { Link } from "react-router-dom";
import { NavStyles } from "./Styles";

function Navbar() {
  return (
    <NavStyles>
      <header>
        <div className="container">
          <h1>AnyWhere Fitness</h1>
          <nav>
            <a href="https://lucid-morse-c45b1a.netlify.app/">Home</a>
          </nav>
        </div>
      </header>
    </NavStyles>
  );
}

export default Navbar;
