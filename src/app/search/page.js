"use client";
import React from "react";
import { useSearch } from "../context/search";
import Image from "next/image";
import Link from "next/link";
const Search = () => {
  const [values, setValues] = useSearch();

  return (
    <>
      <div className="containe">
        <div className="text-center">
          <h1>Search Results</h1>
          <h6>
            {values?.results.length < 1
              ? "No product found"
              : `Found ${values?.results.length}`}
          </h6>
          <div className="d-flex flex-wrap mt-4 flex-col">
            {values?.results.map((p) => (
              <>
                <Link
                  key={p._id}
                  href={`/single/${p.slug}`}
                  className="product-link"
                >
                  <div className="card m-2" style={{ width: "18rem" }}>
                    <Image
                      src={p.photo}
                      width={200}
                      height={200}
                      alt="Image not availabe"
                      className="card-img-top"
                    />
                    <div className="card-body">
                      <h5 className="card-title">{p.name}</h5>
                      <p className="card-text">
                        {p.description.substring(0, 30)}...{" "}
                      </p>
                      <p className="card-text">₹ {p.price}</p>
                      <button className="btn btn-primary">More details</button>
                      <button className="btn btn-secondary m-1">
                        Add to cart
                      </button>
                    </div>
                  </div>
                </Link>
              </>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Search;
