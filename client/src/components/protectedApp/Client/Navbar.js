import React from "react";
import { NavLink, useRouteMatch } from "react-router-dom";

const Navbar = () => {
  const { url, path } = useRouteMatch();
  const logout = () => {
    localStorage.clear();
  };
  return (
    <div className="Navbar">
      <div className="Navbar-container">
        <h1>fitness anywhere</h1>
        <nav>
          <NavLink to="/login" onClick={logout}>
            logout
          </NavLink>
          <NavLink to={`${url}/schedule`}>Schedule</NavLink>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
