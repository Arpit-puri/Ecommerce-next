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
          <Link
            href="/dashboard/user/orders"
            class="list-group-item list-group-item-action"
          >
            Orders Given
          </Link>
        </div>
      </div>
    </>
  );
};

export default UserMenu;
