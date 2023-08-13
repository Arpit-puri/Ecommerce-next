"use client";
import React from "react";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useEffect } from "react";
const CartPage = () => {
  const router = useRouter();
  const [cart, setCart] = useCart();
  const [auth, setAuth] = useAuth();
  
  useEffect(() => {
    const data = localStorage.getItem("auth");
    if (data === null) {
      router.push("/login");
    }
    return;
  }, []);
  
  const removeCartItem = (pid) => {
    let mycart = [...cart];

    let index = mycart.findIndex((item) => item._id === pid);

    mycart.splice(index, 1);

    setCart(mycart);
    localStorage.setItem("cart", JSON.stringify(mycart));
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center bg-light p-2 mb-1">
              {`Hello ${auth?.token && auth?.user.name}`}
            </h1>
            <h4 className="text-center">
              {cart?.length > 1
                ? `You have ${cart.length} items in your cart ${
                    auth?.token ? "" : "Please first login to receive"
                  }`
                : "Cart is Empty"}
            </h4>
          </div>
        </div>
        <div className="row">
          <div className="col-md-9">
            <div className="row">
              {cart?.map((p) => (
                <div key={p._id} className="row m-2 card flex-row">
                  <div className="col-md-4">
                    <Image
                      src={p.photo}
                      width={200}
                      height={200}
                      alt="Image not availabe"
                      className="card-img-top"
                    />
                  </div>
                  <div className="col-md-8 p-2">
                    <h4 className="p-2 uppercase">{p.name}</h4>
                    <p>{p.description.substring(0, 30)}</p>
                    <h4>Price: ₹{p.price}</h4>
                    <button
                      className="btn btn-danger m-3 mt-4"
                      onClick={() => {
                        removeCartItem(p._id);
                      }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartPage;
