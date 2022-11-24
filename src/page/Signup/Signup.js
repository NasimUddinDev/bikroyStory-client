import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contextApi/AuthProvider";

const Signup = () => {
  const { craeteUser } = useContext(AuthContext);

  const { register, handleSubmit } = useForm();
  const imageBBKey = process.env.REACT_APP_imageBB_key;

  const handelSignup = (data) => {
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

          // const user = {
          //   userName,
          //   userPhoto,
          //   email,
          //   userSatus: data.userSatus,
          // };

          craeteUser(email, password)
            .then((result) => {
              console.log(result.user);
            })
            .catch((error) => {
              console.log(error);
            });
        }
      });
  };

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
            {...register("name")}
            placeholder="Full name"
            className="input input-bordered"
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

        {/* <input type="submit" className="btn " />
         */}
        <button type="submit" className="btn">
          Sign Up
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
