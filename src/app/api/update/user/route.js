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

    if (!password) {
      return NextResponse.json({ error: " Password is required", status: 500 });
    }
    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.findByIdAndUpdate(
      user._id,
      {
        name: name || user.name,
        password: hashedPassword,
        address: address || user.address,
        phone: mobile || user.phone,
      },
      { new: true }
    );

    const savedUser = await newUser.save();

    return NextResponse.json({
      status: 200,
      message: "User Updated successfully",
      savedUser,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message, status: 500 });
  }
}
