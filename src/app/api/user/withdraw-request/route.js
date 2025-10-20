import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import BuyPackageModel from "@/model/BuyPackage.model";
import WithdrawModel from "@/model/Withdraw.model";

export async function POST(req) {
  await connectDB();

  try {
    const { userId, withdrawAmount, from, status,type } = await req.json();

    // console.log(userId, withdrawAmount, from, status, "daily earning data");

    // Validate required fields
    if (!userId || !withdrawAmount || !from) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create the withdrawal record
    const withDrawData = await WithdrawModel.create({
      userId,
      withdrawAmount,
      from,
      status: status || "pending",
      type
    });

    return NextResponse.json(
      { message: "Withdrawal request submitted", data: withDrawData },
      { status: 201 }
    );
  } catch (error) {
    // console.error("❌ Error in withdrawal API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(req) {
  try {
    await connectDB();

    // 🔹 Get Authorization Header
    const authHeader = req.headers.get("authorization");
    let userId = null;

    // 🔹 Extract userId if header present
    if (authHeader && authHeader.startsWith("Bearer ")) {
      userId = authHeader.split(" ")[1];
    }

    let withdrawDetails;

    if (userId) {
      // 🧾 Get specific user's withdraws (latest first)
      withdrawDetails = await WithdrawModel.find({ userId }).sort({
        createdAt: -1,
      });
    } else {
      // 🧾 Get all withdraws (latest first)
      withdrawDetails = await WithdrawModel.find({}).sort({
        createdAt: -1,
      });
    }

    // 🔹 If no data found
    if (!withdrawDetails || withdrawDetails.length === 0) {
      return NextResponse.json(
        {
          success: true,
          message: userId
            ? "No withdraw history found for this user"
            : "No withdraw records found",
          data: [],
        },
        { status: 200 }
      );
    }

    // ✅ Success response
    return NextResponse.json(
      {
        success: true,
        message: "Withdraw details retrieved successfully",
        data: withdrawDetails,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching withdraw details:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Internal Server Error",
        details: error.message,
      },
      { status: 500 }
    );
  }
}
