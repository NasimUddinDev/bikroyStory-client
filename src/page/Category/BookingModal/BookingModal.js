import React from "react";
import { toast } from "react-toastify";

const BookingModal = ({ product, user, setProduct }) => {
  const { _id, productName, sellPrice } = product;

  const handelBookForm = (e) => {
    e.preventDefault();

    const form = e.target;

    const buyerName = form.buyerName.value;
    const buyerEmail = form.buyerEmail.value;
    const number = form.number.value;
    const meetLocation = form.location.value;

    const bookInfo = {
      buyerName,
      buyerEmail,
      productName,
      ProductId: _id,
      price: sellPrice,
      number,
      meetLocation,
    };

    fetch("http://localhost:5000/bookings", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(bookInfo),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          toast("Book Success", {
            position: "top-center",
            theme: "light",
          });
          form.reset();
          setProduct(null);
        }
      });
  };

  return (
    <>
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
    </>
  );
};

export default BookingModal;
