import React from "react";
import { RiErrorWarningLine } from "react-icons/ri";
import { toast } from "react-toastify";

const Product = ({ product }) => {
  const {
    product: productName,
    picture,
    category,
    time,
    location,
    originalPrice,
    sellPrice,
    use,
  } = product;

  const handelBookForm = (e) => {
    e.preventDefault();

    const form = e.target;
    const buyerName = form.buyerName.value;
    const buyerEmail = form.buyerEmail.value;
    const number = form.number.value;
    const meetLocation = form.location.value;

    const bookInfo = {
      productName,
      price: sellPrice,
      buyerName,
      buyerEmail,
      number,
      meetLocation,
    };

    toast("Book Success", {
      position: "top-center",
      theme: "light",
    });

    form.reset();
  };
  return (
    <div className="card bg-base-200 shadow-xl p-6">
      <div className="mb-4">
        <h2 className="card-title text-2xl">{productName}</h2>
        <p className="text-gray-600 text-[15px]">
          Post on {time} , {location}
        </p>
      </div>
      <figure>
        <img src={picture} alt="Shoes" className="w-96 h-80" />
      </figure>
      <div className="mt-6 ">
        <div>
          <h3>Seller: Nasim</h3>
        </div>
        <h2 className="card-title text-green-700 text-2xl">
          Price: {sellPrice} TK
        </h2>
        <h2>Original Price: {originalPrice} TK</h2>

        <div className="text-gray-600">
          <p className="mt-4 ">Condition: {use} year Used</p>
          <p>Brand: {category}</p>
        </div>
        <div className="card-actions justify-end items-center gap-6 mt-6">
          <button className="flex items-center gap-1 text-red-600">
            <RiErrorWarningLine /> Report this add
          </button>

          {/* The button to open modal */}
          <label htmlFor="my-modal-3" className="btn btn-primary">
            Book Now
          </label>

          {/* Put this part before </body> tag */}
          <input type="checkbox" id="my-modal-3" className="modal-toggle" />
          <div className="modal text-center">
            <div className="modal-box relative">
              <label
                htmlFor="my-modal-3"
                className="btn btn-sm btn-circle absolute right-2 top-2"
              >
                ✕
              </label>
              <div>
                <h3 className="text-xl font-bold">{productName}</h3>
                <p className="py-2">Price: {sellPrice} Tk</p>
              </div>
              <form onSubmit={handelBookForm}>
                <input
                  type="text"
                  name="buyerName"
                  placeholder="Type here"
                  className="input input-bordered w-full max-w-xs mb-2"
                  defaultValue={"User Name"}
                  readOnly
                />
                <input
                  type="email"
                  name="buyerEmail"
                  placeholder="Type here"
                  className="input input-bordered w-full max-w-xs mb-2"
                  defaultValue={"User Email"}
                  readOnly
                />
                <input
                  type="number"
                  name="number"
                  placeholder="Contact Number"
                  className="input input-bordered w-full max-w-xs mb-2"
                  required
                />

                <input
                  type="text"
                  name="location"
                  placeholder="meeting location"
                  className="input input-bordered w-full max-w-xs mb-2"
                  required
                />

                <div>
                  <button type="submit" className="btn btn-primary">
                    Confirm
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
