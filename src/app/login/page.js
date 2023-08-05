"use client";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useAuth } from "../context/auth";
const Login = () => {
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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post("/api/login", {
        email,
        password,
      });
      if (response.data.status === 200) {
        toast.success("Loginn successful", toastOptions);
        setAuth({
          ...auth,
          token: response.data.token,
          user: response.data.user,
        });
        localStorage.setItem("auth", JSON.stringify(response.data));
        router.push("/");
      } else {
        return toast.error("Login failed", toastOptions);
      }
    } catch (error) {
      toast.error("Login failed", toastOptions);
      return;
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="register p-3">
        <h1>{loading ? "Processing" : "SIGN UP"}</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <div className="mb-3 pt-3">
              <label htmlFor="exampleInputEmail1" className="form-label pb-2">
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

            <div className="mb-3 pt-3">
              <label htmlFor="exampleInputPassword" className="form-label pb-2">
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

export default Login;
