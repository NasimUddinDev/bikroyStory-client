import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../contextApi/AuthProvider";
import useToken from "../../Hooks/useToken";

const Signup = () => {
  const { craeteUser, updateUser, googleSignup } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/home";

  const { register, handleSubmit } = useForm();

  const imageBBKey = process.env.REACT_APP_imageBB_key;

  const [newUser, setNewUser] = useState("");
  const [token] = useToken(newUser);

  if (token) {
    navigate(from, { replace: true });
  }

  const handelSignup = (data) => {
    setLoading(true);

    const userPhoto = data.photo[0];
    const formData = new FormData();
    formData.append("image", userPhoto);
    const url = `https://api.imgbb.com/1/upload?key=${imageBBKey}`;

    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imageData) => {
        if (imageData.success) {
          const userName = data.name;
          const userPhoto = imageData.data.url;
          const email = data.email;
          const password = data.password;

          const userInfo = {
            userName,
            userPhoto,
            email,
            role: data.userRole,
          };

          craeteUser(email, password)
            .then((result) => {
              if (result?.user) {
                toast("User create Success");
                handelUserProfile(userName, userPhoto);
                setLoading(false);

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
                    setNewUser(email);
                  });
              }
            })
            .catch((error) => {
              console.log(error);
              setLoading(false);
            });
        }
      });
  };

  // Handel user Profiule
  const handelUserProfile = (userName, userImg) => {
    const profile = {
      displayName: userName,
      photoURL: userImg,
    };

    updateUser(profile)
      .then((result) => {})
      .catch((error) => {
        console.error(error);
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
              setNewUser(result.user.email);
              toast("LogIn Success");
            })
            .catch((error) => console.log(error));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="container mx-auto py-5">
      <div className="w-[80%] md:w-[50%] lg:w-[35%] mx-auto">
        <h2 className="text-3xl font-bold text-center mb-3">SignUp Now!</h2>

        <div className="card w-full shadow-2xl bg-base-100">
          <form
            onSubmit={handleSubmit(handelSignup)}
            className="card-body pb-1"
          >
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                {...register("name", {})}
                placeholder="Full name"
                className="input input-bordered"
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Photo</span>
              </label>
              <input
                {...register("photo")}
                type="file"
                className="file-input w-full input-bordered"
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                {...register("email")}
                placeholder="Email"
                className="input input-bordered"
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                {...register("password")}
                placeholder="Password"
                className="input input-bordered"
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Account Type:</span>
              </label>
              <select
                {...register("userRole", { required: true })}
                className="select select-bordered w-full "
              >
                <option defaultValue="Buyer">Buyer</option>
                <option defaultValue="Seller">Seller</option>
              </select>
            </div>

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
                "Sign Up"
              )}
            </button>
          </form>

          <div className="card-body pt-0">
            <div>
              <p className="divider">Or</p>
              <button
                onClick={handelGoogleLogin}
                className="w-full btn btn-outline mt-2"
              >
                Google Signup
              </button>
            </div>

            <div>
              <small>
                Already have a account?{" "}
                <Link to="/login" className="text-info underline">
                  LogIn
                </Link>
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
