import { connect } from "@/dbConfig/db";
import { NextResponse } from "next/server";
import Product from "@/models/productModel";

connect();

export async function GET(req, { params }) {
  try {
    const perPage = 6;
    const { page } = params;
    const products = await Product.find({})
      .select("-photo")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 });

    return NextResponse.json({
      status: 200,
      products,
    });
  } catch (error) {
    return NextResponse.json({
      error: error.message,
      status: 500,
      msg: "Error in perpage server",
    });
  }
}
