import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
      index:true,
    },
    name: {
      type: String,
      required: true,
      trim:true,
    },
    type: {
      type: String,
      enum: ["backend", "frontend", "worker"],
      required: true,
    },
    healthCheckUrl: {
      type: String,
      trim:true,
    },
    status: {
      type: String,
      enum:["unknown","healthy","down"],
      default: "unknown",
    },
    lastCheckedAt:{
        type:Date,
    }
  },
  { timestamps: true }
);

export const Service = mongoose.model("Service", serviceSchema);
