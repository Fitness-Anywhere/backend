import React from "react";
import { NavLink } from "react-router-dom";

const Sharednav = () => {
  const logout = () => {
    localStorage.clear();
  };
  return (
    <div className="Sharednavbar">
      <div className="Sharednavbar-container">
        <h1>fitness anywhere</h1>
        <nav>
          <NavLink to="/login" onClick={logout}>
            logout
          </NavLink>
        </nav>
      </div>
    </div>
  );
};

export default Sharednav;
