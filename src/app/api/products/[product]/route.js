import { connect } from "@/dbConfig/db";
import Product from "@/models/productModel";
import { NextResponse } from "next/server";
import slugify from "slugify";
connect();

export async function GET(req, { params }) {
  try {
    const { id } = params;
    const find = await Product.findOne({ slug: id });
    return NextResponse.json({
      find,
      msg: "find the category",
    });
  } catch (error) {
    return NextResponse.json({
      msg: "server error: ",
    });
  }
}
