import connectDB from "@/lib/db";
import BusinessCommissionModel from "@/model/BusinessCommission.model";

import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { userId, percent, amount } = await request.json();

    // ✅ Basic validation
    if (!userId || !percent || !amount) {
      return NextResponse.json(
        { success: false, error: "userId, percent, and amount are required" },
        { status: 400 }
      );
    }

    // ✅ Connect to database
    await connectDB();

    // ✅ Check if the same commission already exists for this user
    const existingCommission = await BusinessCommissionModel.findOne({
      userId,
      percent,
      amount,
    });

    if (existingCommission) {
      return NextResponse.json(
        {
          success: false,
          message: "This commission already exists for the user.",
        },
        { status: 409 }
      );
    }

    // ✅ Save new commission record
    const newCommission = await BusinessCommissionModel.create({
      userId,
      percent,
      amount,
  
    });

    return NextResponse.json(
      {
        success: true,
        message: "Business Commission saved successfully.",
        data: newCommission,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error saving commission:", error);
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


export async function GET(request) {
  try {
    // ✅ Connect to database
    await connectDB();

    // ✅ Get search params
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    console.log("Fetching business commissions for userId:", userId);

    let commissions;

    if (userId) {
      // 🔹 Get commissions for a specific user
      commissions = await BusinessCommissionModel.find({ userId });
      if (!commissions.length) {
        return NextResponse.json(
          {
            success: false,
            message: "No commissions found for this user.",
          },
          { status: 404 }
        );
      }
    } else {
      // 🔹 Get all commissions
      commissions = await BusinessCommissionModel.find();
      if (!commissions.length) {
        return NextResponse.json(
          {
            success: false,
            message: "No commissions found.",
          }
        );
      }
    }
    // ✅ Extract only the `amount` field
    // const amounts = commissions.map((item) => item.amount);
    
    // ✅ Calculate total amount
    const totalAmount = commissions.reduce((sum, item) => sum + item.amount, 0);


    // ✅ Success response
    return NextResponse.json(
      {
        success: true,
        data: totalAmount,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching commissions:", error);
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

