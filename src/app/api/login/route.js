import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/db";
import jwt from "jsonwebtoken";

connect();

export async function POST(req, res) {
  try {
    const reqBody = await req.json();
    const { email, password } = reqBody;
    //check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: "User does not exist" },
        { status: 400 }
      );
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return NextResponse.json({ error: "Invalid password" }, { status: 400 });
    }

    const tokenData = {
      id: user._id,
      name: user.name,
      email: user.email,
    };
    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET, {
      expiresIn: "1d",
    });
    const response = NextResponse.json({
      message: "Login successful",
      success: true,
    });

    const cookies = response.cookies.set("token", token, {
      httpOnly: true,
    });
    return NextResponse.json({ user, token, status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message, status: 500 });
  }
}
