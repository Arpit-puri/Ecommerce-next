"use client";
import React from "react";
import { Select } from "antd";
const { Option } = Select;
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminMenu from "@/app/components/AdminMenu";
const SingleProduct = ({ params }) => {
  const router = useRouter();
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

  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [id, setId] = useState("");
  //get Single category
  const getSingle = async () => {
    try {
      const response = await axios.get(`/api/products/${params.id}`);
      // console.log(response);
      setName(response.data.find.name);
      setPrice(response.data.find.price);
      setQuantity(response.data.find.quantity);
      setShipping(response.data.find.shipping);
      setCategory(response.data.find.category);
      setId(response.data.find._id);
      setDescription(response.data.find.description);
    } catch (error) {
      toast.error("Server error", toastOptions);
    }
  };

  //Update product function
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`/api/products/${id}`, {
        name,
        description,
        price,
        quantity,
        category,
        shipping,
      });
      if (response.data.status === 200) {
        toast.success("Category added successfully!", toastOptions);
        router.push("/dashboard/admin/products");
      } else {
        toast.error("Error updating category!", toastOptions);
      }
    } catch {
      toast.error("something went wrong", toastOptions);
    }
  };

  //get all categories from db
  const getAll = async () => {
    try {
      const response = await axios.get("/api/updatecategory");
      if (response.data.status === 200) {
        setCategories(response.data.category);
      } else {
        toast.error("Can't get category", toastOptions);
      }
    } catch (error) {
      toast.error("Can't getAll category", toastOptions);
    }
  };

  useEffect(() => {
    getAll();
  }, []);
  useEffect(() => {
    getSingle();
  }, []);

  return (
    <>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>

          <div className="col-md-9">
            <h1 className="pb-2">Update Products</h1>
            <div className="m1 w-75">
              <Select
                bordered={false}
                placeholder="Select category"
                size="large"
                showSearch
                className="form-select mb-3"
                onChange={(value) => {
                  setCategory(value);
                }}
                value={category}
              >
                {categories?.map((c) => (
                  <Option key={c._id} value={c.name}>
                    {c.name}
                  </Option>
                ))}
              </Select>
              <div className="mb-3">
                <input
                  type="text"
                  value={name}
                  placeholder="write a name"
                  className="form-control"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <textarea
                  type="text"
                  value={description}
                  placeholder="write a description"
                  className="form-control"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <input
                  type="number"
                  value={price}
                  placeholder="write a Price"
                  className="form-control"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  value={quantity}
                  placeholder="write a quantity"
                  className="form-control"
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <Select
                  bordered={false}
                  placeholder="Select Shipping "
                  size="large"
                  showSearch
                  className="form-select mb-3"
                  onChange={(value) => {
                    setShipping(value);
                  }}
                  value={shipping ? "Yes" : "No"}
                >
                  <Option value="0">No</Option>
                  <Option value="1">Yes</Option>
                </Select>
              </div>
              <div className="mb-3">
                <button className="btn btn-primary" onClick={handleUpdate}>
                  Update PRODUCT
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default SingleProduct;
