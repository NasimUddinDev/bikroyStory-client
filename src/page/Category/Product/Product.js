import React, { useContext } from "react";
import { RiErrorWarningLine } from "react-icons/ri";
import { MdVerified, MdLocationOn } from "react-icons/md";
import { BsFillTelephoneFill } from "react-icons/bs";
import { AuthContext } from "../../../contextApi/AuthProvider";
import { toast } from "react-toastify";

const Product = ({ product, setProduct }) => {
  // const { user } = useContext(AuthContext);
  const {
    productName,
    picture,
    category,
    time,
    date,
    location,
    orginalPrice,
    sellPrice,
    used,
    condition,
    seller,
    number,
    description,
    sellerVerify,
  } = product;

  const handelReport = (id) => {
    const confirm = window.confirm("Are You sure Report this Product");
    if (confirm) {
      fetch(
        `https://bikroy-store-server-nasim0994.vercel.app/products/report/${id}`,
        {
          method: "PUT",
        }
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          toast("Report Success");
        });
    }
  };

  return (
    <div className="border p-2 md:flex gap-4 mb-4 rounded-md shadow-md">
      <div className="w-[80%] md:w-[35%] mx-auto mb-4 md:mb-0">
        <img src={picture} alt="Shoes" className="w-full h-52" />
      </div>

      <div className="w-[80%] mx-auto md:w-[65%]">
        <div>
          <div className="md:flex justify-between">
            <div className="w-[74%]">
              <h2 className="card-title text-2xl text-teal-600">
                {productName}
              </h2>
              <small className="text-gray-600">
                Post on {time}, {date}
              </small>
              <p className="flex items-center gap-1">
                <span className="text-gray-500">For sale by</span>{" "}
                {sellerVerify && (
                  <span className="text-blue-500 text-[18px]">
                    <MdVerified />
                  </span>
                )}{" "}
                {seller}
              </p>
              <p className="flex items-center gap-1">
                {" "}
                <span className="text-gray-500">
                  <BsFillTelephoneFill />
                </span>{" "}
                {number}
              </p>
            </div>

            <div className="w-[26%]">
              <p>
                <span className="text-gray-500">Brand:</span> {category}
              </p>
              <p className="flex items-center gap-1">
                <span className="text-gray-500 text-xl">
                  <MdLocationOn />
                </span>
                {location}
              </p>
            </div>
          </div>

          <div className="md:flex items-center justify-between mt-2">
            <div>
              <h2 className="text-lg text-teal-600 font-semibold">
                <span className="text-gray-500">Price</span> {sellPrice} TK
              </h2>
              <h2>
                <span className="text-gray-500">Original Price:</span>{" "}
                {orginalPrice} TK
              </h2>
            </div>

            <div>
              <p>
                <span className="text-gray-500">Used:</span> {used} year
              </p>
              <p>
                <span className="text-gray-500">Condition:</span> {condition}
              </p>
            </div>
          </div>
        </div>

        {/* Line */}
        <div className="py-2">
          <hr />
        </div>

        {/* Buttoon */}
        <div className="md:flex justify-between items-center">
          <button
            onClick={() => handelReport(product._id)}
            className="flex items-center gap-1 text-red-500"
          >
            <RiErrorWarningLine /> Report to Admin
          </button>

          {/* The button to open modal */}
          <label
            onClick={() => setProduct(product)}
            htmlFor="my-modal-3"
            className="btn btn-accent"
          >
            Book Now
          </label>
        </div>
      </div>
    </div>
  );
};

export default Product;
