"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import UserMenu from "../components/UserMenu";
import { useAuth } from "../context/auth";

const Dashboard = () => {
  const router = useRouter();
  const [auth] = useAuth();
  const [check, setCheck] = useState();
  useEffect(() => {
    const data = localStorage.getItem("auth");
    const parseData = JSON.parse(data);
    if (parseData.user.role === false) {
      setCheck(true);
    } else if (parseData.user.role === true) {
      router.push("/dashboard/admin");
    } else {
      router.push("/login");
    }
    return;
  }, []);

  return (
    <>
      {check ? (
        <>
          <div className="container-fluid m-3 p-3">
            <div className="row">
              <div className="col-md-3">
                <UserMenu />
              </div>
              <div className="col-md-9 container">
                <div className="card w-75 p-3 container ">
                  <h3 className="p-3">Name: {auth?.user?.name}</h3>
                  <h3 className="p-3">E-mail: {auth?.user?.email}</h3>
                  <h3 className="p-3">Address: {auth?.user?.address}</h3>
                  <h3 className="p-3">Phone Number: {auth?.user?.phone}</h3>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="d-flex justify-content-center min-h-screen">
            <div className="spinner-border min-h-screen" role="status" />
          </div>
        </>
      )}
    </>
  );
};

export default Dashboard;
