import React from "react";
import { AiFillDelete } from "react-icons/ai";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import Spinner from "./../../../components/Spinner/Spinner";

const AllSeller = () => {
  const userRole = "Seller";
  const {
    data: sellers = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["users", userRole],
    queryFn: () =>
      fetch(`http://localhost:5000/users?role=${userRole}`, {
        headers: {
          authorization: `bearer ${localStorage.getItem("accessToken")}`,
        },
      }).then((res) => res.json()),
  });

  // delete Buyer
  const handelUserDelete = (id) => {
    const confirm = window.confirm(`Are you sure delete this user`);
    if (confirm) {
      fetch(`http://localhost:5000/users/${id}`, {
        method: "DELETE",
        headers: {
          authorization: `bearer ${localStorage.getItem("accessToken")}`,
        },
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

  // Seller Make verify
  const handelSellerVerify = (user) => {
    const confirm = window.confirm(`Are you sure Verify this user`);
    if (confirm) {
      fetch(`http://localhost:5000/users/${user.email}`, {
        method: "PUT",
        headers: {
          authorization: `bearer ${localStorage.getItem("accessToken")}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.acknowledged) {
            toast("Seller Update success");
            refetch();
          }
        });
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="overflow-x-auto">
      {sellers.length === 0 ? (
        "No Seller"
      ) : (
        <div>
          <h2 className="text-2xl font-semibold text-center text-teal-600 py-4">
            All Seller
          </h2>
          <table className="table w-full border">
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Email</th>
                <th>Verify</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {sellers?.map((user, i) => (
                <tr key={user._id}>
                  <th>{i + 1}</th>
                  <td>{user.userName}</td>
                  <td>{user.email}</td>
                  <td>
                    {user?.verify === "verify" ? (
                      "Verifyed"
                    ) : (
                      <button
                        onClick={() => handelSellerVerify(user)}
                        className="btn btn-xs btn-accent text-white"
                      >
                        Make Verify
                      </button>
                    )}
                  </td>
                  <td>
                    <button
                      onClick={() => handelUserDelete(user._id)}
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

export default AllSeller;
