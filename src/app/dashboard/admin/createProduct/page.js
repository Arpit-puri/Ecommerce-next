import React from "react";
import AdminMenu from "@/app/components/AdminMenu";
const Product = () => {
  return (
    <>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h2>Products</h2>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
