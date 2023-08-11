"use client";
import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSearch } from "../context/search";
import axios from "axios";
import { useRouter } from "next/navigation";
const SeachInput = () => {
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
  const [values, setValues] = useSearch();
  const router = useRouter();

  const handelSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `/api/products/search/${values.keyword}`
      );
      setValues({ ...values, results: response.data.result });
      router.push("/search");
    } catch (error) {
      toast.error("Unexpected Error", toastOptions);
    }
  };
  return (
    <>
      <div>
        <form className="d-flex" role="search" onSubmit={handelSubmit}>
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
            value={values.keyword}
            onChange={(e) => setValues({ ...values, keyword: e.target.value })}
          />
          <button className="btn btn-outline-success" type="submit">
            Search
          </button>
        </form>
      </div>
      <ToastContainer />
    </>
  );
};

export default SeachInput;
