import React, { useContext, useState } from "react";
import Banner from "../../../components/Banner/Banner";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Product from "../../Category/Product/Product";
import BookingModal from "../../Category/BookingModal/BookingModal";
import { AuthContext } from "../../../contextApi/AuthProvider";
import Spinner from "./../../../components/Spinner/Spinner";
import FreeAdd from "../../../images/freeadd.png";
import Check from "../../../images/check.svg";

const Home = () => {
  const [product, setProduct] = useState(null);
  const { user } = useContext(AuthContext);

  const { data: categorys = [], isLoading } = useQuery({
    queryKey: ["categorys"],
    queryFn: () =>
      fetch("https://bikroy-store-server-nasim0994.vercel.app/categorys", {
        headers: {
          authorization: `bearer ${localStorage.getItem("accessToken")}`,
        },
      }).then((res) => res.json()),
  });

  const { data: advertised = [] } = useQuery({
    queryKey: ["advertised"],
    queryFn: () =>
      fetch(`https://bikroy-store-server-nasim0994.vercel.app/advertised`, {
        headers: {
          authorization: `bearer ${localStorage.getItem("accessToken")}`,
        },
      }).then((res) => res.json()),
  });

  return (
    <div className="w-[80%] mx-auto">
      {/* Banner */}
      <section className="py-4">
        <Banner></Banner>
      </section>

      {/* Category  */}
      <section className="py-5 ">
        {isLoading && <Spinner />}
        <h2 className="text-lg mb-4 font-semibold">Browse items by category</h2>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-12 justify-center px-2">
          {categorys?.map((category) => (
            <Link
              to={`/categorys/${category._id}`}
              key={category._id}
              className="card border shadow-xl hover:bg-base-200 duration-200"
            >
              <div className="card-body items-center text-center">
                <img
                  src={category.image}
                  alt=""
                  className="w-28 h-28 rounded-md"
                />
                <h2 className="card-title font-bold text-sm md:text-xl lg:text-2xl ">
                  {category.name}
                </h2>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Advertised */}
      <section className="py-8">
        <div className="grid lg:grid-cols-2 gap-2">
          {advertised?.map((product) => (
            <Product
              product={product}
              key={product._id}
              setProduct={setProduct}
            ></Product>
          ))}

          {product && (
            <BookingModal
              product={product}
              setProduct={setProduct}
              user={user}
            ></BookingModal>
          )}
        </div>
      </section>

      {/* Add Your Post Esyly */}
      <section className="py-8 bg-white">
        <div className="flex items-center border rounded-md h-96">
          <div className="w-[50%] p-8">
            <h2 className="text-3xl font-semibold mb-6">
              Post your ad for free and easily!
            </h2>
            <ul>
              <li className="flex items-cenetr gap-2  font-semibold mb-2">
                <img src={Check} alt="" />
                <p className="text text-stone-700">Register</p>
              </li>
              <li className="flex items-cenetr gap-2  font-semibold mb-2">
                <img src={Check} alt="" />
                <p className="text text-stone-700">Go to Dashboard</p>
              </li>
              <li className="flex items-cenetr gap-2  font-semibold mb-2">
                <img src={Check} alt="" />
                <p className="text text-stone-700">
                  Post ads with pictures of your products!
                </p>
              </li>
            </ul>
          </div>
          <div className="w-[50%]">
            <img
              src={FreeAdd}
              alt=""
              className="h-96 w-full rounded-tr-md rounded-br-md"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
