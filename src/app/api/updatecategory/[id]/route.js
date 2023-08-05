import { connect } from "@/dbConfig/db";
import Category from "@/models/categoryModel";
import { NextResponse } from "next/server";
import slugify from "slugify";
connect();

export async function PUT(req, { params }) {
  try {
    const { id } = params;
    const { name } = await req.json();
    const updated = await Category.findByIdAndUpdate(
      id,
      { name, slug: slugify(name) },
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
    const { id } = params;
    const find = await Category.findOne({ slug: id });
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

export async function DELETE(req, { params }) {
  try {
    const { id } = params;
    await Category.findByIdAndDelete(id);
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
