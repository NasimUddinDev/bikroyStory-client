import React, { useContext, useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { MdKeyboardArrowRight } from "react-icons/md";
import Product from "./Product/Product";
import { AuthContext } from "../../contextApi/AuthProvider";

const Category = () => {
  const [products, setProducts] = useState([]);
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
      <section className="flex gap-4 ">
        <div className="w-[20%] bg-base-200 rounded-md p-4">
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

        <div className="w-[60%] ">
          {products.map((product) => (
            <Product product={product} key={product._id} user={user}></Product>
          ))}
        </div>

        <div className="w-[20%] border rounded-md p-2">
          <p>
            <span className="text-gray-500">For sale by</span> Nasim
          </p>
        </div>
      </section>
    </div>
  );
};

export default Category;
