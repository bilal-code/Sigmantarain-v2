import connectDB from "@/lib/db";
import AuthModel from "@/model/Auth.model";
import BuyPackageModel from "@/model/BuyPackage.model";
import PackageModel from "@/model/create-package.model";
import StakingModel from "@/model/Staking.model";
import WithdrawModel from "@/model/Withdraw.model";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Connect to DB
    await connectDB();

    // Fetch all packages
    const users = await AuthModel.find({});
    console.log("Users:", users.length);
    let totalUsers = users?.length;
    //bought Package Amount
    const BoughtPackages = await BuyPackageModel.find({});
    console.log("BoughtPackages:", BoughtPackages);
       const totalPackageAmount = BoughtPackages.reduce(
      (sum, pkg) => sum + (pkg.packageAmount || 0),
      0

    );
    //total SG Tokens
    let totalSGTokens = await BoughtPackages.reduce(
        (sum, pkg) => sum + (pkg.tokenRecieve || 0),
        0
    )
    console.log("Total SG Tokens:", totalSGTokens);
    //total packages
    const packages = await PackageModel.find({});
    let totalPackages = packages?.length;
//total Withdraw Amount
    const withdrawAmount = await WithdrawModel.find({});
    console.log("WithdrawAmount:", withdrawAmount);
   let totalUsdtWithdrawAmount = withdrawAmount
  .filter((withdraw) => withdraw.status === "accepted" && type === "usdt") // ✅ sirf approved filter
  .reduce((sum, withdraw) => sum + Number(withdraw.withdrawAmount || 0), 0);
    console.log("Total usdt Withdraw Amount:", totalUsdtWithdrawAmount);

       let totalTokensWithdrawAmount = withdrawAmount
  .filter((withdraw) => withdraw.status === "accepted" && type === "tokens") // ✅ sirf approved filter
  .reduce((sum, withdraw) => sum + Number(withdraw.withdrawAmount || 0), 0);
    console.log("Total tokens Withdraw Amount:", totalTokensWithdrawAmount);
    // total Staking Tokens
    const stakingTokens = await StakingModel.find({});
    console.log("StakingTokens:", stakingTokens);
    let totalStakingToken  = stakingTokens.reduce(
      (sum, stake) => sum + (stake.stakedAmount || 0),
   0
 );
console.log("Total Staking Tokens:", totalStakingToken);
    return NextResponse.json(
      { message: "dashboard Data successfully",  totalPackageAmount, totalUsers, totalPackages, totalUsdtWithdrawAmount,totalTokensWithdrawAmount, totalStakingToken, totalSGTokens },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error fetching packages:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
