import { connect } from "@/dbConfig/db";
import { NextResponse } from "next/server";
import Product from "@/models/productModel";

connect();
export async function GET(req, { params }) {
  try {
    const { keyword } = params;
    const result = await Product.find({
      $or: [
        { name: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    });
    return NextResponse.json({
      result,
    });
  } catch (error) {
    return NextResponse.json({
      error: error.message,
      status: 500,
      msg: "Error in server",
    });
  }
}
