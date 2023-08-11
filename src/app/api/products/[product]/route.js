import { connect } from "@/dbConfig/db";
import Product from "@/models/productModel";
import { NextResponse } from "next/server";
import slugify from "slugify";
connect();

export async function PUT(req, { params }) {
  try {
    const { product } = params;
    const _id = product;
    const { name, description, price, quantity, category, shipping, photo } =
      await req.json();
    const updated = await Product.findByIdAndUpdate(
      _id,
      {
        name,
        slug: slugify(name),
        description,
        price,
        quantity,
        category,
        shipping,
        photo,
      },
      { new: true }
    );
    return NextResponse.json({
      updated,
      msg: "successfully updated",
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({
      msg: "server error: ",
    });
  }
}

export async function GET(req, { params }) {
  try {
    const find = await Product.findOne({ slug: params.product });
    return NextResponse.json({
      find,
      msg: "found the category",
    });
  } catch (error) {
    return NextResponse.json({
      msg: "server error: ",
    });
  }
}

export async function DELETE(req, { params }) {
  try {
    const { product } = params;
    await Product.findByIdAndDelete(product);
    return NextResponse.json({
      msg: "Topic deleted",
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({
      error: error.message,
      status: 500,
      msg: "Error in updating category",
    });
  }
}
