import React from "react";
import { Navigate } from "react-router-dom";

import { isAuthenticated } from "./index";

const AdminRoute = ({ children }) => {
  if(isAuthenticated() && isAuthenticated().user.role === 1 ){
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

export default AdminRoute;
