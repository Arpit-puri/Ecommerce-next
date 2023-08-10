import { connect } from "@/dbConfig/db";
import { NextResponse } from "next/server";
import Product from "@/models/productModel";

connect();

export async function GET(req) {
  try {
    const total = await Product.findOne({}).estimatedDocumentCount();
    return NextResponse.json({
      status: 200,
      total,
    });
  } catch (error) {
    return NextResponse.json({
      error: error.message,
      status: 500,
      msg: "Error in server",
    });
  }
}
