import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { AuthContext } from "../../../contextApi/AuthProvider";
import { useLoaderData, useNavigation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../../../components/Spinner/Spinner";
import ButtonSpinner from "./../../../components/ButtonSpinner/ButtonSpinner";

const AddProduct = () => {
  const { user } = useContext(AuthContext);
  const categorys = useLoaderData();
  const navigation = useNavigation();

  const { data: databaseUser = {}, isLoading } = useQuery({
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

  if (isLoading) {
    return <Spinner />;
  }

  if (navigation.state === "loading") {
    return <Spinner></Spinner>;
  }

  return (
    <div>
      <h2 className="text-3xl font-bold text-center mb-3 text-teal-600">
        Add a Product
      </h2>
      <form
        onSubmit={handleSubmit(handelAddProduct)}
        className="w-[95%] md:w-[80%] mx-auto card card-body shadow-2xl bg-white"
      >
        <div className="md:flex items-center gap-4">
          <div className="form-control  md:w-[50%]">
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

          <div className="form-control  md:w-[50%]">
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

        <div className="md:flex items-center gap-4">
          <div className="form-control md:w-[50%]">
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

          <div className="form-control  md:w-[50%]">
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

        <div className="md:flex items-center gap-4">
          <div className="form-control md:w-[50%]">
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
          {loading ? <ButtonSpinner /> : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
