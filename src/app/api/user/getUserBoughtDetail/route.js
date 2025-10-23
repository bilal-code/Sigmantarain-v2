import { NextResponse } from "next/server";
import BuyPackageModel from "@/model/BuyPackage.model";
import connectDB from "@/lib/db";
import mongoose from "mongoose";

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

    const userPackages = await BuyPackageModel.find({ userId });

    return NextResponse.json(
      {
        message: "User bought detail retrieved successfully",
        data: userPackages,
      },
      { status: 200 }
    );
  } catch (error) {
    // console.error("Error fetching user data:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    await connectDB();

    const { packageId, newStatus } = await req.json();

    // console.log("Received:", packageId, newStatus);

    if (!packageId || !newStatus) {
      return NextResponse.json(
        { error: "packageId and newStatus are required" },
        { status: 400 }
      );
    }

    // ✅ Validate packageId
    if (!mongoose.Types.ObjectId.isValid(packageId)) {
      return NextResponse.json(
        { error: "Invalid packageId format" },
        { status: 400 }
      );
    }

    // ✅ Find the purchase document with that packageId
    const purchasedPackage = await BuyPackageModel.findOne({ packageId });

    if (!purchasedPackage) {
      return NextResponse.json(
        { error: "Purchased package not found" },
        { status: 404 }
      );
    }

    // ✅ Now update the status using the actual _id
    const updated = await BuyPackageModel.findByIdAndUpdate(
      purchasedPackage._id,
      { status: newStatus },
      { new: true }
    );

    return NextResponse.json(
      {
        message: "Package status updated successfully",
        data: updated,
      },
      { status: 200 }
    );
  } catch (error) {
    // console.error("❌ Error updating package status:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
