import React from "react";
import { RiErrorWarningLine } from "react-icons/ri";
import { toast } from "react-toastify";

const Product = ({ product, user }) => {
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
      userName: user.displayName,
      userEmail: user.email,
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
              <p className="text-gray-600">Post on {time}</p>
              <p>
                <span className="text-gray-500">Location:</span> {location}
              </p>
              <p>
                <span className="text-gray-500">For sale by</span> Nasim
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
                {originalPrice} TK
              </h2>
            </div>

            <div>
              <p>
                <span className="text-gray-500">Used:</span> {use} year Used
              </p>
              <p>
                <span className="text-gray-500">Condition:</span> {use} year
                Used
              </p>
            </div>
          </div>
        </div>

        <div className="py-2">
          <hr />
        </div>

        <div className="md:flex justify-between items-center">
          <button className="flex items-center gap-1 text-red-600">
            <RiErrorWarningLine /> Report this add
          </button>

          {/* The button to open modal */}
          <label htmlFor="my-modal-3" className="btn btn-accent">
            Book Now
          </label>
        </div>

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
                defaultValue={user?.displayName}
                readOnly
              />
              <input
                type="email"
                name="buyerEmail"
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs mb-2"
                defaultValue={user?.email}
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
  );
};

export default Product;
