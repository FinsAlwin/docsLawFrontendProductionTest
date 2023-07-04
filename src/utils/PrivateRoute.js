import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import PropTypes from "prop-types";

const PrivateRoute = ({ isAuthenticated }) => {
  useEffect(() => {}, [isAuthenticated]);

  return isAuthenticated ? <Outlet /> : <Navigate to="/sign-in" />;
};

PrivateRoute.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};

export default PrivateRoute;
