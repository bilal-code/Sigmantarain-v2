import connectDB from "@/lib/db";
import AuthModel from "@/model/Auth.model";
import BuyPackageModel from "@/model/BuyPackage.model";

import CommissionsModel from "@/model/Commissions.model";

import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { code } = await request.json();
    // console.log("Received code:", code);
    if (!code) {
      return NextResponse.json(
        { error: "Referral code is required" },
        { status: 400 }
      );
    }

    // ✅ Step 1: Connect to DB
    await connectDB();

    // ✅ Step 2: Find parent user
    const parent = await AuthModel.findOne({ code: code });
    if (!parent) {
      return NextResponse.json(
        { error: "User with this referral code not found" },
        { status: 404 }
      );
    }

    // ✅ Step 3: Find first-level (direct) children — those whose `referralCode` == parent's code
    const children = await AuthModel.find({ referralCode: code })
      .limit(3)
      .select("_id name email code");

    if (children.length === 0) {
      return NextResponse.json(
        { message: "No direct children found for this user", totalCommission: 0, children: [] },
        { status: 200 }
      );
    }

    // ✅ Step 4: Calculate each child’s total earned commission
    const result = [];
    let grandTotal = 0;

    for (const child of children) {
      const commissions = await BuyPackageModel.find({ userId: child._id });

      const totalEarned = commissions.reduce((acc, curr) => acc + curr.packageAmount, 0);

      grandTotal += totalEarned;

      result.push({
        childId: child._id,
        name: child.name,
        email: child.email,
        code: child.code,
        totalEarned,
      });
    }

    // ✅ Step 5: Return summary
    return NextResponse.json(
      {
        success: true,
        parentId: parent._id,
        parentCode: code,
        totalCommissionBy3Children: grandTotal,
        children: result,
      },
      { status: 200 }
    );

  } catch (error) {
    // console.error("Error calculating child commissions:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    await connectDB();

    // Get userId from query string
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    // let user;
    let commission;
    if (userId) {
      //  user = await AuthModel.findById(userId);
          commission = await CommissionsModel.find({ userId }).sort({createdAt: -1});
    }else{
           commission = await CommissionsModel.find({}).sort({ createdAt: -1 });
    }

  
    
    return NextResponse.json(
      {
        success: true,
        message: "Fetched user packages  successfully",
        commission,
      },
      { status: 200 }
    );
  } catch (error) {
    // console.error("Error fetching user packages:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
