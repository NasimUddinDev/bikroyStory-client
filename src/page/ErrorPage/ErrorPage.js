import React from "react";
import "./ErrorPage.css";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="error-page">
      <h1>404, Error Page</h1>
      <h3>Opps! Page Not Found</h3>
      <Link to="/home" className="underline font-semibold">
        Go to Home
      </Link>
    </div>
  );
};

export default ErrorPage;
