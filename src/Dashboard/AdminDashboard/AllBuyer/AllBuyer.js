import React, { useEffect, useState } from "react";
import { AiFillDelete } from "react-icons/ai";

const AllBuyer = () => {
  const [buyers, setBuyers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/users", {
      headers: {
        authorization: `bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          const sellers = data.filter((user) => user.role === "Buyer");
          setBuyers(sellers);
          setLoading(false);
        }
      });
  }, []);

  // delete Buyer
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
      {loading && <h2>Loadding....</h2>}

      {buyers.length === 0 ? (
        "No Buyer"
      ) : (
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
            {buyers?.map((user, i) => (
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
      )}
    </div>
  );
};

export default AllBuyer;
