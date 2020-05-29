import React from "react";
import { NavLink, useParams } from "react-router-dom";

const Navbar = () => {
  const { id } = useParams();
  const logout = () => {
    localStorage.clear();
  };
  return (
    <div className="Navbar">
      <div className="Navbar-container">
        <h1>fitness anywhere</h1>
        <nav>
          <NavLink to="/" onClick={logout}>
            logout
          </NavLink>
          <NavLink to={`/account/client/${id}/schedule`}>Schedule</NavLink>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
