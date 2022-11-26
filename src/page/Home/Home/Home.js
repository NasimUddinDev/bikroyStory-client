import React, { useContext, useState } from "react";
import Banner from "../../../components/Banner/Banner";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Product from "../../Category/Product/Product";
import BookingModal from "../../Category/BookingModal/BookingModal";
import { AuthContext } from "../../../contextApi/AuthProvider";

const Home = () => {
  const [product, setProduct] = useState(null);
  const { user } = useContext(AuthContext);

  const { data: categorys = [] } = useQuery({
    queryKey: ["categorys"],
    queryFn: () =>
      fetch("http://localhost:5000/categorys").then((res) => res.json()),
  });

  const { data: advertised = [] } = useQuery({
    queryKey: ["advertised"],
    queryFn: () =>
      fetch(`http://localhost:5000/advertised`).then((res) => res.json()),
  });

  return (
    <div className="w-[80%] mx-auto">
      <section className="py-4">
        <Banner></Banner>
      </section>

      {/* Category  */}
      <section className="py-5 bg-base-200">
        <div className="flex gap-8 justify-center">
          {categorys.map((category) => (
            <Link
              to={`/categorys/${category._id}`}
              key={category._id}
              className="card bg-base-200 shadow-xl hover:bg-base-300 duration-200"
            >
              <div className="card-body items-center text-center">
                <img
                  src={category.image}
                  alt=""
                  className="h-36 w-56 rounded-md"
                />
                <h2 className="card-title font-bold">{category.name}</h2>
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
