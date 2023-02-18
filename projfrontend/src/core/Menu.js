import React, { Fragment } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { isAuthenticated, signout } from "../auth/helper";

const isActive = ({ isActive }) => {
  return { color: isActive ? "#FFFFFF" : "#2ecc72" };
};

const Menu = () => {
  const navigate = useNavigate();
  return (
    <ul className="nav nav-tabs bg-dark">
      <li className="nav-item">
        <NavLink style={isActive} className="mx-2 text-decoration-none" to="/">
          Home
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink
          style={isActive}
          className="mx-2 text-decoration-none"
          to="/cart"
        >
          Cart
        </NavLink>
      </li>
      {isAuthenticated() && isAuthenticated().user.role === 0 && (
        <li className="nav-item">
        <NavLink
          style={isActive}
          className="mx-2 text-decoration-none"
          to="/user/dashboard"
        >
          U_Dashboard
        </NavLink>
      </li>
      )}
      {isAuthenticated()  && isAuthenticated().user.role === 1 && (
        <li className="nav-item">
        <NavLink
          style={isActive}
          className="mx-2 text-decoration-none"
          to="/admin/dashboard"
        >
          A_Dashboard
        </NavLink>
      </li>
      )}
      {!isAuthenticated() && (
        <Fragment>
          <li className="nav-item">
            <NavLink
              style={isActive}
              className="mx-2 text-decoration-none"
              to="/signup"
            >
              Signup
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              style={isActive}
              className="mx-2 text-decoration-none"
              to="/signin"
            >
              Sign In
            </NavLink>
          </li>
        </Fragment>
      )}
      {isAuthenticated() && (
        <li className="nav-item">
          <span
            className="mx-2 text-warning"
            onClick={() =>
              signout(() => {
                navigate("/");
              })
            }
          >
            Signout
          </span>
        </li>
      )}
    </ul>
  );
};

export default Menu;
