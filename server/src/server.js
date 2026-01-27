import app from "./app.js";
import { env } from "./config/env.js";
import { connectDB } from "./config/db.js";
import { startUptimeScheduler } from "./jobs/uptime.job.js";


const startServer = async () => {
  await connectDB();

  startUptimeScheduler();

  app.listen(env.PORT, () => {
    console.log(
      `Server running on port ${env.PORT} [${env.NODE_ENV}]`
    );
  });
};

startServer();
