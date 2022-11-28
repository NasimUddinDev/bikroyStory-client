import React, { useContext } from "react";
import { AuthContext } from "../../../contextApi/AuthProvider";
import { AiFillDelete } from "react-icons/ai";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import Spinner from "./../../../components/Spinner/Spinner";

const MyProducts = () => {
  const { user } = useContext(AuthContext);

  const {
    data: myProducts = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["userProducts", user?.email],
    queryFn: () =>
      fetch(`http://localhost:5000/userProducts?email=${user?.email}`, {
        headers: {
          authorization: `bearer ${localStorage.getItem("accessToken")}`,
        },
      }).then((res) => res.json()),
  });

  // Delete a Product
  const handelProductDelete = (id) => {
    const confirm = window.confirm(`Are you sure Delete this Product`);
    if (confirm) {
      fetch(`http://localhost:5000/products/${id}`, {
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

  // Advertise a Product
  const handelAdvertise = (id) => {
    const confirm = window.confirm(`Are you sure Advertise this Product`);
    if (confirm) {
      fetch(`http://localhost:5000/products/${id}`, {
        method: "PUT",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.acknowledged) {
            toast("Product Advertise Success");
            refetch();
          }
        })
        .catch((error) => console.log(error));
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="p-4">
      {myProducts?.length === 0 ? (
        <h2 className="text-2xl text-center text-teal-600 font-semibold">
          No Product
        </h2>
      ) : (
        <div>
          <h2 className="text-2xl text-center text-teal-600 font-semibold mb-4">
            My Products: {myProducts?.length}
          </h2>

          <table className="table w-full border">
            <thead>
              <tr>
                <th></th>
                <th>ProductName</th>
                <th>Price</th>
                <th>Available</th>
                <th>Advertise</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {myProducts?.map((product, i) => (
                <tr key={product._id}>
                  <th>{i + 1}</th>
                  <td>
                    {product.productName.length >= 25
                      ? product.productName.slice(0, 25) + "..."
                      : product.productName}
                  </td>
                  <td>{product.sellPrice}</td>
                  <td>
                    {product.available === "soled"
                      ? product.available
                      : "Available"}
                  </td>
                  <td>
                    {product.available === "soled" ? (
                      <button
                        onClick={() => handelAdvertise(product._id)}
                        className="btn btn-xs btn-accent"
                        disabled
                      >
                        advertise
                      </button>
                    ) : product?.advertise ? (
                      "Advertised"
                    ) : (
                      <button
                        onClick={() => handelAdvertise(product._id)}
                        className="btn btn-xs btn-accent"
                      >
                        advertise
                      </button>
                    )}
                  </td>
                  <td>
                    <button
                      onClick={() => handelProductDelete(product._id)}
                      className="text-2xl text-red-700"
                    >
                      <AiFillDelete />
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

export default MyProducts;
