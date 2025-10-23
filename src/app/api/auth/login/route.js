import AuthModel from "@/model/Auth.model";
import { NextResponse } from "next/server";
import connectDB from "../../../../lib/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export async function POST(request) {
  try {
    let { userID, password } = await request.json();
    // console.log("Login attempt:", userID, password);
    
    if (!userID || !password) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }
userID = userID.toLowerCase();
    await connectDB();

    const existedUser = await AuthModel.findOne({
      $or: [{ email: userID }],
    });

    if (!existedUser) {
      return NextResponse.json(
        { error: "User does not exist" },
        { status: 404 }
      );
    }

    const isMatch = await bcrypt.compare(password, existedUser.password);
    if (!isMatch) {
      return NextResponse.json(
        { error: "Incorrect password" },
        { status: 401 }
      );
    }


    const token = jwt.sign(
      {
        id: existedUser._id,
        email: existedUser.email,
        name: existedUser.name,
        role: existedUser.role,
        referralCode: existedUser.referralCode,
        code: existedUser.code,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return NextResponse.json(
      { message: "Login successful", user: existedUser, token },
      { status: 200 }
    );
  } catch (error) {
    // console.error("Login failed:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
export async function PUT(request) {
  try {
    const { id, status } = await request.json();

    if (!id || !status) {
      return NextResponse.json(
        { error: "Missing required fields: id and status" },
        { status: 400 }
      );
    }

    await connectDB();

    const user = await AuthModel.findById(id);
    // console.log("inactive user account ",user);
    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    user.status = status; // e.g., "inactive"
    await user.save();

    return NextResponse.json(
      { message: `User status updated to ${status}`, user },
      { status: 200 }
    );
  } catch (error) {
    // console.error("Error updating user status:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}