import mongoose from "mongoose";

const metricSchema = new mongoose.Schema(
  {
    serviceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
      required: true,
      index: true,
    },

    status: {
      type: String,
      enum: ["healthy", "down"],
      required: true,
    },

    responseTime: {
      type: Number, // in ms
    },

    checkedAt: {
      type: Date,
      default: Date.now,
      index: true,
    },
  },
  {
    timestamps: false,
  }
);

// compound index for time-series queries
metricSchema.index({ serviceId: 1, checkedAt: -1 });

export const Metric = mongoose.model("Metric", metricSchema);
