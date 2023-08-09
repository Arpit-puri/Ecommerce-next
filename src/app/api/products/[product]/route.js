import { connect } from "@/dbConfig/db";
import Product from "@/models/productModel";
import { NextResponse } from "next/server";
import slugify from "slugify";
connect();

export async function GET(req, { params }) {
  try {
    const { slug } = params;
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
