import React from "react";
import {Navigate } from "react-router-dom";

import { isAuthenticated } from "./index";

const PrivateRoute = ({ children}) => {
  if(isAuthenticated() ){
    return children
  }
  else{
    return(
      <Navigate
            to={{
              pathname: "/signin",
              
            }}
          />
    )
  }
};

export default PrivateRoute;