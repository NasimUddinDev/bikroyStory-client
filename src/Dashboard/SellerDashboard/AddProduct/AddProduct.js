import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { AuthContext } from "../../../contextApi/AuthProvider";

const AddProduct = () => {
  const { user, date, getDate, getTime, time } = useContext(AuthContext);
  getTime();
  getDate();

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
          const productName = data.productName;
          const picture = imageData.data.url;
          const sellPrice = data.sellPrice;
          const orginalPrice = data.orginalPrice;
          const category = data.category;
          const condition = data.condition;
          const location = data.location;
          const used = data.used;

          const product = {
            productName,
            picture,
            sellPrice,
            orginalPrice,
            category,
            condition,
            location,
            used,
            seller: user.displayName,
            date,
            time,
          };

          fetch("http://localhost:5000/products", {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(product),
          })
            .then((res) => res.json())
            .then((data) => {
              toast("product successfuly added");
              setLoading(false);
              reset();
            });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <h2 className="text-3xl font-bold text-center mb-3">Add a Product</h2>
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
              <option defaultValue="HP">HP</option>
              <option defaultValue="APPLE">APPLE</option>
              <option defaultValue="WALTON">WALTON</option>
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
              <option defaultValue="good" selected>
                good
              </option>
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
              type="number"
              {...register("used")}
              placeholder="How many days have you used?"
              className="input input-bordered"
              required
            />
          </div>
        </div>

        <button type="submit" className="btn">
          {loading ? "Loading.." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
