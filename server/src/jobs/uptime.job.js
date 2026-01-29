import cron from "node-cron";
import axios from "axios";
import { Service } from "../models/service.model.js";
import { Metric } from "../models/metric.model.js";

const CHECK_INTERVAL = "*/2 * * * *"; // every 2 minutes (dev-safe)
const REQUEST_TIMEOUT_MS = 5000; // 5 seconds

const pingService = async (service) => {
  const startTime = Date.now();

  try {
    const response = await axios.get(service.healthCheckUrl, {
      timeout: REQUEST_TIMEOUT_MS,
      validateStatus: () => true, // don't throw on 4xx/5xx
    });

    const responseTime = Date.now() - startTime;

    const isHealthy = response.status >= 200 && response.status < 400;

    return {
      status: isHealthy ? "healthy" : "down",
      responseTime,
    };
  } catch (error) {
    return {
      status: "down",
      responseTime: null,
      error: error.message,
    };
  }
};

const runUptimeCheck = async () => {
  console.log("Running uptime check...");

  const services = await Service.find({
    healthCheckUrl: { $exists: true, $ne: "" },
  });

  for (const service of services) {
    const result = await pingService(service);


  service.status = result.status;
  service.lastCheckedAt = new Date();
  await service.save();

  await Metric.create({
  serviceId: service._id,
  status: result.status,
  responseTime: result.responseTime,
  checkedAt: new Date(),
});


    console.log(
      `[${service.name}] → ${result.status}`
    );
  }
};

export const startUptimeScheduler = () => {
  cron.schedule(CHECK_INTERVAL, async () => {
    try {
      await runUptimeCheck();
    } catch (err) {
      console.error("Uptime job failed:", err.message);
    }
  });

  console.log("Uptime scheduler started");
};
