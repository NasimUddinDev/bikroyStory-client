import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ButtonSpinner from "../../components/ButtonSpinner/ButtonSpinner";
import { AuthContext } from "../../contextApi/AuthProvider";
import useToken from "../../Hooks/useToken";

const Signup = () => {
  const { craeteUser, updateUser, googleSignup } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

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
                handelUserProfile(userName, userPhoto);
                toast("User create Success");
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
              setMessage(error.message);
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
        setMessage(error.message);
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
          setMessage();
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
            .catch((error) => {
              console.log(error);
              setMessage(error.message);
            });
        }
      })
      .catch((error) => {
        console.log(error);
        setMessage(error.message);
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

            <p className="text-red-500">{message}</p>

            <button type="submit" className="btn">
              {loading ? <ButtonSpinner /> : "Sign Up"}
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
