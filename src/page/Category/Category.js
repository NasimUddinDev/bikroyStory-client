import React, { useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { MdKeyboardArrowRight } from "react-icons/md";
import Product from "./Product/Product";

const Category = () => {
  const [products, setProducts] = useState([]);
  const { name } = useLoaderData();

  useEffect(() => {
    fetch(`http://localhost:5000/products?category=${name}`)
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, [name]);

  return (
    <div className="container mx-auto py-5">
      <h3 className="flex items-center">
        <Link to="/home" className="text-blue-500">
          Home
        </Link>{" "}
        <MdKeyboardArrowRight /> {name} - {products.length}
      </h3>

      <div className="grid grid-cols-3 gap-4 py-5">
        {products.map((product) => (
          <Product product={product} key={product._id}></Product>
        ))}
      </div>
    </div>
  );
};

export default Category;
