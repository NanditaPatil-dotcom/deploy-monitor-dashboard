import mongoose from "mongoose";

const logSchema = new mongoose.Schema(
  {
    serviceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
      required: true,
    },
    level: {
      type: String,
      enum: ["info", "warn", "error"],
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: false }
);

export const Log = mongoose.model("Log", logSchema);
