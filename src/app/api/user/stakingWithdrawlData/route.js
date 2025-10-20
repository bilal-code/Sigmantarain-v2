import connectDB from "@/lib/db";
import CommissionsModel from "@/model/Commissions.model";
import DailyRoiModel from "@/model/DailyROI.model";
import RoiCommissionModel from "@/model/RoiCommission.model";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    await connectDB();

    // Get userId from query string
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    if(!userId){
        return NextResponse.json(
          { error: "userId is required" },
          { status: 400 }
        );
    }
    // let user;
    // let commission;
   
      //  user = await AuthModel.findById(userId);
        let  uplineCommission = await RoiCommissionModel.find({ userId }).sort({createdAt: -1});
    console.log("Fetched user ROicommissions:", uplineCommission);
    const totalUplineCommission = uplineCommission.reduce((acc, curr) => acc + (curr.amount || 0), 0);
    let DailyRoi = await DailyRoiModel.find({ userId }).sort({ createdAt: -1 });
    console.log("Fetched user DailyRoi:", DailyRoi);

    const totalDailyRoi = DailyRoi.reduce((acc, curr) => acc + (curr.dailyROI || 0), 0);
    return NextResponse.json(
      {
        success: true,
        message: "Fetched user packages  successfully",
        data: {
            totalUplineCommission,
            totalDailyRoi
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching user packages:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}