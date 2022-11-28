import React from "react";
import { useQuery } from "@tanstack/react-query";
import { AiFillDelete } from "react-icons/ai";
import { toast } from "react-toastify";
import Spinner from "../../../components/Spinner/Spinner";

const RepotedProducts = () => {
  const {
    data: reportProducts = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["reported"],
    queryFn: () =>
      fetch(`http://localhost:5000/products/report?report=reported`, {
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

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="p-4">
      {reportProducts?.length === 0 ? (
        <h2 className="text-2xl text-center text-teal-600 font-semibold">
          No Reported Product
        </h2>
      ) : (
        <div>
          <h2 className="text-2xl text-center text-teal-600 font-semibold mb-4">
            Reported Products: {reportProducts?.length}
          </h2>

          <table className="table w-full border">
            <thead>
              <tr>
                <th></th>
                <th>ProductName</th>
                <th>Seller</th>
                <th>Price</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {reportProducts?.map((product, i) => (
                <tr key={product._id}>
                  <th>{i + 1}</th>
                  <td>{product.productName}</td>
                  <td>{product.seller}</td>
                  <td>{product.sellPrice}</td>
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

export default RepotedProducts;
