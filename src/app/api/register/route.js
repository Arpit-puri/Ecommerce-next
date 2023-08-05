import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/db";

connect();

export async function POST(req, res) {
  try {
    const reqBody = await req.json();
    const { name, email, password, phone, address } = reqBody;
    const mobile = parseInt(phone);

    const user = await User.findOne({ email });
    console.log(user);
    if (user) {
      return NextResponse.json({ status: 400, error: "User already exists" });
    }
    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      address,
      phone: mobile,
    });

    const savedUser = await newUser.save();

    return NextResponse.json({
      status: 200,
      message: "User saved successfully",
      error: "dkn",
      savedUser,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message, status: 500 });
  }
}
