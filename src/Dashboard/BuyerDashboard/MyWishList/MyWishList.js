import React, { useContext } from "react";
import { AuthContext } from "../../../contextApi/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import { AiFillDelete } from "react-icons/ai";
import { toast } from "react-toastify";

const MyWishList = () => {
  const { user } = useContext(AuthContext);

  const { data: wishlists = [], refetch } = useQuery({
    queryKey: ["wishlists", user?.email],
    queryFn: () =>
      fetch(`http://localhost:5000/wishlists?email=${user?.email}`, {
        headers: {
          authorization: `bearer ${localStorage.getItem("accessToken")}`,
        },
      }).then((res) => res.json()),
  });

  const handelDeleteWishlist = (id) => {
    const confirm = window.confirm(`Are you sure delete this user`);
    if (confirm) {
      fetch(`http://localhost:5000/wishlists/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.deletedCount > 0) {
            toast("Delete Success");
            refetch();
          }
        });
    }
  };

  return (
    <div className="overflow-x-auto">
      {wishlists.length === 0 ? (
        <h2 className="text-2xl text-center text-teal-600 font-semibold">
          No Wishlists
        </h2>
      ) : (
        <div>
          <h2 className="text-2xl font-semibold text-center text-teal-600 py-4">
            My Wishlist
          </h2>
          <table className="table w-full border">
            <thead>
              <tr>
                <th></th>
                <th>Product</th>
                <th>Price</th>
                <th>Seller Location</th>
                <th>Delete</th>
                <th>Payment</th>
              </tr>
            </thead>
            <tbody>
              {wishlists?.map((wishlist, i) => (
                <tr key={wishlist.product._id}>
                  <th>{i + 1}</th>
                  <td>{wishlist.product.productName}</td>
                  <td>{wishlist.product.sellPrice} Tk</td>
                  <td>{wishlist.product.location}</td>
                  <td>
                    <button
                      onClick={() => handelDeleteWishlist(wishlist._id)}
                      className="text-2xl text-red-700"
                    >
                      <AiFillDelete />
                    </button>
                  </td>
                  <td>
                    <button className="btn btn-accent btn-xs text-white">
                      Payament
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyWishList;
