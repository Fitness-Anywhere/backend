import React from "react";
import { useSelector } from "react-redux";
import { NavLink, useRouteMatch } from "react-router-dom";

const Navbar = () => {
  const { url } = useRouteMatch();
  const { instructorName } = useSelector((state) => state.userReducer);

  const logout = () => {
    localStorage.clear();
  };

  return (
    <div className="Navbar">
      <div className="Navbar-container">
        <h1>fitness anywhere</h1>
        <nav>
          <NavLink to={`${url}/profile`}>{`Welcome ${instructorName}`}</NavLink>
          <NavLink onClick={logout} to="/">
            Logout
          </NavLink>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
