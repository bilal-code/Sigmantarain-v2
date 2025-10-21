
import connectDB from "@/lib/db";
import DailyRoiModel from "@/model/DailyROI.model";
import StakingModel from "@/model/Staking.model";

export async function GET(request) {
  try {
    await connectDB();
    console.log("🚀 Running Daily ROI Distribution (Triggered by Vercel Cron)");

    const today = new Date();

    const stakers = await StakingModel.find({ isActive: true });
    if (!stakers.length) {
      console.log("⚠️ No active stakers found.");
      return Response.json({ message: "No active stakers found" });
    }

    for (const stake of stakers) {
      // Check if endDate has passed
      if (new Date(stake.endDate) <= today) {
        stake.isActive = false;
        await stake.save();
        console.log(`🛑 Staking expired for user: ${stake.userId}`);
        continue;
      }

      // Otherwise, distribute ROI
      const dailyPercent = +(0.5 + Math.random() * 0.3).toFixed(2);
      const dailyROI = (stake.stakedAmount * dailyPercent) / 100;

      await DailyRoiModel.create({
        userId: stake.userId,
        stakedAmount: stake.stakedAmount,
        dailyPercent,
        dailyROI,
        date: today,
      });

      console.log(
        `💸 ROI distributed to ${stake.userId}: ${dailyROI.toFixed(
          2
        )} (${dailyPercent}%)`
      );
    }

    console.log("✅ ROI distribution completed!");
    return Response.json({ success: true, message: "ROI distributed successfully" });
  } catch (error) {
    console.error("❌ Error distributing ROI:", error);
    return Response.json({ success: false, error: error.message });
  }
}
