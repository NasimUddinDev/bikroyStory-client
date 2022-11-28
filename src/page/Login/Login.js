import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ButtonSpinner from "../../components/ButtonSpinner/ButtonSpinner";
import { AuthContext } from "../../contextApi/AuthProvider";

const Login = () => {
  const { login, googleSignup } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/home";

  // Handel Login with Email and password
  const handelLogin = (e) => {
    e.preventDefault();

    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    setLoading(true);

    login(email, password)
      .then((result) => {
        if (result.user) {
          getLoginUserToekn(result.user.email);
          toast("Login Success");
          setLoading(false);
          form.reset();
          // navigate(from, { replace: true });
          setMessage("");
        }
      })
      .catch((error) => {
        console.log(error);
        setMessage(error.message);
        setLoading(false);
      });
  };

  // Handel Google Login
  const handelGoogleLogin = () => {
    googleSignup()
      .then((result) => {
        const userName = result.user.displayName;
        const email = result.user.email;
        const userPhoto = result.user.photoURL;
        const userInfo = {
          userName,
          userPhoto,
          email,
          role: "Buyer",
        };

        if (result?.user) {
          // User Info send Database
          fetch("http://localhost:5000/users", {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(userInfo),
          })
            .then((res) => res.json())
            .then((data) => {
              getLoginUserToekn(result.user.email);
              toast("LogIn Success");
              // navigate(from, { replace: true });
            })
            .catch((error) => console.log(error));
        }
      })
      .catch((error) => {
        console.log(error);
        setMessage(error.message);
      });
  };

  // GET token
  const getLoginUserToekn = (email) => {
    fetch(`http://localhost:5000/jwt?email=${email}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.accessToken) {
          localStorage.setItem("accessToken", data.accessToken);
        }
        navigate(from, { replace: true });
      });
  };

  return (
    <div className="hero py-8 bg-base-300">
      <div className="w-[80%] md:w-[50%] lg:w-[35%]">
        <h2 className="text-3xl font-bold text-center mb-3 text-teal-600">
          Login Now!
        </h2>

        <div className="card w-full shadow-2xl bg-base-100">
          <form onSubmit={handelLogin} className="card-body pb-1">
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

            <p className="text-red-500">{message}</p>

            <div className="form-control mt-3">
              <button type="submit" className="btn">
                {loading ? <ButtonSpinner /> : "Log In"}
              </button>
            </div>
          </form>

          <div className="card-body pt-0">
            <div>
              <p className="divider">Or</p>
              <button
                onClick={handelGoogleLogin}
                className="w-full btn btn-outline mt-3"
              >
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
