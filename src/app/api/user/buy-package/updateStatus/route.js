// import { NextResponse } from "next/server";
// import connectDB from "@/lib/db";
// import BuyPackageModel from "@/model/BuyPackage.model";

// export async function PUT(request) {
//   try {
//     const { userId, packageId, status, tokenAddress } = await request.json();
//     console.log("Request data:", { userId, packageId, status, tokenAddress });
//     if (!userId || !packageId || !status) {
//       return NextResponse.json(
//         { error: "userId, packageId, and status are required" },
//         { status: 400 }
//       );
//     }

//     // Connect MongoDB
//     await connectDB();

//     // Build update object dynamically
//     const updateData = { status };
//     if (tokenAddress && status === "accepted") {
//       updateData.tokenAddress = tokenAddress; // Save token address if accepted
//     }

//     // Find and update
//     const updatedPackage = await BuyPackageModel.findOneAndUpdate(
//       { userId, packageId },
//       updateData,
//       { new: true }
//     );

//     if (!updatedPackage) {
//       return NextResponse.json(
//         { error: "Package not found for this user" },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json(
//       {
//         success: true,
//         message: `Package status updated to '${status}' for user ${userId}`,
//         updatedPackage,
//       },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("Error updating package status:", error);
//     return NextResponse.json(
//       { error: "Internal Server Error" },
//       { status: 500 }
//     );
//   }
// }
import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import BuyPackageModel from "@/model/BuyPackage.model";
import AuthModel from "@/model/Auth.model";
import PackageModel from "@/model/create-package.model";
import CommissionsModel from "@/model/Commissions.model";

// Commission config
// const SELF_PERCENT = ;
const PARENTS_PERCENTAGES = [5,3, 1, 0.5, 0.5]; // up to 4 parents

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

export async function PUT(request) {
  try {
    const { userId, packageId, status, tokenAddress } = await request.json();
    // console.log("Request data:", { userId, packageId, status, tokenAddress });
    if (!userId || !packageId || !status) {
      return NextResponse.json(
        { error: "userId, packageId, and status are required" },
        { status: 400 }
      );
    }

    await connectDB();

    // Find the bought package
    const boughtPackage = await BuyPackageModel.findOne({ userId, packageId });
    if (!boughtPackage) {
      return NextResponse.json(
        { error: "Package not found for this user" },
        { status: 404 }
      );
    }

    // Update status
    boughtPackage.status = status;
    boughtPackage.tokenAddress = tokenAddress;
    await boughtPackage.save();

    // ✅ Only distribute commission if accepted
    let commissions = [];
    if (status.toLowerCase() === "approved") {
      // Buyer self commission
      // const selfCommission = await CommissionsModel.create({
      //   userId,
      //   packageId,
      //   amount: (boughtPackage.packageAmount * SELF_PERCENT) / 100,
      //   percentage: SELF_PERCENT,
      //   level: 0,
      // });
      // commissions.push(selfCommission);

      // Parents commissions
      const user = await AuthModel.findById(userId);
      const parentsArray = await findParentsUpTo5(user.referralCode);

      for (let i = 0; i < Math.min(parentsArray.length, 5); i++) {
        const parentId = parentsArray[i];
        const percent = PARENTS_PERCENTAGES[i];
        const amount = (boughtPackage.packageAmount * percent) / 100;

        const parentCommission = await CommissionsModel.create({
          userId: parentId,
          packageId,
          amount,
          percentage: percent,
          level: i + 1,
        });
        commissions.push(parentCommission);
      }
    }

    return NextResponse.json(
      {
        success: true,
        message: `Package status updated to '${status}'`,
        updatedPackage: boughtPackage,
        commissionsDistributed: commissions,
      },
      { status: 200 }
    );
  } catch (error) {
    // console.error("Error updating package status:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}
