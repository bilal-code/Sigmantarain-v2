import mongoose from "mongoose";

const BuyPackageSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    packageId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Package",
      required: true,
    },
    packageName: {
      type: String,
      required: true,
    },
    // lastCreditedAt: { type: Date },
    // totalEarning: { type: Number, default: 0 },
    packageAmount: {
      type: Number,
      required: true,
    },
    // packageDailyPercentage: {
    //   type: Number,
    //   required: true,
    // },
    parentReferralChain: {
      type: [String], // Array of referral codes for up to 7 parents
      default: [],
    },
    from: {
      type: String,
      required: true,
    },
    // approveHash: {
    //   type: String,
    //   default: ""
    // },
    purchaseHash: {
      type: String,
      required: true,
    },
    network: {
      type: String,
      required: true,
    },
    tokenAddress:{
      type: String,
      default: ""
    },
    tokenRecieve:{
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
      required: true,
    },
  },
  { timestamps: true }
);

const BuyPackageModel =
  mongoose.models.BuyPackage || mongoose.model("BuyPackage", BuyPackageSchema);
export default BuyPackageModel;
