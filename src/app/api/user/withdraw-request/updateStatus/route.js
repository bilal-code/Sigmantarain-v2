import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import WithdrawModel from "@/model/Withdraw.model";

export async function PUT(req) {
  try {
    await connectDB();

    const { id, status } = await req.json();

    if (!id || !status) {
      return NextResponse.json(
        { success: false, error: "Both id and status are required" },
        { status: 400 }
      );
    }

    // ✅ Find and update withdraw request
    const updatedWithdraw = await WithdrawModel.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedWithdraw) {
      return NextResponse.json(
        { success: false, error: "Withdraw record not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Withdraw status updated successfully",
        data: updatedWithdraw,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating withdraw status:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}
