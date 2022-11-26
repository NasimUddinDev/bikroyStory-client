import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../contextApi/AuthProvider";

const Login = () => {
  const { login, googleSignup } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

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
        if (result?.user) {
          toast("Login Success");
          getLoginUserToekn(result.user.email);
          setLoading(false);
          form.reset();
          window.location.reload();
          navigate(from, { replace: true });
        }
      })
      .catch((error) => {
        console.log(error);
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
          fetch("https://bikroy-store-server-nasim0994.vercel.app/users", {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(userInfo),
          })
            .then((res) => res.json())
            .then((data) => {
              navigate(from, { replace: true });
              getLoginUserToekn(result.user.email);
              toast("LogIn Success");
            })
            .catch((error) => console.log(error));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // GET token
  const getLoginUserToekn = (email) => {
    fetch(`https://bikroy-store-server-nasim0994.vercel.app/jwt?email=${email}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.accessToken) {
          localStorage.setItem("accessToken", data.accessToken);
          navigate(from, { replace: true });
        }
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
            <div className="form-control mt-3">
              <button type="submit" className="btn">
                {loading ? (
                  <div role="status">
                    <svg
                      aria-hidden="true"
                      className="mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                    <span className="sr-only">Loading...</span>
                  </div>
                ) : (
                  "Log In"
                )}
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
