import mongoose from "mongoose";

const RoiCommissionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Auth",
      required: true,
    },
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Auth",
      required: true,
    },
    stakedAmount: {
      type: Number,
      required: true,
    },
    level: {
      type: Number,
      required: true,
    },
    percent: {
      type: Number,
      default: 0,
    },
  
    amount: {
      type: Number,
      default: 0,
    },
  
    type: {
      type: String,
      enum: ["Upline Commission", "Direct Commission"],
      default: "Upline Commission",
    },
  
  },
  { timestamps: true }
);

const RoiCommissionModel =
  mongoose.models.RoiCommission ||
  mongoose.model("RoiCommission", RoiCommissionSchema);

export default RoiCommissionModel;
