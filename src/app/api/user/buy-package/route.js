import connectDB from "@/lib/db";
import AuthModel from "@/model/Auth.model";
import BuyPackageModel from "@/model/BuyPackage.model";
import PackageModel from "@/model/create-package.model";
// import CommissionModel from "@/model/Commission.model";
import { NextResponse } from "next/server";
import CommissionsModel from "@/model/Commissions.model";

// Recursive parent finder (up to 5 levels)
const findParentsUpTo5 = async (referralCode) => {
  const parentsArray = [];
  let currentCode = referralCode;
  let level = 0;

  while (currentCode && level < 6) {
    const parent = await AuthModel.findOne({ code: currentCode });
    if (!parent) break;

    parentsArray.push(parent._id);
    currentCode = parent.referralCode; // move up
    level++;
  }
  return parentsArray;
};

// Commission Percentages
// const SELF_PERCENT = 5;
const PARENTS_PERCENTAGES = [5,3, 1, 0.5, 0.5]; // 5 parents only

export async function POST(request) {
  try {
    const { userId, packageId, from, approveHash, purchaseHash, network, tokenAddress, tokenRecieve } = await request.json();
    console.log("Buying package:", { userId, packageId, from, approveHash, purchaseHash, network, tokenAddress ,tokenRecieve});
    // Connect to DB
    await connectDB();

    // Check if already bought
    const existedBoughtPackage = await BuyPackageModel.findOne({
      userId,
      packageId,
    });
    if (existedBoughtPackage) {
      return NextResponse.json(
        { error: "Package already bought" },
        { status: 409 }
      );
    }

    // Get user
    const user = await AuthModel.findById(userId);
    if (!user) {
      return NextResponse.json(
        { error: "User does not exist" },
        { status: 404 }
      );
    }

    // Get package
    const packageData = await PackageModel.findById(packageId);
    if (!packageData) {
      return NextResponse.json(
        { error: "Package does not exist" },
        { status: 404 }
      );
    }
    console.log("Package data:", packageData);

    // Find parents
    const parentsArray = await findParentsUpTo5(user.referralCode);

    let status = "approved";
    // Save purchase
    const UserBoughtPackage = await BuyPackageModel.create({
      userId,
      packageId,
      packageName: packageData.packageName,
      packageAmount: packageData.packageAmount,
      tokenRecieve:tokenRecieve,
      parentReferralChain: parentsArray,
      from,
      // approveHash,
      purchaseHash,
      tokenAddress,
      network,
      status,
    });

    // ================= COMMISSION DISTRIBUTION =================

    const commissions = [];

  
    // Parents commissions
    for (let i = 0; i < Math.min(parentsArray.length, 5); i++) {
      const parentId = parentsArray[i];
      const percent = PARENTS_PERCENTAGES[i];
      const commission = (packageData.packageAmount * percent) / 100;

      const parentCommission = await CommissionsModel.create({
        userId: parentId,
        // fromUserId: userId,
        packageId,
        amount: commission,
        percentage: percent,
        level: i + 1,
      });
      commissions.push(parentCommission);
    }

    return NextResponse.json(
      {
        success: true,
        message: "Package bought & commissions distributed",
        parentsArray,
        UserBoughtPackage,
      
      },
      { status: 201 }
    );
  } catch (error) {
    console.log("Error buying package:", error);
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
    let user;
    let boughtPackages;
    if (userId) {
       user = await AuthModel.findById(userId);
          boughtPackages = await BuyPackageModel.find({ userId }).populate(
      "packageId"
    );
  
    }else{
           boughtPackages = await BuyPackageModel.find({}).sort({ createdAt: -1 });
    }

  
    
    return NextResponse.json(
      {
        success: true,
        message: "Fetched user packages  successfully",
     
        boughtPackages,
     
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