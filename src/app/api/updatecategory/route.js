import { connect } from "@/dbConfig/db";
import Category from "@/models/categoryModel";
import { NextResponse, NextRequest } from "next/server";
import slugify from "slugify";
connect();

export async function POST(req, res) {
  console.log("Update");
  try {
    const reqBody = await req.json();
    const { name } = reqBody;
    if (!name) {
      return NextResponse.json({
        status: 401,
        msg: "Name is required",
      });
    }
    const existCategory = await Category.findOne({ name });
    if (existCategory) {
      return NextResponse.json({
        status: 401,
        msg: "Category already exists",
      });
    }
    const newCategory = await new Category({
      name,
      slug: slugify(name),
    }).save();
    return NextResponse.json({
      status: 201,
      newCategory,
      msg: "New category created successfully",
    });
  } catch (error) {
    return NextResponse.json({
      error: error.message,
      status: 500,
      msg: "Error in category",
    });
  }
}

export async function GET(req) {
  try {
    console.log("GET category");
    const category = await Category.find({});
    return NextResponse.json({
      status: 200,
      category,
      msg: "All category List",
    });
  } catch (error) {
    return NextResponse.json({
      error: error.message,
      status: 500,
      msg: "Error in updating category",
    });
  }
}


