import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { AuthContext } from "../../../contextApi/AuthProvider";
import { useLoaderData } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

const AddProduct = () => {
  const { user } = useContext(AuthContext);
  const categorys = useLoaderData();

  const { data: databaseUser = {} } = useQuery({
    queryKey: ["user", user?.email],
    queryFn: () =>
      fetch(`http://localhost:5000/user?email=${user?.email}`).then((res) =>
        res.json()
      ),
  });

  const now = new Date();
  // Time
  let hours = now.getHours();
  let minutes = now.getMinutes();
  let formate = "AM";
  if (hours > 10) {
    hours = hours - 12;
    formate = "pm";
  }
  hours = hours === 0 ? 12 : hours;
  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  const time = `${hours}:${minutes} ${formate}`;

  // Date
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[now.getMonth()];
  const day = now.getDate();
  const year = now.getFullYear();
  const date = `${month}-${day}-${year}`;

  const { register, handleSubmit, reset } = useForm();
  const [loading, setLoading] = useState(false);

  const imageBBKey = process.env.REACT_APP_imageBB_key;

  const handelAddProduct = (data) => {
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
          const product = {
            time,
            date,
            productName: data.productName,
            picture: imageData.data.url,
            sellPrice: parseInt(data.sellPrice),
            orginalPrice: data.orginalPrice,
            category: data.category,
            condition: data.condition,
            location: data.location,
            used: data.used,
            number: data.number,
            description: data.description,
            seller: databaseUser?.userName,
            sellerEmail: databaseUser?.email,
            sellerVerify: databaseUser?.verify,
          };

          console.log(product);

          fetch("http://localhost:5000/products", {
            method: "POST",
            headers: {
              "content-type": "application/json",
              authorization: `bearer ${localStorage.getItem("accessToken")}`,
            },
            body: JSON.stringify(product),
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.acknowledged) {
                toast("product successfuly added");
                setLoading(false);
                reset();
              }
            });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <h2 className="text-3xl font-bold text-center mb-3 text-teal-600">
        Add a Product
      </h2>
      <form
        onSubmit={handleSubmit(handelAddProduct)}
        className="w-[80%] mx-auto card card-body shadow-2xl bg-white"
      >
        <div className="flex items-center gap-4">
          <div className="form-control  w-[50%]">
            <label className="label">
              <span className="label-text font-semibold">Name</span>
            </label>
            <input
              type="text"
              {...register("productName")}
              placeholder="Product name"
              className="input input-bordered"
              required
            />
          </div>

          <div className="form-control  w-[50%]">
            <label className="label">
              <span className="label-text font-semibold">Product Photo</span>
            </label>
            <input
              {...register("photo")}
              type="file"
              className="file-input w-full input-bordered"
              required
            />
          </div>
        </div>

        {/* Price  */}
        <div className="flex items-center gap-4">
          <div className="form-control w-[50%]">
            <label className="label">
              <span className="label-text font-semibold">Sell Price</span>
            </label>
            <input
              type="number"
              {...register("sellPrice")}
              placeholder="Sell Price"
              className="input input-bordered"
              required
            />
          </div>

          <div className="form-control  w-[50%]">
            <label className="label">
              <span className="label-text font-semibold">Orginal Price</span>
            </label>
            <input
              type="number"
              {...register("orginalPrice")}
              placeholder="Orginal Price"
              className="input input-bordered"
              required
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="form-control w-[50%]">
            <label className="label">
              <span className="label-text font-semibold">Category:</span>
            </label>
            <select
              {...register("category", { required: true })}
              className="select select-bordered w-full "
            >
              {categorys.map((category) => (
                <option key={category._id} defaultValue={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-control w-[50%]">
            <label className="label">
              <span className="label-text font-semibold">Condition:</span>
            </label>
            <select
              {...register("condition", { required: true })}
              className="select select-bordered w-full "
            >
              <option defaultValue="excellent">excellent</option>
              <option defaultValue="good">good</option>
              <option defaultValue="fair">fair</option>
            </select>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="form-control w-[50%]">
            <label className="label">
              <span className="label-text font-semibold">Location</span>
            </label>
            <input
              type="text"
              {...register("location")}
              placeholder="Location"
              className="input input-bordered"
              required
            />
          </div>

          <div className="form-control  w-[50%]">
            <label className="label">
              <span className="label-text font-semibold">Year of used</span>
            </label>
            <input
              type="text"
              {...register("used")}
              placeholder="How many days have you used?"
              className="input input-bordered"
              required
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="form-control w-[50%]">
            <label className="label">
              <span className="label-text font-semibold">Number</span>
            </label>
            <input
              type="number"
              {...register("number")}
              placeholder="Contact Number"
              className="input input-bordered"
              required
            />
          </div>
        </div>

        <div className="form-control ">
          <label className="label">
            <span className="label-text font-semibold">Description</span>
          </label>
          <textarea
            className="textarea textarea-bordered"
            {...register("description")}
            placeholder="Details product"
          ></textarea>
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
            "Submit"
          )}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
