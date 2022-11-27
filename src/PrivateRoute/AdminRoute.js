import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import Spinner from "../components/Spinner/Spinner";
import { AuthContext } from "../contextApi/AuthProvider";
import useAdmin from "./../Hooks/useAdmin";

const AdminRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const [isAdmin, adminLoadin] = useAdmin(user?.email);
  const location = useLocation();

  if (loading || adminLoadin) {
    return <Spinner></Spinner>;
  }

  if (!user && !isAdmin) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
};

export default AdminRoute;
