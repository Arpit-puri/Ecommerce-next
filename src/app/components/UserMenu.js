import React from "react";
import Link from "next/link";
const UserMenu = () => {
  return (
    <>
      <div className="text-center">
        <div class="list-group">
          <h4>DashBoard</h4>
          <Link
            href="/dashboard/user/profile"
            class="list-group-item list-group-item-action"
          >
            Update Profile
          </Link>
        </div>
      </div>
    </>
  );
};

export default UserMenu;
