import mongoose from "mongoose";

const BusinessCommissionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Auth", // AuthModel se relation (user)
      required: true,
    },
    amount: {
      type: Number, // Commission ka amount
      required: true,
    },

    percent: {
      type: Number,
      default: 0, // agar 1000 se zyada ho to true
    },
  },
  {
    timestamps: true, // automatically createdAt & updatedAt fields add karega
  }
);

// agar model pehle se exist kare to use kar lo
const BusinessCommissionModel =
  mongoose.models.BusinessCommission || mongoose.model("BusinessCommission", BusinessCommissionSchema);

export default BusinessCommissionModel;
