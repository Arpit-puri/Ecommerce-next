"use client";
import React, { useEffect } from "react";
import AdminMenu from "@/app/components/AdminMenu";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Modal from "antd/es/modal/Modal";
import CategoryForm from "@/app/components/CategoryForm";

const CreateCategory = () => {
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

  useEffect(() => {
    getAll();
  }, []);

  const [categories, setCategory] = useState([]);
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");

  // update category name
  const submitUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`/api/updatecategory/${selected._id}`, {
        name: updatedName,
      });
      if (response.data.status === 200) {
        toast.success("Updated successfully", toastOptions);
        setSelected(null);
        setUpdatedName("");
        setVisible(false);
        getAll();
      } else {
        toast.error("Error updating category", toastOptions);
      }
    } catch (error) {
      toast.error("Something went wrong!", toastOptions);
    }
  };

  // Delte category name
  const submitDelete = async (id) => {
    try {
      const response = await axios.delete(`/api/updatecategory/${id}`);
      if (response.data.status === 200) {
        toast.success("Deleted successfully", toastOptions);
        getAll();
      } else {
        toast.error("Error Deleting category", toastOptions);
      }
    } catch (error) {
      toast.error("Something went wrong!", toastOptions);
    }
  };

  //handle form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/updatecategory", { name });
      if (response.data.status === 201) {
        toast.success("Category added successfully!", toastOptions);
        setName("");
        getAll();
      } else {
        toast.error("Error updating category!", toastOptions);
      }
    } catch (error) {
      toast.error("Something went wrong", toastOptions);
    }
  };

  //get all categories
  const getAll = async () => {
    try {
      const response = await axios.get("/api/updatecategory");
      if (response.data.status === 200) {
        setCategory(response.data.category);
      } else {
        toast.error("Can't get category", toastOptions);
      }
    } catch (error) {
      toast.error("Can't getAll category", toastOptions);
    }
  };

  return (
    <>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h2>Manage Category</h2>
            <div className="div p-3 w-50">
              <CategoryForm
                handleSubmit={handleSubmit}
                value={name}
                setValue={setName}
              />
            </div>
            <div className="w-75">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categories?.map((c) => (
                    <>
                      <tr>
                        <td key={c._id}>{c.name}</td>
                        <td>
                          <button
                            className="btn btn-primary ms-2"
                            onClick={() => {
                              setVisible(true);
                              setUpdatedName(c.name);
                              setSelected(c);
                            }}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-danger ms-2"
                            onClick={() => {
                              submitDelete(c._id);
                            }}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    </>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <Modal
            open={visible}
            onCancel={() => setVisible(false)}
            footer={null}
          >
            <CategoryForm
              value={updatedName}
              setValue={setUpdatedName}
              handleSubmit={submitUpdate}
            />
          </Modal>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default CreateCategory;
