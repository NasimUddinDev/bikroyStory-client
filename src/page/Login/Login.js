import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="hero py-5">
      <div className="w-[80%] md:w-[50%] lg:w-[35%]">
        <h2 className="text-3xl font-bold text-center mb-3">Login Now!</h2>

        <div className="card w-full shadow-2xl bg-base-100">
          <form className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="text"
                placeholder="email"
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="text"
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
