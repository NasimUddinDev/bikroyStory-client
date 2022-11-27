import React, { useContext, useState } from "react";
import Banner from "../../../components/Banner/Banner";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Product from "../../Category/Product/Product";
import BookingModal from "../../Category/BookingModal/BookingModal";
import { AuthContext } from "../../../contextApi/AuthProvider";
import Spinner from "./../../../components/Spinner/Spinner";

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
      <section className="py-4">
        <Banner></Banner>
      </section>

      {/* Category  */}
      <section className="py-5 bg-base-200">
        {isLoading && <Spinner />}

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8 justify-center px-2">
          {categorys?.map((category) => (
            <Link
              to={`/categorys/${category._id}`}
              key={category._id}
              className="card bg-base-200 shadow-xl hover:bg-base-300 duration-200"
            >
              <div className="card-body items-center text-center">
                <img
                  src={category.image}
                  alt=""
                  className="w-32 h-30 lg:h-32  rounded-md"
                />
                <h2 className="card-title font-bold text-sm md:text-xl lg:text-2xl">
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
    </div>
  );
};

export default Home;
