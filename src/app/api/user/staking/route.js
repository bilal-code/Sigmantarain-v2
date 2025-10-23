// import cron from "node-cron";
// import connectDB from "@/lib/db";
// import AuthModel from "@/model/Auth.model";
// import StakingModel from "@/model/Staking.model";
// import RoiCommissionModel from "@/model/RoiCommission.model";


// // ✅ Upline Commission Percentages
// const UPLINE_PERCENTAGES = [15, 10, 10, 10, 10, 8, 8, 8, 10, 11];

// // Recursive Parent Finder (up to 10 levels)
// const findParentsUpTo10 = async (referralCode) => {
//   const parentsArray = [];
//   let currentCode = referralCode;
//   let level = 0;

//   while (currentCode && level < 10) {
//     const parent = await AuthModel.findOne({ code: currentCode });
//     if (!parent) break;
//     parentsArray.push(parent._id);
//     currentCode = parent.referralCode;
//     level++;
//   }
//   return parentsArray;
// };

// // ✅ Function to distribute daily ROI for all stakers
// async function distributeDailyROI() {
//   try {
//     await connectDB();
//     console.log("🔗 Connected to DB — Running Daily ROI Job...");

//     const activeStakers = await StakingModel.find({ isActive: true });
//     if (!activeStakers.length) {
//       console.log("⚠️ No active stakers found today.");
//       return;
//     }

//     for (const staker of activeStakers) {
//       const { userId, stakedAmount } = staker;

//       const user = await AuthModel.findById(userId);
//       if (!user) continue;

//       // ✅ ROI between 0.7% and 1.1%
//       const dailyPercent = +(0.7 + Math.random() * 0.4).toFixed(2);
//       const dailyROI = (stakedAmount * dailyPercent) / 100;

//       // ✅ 15% goes to uplines
//       const totalUplineShare = (dailyROI * 15) / 100;

//       const parentsArray = await findParentsUpTo10(user.referralCode);

//       let uplineDistributions = [];
//       for (let i = 0; i < Math.min(parentsArray.length, 10); i++) {
//         const parentId = parentsArray[i];
//         const percent = UPLINE_PERCENTAGES[i];
//         const amount = (totalUplineShare * percent) / 100;

//         uplineDistributions.push({
//           level: i + 1,
//           parentId,
//           percent,
//           amount,
//         });
//       }

//       await RoiCommissionModel.create({
//         userId,
//         stakedAmount,
//         dailyROI,
//         distributedROI: totalUplineShare,
//         uplineDistributions,
//       });

//       console.log(
//         `✅ ROI distributed for user ${user._id}: ROI=${dailyROI.toFixed(
//           2
//         )}, Shared=${totalUplineShare.toFixed(2)}`
//       );
//     }

//     console.log("🎯 Daily ROI distribution completed successfully!");
//   } catch (error) {
//     console.error("❌ Error during daily ROI job:", error.message);
//   }
// }

// // 🕒 Schedule the job to run daily at midnight
// cron.schedule("0 0 * * *", () => {
//   console.log("🚀 Running Daily ROI Distribution (Midnight)");
//   distributeDailyROI();
// });

// export default function handler() {
//   return Response.json({ success: true, message: "ROI job scheduled daily" });
// }


import connectDB from "@/lib/db";
import AuthModel from "@/model/Auth.model";
import RoiCommissionModel from "@/model/RoiCommission.model";
import StakingModel from "@/model/Staking.model";
import { NextResponse } from "next/server";

// 🔹 Upline Commission Percentages (for 10 levels)
const UPLINE_PERCENTAGES = [15, 10, 10, 10, 10, 8, 8, 8, 10, 11];

// 🔹 Recursive Parent Finder (up to 10 levels)
const findParentsUpTo10 = async (referralCode) => {
  const parentsArray = [];
  let currentCode = referralCode;
  let level = 0;

  while (currentCode && level < 10) {
    const parent = await AuthModel.findOne({ code: currentCode });
    if (!parent) break;

    parentsArray.push(parent._id);
    currentCode = parent.referralCode; // move up to parent’s parent
    level++;
  }
  return parentsArray;
};

// 🔹 POST — Distribute Upline Commission when user stakes
export async function POST(request) {
  try {
    const { userId, stackAmount,durationDate } = await request.json();
    // console.log("staking Data",userId,stackAmount,durationDate)
    if (!userId || !stackAmount || !durationDate) {
      return NextResponse.json(
        { success: false, message: "userId, stackAmount and duration are required" },
        { status: 400 }
      );
    }

    // ✅ Connect to DB
    await connectDB();

    // ✅ Find the user
    const user = await AuthModel.findById(userId);
    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    // ✅ Find 10 levels of uplines
    const parentsArray = await findParentsUpTo10(user.referralCode);

    if (!parentsArray.length) {
      return NextResponse.json({
        success: false,
        message: "No uplines found for this user",
      });
    }

    // ✅ Distribute commission to uplines
    const totalCommissionRecords = [];
    for (let i = 0; i < Math.min(parentsArray.length, 10); i++) {
      const parentId = parentsArray[i];
      const percent = UPLINE_PERCENTAGES[i];
      const amount = (stackAmount * percent) / 100;

      const record = await RoiCommissionModel.create({
        userId: parentId, // receiver
        fromUserId: userId, // the staker
        stakedAmount: stackAmount,
        level: i + 1,
        percent,
        amount,
        type: "Upline Commission",
      });

      totalCommissionRecords.push(record);
    }
    const startDate = new Date();
  //   const endDate = new Date(startDate);
  //  endDate.setDate(endDate.getDate() + 60); // Add 60 days
    const stakingData = StakingModel.create({
      userId,
      stakedAmount: stackAmount,
      startDate: Date.now(),
      endDate: durationDate,
    });
    // console.log("everything work successfully..")
    return NextResponse.json({
      success: true,
      message: "Upline commission distributed successfully!",
      distributedTo: totalCommissionRecords.length,
      data: totalCommissionRecords,
    });
  } catch (error) {
    // console.error("❌ Error distributing upline commission:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error", error: error.message },
      { status: 500 }
    );
  }
}
export async function GET(request) {
  try {
    await connectDB();

    // 🔹 Get userId from query params (if provided)
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    let stakingData;

    if (userId) {
      // ✅ Fetch single user's staking data
      stakingData = await StakingModel.find({ userId });

      if (!stakingData.length) {
        return NextResponse.json(
          { success: false, message: "No staking data found for this user." },
          { status: 404 }
        );
      }
    } else {
      // ✅ Fetch all users' staking data
      stakingData = await StakingModel.find();

      if (!stakingData.length) {
        return NextResponse.json(
          { success: false, message: "No staking data found." },
          { status: 404 }
        );
      }
    }

    // ✅ Return success response
    return NextResponse.json(
      {
        success: true,
        count: stakingData.length,
        data: stakingData,
      },
      { status: 200 }
    );
  } catch (error) {
    // console.error("❌ Error fetching staking data:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}