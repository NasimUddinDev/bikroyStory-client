import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../contextApi/AuthProvider";
import useToken from "./../../Hooks/useToken";

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/home";

  const [loginUserEmail, setLoginUserEmail] = useState("");
  const [token] = useToken(loginUserEmail);

  if (token) {
    navigate(from, { replace: true });
  }

  const handelLogin = (e) => {
    e.preventDefault();

    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    login(email, password)
      .then((result) => {
        if (result.user.uid && result.user.email) {
          toast("Login Success");
          form.reset();
          setLoginUserEmail(result.user.email);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="hero py-5">
      <div className="w-[80%] md:w-[50%] lg:w-[35%]">
        <h2 className="text-3xl font-bold text-center mb-3">Login Now!</h2>

        <div className="card w-full shadow-2xl bg-base-100">
          <form onSubmit={handelLogin} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="text"
                name="email"
                placeholder="email"
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="password"
                className="input input-bordered"
              />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control mt-3">
              <button type="submit" className="btn btn-primary">
                Login
              </button>
            </div>

            <div>
              <p className="divider">Or</p>
              <button className="w-full btn btn-outline mt-3">
                Google Login
              </button>
            </div>

            <div>
              <small>
                Your have no account?{" "}
                <Link to="/signup" className="text-info underline">
                  SignUp
                </Link>
              </small>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
