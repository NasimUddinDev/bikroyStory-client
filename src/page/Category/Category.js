import React, { useContext, useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { MdKeyboardArrowRight } from "react-icons/md";
import Product from "./Product/Product";
import { AuthContext } from "../../contextApi/AuthProvider";
import BookingModal from "./BookingModal/BookingModal";
import { useQuery } from "@tanstack/react-query";

const Category = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [product, setProduct] = useState(null);
  const { name } = useLoaderData();
  const { user } = useContext(AuthContext);

  const { data: categorys = [] } = useQuery({
    queryKey: ["categorys"],
    queryFn: () =>
      fetch("http://localhost:5000/categorys").then((res) => res.json()),
  });

  useEffect(() => {
    fetch(`http://localhost:5000/products?category=${name}`)
      .then((res) => res.json())
      .then((data) => {
        const availableProducts = data.filter(
          (product) => product.available !== "soled"
        );
        setProducts(availableProducts);
        setLoading(false);
      });
  }, [name]);

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
              {categorys.map((category) => (
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
          {products.length === 0
            ? "No Available Product"
            : loading && (
                <div role="status">
                  <svg
                    aria-hidden="true"
                    className="mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                  <span className="sr-only">Loading...</span>
                </div>
              )}

          {products.map((product) => (
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
