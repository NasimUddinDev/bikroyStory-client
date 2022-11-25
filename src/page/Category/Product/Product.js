import React from "react";
import { RiErrorWarningLine } from "react-icons/ri";

const Product = ({ product, setProduct }) => {
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
  } = product;

  return (
    <div className="border p-4 md:flex gap-4 mb-4 rounded-md bg-white">
      <div className="w-[60%] md:w-[34%] mx-auto mb-4 md:mb-0">
        <img src={picture} alt="Shoes" className="w-full h-48" />
      </div>

      <div className="w-[80%] mx-auto md:w-[66%]">
        <div>
          <div className="md:flex justify-between">
            <div>
              <h2 className="card-title text-2xl text-teal-600">
                {productName}
              </h2>
              <small className="text-gray-600">
                Post on {time}, {date}
              </small>
              <p>
                <span className="text-gray-500">Location:</span> {location}
              </p>
              <p>
                <span className="text-gray-500">For sale by</span> {seller}
              </p>
            </div>

            <p>
              <span className="text-gray-500">Brand:</span> {category}
            </p>
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
          <button className="flex items-center gap-1 text-red-600">
            <RiErrorWarningLine /> Report this add
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
