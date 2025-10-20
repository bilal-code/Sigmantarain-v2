import connectDB from "@/lib/db";
import DailyRoiModel from "@/model/DailyROI.model";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    await connectDB();

    // 🔹 Get userId from query params
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    // 🔸 Validate userId
    if (!userId) {
      return NextResponse.json(
        { success: false, message: "userId is required in query parameters." },
        { status: 400 }
      );
    }

    // ✅ Fetch single user's daily ROI data
    const dailyRoi = await DailyRoiModel.find({ userId });
    console.log("daily Roi",dailyRoi)
    console.log("User Daily ROI Data:", dailyRoi);
    const totalDailyROI = dailyRoi.reduce((acc, curr) => {
      return acc + curr.dailyROI;
    }, 0);
    if (!dailyRoi.length) {
      return NextResponse.json(
        { success: false, message: "No daily ROI data found for this user." },
        { status: 404 }
      );
    }

    // ✅ Return success response
    return NextResponse.json(
      {
        success: true,
        count: dailyRoi.length,
        data: totalDailyROI,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Error fetching daily ROI data:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}
