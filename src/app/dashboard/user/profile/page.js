"use client";
import React from "react";
import UserMenu from "@/app/components/UserMenu";
import axios from "axios";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "@/app/context/auth";
import { useRouter } from "next/navigation";

const UserProfile = () => {
  const [auth, setAuth] = useAuth();
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
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  //get user data
  useEffect(() => {
    if (auth.user) {
      const { email, name, phone, address } = auth?.user;
      setName(name);
      setPhone(phone);
      setAddress(address);
      setEmail(email);
    } else return;
  }, [auth?.user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/update/user", {
        name,
        email,
        password,
        phone,
        address,
      });
      if (response.data.status === 200) {
        const neew = response.data.savedUser;
        toast.success("Updated successful", toastOptions);
        setAuth({ ...auth, user: neew });
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = neew;
        localStorage.setItem("auth", JSON.stringify(ls));
        setName(response.data.savedUser.name);
        setPhone(response.data.savedUser.phone);
        setAddress(response.data.savedUser.address);
      } else if (response.data.status === 500) {
        return toast.error("Failed while updating", toastOptions);
      }
    } catch (error) {
      toast.error("Error connecting to server", toastOptions);
      return;
    }
  };

  return (
    <>
      <div className="container-fluid p-3 m-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-8 container ">
            <form onSubmit={handleSubmit} className="container col-md-8 ">
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
                    disabled
                  />
                  <div id="emailHelp" className="form-text">
                    We&apos;ll never share your email with anyone else.
                  </div>
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="exampleInputPhone"
                    className="form-label pt-2"
                  >
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
                    placeholder="Enter original or new password (required)"
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
                    onChange={(e) => setAddress(e.target.value)}
                    className="form-control"
                    id="exampleInputAddress"
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default UserProfile;
