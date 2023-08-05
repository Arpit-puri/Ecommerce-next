import React from "react";
import UserMenu from "@/app/components/UserMenu";
const Orders = () => {
  return (
    <>
      <div className="container-fluid p-3 m-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">All Orders</div>
        </div>
      </div>
    </>
  );
};

export default Orders;
