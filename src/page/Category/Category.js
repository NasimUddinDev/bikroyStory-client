import React, { useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { MdKeyboardArrowRight } from "react-icons/md";

const Category = () => {
  const [products, setProducts] = useState([]);
  const { name } = useLoaderData();
  console.log(name);

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
    </div>
  );
};

export default Category;
