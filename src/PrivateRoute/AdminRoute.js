import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../contextApi/AuthProvider";
import useAdmin from "./../Hooks/useAdmin";

const AdminRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const [isAdmin, adminLoadin] = useAdmin(user?.email);
  const location = useLocation();

  if (loading || adminLoadin) {
    return <h2>Loadding....</h2>;
  }

  if (user && isAdmin) {
    return children;
  }

  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default AdminRoute;
