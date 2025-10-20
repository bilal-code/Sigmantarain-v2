// import mongoose from "mongoose";

// const StakingSchema = new mongoose.Schema(
//   {
//     userId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Auth",
//       required: true,
//     },
//     stakedAmount: {
//       type: Number,
//       required: true,
//       min: 0,
//     },
//     roiPercent: {
//       type: Number,
//       default: 0,
//       comment: "Current daily ROI percentage (0.7 - 1.1%)",
//     },
//     totalEarnedROI: {
//       type: Number,
//       default: 0,
//       comment: "Total ROI earned so far by the user",
//     },
//     distributedToUplines: {
//       type: Number,
//       default: 0,
//       comment: "Total amount distributed to uplines from this user's ROI",
//     },
//     lastRoiDate: {
//       type: Date,
//       default: null,
//       comment: "Last date when ROI was distributed",
//     },
//     isActive: {
//       type: Boolean,
//       default: true,
//       comment: "Whether staking is still active or ended",
//     },
//     durationDays: {
//       type: Number,
//       default: 0,
//       comment: "Total staking duration (optional, in days)",
//     },
//     startDate: {
//       type: Date,
//       default: Date.now,
//     },
//     endDate: {
//       type: Date,
//       default: null,
//     },
//   },
//   { timestamps: true }
// );

// const StakingModel =
//   mongoose.models.Staking || mongoose.model("Staking", StakingSchema);

// export default StakingModel;

import mongoose from "mongoose";

const StakingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Auth",
    required: true,
  },
  stakedAmount: {
    type: Number,
    required: true,
  },
  startDate: {
    type: Date,
    default: Date.now,
  },
  endDate: {
    type: Date,
    default: null,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});
const StakingModel =
  mongoose.models.Staking || mongoose.model("Staking", StakingSchema);

export default StakingModel;