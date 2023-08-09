"use client";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
const Register = () => {
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
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAdress] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post("/api/register", {
        name,
        email,
        password,
        phone,
        address,
      });
      if (response.data.status === 200) {
        toast.success("Registration successful", toastOptions);
        router.push("/login");
      } else if (response.data.status === 400) {
        return toast.error("User Email already exists", toastOptions);
      } else if (response.data.status === 500) {
        return toast.error("Registration failed", toastOptions);
      }
    } catch (error) {
      toast.error("Error connecting to server", toastOptions);
      return;
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="register">
        <h1>{loading ? "Processing" : "SIGN UP"}</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <div className="mb-3">
              <label htmlFor="exampleInputName" className="form-label">
                Name
              </label>
              <input
                type="text"
                value={name}
                autoComplete="off"
                required
                onChange={(e) => setName(e.target.value)}
                className="form-control"
                id="exampleInputName"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email
              </label>
              <input
                type="email"
                value={email}
                required
                autoComplete="off"
                onChange={(e) => setEmail(e.target.value)}
                className="form-control"
                id="exampleInputEmail1"
              />
              <div id="emailHelp" className="form-text">
                We&apos;ll never share your email with anyone else.
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPhone" className="form-label pt-2">
                Phone
              </label>
              <input
                type="number"
                autoComplete="off"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="form-control"
                id="exampleInputPhone"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword" className="form-label">
                Password
              </label>
              <input
                type="password"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
                className="form-control"
                id="exampleInputPassword"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputAddress" className="form-label">
                Address
              </label>
              <input
                type="text"
                value={address}
                required
                onChange={(e) => setAdress(e.target.value)}
                className="form-control"
                id="exampleInputAddress"
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </>
  );
};

export default Register;
