import React from "react";
import "./ErrorPage.css";
import { Link, useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();
  return (
    <div className="error-page">
      <h1>404</h1>
      <p className="text-red-700 text-xl">
        {error.statusText || error.message}
      </p>
      <Link to="/home" className="underline font-semibold">
        Go to Home
      </Link>
    </div>
  );
};

export default ErrorPage;
