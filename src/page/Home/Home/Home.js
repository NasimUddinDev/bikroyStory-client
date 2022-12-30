import React, { useContext, useEffect, useState } from "react";
import Banner from "../../../components/Banner/Banner";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Product from "../../Category/Product/Product";
import BookingModal from "../../Category/BookingModal/BookingModal";
import { AuthContext } from "../../../contextApi/AuthProvider";
import Spinner from "./../../../components/Spinner/Spinner";
import FreeAdd from "../../../images/freeadd.png";
import Check from "../../../images/check.svg";
import axios from "axios";
import { BsArrowRepeat } from "react-icons/bs";
import { TbTruckReturn } from "react-icons/tb";
import { BiSupport } from "react-icons/bi";
import { RiSecurePaymentFill } from "react-icons/ri";

const Home = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);
  const [waltons, setWaltons] = useState([]);
  const [apples, setApples] = useState([]);
  const [hps, sethps] = useState([]);
  const [asus, setAsus] = useState([]);

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

  // Waltop Laptop Data
  useEffect(() => {
    axios
      .get(
        `https://bikroy-store-server-nasim0994.vercel.app/products?category=WALTON`,
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
        setWaltons(availableProducts);
        setLoading(false);
      });
  }, []);

  // Apple Laptop Data
  useEffect(() => {
    axios
      .get(
        `https://bikroy-store-server-nasim0994.vercel.app/products?category=APPLE`,
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
        setApples(availableProducts);
        setLoading(false);
      });
  }, []);

  // HP Laptop Data
  useEffect(() => {
    axios
      .get(
        `https://bikroy-store-server-nasim0994.vercel.app/products?category=HP`,
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
        sethps(availableProducts);
        setLoading(false);
      });
  }, []);
  // Asus Laptop Data
  useEffect(() => {
    axios
      .get(
        `https://bikroy-store-server-nasim0994.vercel.app/products?category=ASUS`,
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
        setAsus(availableProducts);
        setLoading(false);
      });
  }, []);

  return (
    <div className="w-[80%] mx-auto">
      {/* Banner */}
      <section className="py-4">
        <Banner></Banner>
      </section>

      {/* Category  */}
      <section className="py-5 ">
        <h2 className="text-lg mb-4 font-semibold">Browse items by category</h2>
        {isLoading && <Spinner />}

        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-12 justify-center px-2">
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
                  className="w-14 h-14 rounded-md"
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
      <section className="py-2">
        <h2 className="text-lg mb-4 font-semibold">Urgent Sell</h2>
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

      {/* Walton Laptop */}
      <section className="py-2">
        <h2 className="text-lg mb-4 font-semibold">Walton Laptop</h2>
        <div className="grid lg:grid-cols-2 gap-2">
          {waltons?.length === 0
            ? "No Available Product"
            : loading && <Spinner />}

          {waltons?.map((product) => (
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

      {/* Apple Laptop */}
      <section className="py-2">
        <h2 className="text-lg mb-4 font-semibold">Apple Laptop</h2>
        <div className="grid lg:grid-cols-2 gap-2">
          {apples?.length === 0
            ? "No Available Product"
            : loading && <Spinner />}

          {apples?.map((product) => (
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

      {/* HP Laptop */}
      <section className="py-2">
        <h2 className="text-lg mb-4 font-semibold">HP Laptop</h2>
        <div className="grid lg:grid-cols-2 gap-2">
          {hps?.length === 0 ? "No Available Product" : loading && <Spinner />}

          {hps?.map((product) => (
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

      {/* Asus Laptop */}
      <section className="py-2">
        <h2 className="text-lg mb-4 font-semibold">Asus Laptop</h2>
        <div className="grid lg:grid-cols-2 gap-2">
          {asus?.length === 0 ? "No Available Product" : loading && <Spinner />}

          {asus?.map((product) => (
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
        <div className="flex flex-col-reverse lg:flex-row items-center border rounded-md lg:h-96 shadow-md">
          <div data-aos="fade-right" className="lg:w-[50%] p-8 ">
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
          <div data-aos="fade-left" className="lg:w-[50%]">
            <img
              src={FreeAdd}
              alt=""
              className="lg:h-96 w-full lg:rounded-tr-md lg:rounded-br-md "
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
