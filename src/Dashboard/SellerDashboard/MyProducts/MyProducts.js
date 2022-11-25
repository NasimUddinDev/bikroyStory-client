import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../contextApi/AuthProvider";
import { AiFillDelete } from "react-icons/ai";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

const MyProducts = () => {
  const { user } = useContext(AuthContext);

  const { data: myProducts = [], refetch } = useQuery({
    queryKey: ["sellerProducts", user?.email],
    queryFn: () =>
      fetch(`http://localhost:5000/sellerProducts?email=${user?.email}`, {
        headers: {
          authorization: `bearer ${localStorage.getItem("accessToken")}`,
        },
      }).then((res) => res.json()),
  });

  const handelProductDelete = (id) => {
    const confirm = window.confirm(`Are you sure delete this user`);
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

  return (
    <div className="p-4">
      <h2 className="text-xl">My Products: {myProducts.length}</h2>

      <table className="table w-full">
        <thead>
          <tr>
            <th></th>
            <th>ProductName</th>
            <th>Price</th>
            <th>Category</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {myProducts?.map((product, i) => (
            <tr key={product._id}>
              <th>{i + 1}</th>
              <td>{product.productName}</td>
              <td>{product.sellPrice}</td>
              <td>{product.category}</td>
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
  );
};

export default MyProducts;
