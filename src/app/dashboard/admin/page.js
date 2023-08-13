"use client";
import React from "react";
import AdminMenu from "../../components/AdminMenu";
import { useAuth } from "../../context/auth";

const Admin = () => {
  const [auth] = useAuth();
  return (
    <>
      <div>
        <div className="container-fluid m-4 p-4">
          <div className="row">
            <div className="col-md-3">
              <AdminMenu />
            </div>
            <div className="col-md-9">
              <div className="card w-75 p-3 container">
                <h3 className="p-3">Admin Name: {auth?.user?.name}</h3>
                <h3 className="p-3">Admin Email: {auth?.user?.email}</h3>
                <h3 className="p-3">Admin Contact: {auth?.user?.phone}</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Admin;
