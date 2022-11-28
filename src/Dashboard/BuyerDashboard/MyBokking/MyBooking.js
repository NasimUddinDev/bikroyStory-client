import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { AuthContext } from "../../../contextApi/AuthProvider";
import { AiFillDelete } from "react-icons/ai";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import Spinner from "../../../components/Spinner/Spinner";

const MyBooking = () => {
  const { user } = useContext(AuthContext);

  const {
    data: bookings = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["bookings", user?.email],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:5000/bookings?email=${user?.email}`,
        {
          headers: {
            authorization: `bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      const data = await res.json();
      return data;
    },
  });

  const handelBookingDelete = (id) => {
    const confirm = window.confirm(`Are you sure delete this user`);
    if (confirm) {
      fetch(`http://localhost:5000/bookings/${id}`, {
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
      {bookings?.length === 0 ? (
        <h2 className="text-2xl text-center text-teal-600 font-semibold">
          No Booking
        </h2>
      ) : (
        <div>
          <h2 className="text-2xl font-semibold text-center text-teal-600 py-4">
            My Booking
          </h2>
          <table className="table w-full border">
            <thead>
              <tr>
                <th></th>
                <th>Product</th>
                <th>Price</th>
                <th>MeetLocation</th>
                <th>Delete</th>
                <th>Payment</th>
              </tr>
            </thead>
            <tbody>
              {bookings?.map((booking, i) => (
                <tr key={booking._id}>
                  <th>{i + 1}</th>
                  <td>{booking.productName}</td>
                  <td>{booking.price} Tk</td>
                  <td>{booking.meetLocation}</td>
                  <td>
                    <button
                      onClick={() => handelBookingDelete(booking._id)}
                      className="text-2xl text-red-700"
                    >
                      <AiFillDelete />
                    </button>
                  </td>
                  <td>
                    {booking.paid ? (
                      <h3 className="text-teal-700 font-semibold">Paid</h3>
                    ) : (
                      <Link to={`/dashboard/payment/${booking._id}`}>
                        <button className="btn btn-accent btn-xs text-white">
                          Payament
                        </button>
                      </Link>
                    )}
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

export default MyBooking;
