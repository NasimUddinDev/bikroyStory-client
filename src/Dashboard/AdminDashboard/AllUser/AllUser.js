import { useQuery } from "@tanstack/react-query";
import React from "react";
import { AiFillDelete } from "react-icons/ai";
import { toast } from "react-toastify";
import Spinner from "./../../../components/Spinner/Spinner";

const AllUser = () => {
  const {
    data: users = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["users"],
    queryFn: () =>
      fetch(`http://localhost:5000/users`, {
        headers: {
          authorization: `bearer ${localStorage.getItem("accessToken")}`,
        },
      }).then((res) => res.json()),
  });

  const handelUserDelete = (id) => {
    const confirm = window.confirm(`Are you sure delete this user`);
    if (confirm) {
      fetch(`http://localhost:5000/users/${id}`, {
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
    <div className="overflow-x-auto">
      {users?.length === 0 ? (
        <h2 className="text-2xl text-center text-teal-600 font-semibold">
          No User
        </h2>
      ) : (
        <div>
          <h2 className="text-2xl font-semibold text-center text-teal-600 py-4">
            All Users
          </h2>
          <table className="table w-full border">
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Email</th>
                <th>Status</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {users?.map((user, i) => (
                <tr key={user._id}>
                  <th>{i + 1}</th>
                  <td>{user.userName}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
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

export default AllUser;
