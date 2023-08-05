import React from "react";
import UserMenu from "@/app/components/UserMenu";

const UserProfile = () => {
 
  return (
    <>
      <div className="container-fluid p-3 m-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <h1>Profile</h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
