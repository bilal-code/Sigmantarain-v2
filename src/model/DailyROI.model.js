import mongoose from "mongoose";

const DailyROISchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Auth",
    required: true,
  },
  stakedAmount: Number,
  dailyPercent: Number,
  dailyROI: Number,
  date: {
    type: Date,
    default: Date.now,
  },
});

// export default mongoose.models.DailyROI || mongoose.model("DailyROI", DailyROISchema);
const DailyRoiModel =
  mongoose.models.DailyROI ||
  mongoose.model("DailyROI", DailyROISchema);

export default DailyRoiModel;
