"use client";
import React, { useEffect, useState } from "react";
import AdminMenu from "@/app/components/AdminMenu";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Newproduct = () => {
  const toastOptions = {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  };

  const [products, setProducts] = useState([]);

  //get all products
  const getAll = async () => {
    try {
      const response = await axios.get("/api/products");
      setProducts(response.data.products);
    } catch (error) {
      toast.error("Failed to get all products", toastOptions);
    }
  };

  useEffect(() => {
    getAll();
  }, []);

  return (
    <>
      <div className="row p-3">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9 ">
          <h1 className="text-center">All Products List</h1>
          <div className="d-flex flex-wrap">
            {products?.map((p) => (
              <>
                <Link
                  key={p._id}
                  href={`/dashboard/admin/products/${p.slug}`}
                  className="product-link"
                >
                  <div className="card m-2" style={{ width: "18rem" }}>
                    <Image
                      src={p.photo}
                      className="card-img-top"
                      alt="Not available"
                      width={200}
                      height={200}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{p.name}</h5>
                      <p className="card-text">{p.description}</p>
                    </div>
                  </div>
                </Link>
              </>
            ))}
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Newproduct;
