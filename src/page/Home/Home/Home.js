import React, { useEffect, useState } from "react";
import Banner from "../../../components/Banner/Banner";
import { Link } from "react-router-dom";

const Home = () => {
  const [categorys, setCategorys] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/categorys")
      .then((res) => res.json())
      .then((data) => setCategorys(data));
  }, []);

  return (
    <div className="container mx-auto ">
      <section className="py-4">
        <Banner></Banner>
      </section>

      <section className="py-5">
        {/* <h2 className="text-lg font-semibold mb-4">Browse items by category</h2> */}

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
    </div>
  );
};

export default Home;
