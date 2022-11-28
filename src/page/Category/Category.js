import React, { useContext, useEffect, useState } from "react";
import { Link, useLoaderData, useNavigation } from "react-router-dom";
import { MdKeyboardArrowRight } from "react-icons/md";
import Product from "./Product/Product";
import { AuthContext } from "../../contextApi/AuthProvider";
import BookingModal from "./BookingModal/BookingModal";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../../components/Spinner/Spinner";
import axios from "axios";
import ButtonSpinner from "./../../components/ButtonSpinner/ButtonSpinner";

const Category = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation();

  const [product, setProduct] = useState(null);
  const { name } = useLoaderData();
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

  useEffect(() => {
    axios
      .get(
        `https://bikroy-store-server-nasim0994.vercel.app/products?category=${name}`,
        {
          headers: {
            authorization: `bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      )
      .then((res) => {
        const availableProducts = res.data.filter(
          (product) => product.available !== "soled"
        );
        setProducts(availableProducts);
        setLoading(false);
      });
  }, [name]);

  // useEffect(() => {
  //   fetch(
  //     `https://bikroy-store-server-nasim0994.vercel.app/products?category=${name}`,
  //     {
  //       headers: {
  //         authorization: `bearer ${localStorage.getItem("accessToken")}`,
  //       },
  //     }
  //   )
  //     .then((res) => res.json())
  //     .then((data) => {
  //       const availableProducts = data.filter(
  //         (product) => product.available !== "soled"
  //       );
  //       setProducts(availableProducts);
  //       setLoading(false);
  //     });
  // }, [name]);

  if (navigation.state === "loading") {
    return <Spinner></Spinner>;
  }

  return (
    <div className="w-[80%] mx-auto py-5">
      <section className="lg:flex gap-4">
        <div className="w-[25%] bg-base-200 rounded-md p-4 hidden lg:block">
          <h3 className="flex items-center">
            <Link to="/home" className="text-blue-500">
              Home
            </Link>{" "}
            <MdKeyboardArrowRight /> {name} - {products.length}
          </h3>

          <div>
            <h2 className="text-xl font-semibold pt-4 pb-2">Category</h2>
            <ul className="p-2 pt-0">
              {isLoading && <ButtonSpinner />}
              {categorys?.map((category) => (
                <li
                  key={category._id}
                  className="bg-teal-600 text-white font-semibold rounded-md mb-2 p-2"
                >
                  <Link to={`/categorys/${category._id}`} className="block">
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="w-full lg:w-[75%]">
          {products?.length === 0
            ? "No Available Product"
            : loading && <Spinner />}

          {products?.map((product) => (
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

export default Category;
