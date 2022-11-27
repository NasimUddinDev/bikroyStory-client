import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import Spinner from "../../components/Spinner/Spinner";
import { AuthContext } from "../../contextApi/AuthProvider";
import useSeller from "../../Hooks/useSeller";

const SellerRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const [isSeller, sellerLoading] = useSeller(user?.email);
  const location = useLocation();

  if (loading || sellerLoading) {
    return <Spinner></Spinner>;
  }

  if (!user && !isSeller) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default SellerRoute;
