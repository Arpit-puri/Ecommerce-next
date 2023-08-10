import { connect } from "@/dbConfig/db";
import { NextResponse } from "next/server";
import Product from "@/models/productModel";
import slugify from "slugify";
connect();

export async function POST(req) {
  try {
    //photoo not added yet
    const reqBody = await req.json();

    const { name, description, price, category, quantity, shipping, photo } =
      reqBody;
    if (
      !description ||
      !price ||
      !category ||
      !quantity ||
      !shipping ||
      !name
    ) {
      return NextResponse.json({
        error: error.message,
        status: 401,
        msg: "Fill all details",
      });
    }
    const saved = new Product({
      name,
      slug: slugify(name),
      description,
      price,
      category,
      quantity,
      shipping,
      photo,
    });
    await saved.save();

    return NextResponse.json({
      status: 201,
      msg: "Saved",
      saved,
    });
  } catch (error) {
    return NextResponse.json({
      error: error.message,
      status: 500,
      msg: "Error in server",
    });
  }
}

export async function GET(req) {
  try {
    const products = await Product.find({}).limit(12).sort({ createdAt: -1 });
    return NextResponse.json({
      products,
      msg: "Got all products",
    });
  } catch (error) {
    return NextResponse.json({
      error: error.message,
      status: 500,
      msg: "Error in server",
    });
  }
}
