import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import AuthModel from "@/model/Auth.model";


export async function GET(req) {
  try {
    await connectDB();

    const authHeader = req.headers.get("authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = authHeader.split(" ")[1];

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    // ✅ Find user and exclude sensitive fields
    const user = await AuthModel.findById(userId).select(
      "-password"
    );

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, user }, { status: 200 });
  } catch (error) {
    console.error("❌ Error fetching user by ID from headers:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
