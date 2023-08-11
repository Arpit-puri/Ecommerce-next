"use client";
import React from "react";
import Link from "next/link";
import { GiShoppingBag } from "react-icons/gi";
import dynamic from "next/dynamic";
import { useAuth } from "../context/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SeachInput from "./SeachInput";
function Header() {
  const [auth, setAuth] = useAuth();
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
  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout was successful", toastOptions);
  };
  return (
    <div>
      <header>
        <nav
          className="navbar navbar-expand-lg bg-body-tertiary"
          suppressHydrationWarning
        >
          <div className="container-fluid" suppressHydrationWarning>
            <Link href="/" legacyBehavior>
              <a className="navbar-head">
                <GiShoppingBag /> ChronoCraze
              </a>
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
              suppressHydrationWarning
            >
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                <SeachInput />
                <li className="nav-item">
                  <Link href="/" legacyBehavior>
                    <a className="nav-link">Home</a>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/category" legacyBehavior>
                    <a className="nav-link">Category</a>
                  </Link>
                </li>
                {!auth.user ? (
                  <>
                    {" "}
                    <li className="nav-item">
                      <Link href="/register" legacyBehavior>
                        <a className="nav-link">Register</a>
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link href="/login " legacyBehavior>
                        <a className="nav-link">Login</a>
                      </Link>
                    </li>
                  </>
                ) : (
                  <>
                    {" "}
                    <li className="nav-item">
                      <Link href="/login" legacyBehavior>
                        <a onClick={handleLogout} className="nav-link">
                          Logout
                        </a>
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link href="/dashboard" legacyBehavior>
                        <a className="nav-link">DashBoard</a>
                      </Link>
                    </li>
                  </>
                )}
                <li className="nav-item">
                  <Link href="/cart" legacyBehavior>
                    <a className="nav-link">Cart(0)</a>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <ToastContainer />
      </header>
    </div>
  );
}

export default dynamic(() => Promise.resolve(Header), { ssr: false });
