import { useQuery } from "@tanstack/react-query";
import React from "react";
import { AiFillDelete } from "react-icons/ai";

const AllUser = () => {
  const { data: users = [] } = useQuery({
    queryKey: ["bookings"],
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
            alert(`Delete successuly`);
          }
        });
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="table w-full">
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
              <td>{user.userSatus}</td>
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
  );
};

export default AllUser;
