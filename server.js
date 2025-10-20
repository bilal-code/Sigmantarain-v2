


// import connectDB from "./src/lib/db.js";
// import DailyRoiModel from "./src/model/DailyROI.model.js";
// import StakingModel from "./src/model/Staking.model.js";
// import { exec } from "child_process";
// import cron from "node-cron";

// async function distributeDailyROI() {
//   await connectDB();
//   console.log("🚀 Running Daily ROI Distribution (Every 2 Minutes)");

//   const today = new Date();

//   // Get all active stakers
//   const stakers = await StakingModel.find({ isActive: true });
//   if (!stakers.length) {
//     console.log("⚠️ No active stakers found.");
//     return;
//   }

//   for (const stake of stakers) {
//     // Check if endDate has passed
//     if (new Date(stake.endDate) <= today) {
//       stake.isActive = false;
//       await stake.save();
//       console.log(`🛑 Staking expired for user: ${stake.userId}`);
//       continue;
//     }

//     // Otherwise, distribute ROI
//     const dailyPercent = +(0.7 + Math.random() * 0.4).toFixed(2);
//     const dailyROI = (stake.stakedAmount * dailyPercent) / 100;

//     await DailyRoiModel.create({
//       userId: stake.userId,
//       stakedAmount: stake.stakedAmount,
//       dailyPercent,
//       dailyROI,
//       date: today,
//     });

//     console.log(
//       `💸 ROI distributed to ${stake.userId}: ${dailyROI.toFixed(
//         2
//       )} (${dailyPercent}%)`
//     );
//   }

//   console.log("✅ ROI distribution completed!");
// }

// // Run every 2 minutes for testing
// cron.schedule("*/2 * * * *", distributeDailyROI);

// // Run Next.js dev server
// exec("npm run dev");

