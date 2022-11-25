import React, { useContext, useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { MdKeyboardArrowRight } from "react-icons/md";
import Product from "./Product/Product";
import { AuthContext } from "../../contextApi/AuthProvider";
import BookingModal from "./BookingModal/BookingModal";

const Category = () => {
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState(null);
  const [categorys, setCategorys] = useState([]);
  const { name } = useLoaderData();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetch("http://localhost:5000/categorys")
      .then((res) => res.json())
      .then((data) => setCategorys(data));
  }, []);

  useEffect(() => {
    fetch(`http://localhost:5000/products?category=${name}`)
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, [name]);

  return (
    <div className="w-[80%] mx-auto py-5">
      <section className="lg:flex gap-4">
        <div className="w-[20%] bg-white rounded-md p-4 hidden lg:block">
          <h3 className="flex items-center">
            <Link to="/home" className="text-blue-500">
              Home
            </Link>{" "}
            <MdKeyboardArrowRight /> {name} - {products.length}
          </h3>

          <div>
            <ul className="py-4">
              {categorys.map((category) => (
                <li key={category._id}>
                  <Link
                    to={`/categorys/${category._id}`}
                    className="text-lg block m-1 border-b"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="w-full lg:w-[60%]">
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

        <div className="w-[20%] border rounded-md p-2 bg-white hidden lg:block">
          <p className="border-b p-2">
            <span className="text-gray-500">E</span> email@gmail.com
          </p>
        </div>
      </section>
    </div>
  );
};

export default Category;
