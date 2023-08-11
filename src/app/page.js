"use client";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Prices } from "./components/Prices";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Checkbox, Radio } from "antd";
import Image from "next/image";

export default function Home() {
  const router = useRouter();
  const toastOptions = {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  };
  const [check, setCheck] = useState([]);
  const [radio, setRadio] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);

  //get total count
  const getTotal = async () => {
    try {
      const response = await axios.get("/api/productcount");
      setTotal(response.data.total);
    } catch (error) {
      toast.error(error, toastOptions);
    }
  };

  //get All products
  const getAllP = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/products");
      setLoading(false);
      setProducts(response.data.products);
    } catch (error) {
      setLoading(true);
      toast.error("Unexpected error: Can't get all products", toastOptions);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!check.length || !radio.length) {
      getAllP();
    }
  }, [check.length, radio.length]);

  useEffect(() => {
    if (check.length || radio.length) filterProducts();
  }, [check, radio]);

  //get all category
  useEffect(() => {
    getAll();
    getTotal();
  }, []);

  const getAll = async () => {
    try {
      const response = await axios.get("/api/updatecategory");
      if (response.data.status === 200) {
        setCategory(response.data.category);
      } else {
        toast.error("Can't get products", toastOptions);
      }
    } catch (error) {
      toast.error("Can't getAll products", toastOptions);
    }
  };

  //handel filter
  const handleFilter = (value, id) => {
    let all = [...check];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setCheck(all);
  };
  //get filtered products
  const filterProducts = async () => {
    try {
      const response = await axios.post(`/api/filter`, { check, radio });
      setProducts(response.data?.products);
    } catch (error) {
      toast.error("Can't filter products", toastOptions);
    }
  };
  return (
    <>
      <main>
        <div className="row mt-4">
          <div className="col-md-2 ">
            <h4 className="text-center">Filters By category</h4>
            <div className="d-flex flex-column mt-2">
              {category?.map((c) => (
                <Checkbox
                  className="m-1"
                  key={c._id}
                  onChange={(e) => handleFilter(e.target.checked, c._id)}
                >
                  {c.name}
                </Checkbox>
              ))}
            </div>
            <h4 className="text-center mt-4">Filter By Price</h4>
            <div className="d-flex flex-column">
              <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                {Prices?.map((p) => (
                  <div key={p._id} className="mx-2">
                    <Radio value={p.array}>{p.name}</Radio>
                  </div>
                ))}
              </Radio.Group>
            </div>
            <div className="d-flex flex-column">
              <button
                className="btn btn-danger"
                onClick={() => window.location.reload()}
              >
                RESET FILTERS
              </button>
            </div>
          </div>

          <div className="col-md-9">
            <h1 className="text-center">All products</h1>
            <div className="d-flex flex-wrap flex-col">
              {products?.map((p) => (
                <>
                  {/* <Link
                    key={p._id}
                    href={`/single/${p.slug}`}
                    className="product-link"
                  > */}
                    <div className="card m-2" style={{ width: "18rem" }}>
                      <Image
                        src={p.photo}
                        width={200}
                        height={200}
                        alt="Image not availabe"
                        className="card-img-top"
                      />
                      <div className="card-body">
                        <h5 className="card-title">{p.name}</h5>
                        <p className="card-text">
                          {p.description.substring(0, 30)}...{" "}
                        </p>
                        <p className="card-text">₹ {p.price}</p>
                        <button
                          className="btn btn-primary"
                          onClick={(e) => {
                            router.push(`/single/${p.slug}`);
                          }}
                        >
                          More details
                        </button>
                        <button className="btn btn-secondary m-1">
                          Add to cart
                        </button>
                      </div>
                    </div>
                  {/* </Link> */}
                </>
              ))}
            </div>
            <div className="m-2 p-3">
              {products && products.length < total && (
                <button
                  className="btn btn-warning"
                  onClick={(e) => {
                    e.preventDefault();
                    setPage(page + 1);
                  }}
                >
                  {loading ? "Loading..." : "Load More"}
                </button>
              )}
            </div>
          </div>
        </div>
      </main>
      <ToastContainer />
    </>
  );
}
