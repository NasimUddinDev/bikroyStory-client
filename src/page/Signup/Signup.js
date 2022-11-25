import { data } from "autoprefixer";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../contextApi/AuthProvider";
import useToken from "../../Hooks/useToken";

const Signup = () => {
  const { craeteUser, updateUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit } = useForm();
  const imageBBKey = process.env.REACT_APP_imageBB_key;
  const navigate = useNavigate();

  const [newUser, setNewUser] = useState("");
  const [token] = useToken(newUser);

  if (token) {
    navigate("/login");
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
            userSatus: data.userSatus,
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
                    // getToken(email);
                    setNewUser(email);
                  });
              }
            })
            .catch((error) => {
              console.log(error);
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

  // Get token
  // const getToken = (email) => {
  //   fetch(`http://localhost:5000/jwt?email=${email}`)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       if (data.accessToken) {
  //         localStorage.setItem("accessToken", data.accessToken);
  //       }
  //     });
  // };

  return (
    <div className="container mx-auto py-5">
      <h2 className="text-3xl font-bold text-center mb-3">SignUp Now!</h2>
      <form
        onSubmit={handleSubmit(handelSignup)}
        className="w-[80%] md:w-[50%] lg:w-[35%] mx-auto card card-body shadow-2xl bg-base-100"
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
            {...register("userSatus", { required: true })}
            className="select select-bordered w-full "
          >
            <option value="Buyer">Buyer</option>
            <option value="Seller">Seller</option>
          </select>
        </div>

        <button type="submit" className="btn">
          {loading ? "Loading.." : "Sign Up"}
        </button>

        <div>
          <p className="divider">Or</p>
          <button className="w-full btn btn-outline mt-3">Google Signup</button>
        </div>

        <div>
          <small>
            Already have a account?{" "}
            <Link to="/login" className="text-info underline">
              LogIn
            </Link>
          </small>
        </div>
      </form>
    </div>
  );
};

export default Signup;
