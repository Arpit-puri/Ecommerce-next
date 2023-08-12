"use client";
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";
import { useCart } from "@/app/context/cart";
const ProductDetail = ({ params }) => {
  const toastOptions = {
    position: "top-center",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  };
  const [cart, setCart] = useCart();
  const [product, setProduct] = useState({});

  //get-prducts
  const getP = async () => {
    try {
      const response = await axios.get(`/api/products/${params.slug}`);
      setProduct(response.data.find);
      return;
    } catch (error) {
      toast.error("Unexpected error: ", toastOptions);
    }
  };

  useEffect(() => {
    if (params?.slug) getP();
  }, [params?.slug]);

  return (
    <>
      <div className="row container m-3">
        <div className="col-md-6">
          <Image
            src={product.photo}
            className="card-img-top border-slate-500 border-2 rounded"
            alt="Not available"
            width={400}
            height={500}
          />
        </div>
        <div className="col-md-6 border-2 border-slate-700">
          <h1 className="text-center">Product Details</h1>
          <h4 className="text-center p-2">Name: {product.name}</h4>
          <h6 className="m-3">Description: {product.description}</h6>
          <h6 className="m-3">Price: ₹{product.price}</h6>
          <h6 className="m-3">Category: {product.category}</h6>
          <button
            className="btn btn-secondary m-1"
            onClick={(e) => {
              setCart([...cart, product]);
            }}
          >
            Add to cart
          </button>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default ProductDetail;
