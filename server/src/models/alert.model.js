import mongoose from "mongoose";

const alertSchema = new mongoose.Schema(
  {
    serviceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
      required: true,
    },
    status: {
      type: String,
      enum: ["triggered", "acknowledged", "resolved"],
      default: "triggered",
    },
    message: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Alert = mongoose.model("Alert", alertSchema);
