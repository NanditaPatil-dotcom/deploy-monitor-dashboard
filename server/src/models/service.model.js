import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["backend", "frontend", "worker"],
      required: true,
    },
    healthCheckUrl: {
      type: String,
    },
    status: {
      type: String,
      default: "unknown",
    },
  },
  { timestamps: true }
);

export const Service = mongoose.model("Service", serviceSchema);
