import { connect } from "@/dbConfig/db";
import { NextResponse } from "next/server";
import Product from "@/models/productModel";

connect();

export async function POST(req) {
  try {
    const reqBody = await req.json();
    const { check, radio } = reqBody;
    let args = {};
    if (check.length > 0) {
      args.category = check;
    }
    if (radio.length) {
      args.price = { $gte: radio[0], $lte: radio[1] };
    }
    const products = await Product.find(args);
    return NextResponse.json({
      success: 200,
      products,
    });
  } catch (error) {
    return NextResponse.json({
      error: error.message,
      status: 500,
      msg: "Error in server while filtering products",
    });
  }
}
