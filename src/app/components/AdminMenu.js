import Link from "next/link";
import React from "react";

const AdminMenu = () => {
  return (
    <>
      <div className="text-center">
        <div class="list-group">
          <h4>Admin Panel</h4>
          <Link
            href="/dashboard/admin/createCategory"
            class="list-group-item list-group-item-action"
          >
            Create Category
          </Link>
          <Link
            href="/dashboard/admin/createProduct"
            class="list-group-item list-group-item-action"
          >
            Create Product
          </Link>
          <Link
            href="/dashboard/admin/products"
            class="list-group-item list-group-item-action"
          >
            Products
          </Link>
          <Link
            href="/dashboard/admin/users"
            class="list-group-item list-group-item-action"
          >
            Users
          </Link>
        </div>
      </div>
    </>
  );
};

export default AdminMenu;
